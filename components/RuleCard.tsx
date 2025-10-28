
import React from 'react';
import { AssociationRule } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface RuleCardProps {
  rule: AssociationRule;
}

const ItemTag: React.FC<{ item: string }> = ({ item }) => (
    <span className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">{item}</span>
);

export const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
  const confidencePercentage = (rule.confidence * 100).toFixed(1);
  const supportPercentage = (rule.support * 100).toFixed(2);

  return (
    <div className="bg-white/70 rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:ring-teal-400/50 hover:shadow-teal-500/10">
        <div className="p-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                    {rule.antecedent.map(item => <ItemTag key={item} item={item} />)}
                </div>
                <ArrowRightIcon className="w-6 h-6 text-teal-500 flex-shrink-0" />
                <div className="flex flex-wrap justify-center gap-2">
                    {rule.consequent.map(item => <ItemTag key={item} item={item} />)}
                </div>
            </div>
        </div>

        <div className="border-t border-b border-slate-200/80 bg-sky-100/40 px-5 py-4 flex justify-around text-center">
            <div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Confidence</div>
                <div className="text-xl font-bold text-blue-600">{confidencePercentage}%</div>
            </div>
            <div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Support</div>
                <div className="text-xl font-bold text-blue-600">{supportPercentage}%</div>
            </div>
        </div>

        <div className="p-5">
            <div className="flex items-start gap-3">
                <LightbulbIcon className="w-5 h-5 mt-1 text-yellow-500 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-slate-800">Placement Suggestion</h4>
                    <p className="text-sm text-slate-600 mt-1">{rule.suggestion}</p>
                </div>
            </div>
        </div>
    </div>
  );
};
