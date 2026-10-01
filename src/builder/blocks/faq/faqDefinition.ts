import { BlockDefinition } from '@/builder/registry/types';
import { FaqBlock } from './FaqBlock';

export const faqDefinition: BlockDefinition = {
  type: 'faq',
  label: 'FAQ (Вопросы)',
  category: 'content',
  icon: 'HelpCircle',
  variants: [
    { id: 'accordion', label: 'Аккордеон' },
  ],
  createDefault: () => ({
    id: `faq-${crypto.randomUUID()}`,
    type: 'faq',
    variant: 'accordion',
    content: {
      title: { ru: 'Часто задаваемые вопросы', en: 'Frequently Asked Questions', uz: 'Ko‘p beriladigan savollar' },
      subtitle: { ru: 'Ответы на популярные вопросы о платформе', en: 'Common answers about our builder', uz: 'Platforma haqida savol-javoblar' },
    },
    styles: {},
  }),
  renderer: FaqBlock,
  inspector: { content: [], style: [] },
};
