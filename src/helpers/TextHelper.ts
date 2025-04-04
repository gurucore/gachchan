/** helper to represent/layout/format text */
export class TextHelper {
  /** change 1 to 1️⃣ (unicode square box character) */
  static representNumberInIconicDigit(numberString: string | null | undefined): string {
    if (!numberString) {
      return ''
    }

    let ret = numberString.toString()
    ret = ret
      .replace(/0/g, '0️⃣')
      .replace(/1/g, '1️⃣')
      .replace(/2/g, '2️⃣')
      .replace(/3/g, '3️⃣')
      .replace(/4/g, '4️⃣')
      .replace(/5/g, '5️⃣')
      .replace(/6/g, '6️⃣')
      .replace(/7/g, '7️⃣')
      .replace(/8/g, '8️⃣')
      .replace(/9/g, '9️⃣')

    return ret
  }

  /** convert true false to yes/no or icon of yes/no */
  static boolToYesNo(b?: boolean, withText = false) {
    const text = b ? 'yes' : 'no '
    const icon = b ? '✅' : '🚫'

    return icon + (withText ? text : '')
  }

  /**
   * Convert snake_case to camelCase
   * @param str
   * @returns
   */
  static toCamelCase(str: string): string {
    if (!str) return str // empty string case

    const cleanedStr = str.startsWith('_') ? str.substring(1) : str // Handle leading underscore by removing it first
    return cleanedStr.replace(/_./g, (match) => match.charAt(1).toUpperCase())
  }

  /** convert camelCase to snake_case
   * @example someHereIsGood ==> some_here_is_good. CAPITALIZED ==> c_a_p_i_t_a_l_i_z_e_d
   */
  static camelToSnakeCase(str: string): string {
    const snakeCase = str.replace(/([A-Z])/g, (match, p1) => `_${p1.toLowerCase()}`)

    return snakeCase.startsWith('_') ? snakeCase.slice(1) : snakeCase
  }
}
