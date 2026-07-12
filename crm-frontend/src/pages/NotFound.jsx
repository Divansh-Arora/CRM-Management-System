import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        <Compass className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-1.5 max-w-sm text-sm text-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button as={Link} to="/" className="mt-6">
        Back to overview
      </Button>
    </div>
  );
}
