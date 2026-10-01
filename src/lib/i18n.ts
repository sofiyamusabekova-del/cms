import { LocalizedText } from '@/types';

export function getLocalizedText(
  value: LocalizedText | string | unknown,
  currentLocale: string = 'ru',
  defaultLocale: string = 'ru'
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, string>;
    if (obj[currentLocale] !== undefined && obj[currentLocale] !== '') {
      return obj[currentLocale];
    }
    if (obj[defaultLocale] !== undefined && obj[defaultLocale] !== '') {
      return obj[defaultLocale];
    }
    if (obj['ru'] !== undefined && obj['ru'] !== '') {
      return obj['ru'];
    }
    if (obj['en'] !== undefined && obj['en'] !== '') {
      return obj['en'];
    }
    const anyVal = Object.values(obj).find((v) => typeof v === 'string' && v !== '');
    if (anyVal) return anyVal;
  }

  return String(value);
}
