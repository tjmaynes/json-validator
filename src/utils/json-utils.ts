export const isValidJson = (rawValue: string): boolean => {
  try {
    JSON.parse(rawValue)
    return true
  } catch {
    return false
  }
}

export const prettifyJson = (rawValue: string): string => {
  return JSON.stringify(JSON.parse(rawValue), null, '   ')
}
