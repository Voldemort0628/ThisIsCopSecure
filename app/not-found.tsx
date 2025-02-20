import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="text-pink-500 hover:text-pink-400 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}