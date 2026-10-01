import { BlockDefinition } from '@/builder/registry/types';
import { FooterBlock } from './FooterBlock';

export const footerDefinition: BlockDefinition = {
  type: 'footer',
  label: 'Подвал (Footer)',
  category: 'layout',
  icon: 'Layers',
  variants: [
    { id: 'columns', label: 'Колонки' },
  ],
  createDefault: () => ({
    id: `footer-${crypto.randomUUID()}`,
    type: 'footer',
    variant: 'columns',
    content: {
      brandName: 'Visual Site Builder',
      tagline: { ru: 'Инновационный блочный конструктор сайтов для современного бизнеса.', en: 'Innovative visual site builder for modern business.', uz: 'Zamonaviy biznes uchun vizual sayt konstruktori.' },
      copyright: `© ${new Date().getFullYear()} Visual Site Builder. Все права защищены.`,
    },
    styles: {},
  }),
  renderer: FooterBlock,
  inspector: { content: [], style: [] },
};
