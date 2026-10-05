const PLACEHOLDER_PATTERN = /^\[ADD/i

export function isRealValue(str) {
  if (!str || typeof str !== "string") return false
  return str.trim().length > 0 && !PLACEHOLDER_PATTERN.test(str.trim())
}

export function hasContent(data) {
  if (!data) return false
  if (Array.isArray(data)) {
    if (data.length === 0) return false
    return data.some(item => {
      if (typeof item === "string") return isRealValue(item)
      if (typeof item === "object") {
        const primaryField = item.title || item.name || item.label || ""
        return isRealValue(primaryField)
      }
      return true
    })
  }
  if (typeof data === "object") {
    return Object.values(data).some(val => isRealValue(String(val ?? "")))
  }
  return isRealValue(String(data))
}
