export type Nullable<T> = T | null

type SkipClassName = boolean | null | undefined
type ClassName = string | SkipClassName | Record<string, SkipClassName>
export function cx(...classNames: Array<ClassName>) {
  return classNames
    .filter((c): c is Exclude<ClassName, SkipClassName> => !!c)
    .flatMap((c) => {
      if (typeof c === 'string') {
        return c
      }
      return Object.keys(c).filter((k) => !!c[k])
    })
    .join(' ')
}

export function delay<T>(ms: number, value?: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}

export function draf(cb: FrameRequestCallback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}

type TimeoutError = DOMException & { name: 'TimeoutError' }
export function isTimeoutError(err: unknown): err is TimeoutError {
  return err instanceof DOMException && err.name === 'TimeoutError'
}

type TryCatchResult<T, E> = [data: T, error: undefined] | [data: undefined, error: E]
export function tryCatch<T, E = Error>(fn: () => T): TryCatchResult<T, E> {
  try {
    return [fn(), undefined]
  } catch (e: any) {
    return [undefined, e]
  }
}

export const Time = {
  seconds(n: number) {
    return n * 1000
  },
  minutes(n: number) {
    return n * 60 * 1000
  },
  hours(n: number) {
    return n * 60 * 60 * 1000
  },
}
