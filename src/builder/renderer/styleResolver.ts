import { Breakpoint, ResponsiveValue } from '@/types';

export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint
): T | undefined {
  if (!value) return undefined;

  switch (breakpoint) {
    case 'desktop':
      return value.desktop;
    case 'tablet':
      return value.tablet !== undefined ? value.tablet : value.desktop;
    case 'mobile':
      return value.mobile !== undefined
        ? value.mobile
        : value.tablet !== undefined
          ? value.tablet
          : value.desktop;
    default:
      return value.desktop;
  }
}

export function hasBreakpointOverride<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint
): boolean {
  return value?.[breakpoint] !== undefined;
}

export function setResponsiveBreakpoint<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint,
  nextValue: T
): ResponsiveValue<T> {
  return {
    ...(value || {}),
    [breakpoint]: nextValue,
  };
}

export function resetResponsiveBreakpoint<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint
): ResponsiveValue<T> {
  if (!value) return {};
  const next = { ...value };
  delete next[breakpoint];
  return next;
}
