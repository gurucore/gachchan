import { test, assert, expect, it, describe, beforeAll, afterAll, vi } from 'vitest'

import { RandomFactory } from './RandomFactory'
const target = RandomFactory

describe('CommonHelper', () => {
  describe('RandomOutput', () => {
    beforeAll(() => {
      // https://stackoverflow.com/questions/41570273/how-to-test-a-function-that-output-is-random-using-jest
      vi.spyOn(global.Math, 'random').mockReturnValue(0.56)
    })
    afterAll(() => {
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    it('GetRandomIntegerTo', () => {
      expect(target.getRandomIntegerTo(10)).toBe(6)
      expect(target.getRandomIntegerWithin(0, 10)).toBe(6)

      expect(target.getRandomIntegerWithin(2, 10)).toBe(7)

      expect(target.getRandomIntegerWithin(11, 19)).toBeLessThan(20)
      expect(target.getRandomIntegerWithin(11, 19)).toBeGreaterThan(10)
    })

    it('GetRandomArrayElement', () => {
      expect(target.getRandomArrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(6)
    })

    it('getGuid', () => {
      const actual = target.getGuid()
      console.log(actual)
      expect(actual).not.toBeNull()
    })

    it('createRandomString', () => {
      expect(target.createRandomString()).not.toBeNull()
    })
  })
})
