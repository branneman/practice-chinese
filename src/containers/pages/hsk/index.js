import React, { useEffect, useRef, useState } from 'react'
import { compose, map, filter, slice, assoc } from 'ramda'

import hsk from '../../../data/hsk.json'
import { shuffle } from '../../../utils/random'

import './index.scss'

const ENTER_KEY = 13

export const getInitialData = () =>
  compose(shuffle, map(assoc('correct', null)), slice(0, Infinity))(hsk)

export const getPercentageCorrect = (answers) => {
  const p = filter((x) => x.correct === true, answers).length / answers.length
  return Math.round(p * 10000) / 100 // Safely round to 2 decimals
}

export default function HskPage() {
  const answerRef = useRef(null)

  const [state, setState] = useState('start')

  const [answers, setAnswers] = useState(getInitialData())
  const checkAnswer = () => {
    const word = answers[question]
    const correct = answerRef.current.value === word.word

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
    if (answerRef.current) answerRef.current.focus()
  })

  useEffect(() => {
    const fn = (e) => {
      e.preventDefault()
      if (e.keyCode === ENTER_KEY) nextAction()
    }
    window.addEventListener('keyup', fn)
    return () => window.removeEventListener('keyup', fn)
  })

  let nextAction
  switch (state) {
    case 'question':
      nextAction = () => checkAnswer()
      return (
        <section className="section section--hsk-practice">
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
        <section className="section section--correct section--hsk-practice">
          <p className="assignment-result">Correct!</p>
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'incorrect':
      nextAction = () => nextQuestion()
      return (
        <section className="section section--incorrect section--hsk-practice">
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
        setAnswers(getInitialData())
        setQuestion(0)
        setState('question')
      }
      return (
        <section className="section section--correct section--hsk-practice">
          <p className="">Correct: {getPercentageCorrect(answers)}%</p>
          <button className="cta--next" onClick={nextAction}>
            Restart
          </button>
        </section>
      )

    default:
    case 'start':
      nextAction = () => setState('question')
      return (
        <section className="section section--hsk-practice">
          <button className="cta--next" onClick={nextAction}>
            Start
          </button>
        </section>
      )
  }
}
