'use client';

import React from 'react';

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  presets?: string[];
}

export const ColorControl: React.FC<ColorControlProps> = ({
  label,
  value = '#ffffff',
  onChange,
  presets = [
    '#ffffff',
    '#0f172a',
    '#4f46e5',
    '#9333ea',
    '#059669',
    '#ea580c',
    '#f8fafc',
    '#1e293b',
  ],
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <span className="font-mono text-[10px] text-zinc-400 uppercase">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative size-7 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 shadow-xs cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 size-12 cursor-pointer border-0 p-0"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
        />
      </div>

      {/* Preset Swatches */}
      {presets.length > 0 && (
        <div className="flex items-center gap-1.5 pt-1">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              style={{ backgroundColor: preset }}
              className={`size-4 rounded-full border border-black/10 dark:border-white/20 transition-transform hover:scale-125 ${
                value.toLowerCase() === preset.toLowerCase()
                  ? 'ring-2 ring-indigo-500 ring-offset-1'
                  : ''
              }`}
              title={preset}
            />
          ))}
        </div>
      )}
    </div>
  );
};
