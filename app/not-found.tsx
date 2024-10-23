import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h3 className="text-9xl font-bold">404</h3>
      <h4 className="text-xl font-bold">Page not found</h4>
      <Link className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-700" href="/">
        <ArrowLeft /> Return Home Page
      </Link>
    </div>
  );
}
