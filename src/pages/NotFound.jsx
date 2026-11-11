import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page">
      <span className="eyebrow">Error 404</span>
      <h2 className="page-title">Page not found</h2>
      <p className="page-sub">That route doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back home →</Link>
    </section>
  );
}
