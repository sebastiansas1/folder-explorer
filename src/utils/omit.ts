export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const { ...rest } = obj

  keys.forEach((key) => {
    delete rest[key]
  })

  return rest
}
