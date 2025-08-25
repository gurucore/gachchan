import { test, assert, expect, it, describe } from 'vitest'
import { CustomError } from './CustomError'

export class TestError extends CustomError {
  constructor(message: string, public readonly error?: Error | unknown, extra?: any) {
    super(message, error || 'TEST_ERROR', extra)
  }
}

describe('CustomError', () => {
  describe('keep the message errorCode', () => {
    it('has expected message', () => {
      const myError = new CustomError('Something went wrong')
      expect(myError.message).contains('Something went wrong')
      expect(myError.errorCode).toBeUndefined()
    })

    it('has expected errorCode', () => {
      const myError = new CustomError(1001)
      expect(myError.message).contains('1001')
      expect(myError.errorCode).toBe(1001)
    })
  })

  describe('stack trace', () => {
    it('it should keep the stack trace and has expected message', () => {
      const myError = new CustomError('Something went wrong')
      expect(myError.stack).contains('Something went wrong')
    })
  })

  describe('sub class', () => {
    it('it should keep the stack trace, and contain extra info', () => {
      const myError = new TestError('Something Test went wrong', null, { test: 'test' })
      expect(myError.stack).contains('Something Test')
      expect(myError.extra.test).toBe('test')
    })
  })
})
