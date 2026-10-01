import { BlockDefinition } from '@/builder/registry/types';
import { TextImageBlock } from './TextImageBlock';

export const textImageDefinition: BlockDefinition = {
  type: 'textImage',
  label: 'Текст + Изображение',
  category: 'content',
  icon: 'LayoutTemplate',
  variants: [
    { id: 'imageRight', label: 'Картинка справа' },
    { id: 'imageLeft', label: 'Картинка слева' },
  ],
  createDefault: () => ({
    id: `textImage-${crypto.randomUUID()}`,
    type: 'textImage',
    variant: 'imageRight',
    content: {
      title: {
        ru: 'Полный контроль над структурой страницы',
        en: 'Complete Control Over Page Structure',
        uz: 'Sahifa tuzilishi ustidan to‘liq nazorat',
      },
      subtitle: {
        ru: 'Создавайте чистый HTML код и кастомизируйте каждый элемент без программирования.',
        en: 'Generate clean HTML and customize every element without coding.',
        uz: 'Toza HTML kod yarating va dasturlashsiz har bir elementni sozlang.',
      },
      bullets: [
        {
          ru: 'Мгновенное переключение между десктопом, планшетом и мобильным',
          en: 'Instant toggle between desktop, tablet, and mobile',
          uz: 'Kompyuter, planshet va telefon rejimlariga tezkor o‘tish',
        },
        {
          ru: 'Автономный экспорт без внешних библиотек и зависимостей',
          en: 'Standalone export without external runtime bloat',
          uz: 'Tashqi kutubxonalarsiz toza mustaqil eksport',
        },
        {
          ru: 'Встроенная мультиязычность контента (RU / EN / UZ)',
          en: 'Built-in content multi-language localization (RU / EN / UZ)',
          uz: 'O‘rnatilgan ko‘p tilli kontent tizimi (RU / EN / UZ)',
        },
      ],
      ctaText: {
        ru: 'Попробовать сейчас',
        en: 'Try It Now',
        uz: 'Hozir sinab ko‘ring',
      },
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
  renderer: TextImageBlock,
};
