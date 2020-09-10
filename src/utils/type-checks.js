/**
 */
export function isDef(x) {
  return !isUndef(x) && !isNull(x)
}

/**
 * Does not match: `null`
 */
export function isUndef(val) {
  return typeof val === 'undefined'
}

/**
 * Does not match: `undefined`
 */
export function isNull(val) {
  return val === null
}

/**
 */
export function isBool(val) {
  return typeof val === 'boolean'
}

/**
 * Does not match: `NaN`, `Infinity`, `-Infinity`
 */
export function isNum(val) {
  return typeof val === 'number' && isFinite(val)
}

/**
 * Does not match: `NaN`, `Infinity`, `-Infinity`
 */
export function isInt(val) {
  return typeof val === 'number' && isFinite(val) && Math.floor(val) === val
}

/**
 */
export function isStr(val) {
  return typeof val === 'string'
}

/**
 */
export function isArr(val) {
  return Array.isArray(val)
}

/**
 * Does not match: arrays, functions, symbols
 */
export function isObj(val) {
  return val === Object(val) && !isArr(val) && !isFunc(val) && !isSymbol(val)
}

/**
 */
export function isPOJO(x) {
  return isObj(x) && Object.getPrototypeOf(x) === Object.prototype
}

/**
 */
export function isFunc(val) {
  return typeof val === 'function'
}

/**
 */
export function isSymbol(val) {
  return typeof val === 'symbol'
}
