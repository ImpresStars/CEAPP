export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from storage: ${key}`, error)
    return defaultValue
  }
}

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to storage: ${key}`, error)
    return false
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from storage: ${key}`, error)
    return false
  }
}

export const clearStorage = (prefix = '') => {
  try {
    if (prefix) {
      Object.keys(localStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => localStorage.removeItem(key))
    } else {
      localStorage.clear()
    }
    return true
  } catch (error) {
    console.error('Error clearing storage', error)
    return false
  }
}