import { BlockDefinition } from '@/builder/registry/types';
import { CtaBlock } from './CtaBlock';

export const ctaDefinition: BlockDefinition = {
  type: 'cta',
  label: 'Призыв к действию (CTA)',
  category: 'marketing',
  icon: 'Sparkles',
  variants: [
    { id: 'centered', label: 'По центру' },
    { id: 'split', label: 'Разделенный' },
  ],
  createDefault: () => ({
    id: `cta-${crypto.randomUUID()}`,
    type: 'cta',
    variant: 'centered',
    content: {
      title: {
        ru: 'Готовы запустить свой сайт сегодня?',
        en: 'Ready to Launch Your Site Today?',
        uz: 'Bugun saytingizni ishga tushirishga tayyormisiz?',
      },
      subtitle: {
        ru: 'Присоединяйтесь к тысячам пользователей, создающих сайты без головной боли.',
        en: 'Join thousands of users building beautiful sites effortlessly.',
        uz: 'Bosh og‘rig‘isiz ajoyib saytlar yaratayotgan minglab foydalanuvchilarga qo‘shiling.',
      },
      primaryButtonText: {
        ru: 'Создать сайт сейчас',
        en: 'Create Site Now',
        uz: 'Saytni hoziroq yaratish',
      },
      secondaryButtonText: {
        ru: 'Смотреть шаблоны',
        en: 'Browse Templates',
        uz: 'Shablonlarni ko‘rish',
      },
      guaranteeText: {
        ru: 'Без привязки карты • Мгновенный доступ',
        en: 'No credit card required • Instant access',
        uz: 'Karta talab qilinmaydi • Tezkor kirish',
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
  renderer: CtaBlock,
};
