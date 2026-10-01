import { BlockDefinition } from '@/builder/registry/types';
import { ReviewsBlock } from './ReviewsBlock';

export const reviewsDefinition: BlockDefinition = {
  type: 'reviews',
  label: 'Отзывы',
  category: 'social',
  icon: 'Star',
  variants: [
    { id: 'three-cards', label: '3 карточки' },
  ],
  createDefault: () => ({
    id: `reviews-${crypto.randomUUID()}`,
    type: 'reviews',
    variant: 'three-cards',
    content: {
      title: { ru: 'Отзывы клиентов', en: 'Client Reviews', uz: 'Mijozlar fikrlari' },
      subtitle: { ru: 'Что говорят о нас наши постоянные пользователи', en: 'What our happy clients say', uz: 'Foydalanuvchilarimiz biz haqimizda' },
    },
    styles: {},
  }),
  renderer: ReviewsBlock,
  inspector: { content: [], style: [] },
};
