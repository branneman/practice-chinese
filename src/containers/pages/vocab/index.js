import React, { useEffect, useRef, useState } from 'react'
import { compose, map, filter, slice, assoc } from 'ramda'
// import useVisualViewport from '../../../hooks/viewport'

import { isEqualCharacters } from '../../../utils/chinese'
import { shuffle } from '../../../utils/random'
import { isPOJO, isArr, isStr } from '../../../utils/type-checks'

import './index.scss'

const FOCUS_DELAY_MS = 50
const ENTER_KEY = 13
const VOCAB_BASE_URL = `https://gist.githubusercontent.com/branneman/20d2b2cc1e234c4b664f1cf3962082e7/raw`
const VOCAB_URL_VOCAB1 = `${VOCAB_BASE_URL}/zhongwen-vocab-vocab1.json`
const VOCAB_URL_VOCAB2 = `${VOCAB_BASE_URL}/zhongwen-vocab-vocab2.json`
const VOCAB_URL_SENTENCES = `${VOCAB_BASE_URL}/zhongwen-vocab-sentences.json`

export const shuffleData = compose(
  shuffle,
  map(assoc('correct', null)),
  slice(0, Infinity)
)

export const isValidData = (data) => {
  if (!isArr(data)) return false
  return !data.some((d) => {
    if (!isPOJO(d)) return true
    if (!isStr(d.zhongwen)) return true
    if (!isArr(d.english)) return true
    return !d.english.some(isStr)
  })
}

export const getPercentageCorrect = (answers) => {
  const p = filter((x) => x.correct === true, answers).length / answers.length
  return Math.round(p * 10000) / 100 // Safely round to 2 decimals
}

export default function VocabPage() {
  const answerRef = useRef(null)

  // const visualViewport = useVisualViewport()

  const [data, setData] = useState(null)
  const [state, setState] = useState('loading')

  useEffect(() => {
    ;(async () => {
      try {
        const [resVocab1, resVocab2, resSentences] = await Promise.all([
          fetch(VOCAB_URL_VOCAB1),
          fetch(VOCAB_URL_VOCAB2),
          fetch(VOCAB_URL_SENTENCES),
        ])
        const [
          jsonStrVocab1,
          jsonStrVocab2,
          jsonStrSentences,
        ] = await Promise.all([
          resVocab1.text(),
          resVocab2.text(),
          resSentences.text(),
        ])
        const [vocab1, vocab2, sentences] = [
          JSON.parse(jsonStrVocab1),
          JSON.parse(jsonStrVocab2),
          JSON.parse(jsonStrSentences),
        ]
        if (
          !isValidData(vocab1) ||
          !isValidData(vocab2) ||
          !isValidData(sentences)
        ) {
          throw new Error('Error: JSON not valid')
        }
        setData({ vocab1, vocab2, sentences })
        setState('start')
      } catch (err) {
        console.log(err)
        setData(err)
        setState('error')
      }
    })()
  }, [])

  const [answers, setAnswers] = useState(null)
  const checkAnswer = () => {
    const zhongwen = answers[question]
    const correct = isEqualCharacters(
      answerRef.current.value,
      zhongwen.zhongwen
    )

    zhongwen.answer = answerRef.current.value
    zhongwen.correct = correct
    setAnswers(answers)

    setState(correct ? 'correct' : 'incorrect')
  }

  const [question, setQuestion] = useState(0)
  const nextQuestion = () => {
    const next = question + 1
    if (next >= answers.length) {
      setState('done')
    } else {
      setQuestion(next)
      setState('question')
    }
  }

  useEffect(() => {
    if (answerRef.current)
      setTimeout(() => answerRef.current.focus(), FOCUS_DELAY_MS)
  })

  useEffect(() => {
    const fn = (e) => {
      e.preventDefault()
      if (e.keyCode === ENTER_KEY) nextAction()
    }
    window.addEventListener('keyup', fn)
    return () => window.removeEventListener('keyup', fn)
  })

  let nextAction = () => 0
  switch (state) {
    case 'question':
      nextAction = () => checkAnswer()
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-description">Translate to Chinese</p>
          <p className="assignment-text assignment-text--smaller">
            {answers[question].english.join(', ')}
          </p>
          <input ref={answerRef} className="practice-input" type="text" />
          <button className="cta--next" onClick={nextAction}>
            Check
          </button>
        </section>
      )

    case 'correct':
      nextAction = () => nextQuestion()
      return (
        <section className="section section--correct section--vocab-practice">
          <p className="assignment-result">Correct!</p>
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'incorrect':
      nextAction = () => nextQuestion()
      return (
        <section className="section section--incorrect section--vocab-practice">
          <p className="assignment-result">Incorrect!</p>
          {answers[answers.length - 1] && (
            <>
              <p className="assignment-description">Your answer:</p>
              <p className="assignment-description">
                {answers[question].answer}
              </p>
              <p className="assignment-description">Correct answer:</p>
              <p className="assignment-description">
                {answers[question].zhongwen}
              </p>
              <p className="assignment-description">
                {answers[question].pinyin1}
              </p>
            </>
          )}
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'done':
      nextAction = () => setState('start')
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-result">
            Correct: {getPercentageCorrect(answers)}%
          </p>
          <button className="cta--next" onClick={nextAction}>
            Restart
          </button>
        </section>
      )

    case 'loading':
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-description">Loading...</p>
        </section>
      )

    case 'error':
      return (
        <section className="section section--incorrect section--vocab-practice">
          <p className="assignment-description">
            Error while loading vocab JSON
          </p>
        </section>
      )

    default:
    case 'start':
      nextAction = (type) => () => {
        setAnswers(shuffleData(data[type]))
        setQuestion(0)
        setState('question')
      }
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-description">
            Translate personal vocabulary to Chinese
          </p>
          <button className="cta" onClick={nextAction('vocab1')}>
            Words: Vocab 1 (DL)
          </button>
          <button className="cta" onClick={nextAction('vocab2')}>
            Words: Vocab 2 (EUR)
          </button>
          <button className="cta" onClick={nextAction('sentences')}>
            Sentences
          </button>
        </section>
      )
  }
}
