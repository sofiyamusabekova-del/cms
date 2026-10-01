import { registerBlock, getBlockDefinition } from './blockRegistry';
import { heroDefinition } from '@/builder/blocks/hero/heroDefinition';
import { featuresDefinition } from '@/builder/blocks/features/featuresDefinition';
import { servicesDefinition } from '@/builder/blocks/services/servicesDefinition';
import { textImageDefinition } from '@/builder/blocks/textImage/textImageDefinition';
import { ctaDefinition } from '@/builder/blocks/cta/ctaDefinition';
import { galleryDefinition } from '@/builder/blocks/gallery/galleryDefinition';
import { statsDefinition } from '@/builder/blocks/statistics/statsDefinition';
import { pricingDefinition } from '@/builder/blocks/pricing/pricingDefinition';
import { teamDefinition } from '@/builder/blocks/team/teamDefinition';
import { reviewsDefinition } from '@/builder/blocks/reviews/reviewsDefinition';
import { faqDefinition } from '@/builder/blocks/faq/faqDefinition';
import { contactsDefinition } from '@/builder/blocks/contacts/contactsDefinition';
import { footerDefinition } from '@/builder/blocks/footer/footerDefinition';

let initialized = false;

export function initBlockRegistry(): void {
  if (initialized) return;

  registerBlock(heroDefinition);
  registerBlock(featuresDefinition);
  registerBlock(servicesDefinition);
  registerBlock(textImageDefinition);
  registerBlock(ctaDefinition);
  registerBlock(galleryDefinition);
  registerBlock(statsDefinition);
  registerBlock(pricingDefinition);
  registerBlock(teamDefinition);
  registerBlock(reviewsDefinition);
  registerBlock(faqDefinition);
  registerBlock(contactsDefinition);
  registerBlock(footerDefinition);

  initialized = true;
}

// Auto-initialize on import
initBlockRegistry();

export { getBlockDefinition };
