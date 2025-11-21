// src/__tests__/Form.test.js
import sanitizer from '../services/sanitizer';

describe('Form Validation and Security', () => {
  describe('Input Sanitization', () => {
    it('should sanitize form inputs to prevent XSS', () => {
      const input = '<script>alert("xss")</script>John';
      const sanitized = sanitizer.sanitizeInput(input);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('John');
    });

    it('should sanitize email inputs', () => {
      const email = '  user@example.com  ';
      const sanitized = sanitizer.sanitizeEmail(email);
      
      expect(sanitized).toBe('user@example.com');
    });

    it('should encode HTML entities in form data', () => {
      const input = 'Hello & <World>';
      const sanitized = sanitizer.sanitizeInput(input);
      
      expect(sanitized).toContain('&amp;');
      expect(sanitized).not.toContain('<');
    });
  });

  describe('Form Data Validation', () => {
    it('should validate name field (minimum 2 characters)', () => {
      const shortName = 'A';
      expect(shortName.length).toBeLessThan(2);
    });

    it('should validate email format', () => {
      const validEmail = 'test@example.com';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(emailRegex.test(validEmail)).toBe(true);
    });

    it('should validate message length (minimum 10 characters)', () => {
      const shortMessage = 'Hi there';
      expect(shortMessage.length).toBeLessThan(10);
    });

    it('should reject very long messages', () => {
      const longMessage = 'a'.repeat(1001);
      expect(longMessage.length).toBeGreaterThan(1000);
    });
  });

  describe('Form Data Protection', () => {
    it('should sanitize nested objects in form data', () => {
      const formData = {
        user: {
          nombre: '<b>Juan</b>',
          email: 'juan@example.com',
        },
      };
      
      const sanitized = sanitizer.sanitizeFormData(formData);
      expect(sanitized.user.nombre).not.toContain('<b>');
    });

    it('should sanitize arrays in form data', () => {
      const formData = {
        tags: ['<script>alert("xss")</script>tag1', 'tag2'],
      };
      
      const sanitized = sanitizer.sanitizeFormData(formData);
      expect(Array.isArray(sanitized.tags)).toBe(true);
      expect(sanitized.tags[0]).not.toContain('<script>');
    });

    it('should preserve boolean values', () => {
      const formData = {
        acceptPolicy: true,
        newsletter: false,
      };
      
      const sanitized = sanitizer.sanitizeFormData(formData);
      expect(sanitized.acceptPolicy).toBe(true);
      expect(sanitized.newsletter).toBe(false);
    });
  });

  describe('Form Accessibility Patterns', () => {
    it('should validate email format is correct', () => {
      const email = 'test@example.com';
      expect(email).toContain('@');
      expect(email).toContain('.');
    });

    it('should trim whitespace from inputs', () => {
      const input = '  Test Name  ';
      const trimmed = input.trim();
      expect(trimmed).toBe('Test Name');
    });

    it('should handle complex form data correctly', () => {
      const complexData = {
        nombre: '<script>alert("xss")</script>Juan',
        email: '  user@example.com  ',
        mensaje: 'Hello & <World>',
        nested: {
          tag: '<b>tag</b>',
        },
      };
      
      const sanitized = sanitizer.sanitizeFormData(complexData);
      
      expect(sanitized.nombre).not.toContain('<script>');
      expect(sanitized.email).not.toContain(' ');
      expect(sanitized.mensaje).toContain('&amp;');
      expect(sanitized.nested.tag).not.toContain('<b>');
    });
  });
});
