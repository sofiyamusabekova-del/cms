import { BlockDefinition } from '@/builder/registry/types';
import { ServicesBlock } from './ServicesBlock';

export const servicesDefinition: BlockDefinition = {
  type: 'services',
  label: 'Услуги (Services)',
  category: 'content',
  icon: 'Layers',
  variants: [
    { id: 'cards', label: 'Карточки услуг' },
    { id: 'minimal', label: 'Минималистичный' },
  ],
  createDefault: () => ({
    id: `services-${crypto.randomUUID()}`,
    type: 'services',
    variant: 'cards',
    content: {
      title: {
        ru: 'Наши популярные услуги',
        en: 'Our Popular Services',
        uz: 'Bizning ommabop xizmatlarimiz',
      },
      subtitle: {
        ru: 'Выберите подходящее решение под задачи вашего бизнеса.',
        en: 'Choose the best solution tailored for your business needs.',
        uz: 'Biznesingiz ehtiyojlariga mos keladigan eng yaxshi yechimni tanlang.',
      },
      services: [
        {
          tag: { ru: 'Старт', en: 'Basic', uz: 'Boshlang‘ich' },
          price: { ru: 'от $290', en: 'from $290', uz: 'dan $290' },
          title: { ru: 'Лендинг пейдж', en: 'Landing Page', uz: 'Lending sahifasi' },
          description: {
            ru: 'Конверсионный одностраничный сайт для запуска продаж товара или услуги.',
            en: 'High-converting single page site to launch your product or service.',
            uz: 'Mahsulot yoki xizmatni sotishni boshlash uchun konversiyali bir sahifali sayt.',
          },
          features: [
            { ru: 'Адаптивный дизайн', en: 'Responsive Design', uz: 'Moslashuvchan dizayn' },
            { ru: 'Базовое SEO', en: 'Basic SEO', uz: 'Asosiy SEO' },
            { ru: 'Форма захвата лидов', en: 'Lead Capture Form', uz: 'Mijoz yig‘ish shakli' },
          ],
        },
        {
          tag: { ru: 'Хит', en: 'Popular', uz: 'Mashhur' },
          price: { ru: 'от $690', en: 'from $690', uz: 'dan $690' },
          title: { ru: 'Корпоративный сайт', en: 'Corporate Website', uz: 'Korporativ sayt' },
          description: {
            ru: 'Многостраничный сайт компании с каталогом, блогом и контактами.',
            en: 'Multi-page corporate presence with catalog, blog and team profiles.',
            uz: 'Katalog, blog va aloqa sahifalariga ega ko‘p sahifali korporativ veb-sayt.',
          },
          features: [
            { ru: 'До 10 страниц', en: 'Up to 10 Pages', uz: '10 tagacha sahifa' },
            { ru: 'Мультиязычность', en: 'Multi-language', uz: 'Ko‘p tillilik' },
            { ru: 'Интеграция аналитики', en: 'Analytics Integration', uz: 'Tahlil integratsiyasi' },
          ],
        },
        {
          tag: { ru: 'Премиум', en: 'Custom', uz: 'Maxsus' },
          price: { ru: 'от $1490', en: 'from $1490', uz: 'dan $1490' },
          title: { ru: 'Индивидуальный проект', en: 'Custom Web Platform', uz: 'Maxsus veb-platforma' },
          description: {
            ru: 'Кастомный дизайн и нестандартная функциональность под ключ.',
            en: 'Bespoke design and custom functionality engineered from scratch.',
            uz: 'Noldan boshlab maxsus dizayn va noan’anaviy funksionallik.',
          },
          features: [
            { ru: 'Уникальный дизайн', en: 'Unique Design', uz: 'Noyob dizayn' },
            { ru: 'Высокая скорость', en: 'Speed Optimization', uz: 'Tezlikni optimallashtirish' },
            { ru: 'Поддержка 24/7', en: 'Priority Support', uz: '24/7 qo‘llab-quvvatlash' },
          ],
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
  renderer: ServicesBlock,
};
