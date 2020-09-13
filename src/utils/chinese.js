import { compose } from 'ramda'

const RE_PUNCTUATION = /[.。,，!！?？\-－]+/g // Both half and full-width
const RE_WHITESPACE = /\s+/g

export const isEqualCharacters = (attempt, answer) => {
  const punctuation = (s) => s.replace(RE_PUNCTUATION, '')
  const whitespace = (s) => s.replace(RE_WHITESPACE, '')
  const xf = compose(punctuation, whitespace)
  return xf(attempt) === xf(answer)
}
