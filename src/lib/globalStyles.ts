import { GlobalStyles } from '@/types';

export function generateGlobalCssVariables(styles?: GlobalStyles): string {
  if (!styles) return '';

  const { colors, typography, radius, containerMaxWidth } = styles;

  return `
    :root {
      --color-primary: ${colors?.primary || '#4f46e5'};
      --color-secondary: ${colors?.secondary || '#9333ea'};
      --color-text: ${colors?.text || '#0f172a'};
      --color-bg: ${colors?.background || '#ffffff'};
      --font-heading: ${typography?.headingFont || 'Inter, sans-serif'};
      --font-body: ${typography?.bodyFont || 'Inter, sans-serif'};
      --radius-sm: ${radius?.sm ?? 4}px;
      --radius-md: ${radius?.md ?? 8}px;
      --radius-lg: ${radius?.lg ?? 16}px;
      --container-max-width: ${containerMaxWidth ?? 1200}px;
    }
  `.trim();
}

export function getGlobalCssStyleObject(styles?: GlobalStyles): React.CSSProperties {
  if (!styles) return {};

  return {
    ['--color-primary' as string]: styles.colors?.primary || '#4f46e5',
    ['--color-secondary' as string]: styles.colors?.secondary || '#9333ea',
    ['--color-text' as string]: styles.colors?.text || '#0f172a',
    ['--color-bg' as string]: styles.colors?.background || '#ffffff',
    ['--font-heading' as string]: styles.typography?.headingFont || 'Inter, sans-serif',
    ['--font-body' as string]: styles.typography?.bodyFont || 'Inter, sans-serif',
    ['--radius-sm' as string]: `${styles.radius?.sm ?? 4}px`,
    ['--radius-md' as string]: `${styles.radius?.md ?? 8}px`,
    ['--radius-lg' as string]: `${styles.radius?.lg ?? 16}px`,
    ['--container-max-width' as string]: `${styles.containerMaxWidth ?? 1200}px`,
  } as React.CSSProperties;
}
