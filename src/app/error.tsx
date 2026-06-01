'use client';

import Link from 'next/link'; 
import { AlertTriangle } from 'lucide-react';

import Button from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-border rounded-xl overflow-hidden">
        <div className="bg-card p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-danger rounded-full flex items-center justify-center">
            <AlertTriangle size={28} className="text-white" />
          </div>
          <h5>Something went wrong</h5>
          <p className="text-sm text-center">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="p-5 flex flex-col gap-3 border-b border-border">
          <div className="flex justify-between text-sm">
            <span className="text-text">Error</span>
            <span className="truncate max-w-55">
              {error?.message || 'Unknown error'}
            </span>
          </div>
        </div>

        <div className="p-5 flex gap-3">
          <Button variant="secondary" className="flex-1">
            <Link href="/">Go To Home</Link>
          </Button>
          <Button
            variant="secondary"
            onClick={() => reset()}
            className="flex-1 "
          >
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
}
