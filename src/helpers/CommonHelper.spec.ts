import { test, assert, expect, it, describe, beforeAll, afterAll, vi } from 'vitest'

import { CommonHelper } from './CommonHelper'
import { TestHelper } from './TestHelper'
const target = CommonHelper

describe('CommonHelper', () => {
  describe('ToNumber', () => {
    test('Nothing should be 0', () => {
      // not a actual number, should be 0
      expect(target.toNumber('')).toBe(0)
      expect(target.toNumber('\t')).toBe(0)
      expect(target.toNumber('\r')).toBe(0)
      expect(target.toNumber('\n')).toBe(0)
      expect(target.toNumber('\r\n')).toBe(0)
      expect(target.toNumber(NaN)).toBe(0)
      expect(target.toNumber(null as unknown as string)).toBe(0)
      expect(target.toNumber(undefined as unknown as string)).toBe(0)
    })

    expect(target.toNumber('1100')).toBe(1100)
    expect(target.toNumber('-1100')).toBe(-1100)
    expect(target.toNumber(-1)).toBe(-1)
    expect(target.toNumber(-1.1)).toBe(-1.1)

    expect(target.toNumber('ATC')).toBe(0)
    expect(target.toNumber('0')).toBe(0)
    expect(target.toNumber(0)).toBe(0)

    expect(target.toNumber(19.103857566765578635)).toBe(19.1)
    expect(target.toNumber(19.103857566765578635, 0)).toBe(19)
    expect(target.toNumber('19.103857566765578635', 2)).toBe(19.1)
    expect(target.toNumber('19.106', 2)).toBe(19.11)
  })

  describe('RoundNumber', () => {
    test('RoundNumber default', () => {
      expect(target.roundNumber(19.103857566765578635)).toBe(19.1)
      expect(target.roundNumber(19.143857566765578635)).toBe(19.1)
      expect(target.roundNumber(19.144857566765578635)).toBe(19.1)
      expect(target.roundNumber(19.144857566765578635, 2)).toBe(19.14)
    })
  })

  it('HasAnyOfIntersection', () => {
    expect(target.hasAnyOfIntersection([], [])).toBe(false)
    expect(target.hasAnyOfIntersection(undefined as unknown as string, undefined)).toBe(false)
    expect(target.hasAnyOfIntersection(null as unknown as string, null as unknown as string)).toBe(false)
    expect(target.hasAnyOfIntersection(null as unknown as string)).toBe(false)

    expect(
      target.hasAnyOfIntersection([undefined as unknown as string, undefined as unknown as string, null as unknown as string, null as unknown as string, 3], [undefined as unknown as string])
    ).toBe(true)
    expect(target.hasAnyOfIntersection([undefined as unknown as string, undefined as unknown as string, null as unknown as string, null as unknown as string, 3], [null as unknown as string])).toBe(
      true
    )
    expect(target.hasAnyOfIntersection([undefined as unknown as string, undefined as unknown as string, 3], [null as unknown as string])).toBe(false)
    expect(target.hasAnyOfIntersection([undefined as unknown as string, undefined as unknown as string, 3], [4])).toBe(false)

    expect(target.hasAnyOfIntersection([1, 2, 3], 4)).toBe(false)
    expect(target.hasAnyOfIntersection([1, 2, 3], [4])).toBe(false)

    expect(target.hasAnyOfIntersection([1, 2, 3], 1)).toBe(true)
    expect(target.hasAnyOfIntersection([1, 2, 3], [1])).toBe(true)

    expect(target.hasAnyOfIntersection([1, 2, 3], [3, 4])).toBe(true)

    expect(target.hasAnyOfIntersection(['GOOD', 'PERFECT'], ['POTENTIAL', 'GOOD'])).toBe(true)

    // auto flatten
    expect(target.hasAnyOfIntersection('PERFECT', ['potential', 'good', 'perfect'])).toBe(true)
    expect(target.hasAnyOfIntersection(['potential', 'good', 'perfect'], 'PERFECT')).toBe(true)

    // ignore casing when compare
    expect(target.hasAnyOfIntersection([1, 2, 3, 'GOOD', 'PERFECT'], ['potential', 'good'])).toBe(true)
    expect(target.hasAnyOfIntersection([1, 2, 3, 'GOOD', 'PERFECT'], ['potential', 'good'], false)).toBe(false)
  })

  it('Percent', () => {
    expect(target.percent(25, 50)).toBe(50)
    expect(target.percent(25, 25)).toBe(100)
    expect(target.percent(2, 3, 2)).toBe(66.67)
  })

  it('DiffInPercent', () => {
    expect(target.diffInPercent(null as unknown as number, 90)).toBe(null)
    expect(target.diffInPercent('ATC' as unknown as number, 90)).toBe(null)
    expect(target.diffInPercent(10, 'ATC' as unknown as number)).toBe(null)

    expect(target.diffInPercent(NaN, 10)).toBe(null)

    expect(target.diffInPercent(100, 110)).toBe(10)
    expect(target.diffInPercent(100, 90)).toBe(-10)
  })

  it('ToNumberString', () => {
    expect(target.toNumberString(22.2222, 2, true, false, '%')).toBe('+22.22%')
    expect(target.toNumberString(22.2222, 2, false, false, '%')).toBe('22.22%')
    expect(target.toNumberString(-22.2222, 2, false, false, '%')).toBe('-22.22%')
    expect(target.toNumberString(0, 2, true, false, '%')).toBe('')
    expect(target.toNumberString(0, 2, true, true, '%')).toBe('0%')
    expect(target.toNumberString(0, 1)).toBe('0')

    expect(target.toNumberString(NaN, 2)).toBe('')
    expect(target.toNumberString(null as unknown as string, 2)).toBe('')
    expect(target.toNumberString(undefined, 2)).toBe('')
  })

  it('NumberToUnitString', () => {
    expect(target.numberToUnitString(10000, 1000, 0, 'k')).toBe('10k')

    expect(target.numberToUnitString(0, 1)).toBe('0')
    expect(target.numberToUnitString(NaN, 1)).toBe('')
    expect(target.numberToUnitString('', 1)).toBe('')
    expect(target.numberToUnitString('ATC', 1)).toBe('ATC')

    expect(target.numberToUnitString(100, 1, 2)).toBe('100')
    expect(target.numberToUnitString(100.1321, 1, 2)).toBe('100.13')

    expect(target.numberToUnitString(40000000, 1, 0, '', 'vi-VN')).toBe('40.000.000')
    expect(target.numberToUnitString(4000, 1, 0, '%', 'vi-VN')).toBe('4.000%')
  })

  describe('joinPaths', () => {
    it('JoinPaths', () => {
      expect(target.joinPaths()).toBe('')
      expect(target.joinPaths(1, 2, 3)).toBe('1/2/3')
      expect(target.joinPaths(1, null, 2, undefined, '', 3)).toBe('1/2/3')
      expect(target.joinPaths('/1/', '/2/', 3)).toBe('/1/2/3')
      expect(target.joinPaths('/1/', '', null, '/2/', undefined, null, 3)).toBe('/1/2/3')
    })

    it('join a and b should be a/b', () => {
      expect(target.joinPaths('a', 'b')).toBe('a/b')
      expect(target.joinPaths('a/', 'b')).toBe('a/b')
      expect(target.joinPaths('a', '/b')).toBe('a/b')
      expect(target.joinPaths('/a/', '/b')).toBe('/a/b')
    })

    it('join /a and b should be /a/b', () => {
      expect(target.joinPaths('/a/', '/b')).toBe('/a/b')
    })
  })

  describe('isURL', () => {
    it('URL should be true', async () => {
      expect(target.isURL('https://vbee-studio-tmp.s3.ap-southeast-1.amazonaws.com/voice-cloning/voices/6765858815ba1ce0979a8b35/8d9e502b-9f8b-4dbe-9b0b-65c45c8bdf41-1734998803328.wav')).toBeTruthy()

      expect(target.isURL(TestHelper.SampleDomainUrl)).toBeTruthy()
      expect(target.isURL('http://lockevn.com')).toBeTruthy()
    })

    it('file should be false', async () => {
      expect(target.isURL('https')).toBeFalsy()
      expect(target.isURL('https.txt')).toBeFalsy()
      expect(target.isURL('./https.txt')).toBeFalsy()
      expect(target.isURL('../https.txt')).toBeFalsy()
    })
  })

  describe('RandomArray', () => {
    it('ShuffleArray', () => {
      const SHUFFLE_COUNT = 1000

      const array = Array.from({ length: SHUFFLE_COUNT }, (e, i) => i)
      const arrIterationResult = []

      for (let index = 0; index < SHUFFLE_COUNT; index++) {
        const newShuffleArray = target.shuffleArray(array)
        arrIterationResult.push(newShuffleArray.join('_'))
      }

      // https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
      const findDuplicates = (arr: string[]) => {
        let cloned_sorted_arr = arr.slice().sort() // You can define the comparing function here.
        // JS by default uses a crappy string compare.
        // (we use slice to clone the array so the original array won't be modified)
        let results = []
        for (let i = 0; i < cloned_sorted_arr.length - 1; i++) {
          if (cloned_sorted_arr[i + 1] == cloned_sorted_arr[i]) {
            results.push(cloned_sorted_arr[i])
          }
        }
        return results
      }

      const percentageOfDuplicatedEntry = findDuplicates(arrIterationResult).length / SHUFFLE_COUNT
      expect(percentageOfDuplicatedEntry < 0.03).toBe(true)
      // console.debug("findDuplicates(ret).length / SHUFFLE_COUNT = ", findDuplicates(arrIterationResult).length, "/", SHUFFLE_COUNT, "=", percentageOfDuplicatedEntry)
    })
  })

  //
  describe('objectMapKeys', () => {
    it('should be mapped, and remove non-mapped keys', () => {
      const actual = target.objectMapKeys(
        {
          a: 1,
          b: 2,
          c: 3,
        },
        {
          a: 'AA',
          b: 'BB',
        }
      )

      expect(actual).toMatchObject({
        AA: 1,
        BB: 2,
      })
    })
  })

  describe('deepMerge', () => {
    it('should be merged', () => {
      const actual = target.deepMerge(
        {
          a: 1,
          b: 2,
          c: 3,
          e: {
            e1: 1,
            e2: 2,
          },
        },
        {
          a: 'AA',
          b: 'BB',
          d: 4,

          e: {
            e3: 3,
            e4: 4,
          },
        }
      )

      expect(actual).toMatchObject({
        a: 'AA',
        b: 'BB',
        c: 3,
        d: 4,
        e: {
          e1: 1,
          e2: 2,
          e3: 3,
          e4: 4,
        },
      })
    })
  })

  describe('convertKeysToCamelCase', () => {
    it('array should be good', async () => {
      expect(target.convertKeysToCamelCase([{ some_case_here: 1 }]))
        //
        .toMatchObject([{ someCaseHere: 1 }])
    })

    it('object keys should be good', async () => {
      expect(target.convertKeysToCamelCase({ some_case_here: 1 }))
        //
        .toMatchObject({ someCaseHere: 1 })
    })

    it('preserves primitive values', () => {
      const input = {
        string_value: 'test',
        number_value: 123,
        boolean_value: true,
        null_value: null,
      }
      const expected = {
        stringValue: 'test',
        numberValue: 123,
        booleanValue: true,
        nullValue: null,
      }
      expect(target.convertKeysToCamelCase(input)).toEqual(expected)
    })

    it('handles nested objects', () => {
      const input = {
        user_info: {
          first_name: 'John',
          contact_details: {
            phone_number: '123',
          },
        },
      }
      const expected = {
        userInfo: {
          firstName: 'John',
          contactDetails: {
            phoneNumber: '123',
          },
        },
      }
      expect(target.convertKeysToCamelCase(input)).toEqual(expected)
    })

    it('handles null and undefined', () => {
      expect(target.convertKeysToCamelCase(null as unknown as object)).toBe(null)
      expect(target.convertKeysToCamelCase(undefined as unknown as object)).toBe(undefined)
    })

    it('handles empty object and array', () => {
      expect(target.convertKeysToCamelCase({})).toEqual({})
      expect(target.convertKeysToCamelCase([])).toEqual([])
    })

    it('handles mixed content', () => {
      const input = {
        user_data: [{ first_name: 'John' }, { contact_info: { phone_number: '123' } }],
        simple_key: 'value',
      }
      const expected = {
        userData: [{ firstName: 'John' }, { contactInfo: { phoneNumber: '123' } }],
        simpleKey: 'value',
      }
      expect(target.convertKeysToCamelCase(input)).toEqual(expected)
    })
  })
  //
  describe('mergeAndDistinct', () => {
    it('123 and 453 should be 12345', () => {
      let actual = target.mergeAndDistinct([1, 2, 3], [4, 5, 3])
      expect(actual.indexOf(4) >= 0).toBeTruthy()
      expect(actual.indexOf(5) >= 0).toBeTruthy()
    })
  })
  //
  describe('parseJsonDate', () => {
    it("/Date(2342353453434)/ should be 'Wed Mar 23 2044 20:44:13 GMT+0700 (Indochina Time)'", () => {
      let actual = target.parseJsonDate('/Date(2342353453434)/')

      expect(actual.getUTCFullYear() === 2044).toBeTruthy()
      expect(actual.getUTCMonth() === 2).toBeTruthy() // from 0
      expect(actual.getUTCDate() === 23).toBeTruthy()
    })
  })
  describe('splitByCommaAndTrim()', () => {
    it('1,2,3 ,,, 4, 5 ,6 should be [1,2,3,4,5,6]', () => {
      let actual = target.splitByCommaAndTrim('1,2,3 ,,, 4, 5 ,6')

      expect(actual.length).toBe(6)
      expect(actual[0]).toBe('1')
      expect(actual[5]).toBe('6')
    })
  })

  describe('retry', { timeout: 15000 }, () => {
    async function fetchInvalidData() {
      const response = await fetch('https://example.com/nothing/here')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      return await response.text()
    }

    let count = 0
    async function fetchDataOKOnThirdTry() {
      count++
      if (count < 3) {
        throw new Error('should fail on first and second try')
      }

      return count
    }

    it('Simple retry on invalid API should throw', async () => {
      try {
        const data = await target.retry(fetchInvalidData)
        console.log('Data:', data)
        expect(data).not.toBeUndefined()
      } catch (error) {
        console.error(error)
        assert.ok('All retries failed')
      }
    })

    it('Advanced retry on invalid API should throw', async () => {
      try {
        const result2 = await target.retry(
          async () => {
            return await fetchInvalidData()
          },
          {
            maxRetries: 3,
            delay: 300,
            exponentialBackoff: true,
            retryOnErrors: [Error],
            onRetry: (error, attempt) => {
              console.log(`Retry attempt ${attempt} after error: ${error.message}`)
            },
          }
        )
      } catch (error) {
        console.error(error)
        assert.ok('All retries failed')
      }
    })

    it('Simple retry should be fine on 3rd times', async () => {
      try {
        const data = await target.retry(fetchDataOKOnThirdTry)
        console.log('Result Data:', data)
        expect(data).not.toBeUndefined()
      } catch (error) {
        console.error(error)
        assert.fail('All retries failed')
      }
    })
  })

  describe('nameof', () => {
    it('nameof({me}) should be me', () => {
      const me = 'lockevn'
      expect(target.nameof({ me })).toBe('me')

      const very_long_name = 'lockevn'
      expect(target.nameof({ very_long_name })).toBe('very_long_name')
    })
  })
  describe('isObject', () => {
    it('obj should be true', () => {
      expect(target.isObject({ a: 1 })).toBeTruthy()
      expect(target.isObject(new Date())).toBeTruthy()
      expect(target.isObject(JSON.parse('{}'))).toBeTruthy()

      expect(target.isObject(JSON.parse('[]'))).toBeFalsy()
      expect(target.isObject([1, 2, 3])).toBeFalsy()
      expect(target.isObject(null)).toBeFalsy()
      expect(target.isObject(undefined)).toBeFalsy()
      expect(target.isObject(1)).toBeFalsy()
      expect(target.isObject('1')).toBeFalsy()
      expect(target.isObject(true)).toBeFalsy()
      expect(target.isObject(false)).toBeFalsy()
      expect(target.isObject(() => {})).toBeFalsy()
    })
  })
  //
})
