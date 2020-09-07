import React, { useEffect, useRef, useState } from 'react'
// import useVisualViewport from '../../../hooks/viewport'

import { weightedRandomInt } from '../../../utils/random'
import arabic2chinese from '../../../utils/arabic2chinese'

import './index.scss'

const FOCUS_DELAY_MS = 50
const ENTER_KEY = 13
const TEST_MAX_RANDOM_INT = 9999

const getSemiRandomInt = () =>
  weightedRandomInt([
    { weight: 2 /* 40% */, min: 0, max: 99 },
    { weight: 2 /* 40% */, min: 0, max: TEST_MAX_RANDOM_INT },
    { weight: 1 /* 20% */, min: -TEST_MAX_RANDOM_INT, max: -1 },
  ])

export default function Numbers() {
  const answerRef = useRef(null)

  // const visualViewport = useVisualViewport()

  const [state, setState] = useState('start')

  const [answers, setAnswers] = useState([])
  const addAnswer = (a) => setAnswers(answers.concat(a))
  const checkAnswer = (n) => {
    const correct = arabic2chinese(n)
    const attempt = answerRef.current.value
    setState(attempt === correct ? 'correct' : 'incorrect')
    addAnswer({ n, attempt, correct })
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

  let nextAction
  switch (state) {
    case 'question':
      const int = getSemiRandomInt()
      nextAction = () => checkAnswer(int)
      return (
        <section className="section section--numbers-practice">
          <p className="assignment-description">Translate to Chinese</p>
          <p className="assignment-text">{int}</p>
          <input ref={answerRef} className="practice-input" type="text" />
          <button className="cta--next" onClick={nextAction}>
            Check
          </button>
        </section>
      )

    case 'correct':
      nextAction = () => setState('question')
      return (
        <section className="section section--correct section--numbers-practice">
          <p className="assignment-result">Correct!</p>
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'incorrect':
      nextAction = () => setState('question')
      return (
        <section className="section section--incorrect section--numbers-practice">
          <p className="assignment-result">Incorrect!</p>
          {answers[answers.length - 1] && (
            <p className="assignment-description">
              Correct answer: {answers[answers.length - 1].correct}
            </p>
          )}
          <button className="cta--next" onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    default:
    case 'start':
      nextAction = () => setState('question')
      return (
        <section className="section section--numbers-practice">
          <p className="assignment-description">
            Translate arabic numbers to Chinese
          </p>
          <button className="cta--next" onClick={nextAction}>
            Start
          </button>
        </section>
      )
  }
}
