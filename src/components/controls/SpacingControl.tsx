'use client';

import React, { useState } from 'react';
import { SpacingValue } from '@/types';
import { Link2, Unlink, RotateCcw } from 'lucide-react';

interface SpacingControlProps {
  label: string;
  value: SpacingValue;
  onChange: (val: SpacingValue) => void;
  onReset?: () => void;
  unit?: string;
}

export const SpacingControl: React.FC<SpacingControlProps> = ({
  label,
  value = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange,
  onReset,
  unit = 'px',
}) => {
  const [isLinked, setIsLinked] = useState<boolean>(true);

  const handleSideChange = (side: keyof SpacingValue, val: number) => {
    const safeVal = isNaN(val) ? 0 : Math.max(0, val);
    if (isLinked) {
      onChange({
        top: safeVal,
        right: safeVal,
        bottom: safeVal,
        left: safeVal,
      });
    } else {
      onChange({
        ...value,
        [side]: safeVal,
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <div className="flex items-center gap-1">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Сбросить только текущий breakpoint"
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5"
            >
              <RotateCcw className="size-3" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsLinked(!isLinked)}
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
              isLinked
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isLinked ? 'Значения связаны (Linked)' : 'Раздельные значения'}
          >
            {isLinked ? <Link2 className="size-3" /> : <Unlink className="size-3" />}
            <span>{isLinked ? 'Связано' : 'Раздельно'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
        <div className="space-y-1">
          <span className="text-zinc-400 font-medium">Верх</span>
          <input
            type="number"
            min={0}
            max={300}
            step={4}
            value={value.top}
            onChange={(e) => handleSideChange('top', Number(e.target.value))}
            className="w-full px-1.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-center font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <span className="text-zinc-400 font-medium">Право</span>
          <input
            type="number"
            min={0}
            max={300}
            step={4}
            value={value.right}
            onChange={(e) => handleSideChange('right', Number(e.target.value))}
            className="w-full px-1.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-center font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <span className="text-zinc-400 font-medium">Низ</span>
          <input
            type="number"
            min={0}
            max={300}
            step={4}
            value={value.bottom}
            onChange={(e) => handleSideChange('bottom', Number(e.target.value))}
            className="w-full px-1.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-center font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <span className="text-zinc-400 font-medium">Лево</span>
          <input
            type="number"
            min={0}
            max={300}
            step={4}
            value={value.left}
            onChange={(e) => handleSideChange('left', Number(e.target.value))}
            className="w-full px-1.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-center font-mono text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
      {unit ? <span className="sr-only">{unit}</span> : null}
    </div>
  );
};
