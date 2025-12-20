type Primitive = string | number | boolean | null
type Diffable = Primitive | Primitive[] | Record<string, any>

export function buildPatchPayload<T extends Record<string, Diffable>>(
  original: Readonly<T>,
  current: Readonly<T>
): Partial<T> {
  const payload: Partial<T> = {}

  for (const key in current) {
    const originalValue = original[key]
    const currentValue = current[key]

    if (isEqual(originalValue, currentValue)) continue

    payload[key] = currentValue
  }

  return payload
}

function isEqual(a: Diffable, b: Diffable): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => v === b[i])
  }

  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}
