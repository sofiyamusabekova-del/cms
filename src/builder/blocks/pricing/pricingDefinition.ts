import { BlockDefinition } from '@/builder/registry/types';
import { PricingBlock } from './PricingBlock';

export const pricingDefinition: BlockDefinition = {
  type: 'pricing',
  label: 'Тарифы',
  category: 'marketing',
  icon: 'CreditCard',
  variants: [
    { id: 'three-cards', label: '3 тарифа' },
  ],
  createDefault: () => ({
    id: `pricing-${crypto.randomUUID()}`,
    type: 'pricing',
    variant: 'three-cards',
    content: {
      title: { ru: 'Тарифные планы', en: 'Pricing Plans', uz: 'Tarif rejalari' },
      subtitle: { ru: 'Выберите подходящий вариант для вашего проекта', en: 'Choose the best plan for your needs', uz: 'O‘zingizga mos tarifni tanlang' },
    },
    styles: {},
  }),
  renderer: PricingBlock,
  inspector: { content: [], style: [] },
};
