export const unique = <T,>(items: T[]) => Array.from(new Set(items))

export const groupBy = <T, K extends PropertyKey>(
  items: T[],
  getKey: (item: T) => K,
) => {
  return items.reduce<Record<K, T[]>>((acc, item) => {
    const key = getKey(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<K, T[]>)
}
