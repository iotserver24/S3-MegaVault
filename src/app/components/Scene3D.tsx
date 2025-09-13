'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Three.js components
const Scene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function Scene3D() {
  return (
    <div className="h-full w-full">
      <Scene />
    </div>
  );
} 