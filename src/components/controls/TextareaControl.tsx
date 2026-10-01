'use client';

import React from 'react';

interface TextareaControlProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  description?: string;
}

export const TextareaControl: React.FC<TextareaControlProps> = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  description,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      {description && (
        <p className="text-[10px] text-zinc-400">{description}</p>
      )}
    </div>
  );
};
