import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <Zap className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">CopSecure</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}