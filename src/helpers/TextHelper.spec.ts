import { test, assert, expect, it, describe, beforeAll, afterAll, vi } from 'vitest'

import { TextHelper } from './TextHelper'
const target = TextHelper

describe('TextHelper', () => {
  it('RepresentNumberInIconicDigit', () => {
    expect(target.representNumberInIconicDigit(undefined)).toBe('')
    expect(target.representNumberInIconicDigit(null)).toBe('')
    expect(target.representNumberInIconicDigit('')).toBe('')
    expect(target.representNumberInIconicDigit('000123456789')).toBe('0️⃣0️⃣0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣')
  })

  it('boolToYesNo', () => {
    expect(target.boolToYesNo(undefined)).toBe('🚫')
    expect(target.boolToYesNo(false)).toBe('🚫')
    expect(target.boolToYesNo(true, true)).toBe('✅yes')
  })
})

describe('toCamelCase', () => {
  it('converts basic snake_case to camelCase', () => {
    expect(target.toCamelCase('some_case_here')).toEqual('someCaseHere')
    expect(target.toCamelCase('hello_world')).toBe('helloWorld')
  })

  it('handles single words', () => {
    expect(target.toCamelCase('hello')).toBe('hello')
  })
  it('handles empty string', () => {
    expect(target.toCamelCase('')).toBe('')
  })
  it('handles string with leading underscore', () => {
    expect(target.toCamelCase('_hello_world')).toBe('helloWorld')
  })
})

describe('camelToSnakeCase', () => {
  it('should be convert to snake', () => {
    expect(target.camelToSnakeCase('someHereIsGood')).toBe('some_here_is_good')
    expect(target.camelToSnakeCase('OneTwoThree')).toBe('one_two_three')
    expect(target.camelToSnakeCase('anotherExample')).toBe('another_example')
    expect(target.camelToSnakeCase('CAPITALIZED')).toBe('c_a_p_i_t_a_l_i_z_e_d')
  })
})
