import { compose, toLower } from 'ramda'

const RE_PUNCTUATION = /[.。,，‘’'!！?？\-－]+/g // Both half and full-width
const RE_WHITESPACE = /\s+/g

const punctuation = (s) => s.replace(RE_PUNCTUATION, '')
const whitespace = (s) => s.replace(RE_WHITESPACE, '')

export const normalise = compose(punctuation, whitespace, toLower)

export const isEqualCharacters = (attempt, answer) =>
  normalise(attempt) === normalise(answer)
