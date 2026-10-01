'use client';

import React from 'react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { ColorControl } from './ColorControl';
import { SegmentedControl } from './SegmentedControl';
import { SelectControl } from './SelectControl';
import { SliderControl } from './SliderControl';

const FONT_WEIGHTS = [
  { label: 'Regular 400', value: '400' },
  { label: 'Medium 500', value: '500' },
  { label: 'Semibold 600', value: '600' },
  { label: 'Bold 700', value: '700' },
  { label: 'Extrabold 800', value: '800' },
  { label: 'Black 900', value: '900' },
];

export interface TypographyControlValues {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
}

export interface TypographyControlProps {
  values: TypographyControlValues;
  breakpoint: string;
  overrideHint: (path: string) => string;
  onResponsiveChange: (path: string, value: number | string) => void;
  onFontWeightChange: (weight: number) => void;
  onColorChange: (color: string) => void;
  onResetBreakpoint: (path: string) => void;
}

export const TypographyControl: React.FC<TypographyControlProps> = ({
  values,
  breakpoint,
  overrideHint,
  onResponsiveChange,
  onFontWeightChange,
  onColorChange,
  onResetBreakpoint,
}) => {
  return (
    <div className="space-y-4">
      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
        Типографика заголовка
      </span>

      <SliderControl
        label={`Размер (${breakpoint}) · ${overrideHint('typography.fontSize')}`}
        value={values.fontSize}
        min={16}
        max={96}
        step={1}
        unit="px"
        onChange={(newVal) => onResponsiveChange('typography.fontSize', newVal)}
        onReset={() => onResetBreakpoint('typography.fontSize')}
      />

      <SelectControl
        label="Насыщенность"
        value={String(values.fontWeight)}
        options={FONT_WEIGHTS}
        onChange={(val) => onFontWeightChange(Number(val))}
      />

      <SliderControl
        label={`Межстрочный интервал (${breakpoint}) · ${overrideHint('typography.lineHeight')}`}
        value={values.lineHeight}
        min={1}
        max={2}
        step={0.05}
        unit="×"
        onChange={(newVal) => onResponsiveChange('typography.lineHeight', newVal)}
        onReset={() => onResetBreakpoint('typography.lineHeight')}
      />

      <SliderControl
        label={`Межбуквенный (${breakpoint}) · ${overrideHint('typography.letterSpacing')}`}
        value={values.letterSpacing}
        min={-4}
        max={8}
        step={0.1}
        unit="px"
        onChange={(newVal) => onResponsiveChange('typography.letterSpacing', newVal)}
        onReset={() => onResetBreakpoint('typography.letterSpacing')}
      />

      <SegmentedControl
        label={`Выравнивание (${breakpoint}) · ${overrideHint('typography.textAlign')}`}
        value={values.textAlign}
        onChange={(val) => onResponsiveChange('typography.textAlign', val)}
        options={[
          { id: 'left', label: <AlignLeft className="size-4" />, title: 'По левому краю' },
          { id: 'center', label: <AlignCenter className="size-4" />, title: 'По центру' },
          { id: 'right', label: <AlignRight className="size-4" />, title: 'По правому краю' },
          { id: 'justify', label: <AlignJustify className="size-4" />, title: 'По ширине' },
        ]}
      />

      <ColorControl
        label="Цвет текста"
        value={values.color}
        onChange={onColorChange}
      />
    </div>
  );
};
