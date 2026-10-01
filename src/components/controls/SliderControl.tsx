'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

export interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  onReset?: () => void;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'px',
  onChange,
  onReset,
}) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : min;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onChange(Math.max(min, Math.min(max, val)));
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={safeValue}
            onChange={handleInputChange}
            className="w-14 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-right text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {unit && (
            <span className="text-[10px] text-zinc-400 font-mono">{unit}</span>
          )}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Сбросить значение"
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
            >
              <RotateCcw className="size-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={handleSliderChange}
          className="w-full accent-indigo-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};
