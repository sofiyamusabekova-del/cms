export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export type LocalizedText = Record<string, string>;

export type ResponsiveValue<T> = {
  desktop?: T;
  tablet?: T;
  mobile?: T;
};

export type SpacingValue = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type BlockId = string;

export interface BlockStyles {
  spacing?: {
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    gap?: ResponsiveValue<number>;
  };

  sizing?: {
    width?: ResponsiveValue<number | string>;
    maxWidth?: ResponsiveValue<number | string>;
    minHeight?: ResponsiveValue<number | string>;
  };

  background?: {
    type?: 'color' | 'gradient' | 'image';
    color?: string;
    value?: string;
    imageUrl?: string;
    overlay?: string;
  };

  border?: {
    width?: number;
    style?: 'solid' | 'dashed' | 'dotted' | 'none';
    color?: string;
    radius?: ResponsiveValue<number>;
  };

  typography?: {
    fontFamily?: string;
    fontSize?: ResponsiveValue<number>;
    fontWeight?: number;
    lineHeight?: ResponsiveValue<number>;
    letterSpacing?: ResponsiveValue<number>;
    textAlign?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>;
    color?: string;
  };

  layout?: {
    display?: 'block' | 'flex' | 'grid';
    columns?: ResponsiveValue<number>;
    direction?: ResponsiveValue<'row' | 'column'>;
    alignItems?: string;
    justifyContent?: string;
  };
}

export interface PageBlock {
  id: BlockId;
  type: string;
  variant: string;
  content: Record<string, unknown>;
  styles: BlockStyles;
  hidden?: boolean;
}

export interface PageSEO {
  title?: LocalizedText;
  description?: LocalizedText;
  canonical?: string;
  ogTitle?: LocalizedText;
  ogDescription?: LocalizedText;
  ogImage?: string;
  noIndex?: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  blocks: PageBlock[];
  seo: PageSEO;
  createdAt: string;
  updatedAt: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'corporate' | 'services' | 'about' | 'contacts' | 'blog';
  thumbnail?: string;
  blocks: Omit<PageBlock, 'id'>[];
}

// Article / Blog Post types (Sprint 19.1, 19.2)
export type ArticleBlockType = 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code';

export interface ArticleBlock {
  id: string;
  type: ArticleBlockType;
  content: {
    text?: LocalizedText;
    level?: 2 | 3 | 4;
    url?: string;
    caption?: LocalizedText;
    author?: LocalizedText;
    items?: LocalizedText[];
    language?: string;
  };
}

export interface PostCategory {
  id: string;
  name: LocalizedText;
  slug: string;
}

export interface Post {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  cover?: string;
  categoryId?: string;
  blocks: ArticleBlock[];
  status: 'draft' | 'published';
  publishedAt?: string;
  seo: PageSEO;
  createdAt: string;
  updatedAt: string;
}

// Media Asset type (Sprint 20.1)
export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  alt: LocalizedText;
  size?: number;
  type: 'image' | 'video' | 'document';
  createdAt: string;
}

// Menu Navigation types (Sprint 21.1)
export interface MenuItem {
  id: string;
  label: LocalizedText;
  type: 'page' | 'external';
  pageId?: string;
  url?: string;
  target?: '_self' | '_blank';
}

export interface Menu {
  id: string;
  name: string;
  location: 'header' | 'footer' | 'custom';
  items: MenuItem[];
}

export interface GlobalStyles {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };

  typography: {
    headingFont: string;
    bodyFont: string;
  };

  radius: {
    sm: number;
    md: number;
    lg: number;
  };

  containerMaxWidth: number;
}

export interface SiteProject {
  id: string;
  name: string;
  defaultLocale: string;
  locales: string[];
  pages: Page[];
  posts?: Post[];
  categories?: PostCategory[];
  mediaAssets?: MediaAsset[];
  menus?: Menu[];
  globalStyles: GlobalStyles;
  translations: Record<string, LocalizedText>;
}
