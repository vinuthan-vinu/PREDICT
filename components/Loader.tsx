
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-slate-300 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-indigo-500 border-l-indigo-500 border-b-indigo-500/10 border-r-indigo-500/10 rounded-full animate-spin"></div>
    </div>
    <h3 className="mt-6 text-2xl font-semibold text-slate-700">Analyzing Data...</h3>
    <p className="mt-2 text-slate-500">The AI is uncovering hidden patterns in your data. This might take a moment.</p>
  </div>
);