
import React from 'react';
import { AssociationRule } from '../types';
import { RuleCard } from './RuleCard';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { Loader } from './Loader';

interface ResultsDisplayProps {
  isLoading: boolean;
  rules: AssociationRule[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, rules }) => {
  if (isLoading) {
    return <Loader />;
  }
  
  if (rules.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <LightbulbIcon className="w-16 h-16 mx-auto text-slate-400" />
        <h3 className="mt-4 text-2xl font-semibold text-slate-700">Ready for Insights</h3>
        <p className="mt-2 text-slate-500">Upload your data and run the analysis to discover valuable customer buying patterns.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
        Discovered Associations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {rules.map((rule, index) => (
          <RuleCard key={index} rule={rule} />
        ))}
      </div>
    </div>
  );
};
