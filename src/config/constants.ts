// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Template builder
export const TEMPLATE_SECTIONS = {
  HEADER: 'header',
  BANNER: 'banner',
  PROMO_DETAILS: 'promoDetails',
  REDEEM_CARD: 'redeemCard',
  TERMS: 'terms',
  PARTNER_BRANDING: 'partnerBranding',
  FOOTER: 'footer',
};

export const EDITABLE_SECTIONS = [
  TEMPLATE_SECTIONS.BANNER,
  TEMPLATE_SECTIONS.REDEEM_CARD,
  TEMPLATE_SECTIONS.PARTNER_BRANDING
];

// Template types
export const TEMPLATE_TYPES = {
  DISCOUNT: 'discount',
  OFFER: 'offer',
  EVENT: 'event',
  PRODUCT_LAUNCH: 'productLaunch',
  SEASONAL: 'seasonal',
};

// Promotion status
export const PROMOTION_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  ENDED: 'ended',
  ARCHIVED: 'archived',
};