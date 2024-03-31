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
