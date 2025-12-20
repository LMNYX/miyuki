type UpdateRules<T extends Record<string, any>> = {
  [K in keyof T]?: {
    trim?: boolean
    toLowerCase?: boolean
    unsetOnNull?: boolean
    transform?: (value: any) => any
  }
}

export function buildMongoUpdate<T extends Record<string, any>>(
  body: Partial<T>,
  rules: UpdateRules<T> = {}
) {
  const $set: Record<string, any> = {}
  const $unset: Record<string, ''> = {}

  for (const key in rules) {
    if (!(key in body)) continue

    let value = body[key]

    const rule = rules[key]!

    if (value === null) {
      if (rule.unsetOnNull) {
        $unset[key] = ''
      } else {
        $set[key] = null
      }
      continue
    }

    if (typeof value === 'string') {
      if (rule.trim) value = value.trim()
      if (rule.toLowerCase) value = value.toLowerCase()
    }

    if (rule.transform) {
      value = rule.transform(value)
    }

    $set[key] = value
  }

  const update: any = {}
  if (Object.keys($set).length) update.$set = $set
  if (Object.keys($unset).length) update.$unset = $unset

  return update
}
