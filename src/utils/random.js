export function randomInt(min, max) {
  return min + Math.round(Math.random() * (max - min))
}

/**
 * @example
 *   weightedRandomInt([
 *     { min: 0, max: 25, weight: 8 },
 *     { min: 26, max: 50, weight: 4 },
 *     { min: 51, max: 75, weight: 2 },
 *     { min: 76, max: 100, weight: 1 }
 *   ])
 * @param {Object<{ min: Number, max: Number, weight: Number }>} spec
 */
export function weightedRandomInt(spec) {
  const weights = spec.reduce(
    (acc, x, i) => acc.concat(Array(x.weight).fill(i)),
    []
  )
  const rand = randomInt(0, weights.length - 1)
  const { min, max } = spec[weights[rand]]
  return randomInt(min, max)
}
