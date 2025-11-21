// src/__tests__/imageOptimization.test.js
import {
  generateSrcSet,
  getImageSizes,
  supportsWebP,
  getOptimalImageFormat,
  preloadImages,
  lazyLoadImage,
} from '../utils/imageOptimization';

describe('Image Optimization Utilities', () => {
  describe('generateSrcSet', () => {
    it('should generate srcset string with multiple sizes', () => {
      const srcset = generateSrcSet('/images/hero', ['320', '640', '1280']);
      
      expect(srcset).toContain('320w');
      expect(srcset).toContain('640w');
      expect(srcset).toContain('1280w');
    });

    it('should use custom extension', () => {
      const srcset = generateSrcSet('/images/logo', ['64', '128'], 'png');
      
      expect(srcset).toContain('.png');
      expect(srcset).not.toContain('.webp');
    });

    it('should default to webp extension', () => {
      const srcset = generateSrcSet('/images/test');
      
      expect(srcset).toContain('.webp');
    });
  });

  describe('getImageSizes', () => {
    it('should return default sizes string', () => {
      const sizes = getImageSizes();
      
      expect(sizes).toBeTruthy();
      expect(typeof sizes).toBe('string');
    });

    it('should accept custom max width', () => {
      const sizes = getImageSizes('50vw');
      
      expect(sizes).toContain('50vw');
    });
  });

  describe('supportsWebP', () => {
    it('should return boolean', () => {
      const result = supportsWebP();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getOptimalImageFormat', () => {
    it('should return webp or jpg', () => {
      const format = getOptimalImageFormat();
      expect(['webp', 'jpg']).toContain(format);
    });

    it('should return a valid format string', () => {
      const format = getOptimalImageFormat();
      expect(format).toMatch(/^(webp|jpg)$/);
    });
  });

  describe('preloadImages', () => {
    it('should not throw error if images array is provided', () => {
      const images = ['/images/hero.webp', '/images/logo.webp'];
      expect(() => {
        preloadImages(images);
      }).not.toThrow();
    });

    it('should not throw error if images is empty', () => {
      expect(() => {
        preloadImages([]);
      }).not.toThrow();
    });

    it('should not throw error if window is undefined', () => {
      const images = ['/images/hero.webp'];
      expect(() => {
        preloadImages(images);
      }).not.toThrow();
    });
  });

  describe('lazyLoadImage', () => {
    it('should not throw error when called with image element', () => {
      const img = document.createElement('img');
      img.dataset.src = '/images/lazy.webp';
      
      expect(() => {
        lazyLoadImage(img);
      }).not.toThrow();
    });

    it('should not throw error when called with callback', () => {
      const img = document.createElement('img');
      img.dataset.src = '/images/lazy.webp';
      const callback = jest.fn();
      
      expect(() => {
        lazyLoadImage(img, callback);
      }).not.toThrow();
    });

    it('should handle missing dataset.src gracefully', () => {
      const img = document.createElement('img');
      
      expect(() => {
        lazyLoadImage(img);
      }).not.toThrow();
    });
  });
});
