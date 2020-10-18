const data = {
  pinyin: {
    /* .initial.final.{name,final,tones[]} */
  },
  radicals: [
    {
      radical: '一',
      pinyin: 'yī',
      english: ['one'],
      strokeCount: 1,
    },
  ],
  characters: {
    hsk1: [{ character: '点', pinyin: 'diǎn', radical: '火' }],
    dl: [],
    eur: [],
  },
  words: {
    hsk1: [
      { chinese: [{ word: '爸爸', pinyin: 'bàba' }], english: ['father'] },
    ],
    dl: [
      {
        chinese: [
          { word: '知道', pinyin: 'zhīdào' },
          { word: '认识', pinyin: 'rènshí' },
        ],
        english: ['to know'],
      },
    ],
    eur: [
      { chinese: [{ word: '知道', pinyin: 'zhīdào' }], english: ['to know'] },
    ],
  },
  sentences: {
    hsk1: [],
    dl: [],
    eur: [
      {
        chinese: [
          { sentence: '你叫什么？', pinyin: 'Nǐ jiào shénme?' },
          { sentence: '你叫什么名字？', pinyin: 'Nǐ jiáo shénme míngzi?' },
          { sentence: '你的名字是什么？', pinyin: 'Nǐde míngzi shì shénme?' },
        ],
        english: ["What's your name?"],
      },
    ],
  },
}

/*
READ

  RADICAL (source: archchinese)
    radical -> english
    radical -> pinyin

  CHARACTER (source: duolingo, erasmus, hsk1 archchinese)
    character -> stroke order   !
    character -> radical
    character -> pinyin

  WORD (source: duolingo, erasmus, hsk1 archchinese)
    english -> characters
    english -> pinyin
    characters -> english
    characters -> pinyin

  SENTENCE (source: duolingo, erasmus, hsk1 everyday chinese)
    english -> characters
    english -> pinyin
    characters -> english
    characters -> pinyin
    pinyin -> english

  NUMBERS (source: existing db, pictures from wikipedia)
    arabic -> characters        !
    arabic -> pinyin            !
    characters -> arabic        !
    characters -> pinyin        !
    pinyin -> arabic            !
    gestures -> arabic          !
    gestures -> characters      !


LISTEN

  SOUND (source: archchinese)
    [pinyin table sound] -> 1-4
    [pinyin table sound] -> pinyin

  NUMBERS (source: archchinese)
    [number] -> arabic
    [phone number] -> characters

  WORD (source: hsk1 everyday chinese)
    english -> characters
    english -> pinyin
    chinese -> english
    chinese -> pinyin

  SENTENCE (source: hsk1 everyday chinese)
    english -> characters
    english -> pinyin
    chinese -> english
    chinese -> characters
    chinese -> pinyin
*/

const list = () => 0 // retrieve the correct array
const question = (x) => 0 // when given obj, retrieve the correct key to formulate a question
const validate = (x, a) => 0 // when given obj + answer, return boolean correctness

/////////////////////////////////////////////////////////////////

// READ - RADICAL - radical -> english
const list = (data) => data.radicals
const question = (x) => x.radical
const validate = (x, a) => includes(normalise(a), map(normalise, x.english))

// READ - RADICAL - radical -> pinyin
const list = (data) => data.radicals
const question = (x) => x.radical
const validate = (x, a) => normalise(x.pinyin) === normalise(a)

/////////////////////////////////////////////////////////////////

// READ - CHARACTER - character -> stroke order
const list = (data, vocab) =>
  flatten(map(prop('chinese'), data.characters[vocab]))
const question = (x) => x.character
const validate = null

// READ - CHARACTER - character -> radical
const list = (data, vocab) =>
  flatten(map(prop('chinese'), data.characters[vocab]))
const question = (x) => x.character
const validate = (x, a) => normalise(x.radical) === normalise(a)

// READ - CHARACTER - character -> pinyin
const list = (data, vocab) =>
  flatten(map(prop('chinese'), data.characters[vocab]))
const question = (x) => x.character
const validate = (x, a) => normalise(x.pinyin) === normalise(a)

/////////////////////////////////////////////////////////////////

// READ - WORD - english -> characters
const list = (data, vocab) => data.words[vocab]
const question = (x) => join(',', x.english)
const validate = (x, a) =>
  includes(normalise(a), map(normalise, map(prop('word'), x.chinese)))

// READ - WORD - english -> pinyin
const list = (data, vocab) => data.words[vocab]
const question = (x) => join(',', x.english)
const validate = (x, a) =>
  includes(normalise(a), map(normalise, map(prop('pinyin'), x.chinese)))

// READ - WORD - characters -> english
const _f = (x) => map(assoc('english', x.english), x.chinese)
const list = (data, vocab) => flatten(map(_f, data.words[vocab]))
const question = (x) => x.word
const validate = (x, a) => includes(normalise(a), map(normalise, x.english))

// READ - WORD - characters -> pinyin
const list = (data, vocab) => flatten(map(prop('chinese'), data.words[vocab]))
const question = (x) => x.word
const validate = (x, a) => normalise(x.pinyin) === normalise(a)

/////////////////////////////////////////////////////////////////

// READ - SENTENCE - english -> characters
const list = (data, vocab) => data.sentences[vocab]
const question = (x) => join(',', x.english)
const validate = (x, a) =>
  includes(normalise(a), map(normalise, map(prop('sentence'), x.chinese)))

// READ - SENTENCE - english -> pinyin
const list = (data, vocab) => data.sentences[vocab]
const question = (x) => join(',', x.english)
const validate = (x, a) =>
  includes(normalise(a), map(normalise, map(prop('pinyin'), x.chinese)))

// READ - SENTENCE - characters -> english
const list = (data, vocab) => data.sentences[vocab]
const question = (x) => join('，', map(prop('sentence'), x.chinese))
const validate = (x, a) => includes(normalise(a), map(normalise, x.english))

// READ - SENTENCE - characters -> pinyin
const list = (data, vocab) =>
  flatten(map(prop('chinese'), data.sentences[vocab]))
const question = (x) => x.sentence
const validate = (x, a) => normalise(x.pinyin) === normalise(a)

// READ - SENTENCE - pinyin -> english
const _f = (x) => map(assoc('english', x.english), x.chinese)
const list = (data, vocab) => flatten(map(_f, data.sentences[vocab]))
const question = (x) => x.pinyin
const validate = (x, a) => includes(normalise(a), map(normalise, x.english))

/////////////////////////////////////////////////////////////////

// READ - NUMBERS - arabic -> characters
// READ - NUMBERS - arabic -> pinyin
// READ - NUMBERS - characters -> arabic
// READ - NUMBERS - characters -> pinyin
// READ - NUMBERS - pinyin -> arabic
// READ - NUMBERS - gestures -> arabic
// READ - NUMBERS - gestures -> characters

/////////////////////////////////////////////////////////////////

// LISTEN - SOUND - [pinyin table sound] -> 1-4
// LISTEN - SOUND - [pinyin table sound] -> pinyin

/////////////////////////////////////////////////////////////////

// LISTEN - NUMBERS - [number] -> arabic
// LISTEN - NUMBERS - [phone number] -> characters

/////////////////////////////////////////////////////////////////

// LISTEN - WORD - english -> characters
// LISTEN - WORD - english -> pinyin
// LISTEN - WORD - chinese -> english
// LISTEN - WORD - chinese -> pinyin

/////////////////////////////////////////////////////////////////

// LISTEN - SENTENCE - english -> characters
// LISTEN - SENTENCE - english -> pinyin
// LISTEN - SENTENCE - chinese -> english
// LISTEN - SENTENCE - chinese -> characters
// LISTEN - SENTENCE - chinese -> pinyin
