
import React from 'react';
import { SettingsIcon } from './icons/SettingsIcon';

interface ControlsProps {
  minSupport: number;
  setMinSupport: (value: number) => void;
  minConfidence: number;
  setMinConfidence: (value: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({ minSupport, setMinSupport, minConfidence, setMinConfidence }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-teal-600 flex items-center gap-2">
      <SettingsIcon className="w-6 h-6" />
      2. Set Parameters
    </h3>
    <div className="space-y-5 bg-black/5 p-4 rounded-lg">
      <div>
        <label htmlFor="minSupport" className="block text-sm font-medium text-slate-700">
          Minimum Support: <span className="font-bold text-teal-600">{minSupport.toFixed(3)}</span>
        </label>
        <input
          id="minSupport"
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={minSupport}
          onChange={(e) => setMinSupport(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-2"
        />
        <p className="text-xs text-slate-500 mt-1">How often a combination appears in all transactions.</p>
      </div>
      <div>
        <label htmlFor="minConfidence" className="block text-sm font-medium text-slate-700">
          Minimum Confidence: <span className="font-bold text-teal-600">{minConfidence.toFixed(2)}</span>
        </label>
        <input
          id="minConfidence"
          type="range"
          min="0.05"
          max="1.0"
          step="0.01"
          value={minConfidence}
          onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-teal-600 mt-2"
        />
        <p className="text-xs text-slate-500 mt-1">How likely items are purchased together.</p>
      </div>
    </div>
  </div>
);
