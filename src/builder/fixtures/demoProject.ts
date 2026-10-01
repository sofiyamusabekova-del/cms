import { SiteProject } from '@/types';

export const demoProject: SiteProject = {
  id: 'demo-project-1',
  name: 'Мой первый сайт',
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'uz'],
  globalStyles: {
    colors: {
      primary: '#4f46e5',
      secondary: '#9333ea',
      text: '#0f172a',
      background: '#ffffff',
    },
    typography: {
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 16,
    },
    containerMaxWidth: 1200,
  },
  translations: {
    getStarted: {
      ru: 'Начать работу',
      en: 'Get Started',
      uz: 'Boshlash',
    },
    learnMore: {
      ru: 'Узнать больше',
      en: 'Learn More',
      uz: 'Batafsil',
    },
  },
  pages: [
    {
      id: 'page-home',
      title: 'Главная страница',
      slug: '',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: {
          ru: 'Главная | Мой сайт',
          en: 'Home | My Site',
          uz: 'Bosh sahifa | Mening saytim',
        },
        description: {
          ru: 'Современный визуальный конструктор сайтов',
          en: 'Modern visual site builder',
          uz: 'Zamonaviy vizual sayt konstruktori',
        },
      },
      blocks: [
        {
          id: 'block-hero-1',
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
                desktop: { top: 80, right: 24, bottom: 80, left: 24 },
                tablet: { top: 48, right: 20, bottom: 48, left: 20 },
                mobile: { top: 20, right: 16, bottom: 20, left: 16 },
              },
              gap: {
                desktop: 24,
                tablet: 20,
                mobile: 12,
              },
            },
            sizing: {
              maxWidth: {
                desktop: 1200,
                tablet: 720,
                mobile: 375,
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
        },
      ],
    },
  ],
};
