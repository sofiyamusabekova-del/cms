import { z } from 'zod';

export const BreakpointSchema = z.enum(['desktop', 'tablet', 'mobile']);

export const LocalizedTextSchema = z.record(z.string(), z.string());

export const ResponsiveValueSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.object({
    desktop: valueSchema.optional(),
    tablet: valueSchema.optional(),
    mobile: valueSchema.optional(),
  });

export const SpacingValueSchema = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

export const BlockStylesSchema = z.object({
  spacing: z
    .object({
      padding: ResponsiveValueSchema(SpacingValueSchema).optional(),
      margin: ResponsiveValueSchema(SpacingValueSchema).optional(),
      gap: ResponsiveValueSchema(z.number()).optional(),
    })
    .optional(),

  sizing: z
    .object({
      width: ResponsiveValueSchema(z.union([z.number(), z.string()])).optional(),
      maxWidth: ResponsiveValueSchema(z.union([z.number(), z.string()])).optional(),
      minHeight: ResponsiveValueSchema(z.union([z.number(), z.string()])).optional(),
    })
    .optional(),

  background: z
    .object({
      type: z.enum(['color', 'gradient', 'image']).optional(),
      color: z.string().optional(),
      value: z.string().optional(),
      imageUrl: z.string().optional(),
      overlay: z.string().optional(),
    })
    .optional(),

  border: z
    .object({
      width: z.number().optional(),
      style: z.enum(['solid', 'dashed', 'dotted', 'none']).optional(),
      color: z.string().optional(),
      radius: ResponsiveValueSchema(z.number()).optional(),
    })
    .optional(),

  typography: z
    .object({
      fontFamily: z.string().optional(),
      fontSize: ResponsiveValueSchema(z.number()).optional(),
      fontWeight: z.number().optional(),
      lineHeight: ResponsiveValueSchema(z.number()).optional(),
      letterSpacing: ResponsiveValueSchema(z.number()).optional(),
      textAlign: ResponsiveValueSchema(z.enum(['left', 'center', 'right', 'justify'])).optional(),
      color: z.string().optional(),
    })
    .optional(),

  layout: z
    .object({
      display: z.enum(['block', 'flex', 'grid']).optional(),
      columns: ResponsiveValueSchema(z.number()).optional(),
      direction: ResponsiveValueSchema(z.enum(['row', 'column'])).optional(),
      alignItems: z.string().optional(),
      justifyContent: z.string().optional(),
    })
    .optional(),
});

export const PageBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  variant: z.string().default('default'),
  content: z.record(z.string(), z.unknown()).default({}),
  styles: BlockStylesSchema.default({}),
  hidden: z.boolean().optional(),
});

export const PageSEOSchema = z.object({
  title: LocalizedTextSchema.optional(),
  description: LocalizedTextSchema.optional(),
  canonical: z.string().optional(),
  ogTitle: LocalizedTextSchema.optional(),
  ogDescription: LocalizedTextSchema.optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
});

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'published']).default('draft'),
  blocks: z.array(PageBlockSchema).default([]),
  seo: PageSEOSchema.default({}),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

export const ArticleBlockSchema = z.object({
  id: z.string(),
  type: z.enum(['paragraph', 'heading', 'image', 'quote', 'list', 'code']),
  content: z.object({
    text: LocalizedTextSchema.optional(),
    level: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
    url: z.string().optional(),
    caption: LocalizedTextSchema.optional(),
    author: LocalizedTextSchema.optional(),
    items: z.array(LocalizedTextSchema).optional(),
    language: z.string().optional(),
  }),
});

export const PostCategorySchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  slug: z.string(),
});

export const PostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: LocalizedTextSchema,
  excerpt: LocalizedTextSchema,
  cover: z.string().optional(),
  categoryId: z.string().optional(),
  blocks: z.array(ArticleBlockSchema).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  publishedAt: z.string().optional(),
  seo: PageSEOSchema.default({}),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

export const MediaAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  alt: LocalizedTextSchema,
  size: z.number().optional(),
  type: z.enum(['image', 'video', 'document']).default('image'),
  createdAt: z.string().default(() => new Date().toISOString()),
});

export const MenuItemSchema = z.object({
  id: z.string(),
  label: LocalizedTextSchema,
  type: z.enum(['page', 'external']),
  pageId: z.string().optional(),
  url: z.string().optional(),
  target: z.enum(['_self', '_blank']).optional(),
});

export const MenuSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.enum(['header', 'footer', 'custom']),
  items: z.array(MenuItemSchema).default([]),
});

export const GlobalStylesSchema = z.object({
  colors: z.object({
    primary: z.string().default('#4f46e5'),
    secondary: z.string().default('#9333ea'),
    text: z.string().default('#0f172a'),
    background: z.string().default('#ffffff'),
  }),
  typography: z.object({
    headingFont: z.string().default('Inter, sans-serif'),
    bodyFont: z.string().default('Inter, sans-serif'),
  }),
  radius: z.object({
    sm: z.number().default(4),
    md: z.number().default(8),
    lg: z.number().default(16),
  }),
  containerMaxWidth: z.number().default(1200),
});

export const SiteProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  defaultLocale: z.string().default('ru'),
  locales: z.array(z.string()).default(['ru', 'en', 'uz']),
  pages: z.array(PageSchema).default([]),
  posts: z.array(PostSchema).optional().default([]),
  categories: z.array(PostCategorySchema).optional().default([]),
  mediaAssets: z.array(MediaAssetSchema).optional().default([]),
  menus: z.array(MenuSchema).optional().default([]),
  globalStyles: GlobalStylesSchema,
  translations: z.record(z.string(), LocalizedTextSchema).default({}),
});
