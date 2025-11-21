/**
 * Performance and caching configuration
 */

export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    lazyLoadThreshold: 0.2,
    rootMargin: '50px',
    preferredFormats: ['webp', 'jpg'],
  },

  // Code splitting thresholds
  codeSplitting: {
    minChunkSize: 50000,
    vendorChunkSize: 100000,
  },

  // Caching strategy
  caching: {
    // Browser cache (seconds)
    versioned: 31536000, // 1 year for hashed files
    images: 2592000, // 30 days
    fonts: 31536000, // 1 year
    html: 0, // No cache - always revalidate
    api: 300, // 5 minutes for API responses
  },

  // Network prefetch/preload
  prefetch: {
    dns: ['https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
    preload: [
      '/src/assets/images/hero-background-primary.webp',
      '/src/assets/fonts/poppins-regular.woff2',
    ],
  },

  // Web vitals targets
  webVitals: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100, // First Input Delay (ms)
    CLS: 0.1, // Cumulative Layout Shift
    FCP: 1800, // First Contentful Paint (ms)
    TTFB: 600, // Time to First Byte (ms)
  },
};

export default PERFORMANCE_CONFIG;
