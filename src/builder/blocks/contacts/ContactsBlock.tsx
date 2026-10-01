'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { getLocalizedText } from '@/lib/i18n';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactsBlock: React.FC<BlockRendererProps> = ({
  block,
  locale = 'ru',
  breakpoint = 'desktop',
}) => {
  const content = block.content || {};
  const getLoc = (val: unknown): string => getLocalizedText(val, locale);

  const title = getLoc(content.title) || 'Свяжитесь с нами';
  const subtitle = getLoc(content.subtitle) || 'Мы ответим на все вопросы и поможем с выбором решения.';
  const email = getLoc(content.email) || 'support@visualbuilder.pro';
  const phone = getLoc(content.phone) || '+7 (999) 000-11-22';
  const address = getLoc(content.address) || 'Москва, Пресненская наб. 12, офис 405';

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Info */}
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Контакты
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {subtitle}
          </p>

          <div className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <div className="size-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Mail className="size-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium uppercase">Email</div>
                <div className="font-semibold">{email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <div className="size-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Phone className="size-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium uppercase">Телефон</div>
                <div className="font-semibold">{phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <div className="size-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <MapPin className="size-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium uppercase">Адрес</div>
                <div className="font-semibold">{address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
            Оставить заявку
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-medium text-zinc-500 uppercase block mb-1">Имя</label>
              <input
                type="text"
                placeholder="Иван Иванов"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-zinc-500 uppercase block mb-1">Email</label>
              <input
                type="email"
                placeholder="ivan@example.com"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-zinc-500 uppercase block mb-1">Сообщение</label>
              <textarea
                rows={3}
                placeholder="Ваш вопрос или описание задачи..."
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              style={{ backgroundColor: 'var(--color-primary, #4f46e5)' }}
              className="w-full py-2.5 rounded-xl text-white font-semibold text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Send className="size-3.5" /> Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
