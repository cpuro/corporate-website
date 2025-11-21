/**
 * Image optimization utilities for responsive images and lazy loading
 */

/**
 * Generate srcset string for responsive images
 * @param {string} basePath - Base image path without extension
 * @param {string[]} sizes - Array of sizes (e.g., ['320', '640', '1280'])
 * @param {string} extension - File extension (e.g., 'webp')
 * @returns {string} srcset string
 */
export const generateSrcSet = (basePath, sizes = ['320', '640', '1280'], extension = 'webp') => {
  return sizes
    .map(size => `${basePath}-${size}w.${extension} ${size}w`)
    .join(', ');
};

/**
 * Get responsive image sizes attribute
 * @param {string} maxWidth - Maximum width in viewport units (e.g., '100vw', '50vw')
 * @returns {string} sizes attribute value
 */
export const getImageSizes = (maxWidth = '100vw') => {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 75vw, ${maxWidth}`;
};

/**
 * Check if browser supports WebP images
 * @returns {boolean}
 */
export const supportsWebP = () => {
  if (typeof window === 'undefined') return true;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('image/webp') === 0;
};

/**
 * Get image format based on browser support
 * @returns {string} - 'webp' or 'jpg'
 */
export const getOptimalImageFormat = () => {
  return supportsWebP() ? 'webp' : 'jpg';
};

/**
 * Preload critical images for better performance
 * @param {string[]} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load image with IntersectionObserver
 * @param {HTMLImageElement} img - Image element to lazy load
 * @param {Function} callback - Callback when image enters viewport
 */
export const lazyLoadImage = (img, callback) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    img.src = img.dataset.src;
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
        if (callback) callback();
      }
    });
  });

  observer.observe(img);
};

export default {
  generateSrcSet,
  getImageSizes,
  supportsWebP,
  getOptimalImageFormat,
  preloadImages,
  lazyLoadImage,
};
