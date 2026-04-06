// Meta Pixel event helpers
// Pixel is loaded via index.html; this file provides typed wrappers.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

export function trackViewContent(params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value?: number;
  currency?: string;
}) {
  fbq('track', 'ViewContent', params);
}

export function trackAddToCart(params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}) {
  fbq('track', 'AddToCart', params);
}

export function trackInitiateCheckout(params: {
  content_ids: string[];
  num_items: number;
  value: number;
  currency: string;
}) {
  fbq('track', 'InitiateCheckout', params);
}
