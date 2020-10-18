import { fn } from './index.js'
import data from './index.mock.js'

describe('fn', () => {
  describe('read', () => {
    describe('radicals', () => {
      const radicals = fn.read.find((x) => x.id === 'radicals')

      describe('radical > english', () => {
        const direction = radicals.directions.find(
          (x) => x.id === 'radical>english'
        )

        it('list', () => {
          const r = direction.list(data)
          expect(r).toEqual([
            {
              radical: 'A1',
              pinyin: 'A2',
              english: ['A3'],
            },
            {
              radical: 'A4',
              pinyin: 'A5',
              english: ['A6', 'A7'],
            },
          ])
        })

        it('question', () => {
          const x = data.radicals[0]
          const r = direction.question(x)
          expect(r).toEqual('A1')
        })

        it('answers', () => {
          const x1 = data.radicals[0]
          const r1 = direction.answers(x1)
          expect(r1).toEqual(['A3'])

          const x2 = data.radicals[1]
          const r2 = direction.answers(x2)
          expect(r2).toEqual(['A6, A7'])
        })

        it('validate', () => {
          const x1 = data.radicals[0]
          const r1 = direction.validate(x1, 'A6')
          expect(r1).toEqual(false)

          const x2 = data.radicals[1]
          const r2 = direction.validate(x2, 'A7')
          expect(r2).toEqual(true)
        })
      })

      describe('radical > pinyin', () => {
        const direction = radicals.directions.find(
          (x) => x.id === 'radical>english'
        )

        it('list', () => {
          const r = direction.list(data)
          expect(r).toEqual([
            {
              radical: 'A1',
              pinyin: 'A2',
              english: ['A3'],
            },
            {
              radical: 'A4',
              pinyin: 'A5',
              english: ['A6', 'A7'],
            },
          ])
        })

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })
    })

    describe('characters', () => {
      describe('character > radical', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('character > pinyin', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })
    })

    describe('words', () => {
      describe('english > characters', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('english > pinyin', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('characters > english', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('characters > pinyin', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })
    })

    describe('sentences', () => {
      describe('english > characters', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('english > pinyin', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('characters > english', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('characters > pinyin', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })

      describe('pinyin>english', () => {
        xit('list', () => {})

        xit('question', () => {})

        xit('answers', () => {})

        xit('validate', () => {})
      })
    })
  })
})
