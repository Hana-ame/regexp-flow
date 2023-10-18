export class LocalStorageManager<V> {
  // class properties
  private prefix: string

  constructor(prefix: string) {
    this.prefix = prefix + '-'
  }

  fullkey(key: string) {
    return this.prefix + key
  }
  getKeys() {
    const prefix = this.prefix
    const keys : string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith(prefix)) {
        keys.push(key.substring(prefix.length))
      }      
    } 
    return keys
  }
  getValue(key: string) {
    const fullKey = this.fullkey(key)
    const stringValue = localStorage.getItem(fullKey)
    if (stringValue === null) return null
    const value : V | null= JSON.parse(stringValue) ?? null
    if (value === null) return null
    return value as V
  }  
  hasKey(key: string) {
    const value = this.getValue(key)
    return value !== null    
  }
  putValue(key: string, value: V) {
    const fullKey = this.fullkey(key)
    const stringValue = JSON.stringify(value)
    localStorage.setItem(fullKey, stringValue)
  }
  removeItem(key: string) {
    const fullKey = this.fullkey(key)
    localStorage.removeItem(fullKey)
  }
}