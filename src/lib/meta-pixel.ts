// Meta Pixel event helpers
// Browser pixel loaded via index.html; this file provides typed wrappers
// and server-side Conversion API (CAPI) deduplication.

import { supabase } from '@/integrations/supabase/client';

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

/** Generate a unique event ID for deduplication between browser pixel & CAPI */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Send event to Meta CAPI via Edge Function (fire-and-forget) */
async function sendCAPI(eventName: string, customData?: Record<string, unknown>) {
  try {
    const { data, error } = await supabase.functions.invoke('meta-capi', {
      body: {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        event_id: customData?._event_id,
        custom_data: customData ? Object.fromEntries(
          Object.entries(customData).filter(([k]) => !k.startsWith('_'))
        ) : undefined,
      },
    });

    if (error) {
      console.warn('[CAPI] Function returned error:', error.message);
      return;
    }

    const response = (data ?? null) as {
      success?: boolean;
      skipped?: boolean;
      reason?: string;
      message?: string;
    } | null;

    if (response?.skipped || response?.success === false) {
      console.warn('[CAPI] Event skipped:', response.message ?? response.reason ?? response);
    }
  } catch (e) {
    console.warn('[CAPI] Failed to send event:', e);
  }
}

export function trackViewContent(params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value?: number;
  currency?: string;
}) {
  const eventId = generateEventId();
  fbq('track', 'ViewContent', params, { eventID: eventId });
  sendCAPI('ViewContent', { ...params, _event_id: eventId });
}

export function trackAddToCart(params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}) {
  const eventId = generateEventId();
  fbq('track', 'AddToCart', params, { eventID: eventId });
  sendCAPI('AddToCart', { ...params, _event_id: eventId });
}

export function trackInitiateCheckout(params: {
  content_ids: string[];
  num_items: number;
  value: number;
  currency: string;
}) {
  const eventId = generateEventId();
  fbq('track', 'InitiateCheckout', params, { eventID: eventId });
  sendCAPI('InitiateCheckout', { ...params, _event_id: eventId });
}
