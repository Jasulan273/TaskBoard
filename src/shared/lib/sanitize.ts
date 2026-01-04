export const sanitizeText = (value: string) => value.replace(/[<>]/g, "").trim()

export const normalizeOptional = (value?: string) => {
  if (value === undefined) {
    return undefined
  }
  const cleaned = sanitizeText(value)
  return cleaned.length > 0 ? cleaned : undefined
}
