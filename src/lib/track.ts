declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

export function trackCtaClick(label: string) {
  trackEvent("cta_click", { event_label: label });
}

export function trackNavClick(section: string) {
  trackEvent("nav_click", { event_label: section });
}

export function trackVendorClick(vendorSlug: string) {
  trackEvent("vendor_website_click", { vendor: vendorSlug });
}

export function trackFormSuccess(formName: string) {
  trackEvent("form_success", { form: formName });
}
