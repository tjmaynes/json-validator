export const isValidJson = (rawValue: string): boolean => {
  try {
    JSON.parse(rawValue)
    return true
  } catch {
    return false
  }
}

export const prettifyJson = (rawValue: string): string =>
  JSON.stringify(JSON.parse(rawValue), null, '  ')

export const compressJson = (rawValue: string): string =>
  JSON.stringify(JSON.parse(rawValue), null, '')
