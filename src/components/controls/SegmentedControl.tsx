'use client';

import React from 'react';

interface SegmentItem {
  id: string;
  label: React.ReactNode;
  title?: string;
}

interface SegmentedControlProps {
  label?: string;
  value: string;
  options: SegmentItem[];
  onChange: (val: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
          {label}
        </label>
      )}
      <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700/60">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            title={opt.title}
            onClick={() => onChange(opt.id)}
            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium flex items-center justify-center gap-1 transition-all ${
              value === opt.id
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
