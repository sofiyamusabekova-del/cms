import {
  resolveResponsiveValue,
  hasBreakpointOverride,
  setResponsiveBreakpoint,
  resetResponsiveBreakpoint,
} from './styleResolver';
import { ResponsiveValue } from '@/types';

export function runStyleResolverTests(): { passed: boolean; results: string[] } {
  const results: string[] = [];
  const checks: boolean[] = [];

  const assert = (ok: boolean, label: string) => {
    checks.push(ok);
    results.push(`${ok ? 'PASS' : 'FAIL'}: ${label}`);
  };

  const val1: ResponsiveValue<number> = { desktop: 80, tablet: 48, mobile: 20 };
  assert(resolveResponsiveValue(val1, 'desktop') === 80, 'desktop explicit');
  assert(resolveResponsiveValue(val1, 'tablet') === 48, 'tablet explicit');
  assert(resolveResponsiveValue(val1, 'mobile') === 20, 'mobile explicit');

  const desktopOnly: ResponsiveValue<number> = { desktop: 100 };
  assert(resolveResponsiveValue(desktopOnly, 'tablet') === 100, 'tablet fallback to desktop');
  assert(resolveResponsiveValue(desktopOnly, 'mobile') === 100, 'mobile fallback to desktop');

  const tabletOnly: ResponsiveValue<number> = { desktop: 100, tablet: 60 };
  assert(resolveResponsiveValue(tabletOnly, 'mobile') === 60, 'mobile fallback to tablet');

  assert(resolveResponsiveValue(undefined, 'desktop') === undefined, 'undefined value');

  assert(hasBreakpointOverride(val1, 'tablet') === true, 'has tablet override');
  assert(hasBreakpointOverride(desktopOnly, 'tablet') === false, 'no tablet override');

  const patched = setResponsiveBreakpoint(desktopOnly, 'mobile', 20);
  assert(patched.desktop === 100 && patched.mobile === 20, 'set current breakpoint');

  const reset = resetResponsiveBreakpoint(val1, 'tablet');
  assert(
    reset.tablet === undefined && reset.desktop === 80 && reset.mobile === 20,
    'reset only current breakpoint'
  );
  assert(resolveResponsiveValue(reset, 'tablet') === 80, 'after reset tablet falls back to desktop');

  return { passed: checks.every(Boolean), results };
}

const isDirectRun =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv.some((arg) => arg.replace(/\\/g, '/').endsWith('styleResolver.test.ts'));

if (isDirectRun) {
  const { passed, results } = runStyleResolverTests();
  for (const line of results) {
    console.log(line);
  }
  if (!passed) {
    process.exitCode = 1;
  }
}
