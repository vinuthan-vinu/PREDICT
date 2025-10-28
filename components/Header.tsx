
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
      Market Basket Analyzer AI
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
      Upload your sales data to uncover hidden buying patterns and get smart suggestions for product placement.
    </p>
  </header>
);
