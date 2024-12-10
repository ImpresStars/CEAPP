class StorageService {
  constructor(prefix = 'cleaningEdge_') {
    this.prefix = prefix
    this.initialize()
  }

  initialize() {
    try {
      // Test storage availability
      const testKey = `${this.prefix}test`
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
    } catch (error) {
      console.warn('LocalStorage is not available:', error)
    }
  }

  _getKey(key) {
    return `${this.prefix}${key}`
  }

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this._getKey(key))
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.warn(`Error reading from storage: ${key}`, error)
      return defaultValue
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(this._getKey(key), JSON.stringify(value))
      return true
    } catch (error) {
      console.warn(`Error writing to storage: ${key}`, error)
      return false
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this._getKey(key))
      return true
    } catch (error) {
      console.warn(`Error removing from storage: ${key}`, error)
      return false
    }
  }

  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key))
      return true
    } catch (error) {
      console.warn('Error clearing storage', error)
      return false
    }
  }

  isAvailable() {
    try {
      const testKey = `${this.prefix}test`
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }
}

export const storage = new StorageService()