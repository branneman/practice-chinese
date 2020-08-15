import React, { useEffect, useRef, useState } from 'react'

import { weightedRandomInt } from '../../../../utils/random'
import arabic2chinese from '../../../../utils/arabic2chinese'

const ENTER_KEY = 13

const getSemiRandomInt = () =>
  weightedRandomInt([
    { weight: 3, min: 0, max: 99 },
    { weight: 2, min: 0, max: 999 },
    { weight: 1, min: -999, max: -1 },
  ])

export default function NumbersPracticePage() {
  const [state, setState] = useState('start')

  const answerRef = useRef(null)

  const [answers, setAnswers] = useState([])
  const addAnswer = (a) => setAnswers(answers.concat(a))
  const checkAnswer = (n) => {
    const correct = arabic2chinese(n)
    const attempt = answerRef.current.value
    setState(attempt === correct ? 'correct' : 'incorrect')
    addAnswer({ n, attempt, correct })
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
  let renderedState
  switch (state) {
    case 'question':
      nextAction = () => checkAnswer(int)
      const int = getSemiRandomInt()
      renderedState = (
        <div>
          <p>{int}</p>
          <input ref={answerRef} type="text" />
          <button onClick={nextAction}>Check</button>
        </div>
      )
      break

    case 'correct':
      nextAction = () => setState('question')
      renderedState = (
        <div>
          <p>Correct!</p>
          <button onClick={nextAction}>Continue</button>
        </div>
      )
      break

    case 'incorrect':
      nextAction = () => setState('question')
      renderedState = (
        <div>
          <p>Incorrect!</p>
          <button onClick={nextAction}>Continue</button>
        </div>
      )
      break

    default:
    case 'start':
      nextAction = () => setState('question')
      renderedState = (
        <div>
          <button onClick={nextAction}>Start</button>
        </div>
      )
      break
  }

  return (
    <section className="section section--numbers-random">
      {renderedState}
      <div style={{ fontSize: '16px' }}>
        <p>Answers:</p>
        <pre>
          <code>{JSON.stringify(answers.slice().reverse(), 0, 2)}</code>
        </pre>
      </div>
    </section>
  )
}
