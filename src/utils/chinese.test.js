import { isEqualCharacters } from './chinese'

describe('isEqualCharacters()', () => {
  it('removes punctuation from comparison', () => {
    const answer = '你是医生吗？'

    expect(isEqualCharacters('你是医生吗', answer)).toEqual(true)

    // half-width questionmark
    expect(isEqualCharacters('你是医生吗?', answer)).toEqual(true)

    // full-width questionmark
    expect(isEqualCharacters('你是医生吗？', answer)).toEqual(true)
  })

  it('removes whitespace from comparison', () => {
    const answer = '谢谢'

    expect(isEqualCharacters('谢谢', answer)).toEqual(true)

    // half-width leading space
    expect(isEqualCharacters(' 谢谢', answer)).toEqual(true)

    // full-width trailing space
    expect(isEqualCharacters('谢谢　', answer)).toEqual(true)
  })
})
