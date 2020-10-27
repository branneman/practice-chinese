import { map, flatten, prop, assoc, join, includes } from 'ramda'
import { normalise } from '../utils/chinese'

import radicals from './radicals'
import characters from './characters'
import words from './words'
import sentences from './sentences'

export const data = {
  radicals,
  characters,
  words,
  sentences,
}

export const fn = {
  read: [
    {
      id: 'radicals',
      name: 'Radicals',
      directions: [
        {
          id: 'radical>english',
          name: 'Radical to English',
          list: (data, _vocab) => data.radicals,
          question: (x) => x.radical,
          answers: (x) => [join(', ', x.english)],
          validate: (x, a) => includes(normalise(a), map(normalise, x.english)),
        },
        {
          id: 'radical>pinyin',
          name: 'Radical to Pinyin',
          list: (data, _vocab) => data.radicals,
          question: (x) => x.radical,
          answers: (x) => [x.pinyin],
          validate: (x, a) => normalise(x.pinyin) === normalise(a),
        },
      ],
    },
    {
      id: 'characters',
      name: 'Characters',
      directions: [
        // {
        //   id: 'character>radical',
        //   name: 'Character to Radical',
        //   vocabs: ['HSK1'],
        //   list: (data, vocab) => data.characters[vocab],
        //   question: (x) => x.character,
        //   answers: (x) => [x.radical],
        //   validate: (x, a) => normalise(x.radical) === normalise(a),
        // },
        {
          id: 'character>pinyin',
          name: 'Character to Pinyin',
          vocabs: ['HSK1'],
          list: (data, vocab) => data.characters[vocab],
          question: (x) => x.character,
          answers: (x) => [x.pinyin],
          validate: (x, a) => normalise(x.pinyin) === normalise(a),
        },
      ],
    },
    {
      id: 'words',
      name: 'Words',
      directions: [
        {
          id: 'english>characters',
          name: 'English to Characters',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 5', 'HSK1'],
          list: (data, vocab) => data.words[vocab],
          question: (x) => join(', ', x.english),
          answers: (x) =>
            map(({ word, pinyin }) => `${word} (${pinyin})`, x.chinese),
          validate: (x, a) =>
            includes(
              normalise(a),
              map(normalise, map(prop('word'), x.chinese))
            ),
        },
        {
          id: 'english>pinyin',
          name: 'English to Pinyin',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 5', 'HSK1'],
          list: (data, vocab) => data.words[vocab],
          question: (x) => join(', ', x.english),
          answers: (x) =>
            map(({ word, pinyin }) => `${pinyin}（${word}）`, x.chinese),
          validate: (x, a) =>
            includes(
              normalise(a),
              map(normalise, map(prop('pinyin'), x.chinese))
            ),
        },
        {
          id: 'characters>english',
          name: 'Characters to English',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 5', 'HSK1'],
          list: (data, vocab) =>
            flatten(
              map(
                (x) => map(assoc('english', x.english), x.chinese),
                data.words[vocab]
              )
            ),
          question: (x) => x.word,
          answers: (x) => [join(', ', x.english)],
          validate: (x, a) => includes(normalise(a), map(normalise, x.english)),
        },
        {
          id: 'characters>pinyin',
          name: 'Characters to Pinyin',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 5', 'HSK1'],
          list: (data, vocab) =>
            flatten(map(prop('chinese'), data.words[vocab])),
          question: (x) => x.word,
          answers: (x) => [x.pinyin],
          validate: (x, a) => normalise(x.pinyin) === normalise(a),
        },
      ],
    },
    {
      id: 'sentences',
      name: 'Sentences',
      directions: [
        {
          id: 'english>characters',
          name: 'English to Characters',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 4'],
          list: (data, vocab) => data.sentences[vocab],
          question: (x) => join(', ', x.english),
          answers: (x) =>
            map(({ sentence, pinyin }) => `${sentence} (${pinyin})`, x.chinese),
          validate: (x, a) =>
            includes(
              normalise(a),
              map(normalise, map(prop('sentence'), x.chinese))
            ),
        },
        {
          id: 'english>pinyin',
          name: 'English to Pinyin',
          vocabs: ['EUR: All', 'EUR: Lesson 4'],
          list: (data, vocab) => data.sentences[vocab],
          question: (x) => join(', ', x.english),
          answers: (x) =>
            map(
              ({ sentence, pinyin }) => `${pinyin}（${sentence}）`,
              x.chinese
            ),
          validate: (x, a) =>
            includes(
              normalise(a),
              map(normalise, map(prop('pinyin'), x.chinese))
            ),
        },
        {
          id: 'characters>english',
          name: 'Characters to English',
          vocabs: ['DL', 'EUR: All', 'EUR: Lesson 4'],
          list: (data, vocab) => data.sentences[vocab],
          question: (x) => join('，', map(prop('sentence'), x.chinese)),
          answers: (x) => x.english,
          validate: (x, a) => includes(normalise(a), map(normalise, x.english)),
        },
        {
          id: 'characters>pinyin',
          name: 'Characters to Pinyin',
          vocabs: ['EUR: All', 'EUR: Lesson 4'],
          list: (data, vocab) =>
            flatten(map(prop('chinese'), data.sentences[vocab])),
          question: (x) => x.sentence,
          answers: (x) => [x.pinyin],
          validate: (x, a) => normalise(x.pinyin) === normalise(a),
        },
        {
          id: 'pinyin>english',
          name: 'Pinyin to English',
          vocabs: ['EUR: All', 'EUR: Lesson 4'],
          list: (data, vocab) =>
            flatten(
              map(
                (x) => map(assoc('english', x.english), x.chinese),
                data.sentences[vocab]
              )
            ),
          question: (x) => x.pinyin,
          answers: (x) => x.english,
          validate: (x, a) => includes(normalise(a), map(normalise, x.english)),
        },
      ],
    },
  ],
}
