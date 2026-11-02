// `version` is the git SHA baked in at image build time (see Dockerfile), so the
// deploy pipeline can confirm which build a host is serving before testing it.
export function GET() {
  return Response.json({ ok: true, version: process.env.APP_VERSION ?? "dev" });
}
