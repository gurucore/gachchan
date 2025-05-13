/** Custom Error class, with support extra information about the exception.
 *
 * @example const myError = new CustomError('Something went wrong')
 * console.log(myError.stack)
 * Error: Something went wrong
 * at <anonymous>:8:17
 */
export class CustomError extends Error {
  constructor(
    message: string,

    /** original error */
    public readonly error?: Error | unknown,

    /** extra information about the exception, attached to this Error */
    public readonly extra?: any
  ) {
    super(message)

    if ('captureStackTrace' in Error) {
      // Avoid CustomError itself in the stack trace
      Error.captureStackTrace(this, CustomError)
    }

    this.name = this.constructor.name || 'CustomError'
  }
}
