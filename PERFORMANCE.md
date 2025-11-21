# Performance Optimization Guide

## Overview
This document outlines all performance optimizations implemented in the Corporate Paso a Paso website to achieve optimal Core Web Vitals and user experience.

## Implemented Optimizations

### 1. Image Optimization

#### Lazy Loading
- **Implementation**: Added `loading="lazy"` attribute to all images except critical above-the-fold images
- **Files Modified**:
  - `HeroSection.jsx`: First slide uses `loading="eager"`, subsequent slides use `loading="lazy"`
  - `ProjectsRealize.jsx`: All project images use `loading="lazy"`
  - `VisionMision.jsx`: Circular images use `loading="lazy"`
  - `Footer.jsx`: Logo uses `loading="eager"` (critical)
  - `Navbar.jsx`: Logo uses `loading="eager"` (critical)
  - `StrategicAllies.jsx`: External links use `loading="lazy"`

#### Async Decoding
- **Implementation**: Added `decoding="async"` to all images
- **Benefit**: Prevents image decoding from blocking rendering
- **Impact**: Improves Core Web Vitals, especially LCP

#### Fetch Priority Hints
- **Implementation**: Uses `fetchpriority="high"` for critical images, `fetchpriority="low"` for non-critical
- **Critical Images**:
  - `hero-background-primary.webp` (LCP)
  - `logo-paso-a-paso.webp` (Navigation)
- **Non-Critical**: Project images, decorative images

#### Image Dimensions
- **Implementation**: Added explicit `width` and `height` attributes
- **Benefit**: Prevents Cumulative Layout Shift (CLS) by reserving space
- **Examples**:
  ```jsx
  <img
    src={image}
    alt="Description"
    loading="lazy"
    decoding="async"
    fetchpriority="low"
    width="400"
    height="300"
    className="responsive-class"
  />
  ```

### 2. Code Splitting & Tree Shaking

#### Lazy Component Loading
- **Location**: `Home.jsx`
- **Implementation**: Uses React `lazy()` and `Suspense` boundary
- **Components Lazy-Loaded**:
  - `HeroSection` (above fold, but split from below fold content)
  - `Welcome`
  - `ServiceSectionHome`
  - `StrategicAllies`
  - `FoundUs`
  - `UsefulWebSites`
- **Fallback**: Loading message during component loading

#### Vite Bundle Optimization
- **Configuration**: `vite.config.js`
- **Manual Chunks**:
  ```javascript
  manualChunks: {
    react: ['react', 'react-dom'],
    motion: ['framer-motion'],
    icons: ['lucide-react', 'react-icons'],
  }
  ```
- **Minification**: ESBuild for JS/CSS minification
- **Compression**: Gzip + Brotli compression enabled

### 3. Browser Caching Strategy

#### Nginx Cache Configuration
- **File**: `nginx.conf`
- **Cache Headers by File Type**:

| File Type | Cache Duration | Policy |
|-----------|---|---|
| HTML | None | Must revalidate |
| Versioned JS/CSS (hash) | 1 year | Immutable |
| Non-versioned Assets | 1 month | Must revalidate |
| Images (WebP, JPG, PNG) | 30 days | Must revalidate |
| Fonts (WOFF2, TTF) | 1 year | Immutable |

#### Gzip Compression
- **Configuration**: Enabled for text, CSS, JS, JSON, SVG
- **Threshold**: 1KB+ files get compressed
- **Algorithms**: Gzip + Brotli (fallback)

### 4. HTML Optimization

#### index.html Enhancements
- **Language Attribute**: Changed from `en` to `es` (correct language)
- **DNS Prefetch**: Added for `fonts.googleapis.com` and `fonts.gstatic.com`
- **Preconnect**: For Google Fonts domain
- **Preload**: Critical images for LCP
- **Meta Tags**: Added `theme-color` for mobile browsers

### 5. Resource Hints

#### Preload Strategy
```html
<!-- Critical images preloaded -->
<link rel="preload" as="image" href="hero-background-primary.webp" />
<link rel="preload" as="image" href="logo-paso-a-paso.webp" />

<!-- Google Fonts prefetch -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
```

### 6. Performance Configuration

#### performanceConfig.js
- **Location**: `client/src/config/performanceConfig.js`
- **Configuration Includes**:
  - Image optimization settings (lazy load threshold: 0.2, rootMargin: 50px)
  - Web Vitals targets (LCP: 2.5s, FID: 100ms, CLS: 0.1)
  - Cache duration values
  - Prefetch/preload strategies

### 7. Custom Hooks

#### useLazyImage Hook
- **Location**: `client/src/hooks/useLazyImage.js`
- **Purpose**: Provides IntersectionObserver-based lazy loading
- **Usage**:
  ```jsx
  const { ref, isLoaded } = useLazyImage();
  return <img ref={ref} src={src} />;
  ```

#### Image Optimization Utilities
- **Location**: `client/src/utils/imageOptimization.js`
- **Functions**:
  - `generateSrcSet()`: Create responsive srcset strings
  - `getImageSizes()`: Get responsive sizes attribute
  - `supportsWebP()`: Browser capability detection
  - `preloadImages()`: Programmatic preload
  - `lazyLoadImage()`: Manual lazy load with callback

### 8. Security Headers

#### Nginx Security Headers
```nginx
X-Frame-Options: SAMEORIGIN          # Clickjacking prevention
X-XSS-Protection: 1; mode=block      # XSS protection
Referrer-Policy: strict-origin-when-cross-origin
```

## Performance Targets

### Core Web Vitals Goals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Bundle Size Targets
- **Main JS**: < 100KB (gzipped)
- **CSS**: < 30KB (gzipped)
- **Images**: WebP format, optimized for web

## Testing Performance

### Tools
1. **Lighthouse**: Run in Chrome DevTools (Ctrl+Shift+I → Lighthouse)
2. **Web Vitals**: Use Chrome DevTools → Performance tab
3. **Webpack Bundle Analyzer**: Check bundle composition
4. **GTmetrix**: Full page performance analysis
5. **WebPageTest**: Advanced performance testing

### Quick Test
```bash
# Build the production version
cd client
npm run build

# Preview production build
npm run preview
```

Then open in browser DevTools Lighthouse tab.

## Docker Optimization

### Multi-Stage Build
- **Stage 1**: Node:18 for building React app
- **Stage 2**: Nginx:alpine for minimal production image
- **Result**: ~150MB final image (vs ~1GB+ with Node)

### Caching in Docker
- Leverages Docker layer caching
- package.json copied before source code (cache invalidation)
- Build stage dependencies cached between builds

## Future Optimization Opportunities

1. **Service Worker**: Implement for offline support
2. **Image WebP Generation**: Auto-convert JPEG to WebP
3. **Adaptive Images**: Serve different sizes based on device
4. **Scheduled Preloading**: Preload next page before user navigates
5. **Critical CSS**: Inline critical styles above the fold
6. **Font Display**: Implement `font-display: swap` for better FCP

## Monitoring

### Recommended Setup
1. Add analytics to monitor real user metrics (RUM)
2. Setup alerts for Core Web Vitals regression
3. Monthly performance audits
4. Monitor bundle size in CI/CD pipeline

### Tools
- Google Analytics 4 (Web Vitals)
- Sentry (Error tracking)
- GitHub Actions (Automated testing)
