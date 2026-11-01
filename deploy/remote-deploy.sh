#!/usr/bin/env bash
# Runs on the VPS. Deploys one image tag to one environment, waits for the
# container to report healthy, and rolls back to the previous tag if it doesn't.
#
#   remote-deploy.sh deploy   <dir> <service> <tag>
#   remote-deploy.sh rollback <dir> <service>
#
# <dir>/.env holds the live IMAGE_TAG; <dir>/.env.previous the one before it.
set -euo pipefail

cmd=$1 dir=$2 service=$3 tag=${4:-}
cd "$dir"

current_tag() { sed -n 's/^IMAGE_TAG=//p' "$1" 2>/dev/null || true; }

wait_healthy() {
  local cid status
  cid=$(docker compose ps -q "$service")
  for _ in $(seq 1 60); do
    status=$(docker inspect -f '{{.State.Health.Status}}' "$cid" 2>/dev/null || echo missing)
    [ "$status" = healthy ] && return 0
    [ "$status" = unhealthy ] && break
    sleep 2
  done
  echo "::error::$service did not become healthy (last status: ${status:-unknown})"
  docker compose logs --tail 50 "$service" || true
  return 1
}

start() {
  echo "IMAGE_TAG=$1" > .env
  # `start` runs inside `if`, where set -e is off, so fail explicitly.
  docker compose pull "$service" || return 1
  docker compose up -d --remove-orphans "$service" || return 1
  wait_healthy
}

rollback() {
  local prev
  prev=$(current_tag .env.previous)
  if [ -z "$prev" ]; then
    echo "::error::no previous tag recorded in $dir/.env.previous, cannot roll back"
    return 1
  fi
  echo "Rolling back $service to $prev"
  start "$prev"
}

# Remove old portfolio images, keeping the live and previous tag of every environment.
prune() {
  local keep tag
  keep=$(cat ~/portfolio-deploy/.env ~/portfolio-deploy/.env.previous \
             ~/portfolio-acceptance/.env ~/portfolio-acceptance/.env.previous 2>/dev/null \
         | sed -n 's/^IMAGE_TAG=//p' | sort -u)
  docker image ls ghcr.io/ikbalrslan/portfolio --format '{{.Tag}}' | while read -r tag; do
    grep -qx "$tag" <<<"$keep" || docker image rm "ghcr.io/ikbalrslan/portfolio:$tag" >/dev/null 2>&1 || true
  done
  docker image prune -f >/dev/null
}

case $cmd in
  deploy)
    [ -n "$tag" ] || { echo "usage: $0 deploy <dir> <service> <tag>"; exit 2; }
    # First run in this dir: no .env yet, so fall back to the :latest image
    # deployed by the old single-step workflow.
    prev=$(current_tag .env); prev=${prev:-latest}
    if [ -n "$prev" ] && [ "$prev" != "$tag" ]; then echo "IMAGE_TAG=$prev" > .env.previous; fi
    if start "$tag"; then
      prune
      echo "Deployed $service at $tag"
    else
      rollback || true
      exit 1
    fi
    ;;
  rollback)
    rollback
    ;;
  *)
    echo "unknown command: $cmd"; exit 2
    ;;
esac
