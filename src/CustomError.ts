/** Custom Error class, with support extra information about the exception.
 *
 * @example const myError = new CustomError('Something went wrong')
 * console.log(myError.stack)
 * Error: Something went wrong
 * at <anonymous>:8:17
 */
export class CustomError extends Error {
  public errorCode?: number

  /**
   *
   * @param messageOrErrorCode string for message, or number for errorCode
   * @param error original error (if any). This will be contained inside this error object
   * @param extra extra information, attached to this Error. Can add any arbitrary object to provider extra strutured information
   */
  constructor(
    messageOrErrorCode: string | number,

    /** original error */
    public readonly error?: Error | unknown,

    /** extra information about the exception, attached to this Error */
    public readonly extra?: any
  ) {
    super(messageOrErrorCode.toString())

    if ('captureStackTrace' in Error) {
      // Avoid CustomError itself in the stack trace
      Error.captureStackTrace(this, CustomError)
    }

    if (typeof messageOrErrorCode === 'number') {
      this.errorCode = messageOrErrorCode
    }
    
    this.error = error
    this.extra = extra
    this.name = this.constructor.name || 'CustomError'
  }
}
