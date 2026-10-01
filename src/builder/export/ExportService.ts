import JSZip from 'jszip';
import { SiteProject, Page, PageBlock } from '@/types';
import { getLocalizedText } from '@/lib/i18n';
import { generateGlobalCssVariables } from '@/lib/globalStyles';

export class ExportService {
  /**
   * Generates clean HTML for a block based on its type and content
   */
  static renderBlockToHtml(block: PageBlock, locale: string = 'ru'): string {
    if (block.hidden) return '';
    const content = block.content || {};
    const getLoc = (val: unknown) => getLocalizedText(val, locale);

    switch (block.type) {
      case 'hero': {
        const title = getLoc(content.title) || 'Заголовок секции Hero';
        const subtitle = getLoc(content.subtitle) || '';
        const btn1 = getLoc(content.primaryButtonText);
        const btn2 = getLoc(content.secondaryButtonText);
        return `
    <section class="section hero-section ${block.variant === 'split' ? 'hero-split' : 'hero-centered'}">
      <div class="container">
        <span class="badge">Visual Site Builder</span>
        <h1 class="hero-title">${title}</h1>
        ${subtitle ? `<p class="hero-subtitle">${subtitle}</p>` : ''}
        <div class="hero-buttons">
          ${btn1 ? `<a href="#cta" class="btn btn-primary">${btn1} &rarr;</a>` : ''}
          ${btn2 ? `<a href="#services" class="btn btn-outline">${btn2}</a>` : ''}
        </div>
      </div>
    </section>`;
      }

      case 'features': {
        const title = getLoc(content.title) || 'Преимущества';
        const subtitle = getLoc(content.subtitle) || '';
        const items = Array.isArray(content.items) ? content.items : [];
        return `
    <section class="section features-section" id="features">
      <div class="container">
        <div class="section-header">
          <span class="badge">Особенности</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-3">
          ${items
            .map(
              (it: any) => `
            <div class="card feature-card">
              <div class="icon-box">&#9733;</div>
              <h3>${getLoc(it.title)}</h3>
              <p>${getLoc(it.description)}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'services': {
        const title = getLoc(content.title) || 'Наши услуги';
        const subtitle = getLoc(content.subtitle) || '';
        const services = Array.isArray(content.services) ? content.services : [];
        return `
    <section class="section services-section" id="services">
      <div class="container">
        <div class="section-header">
          <span class="badge">Услуги</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-3">
          ${services
            .map(
              (s: any) => `
            <div class="card service-card">
              ${s.tag ? `<span class="badge">${getLoc(s.tag)}</span>` : ''}
              ${s.price ? `<div class="price">${getLoc(s.price)}</div>` : ''}
              <h3>${getLoc(s.title)}</h3>
              <p>${getLoc(s.description)}</p>
              <a href="#contacts" class="btn btn-outline btn-sm">Заказать услугу &rarr;</a>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'textImage': {
        const title = getLoc(content.title) || 'О нашем решении';
        const subtitle = getLoc(content.subtitle) || '';
        const bullets = Array.isArray(content.bullets) ? content.bullets : [];
        const ctaText = getLoc(content.ctaText) || 'Узнать больше';
        return `
    <section class="section text-image-section">
      <div class="container grid grid-2">
        <div class="text-col">
          <span class="badge">О платформе</span>
          <h2>${title}</h2>
          <p>${subtitle}</p>
          ${
            bullets.length
              ? `<ul class="bullet-list">
            ${bullets.map((b: any) => `<li>&#10003; ${getLoc(b)}</li>`).join('')}
          </ul>`
              : ''
          }
          ${ctaText ? `<a href="#contacts" class="btn btn-primary">${ctaText}</a>` : ''}
        </div>
        <div class="media-col">
          <div class="mockup-box">
            <div class="mockup-content">&#10004; Live Visual Experience</div>
          </div>
        </div>
      </div>
    </section>`;
      }

      case 'statistics': {
        const stats = Array.isArray(content.stats) ? content.stats : [];
        return `
    <section class="section stats-section">
      <div class="container grid grid-4">
        ${stats
          .map(
            (st: any) => `
          <div class="stat-item">
            <div class="stat-val">${st.value}</div>
            <div class="stat-label">${getLoc(st.label)}</div>
          </div>`
          )
          .join('')}
      </div>
    </section>`;
      }

      case 'gallery': {
        const title = getLoc(content.title) || 'Галерея проектов';
        const subtitle = getLoc(content.subtitle) || '';
        const images = Array.isArray(content.images) ? content.images : [];
        return `
    <section class="section gallery-section" id="gallery">
      <div class="container">
        <div class="section-header">
          <span class="badge">Галерея</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-3">
          ${images
            .map(
              (img: any) => `
            <div class="card gallery-item">
              <div class="gallery-placeholder">&#128444;</div>
              <div class="gallery-info">
                <h4>${getLoc(img.title)}</h4>
                <span class="cat">${getLoc(img.category)}</span>
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'pricing': {
        const title = getLoc(content.title) || 'Тарифные планы';
        const subtitle = getLoc(content.subtitle) || '';
        const plans = Array.isArray(content.plans) ? content.plans : [];
        return `
    <section class="section pricing-section" id="pricing">
      <div class="container">
        <div class="section-header">
          <span class="badge">Тарифы</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-3">
          ${plans
            .map(
              (p: any) => `
            <div class="card pricing-card ${p.popular ? 'popular' : ''}">
              ${p.popular ? `<span class="badge badge-popular">&#9733; Популярный</span>` : ''}
              <h3>${getLoc(p.name)}</h3>
              <div class="price-val">${p.price} <span>${getLoc(p.period)}</span></div>
              <p>${getLoc(p.description)}</p>
              <a href="#contacts" class="btn ${p.popular ? 'btn-primary' : 'btn-outline'} w-100">${getLoc(p.buttonText) || 'Выбрать'}</a>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'team': {
        const title = getLoc(content.title) || 'Команда';
        const subtitle = getLoc(content.subtitle) || '';
        const members = Array.isArray(content.members) ? content.members : [];
        return `
    <section class="section team-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Команда</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-4">
          ${members
            .map(
              (m: any) => `
            <div class="card team-card">
              <div class="avatar">&#128100;</div>
              <h4>${m.name}</h4>
              <div class="role">${getLoc(m.role)}</div>
              <p>${getLoc(m.bio)}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'reviews': {
        const title = getLoc(content.title) || 'Отзывы клиентов';
        const subtitle = getLoc(content.subtitle) || '';
        const reviews = Array.isArray(content.reviews) ? content.reviews : [];
        return `
    <section class="section reviews-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Отзывы</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="grid grid-3">
          ${reviews
            .map(
              (r: any) => `
            <div class="card review-card">
              <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p class="quote">&ldquo;${getLoc(r.text)}&rdquo;</p>
              <div class="author">
                <strong>${r.author}</strong>
                <span>${r.company}</span>
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'faq': {
        const title = getLoc(content.title) || 'FAQ';
        const subtitle = getLoc(content.subtitle) || '';
        const items = Array.isArray(content.items) ? content.items : [];
        return `
    <section class="section faq-section" id="faq">
      <div class="container max-w-narrow">
        <div class="section-header">
          <span class="badge">FAQ</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="faq-list">
          ${items
            .map(
              (f: any) => `
            <details class="faq-item">
              <summary>${getLoc(f.q)}</summary>
              <p>${getLoc(f.a)}</p>
            </details>`
            )
            .join('')}
        </div>
      </div>
    </section>`;
      }

      case 'cta': {
        const title = getLoc(content.title) || 'Готовы запустить сайт?';
        const subtitle = getLoc(content.subtitle) || '';
        const btn1 = getLoc(content.primaryButtonText) || 'Начать';
        const guarantee = getLoc(content.guaranteeText);
        return `
    <section class="section cta-section" id="cta">
      <div class="container">
        <div class="cta-banner">
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
          <div class="cta-actions">
            <a href="#contacts" class="btn btn-white">${btn1} &rarr;</a>
          </div>
          ${guarantee ? `<div class="guarantee">&#10003; ${guarantee}</div>` : ''}
        </div>
      </div>
    </section>`;
      }

      case 'contacts': {
        const title = getLoc(content.title) || 'Свяжитесь с нами';
        const subtitle = getLoc(content.subtitle) || '';
        const email = getLoc(content.email) || 'support@visualbuilder.pro';
        const phone = getLoc(content.phone) || '+7 (495) 123-45-67';
        const address = getLoc(content.address) || 'Москва, Пресненская наб. 12';
        return `
    <section class="section contacts-section" id="contacts">
      <div class="container grid grid-2">
        <div class="contacts-info">
          <span class="badge">Контакты</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
          <div class="contacts-details">
            <div class="detail-row"><strong>Email:</strong> ${email}</div>
            <div class="detail-row"><strong>Телефон:</strong> ${phone}</div>
            <div class="detail-row"><strong>Адрес:</strong> ${address}</div>
          </div>
        </div>
        <div class="contacts-form-box">
          <form class="card" onsubmit="event.preventDefault(); alert('Спасибо! Ваша заявка успешно отправлена.');">
            <h3>Оставить заявку</h3>
            <div class="form-group">
              <label>Имя</label>
              <input type="text" required placeholder="Ваше имя" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" required placeholder="name@example.com" />
            </div>
            <div class="form-group">
              <label>Сообщение</label>
              <textarea rows="3" placeholder="Опишите задачу..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Отправить заявку &rarr;</button>
          </form>
        </div>
      </div>
    </section>`;
      }

      case 'footer': {
        const brand = getLoc(content.brandName) || 'Visual Site Builder';
        const tagline = getLoc(content.tagline) || '';
        const copyright = getLoc(content.copyright) || `© ${new Date().getFullYear()} ${brand}`;
        return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <h3>${brand}</h3>
            ${tagline ? `<p>${tagline}</p>` : ''}
          </div>
          <div class="footer-links">
            <a href="#features">Особенности</a>
            <a href="#services">Услуги</a>
            <a href="#pricing">Тарифы</a>
            <a href="#contacts">Контакты</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>${copyright}</p>
          <span>Сгенерировано в Visual Site Builder</span>
        </div>
      </div>
    </footer>`;
      }

      default:
        return `<section class="section"><div class="container"><p>Блок: ${block.type}</p></div></section>`;
    }
  }

  /**
   * Generates production-ready standalone CSS bundle
   */
  static generateCss(project: SiteProject): string {
    const cssVars = generateGlobalCssVariables(project.globalStyles);
    return `
/* Visual Site Builder Global Theme Tokens */
${cssVars}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-body, system-ui, -apple-system, sans-serif);
  color: var(--color-text, #0f172a);
  background-color: var(--color-bg, #ffffff);
}

body {
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, inherit);
  font-weight: 700;
  line-height: 1.25;
  color: inherit;
}

.container {
  max-width: var(--container-max-width, 1200px);
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.container.max-w-narrow {
  max-width: 800px;
}

.section {
  padding-top: 80px;
  padding-bottom: 80px;
}

.section-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 50px auto;
}

.section-header h2 {
  font-size: 2.25rem;
  margin-top: 8px;
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 12px;
  border-radius: 9999px;
  color: var(--color-primary, #4f46e5);
  background: color-mix(in srgb, var(--color-primary, #4f46e5) 12%, transparent);
}

.badge.badge-popular {
  background: #ffffff;
  color: #0f172a;
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 12px);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: var(--radius-md, 8px);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-primary {
  background-color: var(--color-primary, #4f46e5);
  color: #ffffff;
}

.btn-primary:hover {
  opacity: 0.92;
}

.btn-outline {
  border-color: #cbd5e1;
  color: #0f172a;
  background: transparent;
}

.btn-outline:hover {
  background: #f8fafc;
}

.btn-white {
  background: #ffffff;
  color: #0f172a;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 12px;
}

.w-100 {
  width: 100%;
}

/* Nav Header */
.site-nav {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 0;
  z-index: 100;
}

.site-nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-nav .logo {
  font-weight: 800;
  font-size: 18px;
  color: var(--color-primary, #4f46e5);
  text-decoration: none;
}

.site-nav .links {
  display: flex;
  gap: 20px;
}

.site-nav .links a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.site-nav .links a:hover {
  color: var(--color-primary, #4f46e5);
}

/* Hero Section */
.hero-section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.hero-centered {
  text-align: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.02em;
  margin: 16px 0;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #64748b;
  max-width: 640px;
  margin: 0 auto 32px auto;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* Mockup */
.mockup-box {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(147, 51, 234, 0.15));
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg, 16px);
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--color-primary, #4f46e5);
}

/* Stats */
.stats-section {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding-top: 48px;
  padding-bottom: 48px;
}

.stat-item {
  text-align: center;
}

.stat-val {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary, #4f46e5);
}

.stat-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

/* Pricing */
.pricing-card.popular {
  background: #0f172a;
  color: #ffffff;
  transform: scale(1.03);
}

.price-val {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 16px 0;
}

.price-val span {
  font-size: 0.85rem;
  font-weight: 400;
  color: #94a3b8;
}

/* CTA */
.cta-banner {
  background: linear-gradient(135deg, var(--color-primary, #4f46e5), var(--color-secondary, #9333ea));
  color: #ffffff;
  padding: 64px 32px;
  border-radius: var(--radius-lg, 24px);
  text-align: center;
}

.cta-banner h2 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.cta-actions {
  margin-top: 24px;
}

/* FAQ */
.faq-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md, 8px);
  margin-bottom: 12px;
  padding: 16px 20px;
  cursor: pointer;
}

.faq-item summary {
  font-weight: 600;
  outline: none;
}

.faq-item p {
  margin-top: 12px;
  color: #64748b;
  font-size: 0.95rem;
}

/* Forms */
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-md, 8px);
  font-size: 14px;
  outline: none;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: var(--color-primary, #4f46e5);
}

/* Footer */
.site-footer {
  background: #0f172a;
  color: #94a3b8;
  padding-top: 60px;
  padding-bottom: 30px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #1e293b;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-brand h3 {
  color: #ffffff;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  margin-left: 20px;
  font-size: 14px;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  font-size: 12px;
}
    `.trim();
  }

  /**
   * Generates a full single HTML page
   */
  static generatePageHtml(
    project: SiteProject,
    page: Page,
    locale: string = 'ru',
    isRoot: boolean = false
  ): string {
    const cssPath = isRoot ? 'styles.css' : '../styles.css';
    const seoTitle = getLocalizedText(page.seo?.title || page.title, locale);
    const seoDesc = getLocalizedText(page.seo?.description, locale);
    const canonical = page.seo?.canonical || '';
    const ogTitle = getLocalizedText(page.seo?.ogTitle || page.title, locale);
    const ogDesc = getLocalizedText(page.seo?.ogDescription, locale);
    const ogImage = page.seo?.ogImage || '';
    const noIndex = page.seo?.noIndex ? '<meta name="robots" content="noindex, nofollow" />' : '';

    const blocksHtml = page.blocks.map((b) => this.renderBlockToHtml(b, locale)).join('\n');

    // Navigation bar with project pages
    const navLinks = project.pages
      .map((p) => {
        const pSlug = p.slug ? (isRoot ? `${p.slug}/index.html` : `../${p.slug}/index.html`) : (isRoot ? 'index.html' : '../index.html');
        return `<a href="${pSlug}">${p.title}</a>`;
      })
      .join('\n        ');

    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${seoTitle}</title>
  ${seoDesc ? `<meta name="description" content="${seoDesc}" />` : ''}
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}
  ${noIndex}
  
  <!-- OpenGraph Meta (Sprint 22.3) -->
  <meta property="og:title" content="${ogTitle}" />
  ${ogDesc ? `<meta property="og:description" content="${ogDesc}" />` : ''}
  ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
  <meta property="og:type" content="website" />

  <link rel="stylesheet" href="${cssPath}" />
</head>
<body>
  <header class="site-nav">
    <div class="container">
      <a href="${isRoot ? 'index.html' : '../index.html'}" class="logo">${project.name}</a>
      <nav class="links">
        ${navLinks}
      </nav>
    </div>
  </header>

  <main>
${blocksHtml}
  </main>
</body>
</html>`;
  }

  /**
   * Generates sitemap.xml
   */
  static generateSitemapXml(project: SiteProject, baseUrl: string = 'https://mysite.com'): string {
    const urls = project.pages
      .map((p) => {
        const path = p.slug ? `/${p.slug}` : '';
        return `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.slug === '' ? '1.0' : '0.8'}</priority>
  </url>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  /**
   * Generates robots.txt
   */
  static generateRobotsTxt(baseUrl: string = 'https://mysite.com'): string {
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  }

  /**
   * Builds the complete multi-page ZIP bundle with SEO files and triggers browser download
   */
  static async exportProjectZip(project: SiteProject, locale: string = 'ru'): Promise<Blob> {
    const zip = new JSZip();

    // 1. styles.css
    const css = this.generateCss(project);
    zip.file('styles.css', css);

    // 2. robots.txt and sitemap.xml
    zip.file('robots.txt', this.generateRobotsTxt());
    zip.file('sitemap.xml', this.generateSitemapXml(project));

    // 3. Pages: Home -> index.html, Others -> slug/index.html
    const homePage = project.pages.find((p) => !p.slug || p.slug === 'home') || project.pages[0];

    if (homePage) {
      const homeHtml = this.generatePageHtml(project, homePage, locale, true);
      zip.file('index.html', homeHtml);
    }

    for (const page of project.pages) {
      if (page.id === homePage?.id) continue;
      const slug = page.slug || page.id;
      const pageHtml = this.generatePageHtml(project, page, locale, false);
      zip.file(`${slug}/index.html`, pageHtml);
    }

    // 4. Generate Blob
    return await zip.generateAsync({ type: 'blob' });
  }

  /**
   * Downloads a Blob in browser
   */
  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
