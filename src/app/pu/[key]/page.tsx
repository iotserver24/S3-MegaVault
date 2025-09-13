'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicFileRedirect({ params }: { params: { key: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /pr/ route with the same key
    router.replace(`/pr/${params.key}`);
  }, [router, params.key]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Redirecting...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we redirect you to the file.</p>
      </div>
    </div>
  );
} 