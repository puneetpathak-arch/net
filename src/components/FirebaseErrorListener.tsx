
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This is a client component that will listen for permission errors
// and throw them to be caught by the Next.js error overlay.
// This is only for use in development.
export function FirebaseErrorListener() {
  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error) => {
      // Throwing the error here will cause it to be displayed in the
      // Next.js development error overlay.
      throw error;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
}
