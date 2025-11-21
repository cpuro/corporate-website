// src/__tests__/sanitizer.test.js
import sanitizer from '../services/sanitizer';

describe('Sanitizer Service', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags from input', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizer.sanitizeInput(input);
      expect(result).not.toContain('<script>');
      expect(result).toContain('Hello');
    });

    it('should escape HTML entities', () => {
      const input = 'Hello & <World>';
      const result = sanitizer.sanitizeInput(input);
      expect(result).toContain('&amp;');
    });

    it('should trim whitespace', () => {
      const input = '   Hello World   ';
      const result = sanitizer.sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle empty string', () => {
      const input = '';
      const result = sanitizer.sanitizeInput(input);
      expect(result).toBe('');
    });

    it('should preserve safe content', () => {
      const input = 'John Doe - Developer';
      const result = sanitizer.sanitizeInput(input);
      expect(result).toBe('John Doe - Developer');
    });
  });

  describe('sanitizeEmail', () => {
    it('should preserve valid email format', () => {
      const email = 'user@example.com';
      const result = sanitizer.sanitizeEmail(email);
      expect(result).toBe('user@example.com');
    });

    it('should remove suspicious characters from email', () => {
      const email = 'user<script>@example.com';
      const result = sanitizer.sanitizeEmail(email);
      expect(result).not.toContain('<script>');
    });

    it('should trim whitespace', () => {
      const email = '  user@example.com  ';
      const result = sanitizer.sanitizeEmail(email);
      expect(result).toBe('user@example.com');
    });
  });

  describe('sanitizeFormData', () => {
    it('should sanitize all form fields', () => {
      const formData = {
        nombre: '<script>alert("xss")</script>Juan',
        email: '  user@example.com  ',
        mensaje: 'Hello & <World>',
      };
      const result = sanitizer.sanitizeFormData(formData);
      
      expect(result.nombre).not.toContain('<script>');
      expect(result.email).toBe('user@example.com');
      expect(result.mensaje).toContain('&amp;');
    });

    it('should handle nested objects', () => {
      const formData = {
        user: {
          nombre: '<b>Juan</b>',
        },
      };
      const result = sanitizer.sanitizeFormData(formData);
      expect(result.user.nombre).not.toContain('<b>');
    });

    it('should preserve array structure', () => {
      const formData = {
        tags: ['<script>alert("xss")</script>tag1', 'tag2'],
      };
      const result = sanitizer.sanitizeFormData(formData);
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.tags.length).toBe(2);
      expect(result.tags[0]).not.toContain('<script>');
    });
  });
});
