import { BlockDefinition } from '@/builder/registry/types';
import { StatsBlock } from './StatsBlock';

export const statsDefinition: BlockDefinition = {
  type: 'statistics',
  label: 'Статистика',
  category: 'marketing',
  icon: 'BarChart',
  variants: [
    { id: 'four-col', label: '4 колонки' },
  ],
  createDefault: () => ({
    id: `stats-${crypto.randomUUID()}`,
    type: 'statistics',
    variant: 'four-col',
    content: {
      stats: [
        { value: '99.9%', label: { ru: 'Надёжность работы', en: 'Uptime SLA', uz: 'Ishonchlilik' } },
        { value: '150K+', label: { ru: 'Созданных сайтов', en: 'Websites Built', uz: 'Yaratilgan saytlar' } },
        { value: '45+', label: { ru: 'Готовых блоков', en: 'Ready Blocks', uz: 'Tayyor bloklar' } },
        { value: '24/7', label: { ru: 'Поддержка клиентов', en: 'Support', uz: 'Qo‘llab-quvvatlash' } },
      ],
    },
    styles: {},
  }),
  renderer: StatsBlock,
  inspector: { content: [], style: [] },
};
