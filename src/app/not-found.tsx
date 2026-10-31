import Link from "next/link";

export default function NotFound() {
  return (
    <header className="px-6 py-24 md:px-10">
      <p className="eyebrow">404</p>
      <h1 className="t-display mt-4">Page not found</h1>
      <Link href="/" className="btn btn-outline mt-8">
        Back home
      </Link>
    </header>
  );
}
