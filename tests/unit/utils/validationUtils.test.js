import { describe, it, expect } from 'vitest'
import { validateEmail, validatePhone, validatePassword } from '../../../src/utils/validationUtils'

describe('validationUtils', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhone('1234567890')).toBe(true)
      expect(validatePhone('+1-234-567-8900')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc-def-ghij')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate passwords meeting minimum requirements', () => {
      expect(validatePassword('password123')).toBe(true)
      expect(validatePassword('securePassword!')).toBe(true)
    })

    it('should reject passwords not meeting minimum requirements', () => {
      expect(validatePassword('short')).toBe(false)
      expect(validatePassword('')).toBe(false)
      expect(validatePassword(null)).toBe(false)
    })
  })
})