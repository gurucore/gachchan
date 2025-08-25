import { v4 as uuidV4 } from 'uuid'
import { nanoid } from 'nanoid'

export class RandomFactory {
  /** return a random GUID */
  static getGuid() {
    return uuidV4()
  }

  /** by combining ISOTimeString and nanoid */
  static createRandomString() {
    return `${new Date().toISOString().substring(0, 10)}_${nanoid()}`
  }

  /**
   * random an integer. Max = 10, so return 0 to 10
   * @param max the maximum number this func can return
   * @returns number integer
   */
  static getRandomIntegerTo(max: number) {
    return this.getRandomIntegerWithin(0, max)
  }

  /**
   * random an integer, return value from min to max (include min and max). (0,10) ==> return any integer from 0 to 10
   * @returns number integer
   */
  static getRandomIntegerWithin(min: number, max: number): number {
    const range = max - min + 1
    return Math.floor(Math.random() * range) + min
  }

  /**
   * return random element inside array
   * @param {*} arr
   * @returns
   */
  static getRandomArrayElement(arr: any[]) {
    if (Array.isArray(arr)) {
      return arr[RandomFactory.getRandomIntegerTo(arr.length - 1)]
    }
  }
}
