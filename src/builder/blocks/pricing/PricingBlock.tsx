'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Check, Sparkles } from 'lucide-react';

export const PricingBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Тарифные планы';
  const subtitle = getLoc(content.subtitle) || 'Выберите оптимальный вариант для ваших задач.';
  const plans = Array.isArray(content.plans) ? content.plans : [
    {
      name: { ru: 'Старт', en: 'Starter' },
      price: '$0',
      period: { ru: '/ навсегда', en: '/ forever' },
      description: { ru: 'Для личных проектов и тестирования', en: 'For personal projects & testing' },
      features: [
        { ru: 'До 3 страниц', en: 'Up to 3 pages' },
        { ru: 'Базовые блоки', en: 'Basic blocks' },
        { ru: 'Экспорт HTML/CSS', en: 'HTML/CSS export' },
      ],
      popular: false,
      buttonText: { ru: 'Начать бесплатно', en: 'Start Free' },
    },
    {
      name: { ru: 'Про', en: 'Pro' },
      price: '$19',
      period: { ru: '/ месяц', en: '/ month' },
      description: { ru: 'Для бизнеса и фрилансеров', en: 'For businesses & freelancers' },
      features: [
        { ru: 'Неограниченно страниц', en: 'Unlimited pages' },
        { ru: 'Все 13+ типов блоков', en: 'All 13+ block types' },
        { ru: 'Мультиязычность и SEO', en: 'Multi-language & SEO' },
        { ru: 'Приоритетная поддержка', en: 'Priority support' },
      ],
      popular: true,
      buttonText: { ru: 'Выбрать Pro', en: 'Choose Pro' },
    },
    {
      name: { ru: 'Агентство', en: 'Agency' },
      price: '$49',
      period: { ru: '/ месяц', en: '/ month' },
      description: { ru: 'Для команд и агентств', en: 'For teams & agencies' },
      features: [
        { ru: 'Всё из тарифа Pro', en: 'Everything in Pro' },
        { ru: 'Командная работа', en: 'Team collaboration' },
        { ru: 'White-label экспорт', en: 'White-label export' },
        { ru: 'Индивидуальные шаблоны', en: 'Custom templates' },
      ],
      popular: false,
      buttonText: { ru: 'Связаться с нами', en: 'Contact Sales' },
    },
  ];

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 72,
    right: 24,
    bottom: 72,
    left: 24,
  };

  const paddingStyle = {
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
  };

  return (
    <section style={paddingStyle} className="w-full bg-white dark:bg-zinc-950 transition-all">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Тарифы
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan: any, idx: number) => {
            const isPopular = plan.popular;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'bg-zinc-900 text-white shadow-2xl ring-2 ring-indigo-500 scale-105 z-10'
                    : 'bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="size-3" /> Популярный
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold mb-1">{getLoc(plan.name)}</h3>
                  <p className={`text-xs mb-6 ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {getLoc(plan.description)}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className={`text-xs ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {getLoc(plan.period)}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs">
                    {plan.features?.map((f: any, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className={`size-4 shrink-0 ${isPopular ? 'text-indigo-400' : 'text-emerald-500'}`} />
                        <span>{getLoc(f)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  style={isPopular ? { backgroundColor: 'var(--color-primary, #4f46e5)' } : undefined}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all ${
                    isPopular
                      ? 'text-white hover:opacity-90 shadow-lg'
                      : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100'
                  }`}
                >
                  {getLoc(plan.buttonText)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
