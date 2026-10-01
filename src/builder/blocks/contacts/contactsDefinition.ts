import { BlockDefinition } from '@/builder/registry/types';
import { ContactsBlock } from './ContactsBlock';

export const contactsDefinition: BlockDefinition = {
  type: 'contacts',
  label: 'Контакты',
  category: 'forms',
  icon: 'Mail',
  variants: [
    { id: 'split', label: 'Инфо + Форма' },
  ],
  createDefault: () => ({
    id: `contacts-${crypto.randomUUID()}`,
    type: 'contacts',
    variant: 'split',
    content: {
      title: { ru: 'Свяжитесь с нами', en: 'Get in Touch', uz: 'Biz bilan bog‘laning' },
      subtitle: { ru: 'Оставьте заявку и мы свяжемся с вами в течение 15 минут', en: 'Leave a message and we will respond shortly', uz: '15 daqiqa ichida javob beramiz' },
      email: 'hello@visualbuilder.pro',
      phone: '+7 (495) 123-45-67',
      address: 'Москва, Пресненская наб. 12',
    },
    styles: {},
  }),
  renderer: ContactsBlock,
  inspector: { content: [], style: [] },
};
