import { LocalStorageManager } from './localStorageManager';

export const manager = new LocalStorageManager<FlowData>('flow')

export type FlowData = {
  key: string
  patternArray: Pattern[]
}

export type Pattern = {
  regexp: string
  flags: string[]
  replacePattern: string
}

export function getKeys(){
  return manager.getKeys()
}

export function hasItem(key: string) {
  return manager.getValue(key) !== null
}

export function saveItem(key: string, obj: FlowData) {
  manager.putValue(key, obj);
}

export function loadItem(key: string) {
  return manager.getValue(key)
}

export function removeItem(key: string) {
  manager.removeItem(key)
}

export function range(n: number) {
  return Array.from(Array(n).keys());
}

export function constructPatternArray( regexpArr: string[], flagsArr: string[][], replacePatternArr: string[] ) {
  const n = regexpArr.length
  const patternArray : Pattern[] = []
  for (let i = 0; i < n; i++) {
    patternArray.push({
      regexp: regexpArr[i],
      flags: flagsArr[i],
      replacePattern: replacePatternArr[i],
    })
  }
  return patternArray
}

export function constructFlowData( key: string, patternArray: Pattern[] ) {
  const flowData: FlowData = {key, patternArray}
  return flowData
}

export function deconstructPattern( pattern: Pattern[] ) {
  const regexpArr: string[] = pattern.map(p => p.regexp)
  const flagsArr: string[][] =  pattern.map(p => p.flags)
  const replacePatternArr: string[] = pattern.map(p => p.replacePattern)
  return [regexpArr , flagsArr , replacePatternArr] as [string[], string[][], string[]]
}