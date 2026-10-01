import { BlockDefinition } from '@/builder/registry/types';
import { GalleryBlock } from './GalleryBlock';

export const galleryDefinition: BlockDefinition = {
  type: 'gallery',
  label: 'Галерея',
  category: 'media',
  icon: 'Image',
  variants: [
    { id: 'grid', label: 'Сетка 3x2' },
  ],
  createDefault: () => ({
    id: `gallery-${crypto.randomUUID()}`,
    type: 'gallery',
    variant: 'grid',
    content: {
      title: { ru: 'Наши проекты', en: 'Our Projects', uz: 'Bizning loyihalar' },
      subtitle: { ru: 'Примеры выполненных работ для клиентов', en: 'Case studies and works', uz: 'Mijozlar uchun ishlar' },
      images: [
        { title: { ru: 'Мобильный банк', en: 'Mobile Bank' }, category: { ru: 'FinTech', en: 'FinTech' } },
        { title: { ru: 'Интернет-магазин', en: 'E-commerce Store' }, category: { ru: 'Retail', en: 'Retail' } },
        { title: { ru: 'Корпоративный сайт', en: 'Corporate Portal' }, category: { ru: 'B2B', en: 'B2B' } },
        { title: { ru: 'SaaS Платформа', en: 'SaaS Platform' }, category: { ru: 'Tech', en: 'Tech' } },
        { title: { ru: 'Брендинг агентства', en: 'Brand Identity' }, category: { ru: 'Design', en: 'Design' } },
        { title: { ru: 'Дашборд аналитики', en: 'Analytics Dashboard' }, category: { ru: 'Data', en: 'Data' } },
      ],
    },
    styles: {},
  }),
  renderer: GalleryBlock,
  inspector: { content: [], style: [] },
};
