import { BlockDefinition } from '@/builder/registry/types';
import { FeaturesBlock } from './FeaturesBlock';

export const featuresDefinition: BlockDefinition = {
  type: 'features',
  label: 'Преимущества (Features)',
  category: 'marketing',
  icon: 'Zap',
  variants: [
    { id: 'grid', label: 'Сетка 3 колонки' },
    { id: 'cards', label: 'Карточки' },
  ],
  createDefault: () => ({
    id: `features-${crypto.randomUUID()}`,
    type: 'features',
    variant: 'grid',
    content: {
      title: {
        ru: 'Почему выбирают наш конструктор',
        en: 'Why Choose Our Builder',
        uz: 'Nima uchun bizning konstruktorni tanlashadi',
      },
      subtitle: {
        ru: 'Всё необходимое для разработки современных сайтов в одном инструменте.',
        en: 'Everything you need to develop modern sites in one tool.',
        uz: 'Zamonaviy saytlarni yaratish uchun barcha vositalar bir joyda.',
      },
      items: [
        {
          icon: 'zap',
          title: { ru: 'Быстрая сборка', en: 'Fast Assembly', uz: 'Tezkor yig‘ish' },
          description: {
            ru: 'Добавляйте секции одним кликом и настраивайте порядок перетаскиванием.',
            en: 'Add sections with one click and reorder with drag and drop.',
            uz: 'Bo‘limlarni bir bosish bilan qo‘shing va tartibini o‘zgartiring.',
          },
        },
        {
          icon: 'smartphone',
          title: { ru: '100% Адаптивность', en: '100% Responsive', uz: '100% Moslashuvchan' },
          description: {
            ru: 'Идеальное отображение на смартфонах, планшетах и компьютерах.',
            en: 'Pixel-perfect display on mobile, tablet, and desktop screens.',
            uz: 'Smartfonlar, planshetlar va kompyuterlarda ajoyib ko‘rinish.',
          },
        },
        {
          icon: 'shield',
          title: { ru: 'Чистый экспорт', en: 'Clean Export', uz: 'Toza eksport' },
          description: {
            ru: 'Скачивайте автономный статический архив без скрытых скриптов.',
            en: 'Download standalone static files without bloated vendor scripts.',
            uz: 'Ortiqcha skriptlarsiz toza statik arxivni yuklab oling.',
          },
        },
      ],
    },
    styles: {
      spacing: {
        padding: {
          desktop: { top: 72, right: 24, bottom: 72, left: 24 },
          tablet: { top: 56, right: 20, bottom: 56, left: 20 },
          mobile: { top: 40, right: 16, bottom: 40, left: 16 },
        },
      },
    },
  }),
  renderer: FeaturesBlock,
};
