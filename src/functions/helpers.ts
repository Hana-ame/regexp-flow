export function range(n: number) {
  return Array.from(Array(n).keys());
}

export function hasItem(key: string) {
  return localStorage.getItem(key) !== null
}

export function saveItem(key: string, obj:{n:number, patternArray:[string,string,string][]}) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function loadItem(key: string) {
  if (!hasItem(key)) {
    return { n: 1, patternArray: [['','','']] } as {n:number, patternArray:[string,string,string][]}
  }
  const obj : {n:number, patternArray:[string,string,string][]} = JSON.parse(localStorage.getItem(key)!)!;
  return obj
}