import { BlockDefinition } from '@/builder/registry/types';
import { HeroBlock } from './HeroBlock';

export const heroDefinition: BlockDefinition = {
  type: 'hero',
  label: 'Hero',
  category: 'marketing',
  icon: 'Sparkles',
  variants: [
    { id: 'centered', label: 'По центру' },
    { id: 'split', label: 'Разделенный (Split)' },
  ],
  createDefault: () => ({
    id: `hero-${crypto.randomUUID()}`,
    type: 'hero',
    variant: 'centered',
    content: {
      title: {
        ru: 'Создайте великолепный сайт за считанные минуты',
        en: 'Build a stunning website in minutes',
        uz: 'Daqiqalar ichida ajoyib veb-sayt yarating',
      },
      subtitle: {
        ru: 'Визуальный блочный конструктор с адаптивными стилями, мультиязычностью и быстрым статическим экспортом.',
        en: 'Visual block builder with responsive styles, multi-language support and static export.',
        uz: 'Moslashuvchan uslublar, ko‘p tilli qo‘llab-quvvatlash va statik eksportga ega vizual blok konstruktori.',
      },
      primaryButtonText: {
        ru: 'Начать бесплатно',
        en: 'Get Started Free',
        uz: 'Bepul boshlash',
      },
      secondaryButtonText: {
        ru: 'Смотреть демо',
        en: 'Watch Demo',
        uz: 'Demonstratsiyani ko‘rish',
      },
    },
    styles: {
      spacing: {
        padding: {
          desktop: { top: 96, right: 24, bottom: 96, left: 24 },
          tablet: { top: 64, right: 20, bottom: 64, left: 20 },
          mobile: { top: 48, right: 16, bottom: 48, left: 16 },
        },
      },
      typography: {
        fontSize: {
          desktop: 54,
          tablet: 42,
          mobile: 32,
        },
        fontWeight: 800,
        lineHeight: {
          desktop: 1.15,
          tablet: 1.2,
          mobile: 1.25,
        },
        letterSpacing: {
          desktop: -1,
          tablet: -0.5,
          mobile: 0,
        },
        textAlign: {
          desktop: 'center',
          tablet: 'center',
          mobile: 'center',
        },
        color: '#18181b',
      },
    },
  }),
  renderer: HeroBlock,
  inspector: {
    content: [
      { id: 'title', label: 'Заголовок', type: 'text' },
      { id: 'subtitle', label: 'Подзаголовок', type: 'textarea' },
      { id: 'primaryButtonText', label: 'Текст первой кнопки', type: 'text' },
      { id: 'secondaryButtonText', label: 'Текст второй кнопки', type: 'text' },
    ],
    style: [
      { id: 'paddingTop', label: 'Отступ сверху', type: 'slider', min: 0, max: 200, step: 4 },
      { id: 'paddingBottom', label: 'Отступ снизу', type: 'slider', min: 0, max: 200, step: 4 },
    ],
  },
};
