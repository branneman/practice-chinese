import React, { useEffect, useRef, useState } from 'react'
import { compose, map, filter, slice, assoc } from 'ramda'
// import useVisualViewport from '../../../hooks/viewport'

import { isPOJO, isArr, isStr } from '../../../utils/type-checks'
import { shuffle } from '../../../utils/random'

import './index.scss'

const FOCUS_DELAY_MS = 50
const ENTER_KEY = 13
const VOCAB_URL = `https://gist.githubusercontent.com/branneman/20d2b2cc1e234c4b664f1cf3962082e7/raw/zhongwen-vocab-bran.json`

export const shuffleData = compose(
  shuffle,
  map(assoc('correct', null)),
  slice(0, Infinity)
)

export const isValidData = (data) => {
  if (!isArr(data)) return false
  return !data.some((d) => {
    if (!isPOJO(d)) return true
    if (!isStr(d.word)) return true
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
    async function f() {
      try {
        const response = await fetch(VOCAB_URL)
        const jsonStr = await response.text()
        const json = JSON.parse(jsonStr)
        if (!isValidData(json)) throw new Error('Error: JSON not valid')
        setData(json)
        setState('start')
      } catch (err) {
        console.log(err)
        setData(err)
        setState('error')
      }
    }
    f()
  }, [])

  const [answers, setAnswers] = useState(null)
  const checkAnswer = () => {
    const word = answers[question]
    const correct = answerRef.current.value.trim() === word.word

    setState(correct ? 'correct' : 'incorrect')

    word.correct = correct
    setAnswers(answers)
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
          <p className="assignment-text">
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
        <section className="section section--vocab-practice">
          <p className="assignment-result">Correct!</p>
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'incorrect':
      nextAction = () => nextQuestion()
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-result">Incorrect!</p>
          {answers[answers.length - 1] && (
            <p className="assignment-description">
              Correct answer: {answers[question].word} (
              {answers[question].pinyin1})
            </p>
          )}
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'done':
      nextAction = () => {
        setAnswers(shuffleData(data))
        setQuestion(0)
        setState('question')
      }
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
      nextAction = () => {
        setAnswers(shuffleData(data))
        setState('question')
      }
      return (
        <section className="section section--vocab-practice">
          <p className="assignment-description">
            Translate personal vocabulary to Chinese
          </p>
          {/* <input
            ref={vocabRef}
            className="practice-input"
            type="text"
            value={VOCAB_URL}
          /> */}
          <button className="cta--next" onClick={nextAction}>
            Start
          </button>
        </section>
      )
  }
}
