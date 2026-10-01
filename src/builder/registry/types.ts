import React from 'react';
import { PageBlock, Breakpoint, GlobalStyles } from '@/types';

export interface BlockVariant {
  id: string;
  label: string;
}

export interface ControlDefinition {
  id: string;
  label: string;
  type: string;
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  step?: number;
}

export interface BlockRendererProps {
  block: PageBlock;
  locale: string;
  breakpoint: Breakpoint;
  mode: 'editor' | 'preview' | 'export';
  globalStyles?: GlobalStyles;
}

export interface BlockDefinition {
  type: string;
  label: string;
  category: string;
  icon?: string;
  variants: BlockVariant[];
  createDefault: () => PageBlock;
  renderer: React.ComponentType<BlockRendererProps>;
  inspector?: {
    content?: ControlDefinition[];
    style?: ControlDefinition[];
  };
}
