import { PageTemplate } from '@/types';
import { createBlock } from '@/builder/registry/blockRegistry';
import '@/builder/registry/init';

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'landing-modern',
    name: 'Лендинг продукта (Landing)',
    description: 'Готовый конверсионный лендинг: Hero, Особенности, Статистика, Отзывы, Тарифы, CTA и Подвал.',
    category: 'landing',
    blocks: [
      createBlock('hero', 'centered'),
      createBlock('features', 'default'),
      createBlock('statistics', 'four-col'),
      createBlock('reviews', 'three-cards'),
      createBlock('pricing', 'three-cards'),
      createBlock('cta', 'default'),
      createBlock('footer', 'columns'),
    ],
  },
  {
    id: 'corporate-site',
    name: 'Корпоративный сайт (Corporate)',
    description: 'Презентация компании: Hero split, О нас, Услуги, Команда, FAQ и Контакты.',
    category: 'corporate',
    blocks: [
      createBlock('hero', 'split'),
      createBlock('textImage', 'imageRight'),
      createBlock('services', 'default'),
      createBlock('team', 'grid'),
      createBlock('faq', 'accordion'),
      createBlock('contacts', 'split'),
      createBlock('footer', 'columns'),
    ],
  },
  {
    id: 'services-page',
    name: 'Страница услуг (Services)',
    description: 'Фокус на решениях: Hero, Каталог услуг, Преимущества, Тарифы и Форма заявки.',
    category: 'services',
    blocks: [
      createBlock('hero', 'centered'),
      createBlock('services', 'default'),
      createBlock('features', 'default'),
      createBlock('pricing', 'three-cards'),
      createBlock('contacts', 'split'),
      createBlock('footer', 'columns'),
    ],
  },
  {
    id: 'about-page',
    name: 'О компании (About Us)',
    description: 'История бренда: Текст + Фото, Статистика компании, Команда и Отзывы.',
    category: 'about',
    blocks: [
      createBlock('hero', 'split'),
      createBlock('textImage', 'imageLeft'),
      createBlock('statistics', 'four-col'),
      createBlock('team', 'grid'),
      createBlock('reviews', 'three-cards'),
      createBlock('footer', 'columns'),
    ],
  },
  {
    id: 'contacts-page',
    name: 'Контакты и локация (Contacts)',
    description: 'Информационная секция: Контактные данные, Форма обратной связи, FAQ и Подвал.',
    category: 'contacts',
    blocks: [
      createBlock('hero', 'centered'),
      createBlock('contacts', 'split'),
      createBlock('faq', 'accordion'),
      createBlock('footer', 'columns'),
    ],
  },
];
