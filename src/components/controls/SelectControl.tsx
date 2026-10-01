'use client';

import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectControlProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (val: string) => void;
  description?: string;
}

export const SelectControl: React.FC<SelectControlProps> = ({
  label,
  value,
  options,
  onChange,
  description,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {description && (
        <p className="text-[10px] text-zinc-400">{description}</p>
      )}
    </div>
  );
};
