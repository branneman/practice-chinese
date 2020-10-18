import React, { useEffect, useRef, useState } from 'react'
import { compose, map, filter, assoc, clone } from 'ramda'

import { fn, data } from '../../../data'

// import useVisualViewport from '../../../hooks/viewport'
import { shuffle } from '../../../utils/random'
import { isArr } from '../../../utils/type-checks'

import './index.scss'

const FOCUS_DELAY_MS = 50
const ENTER_KEY = 13

export const shuffleData = compose(shuffle, map(assoc('correct', null)), clone)

export const getResults = (answers) => {
  const n = filter((x) => x.correct === true, answers)
  const p = (n.length / answers.length) * 100
  const result = {
    total: answers.length.toString(),
    correct: n.length.toString(),
    percentage: p.toFixed(2).toString(),
  }
  if (result.percentage.substr(-3) === '.00') {
    result.percentage = p.toFixed(0).toString()
  }
  return result
}

export default function PracticeReadPage() {
  const answerRef = useRef(null)

  // const visualViewport = useVisualViewport()

  const [state, setState] = useState('start')
  const [format, setFormat] = useState()
  const [direction, setDirection] = useState()

  const [answers, setAnswers] = useState(null)
  const checkAnswer = () => {
    const x = answers[question]
    x.answer = answerRef.current.value
    x.correct = direction.validate(x, x.answer)

    setAnswers(answers)
    setState(x.correct ? 'correct' : 'incorrect')
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
        <section className='section section--read-practice'>
          <p className='assignment-description'>Translate {direction.name}</p>
          <p className='assignment-text'>
            {direction.question(answers[question])}
          </p>
          <input ref={answerRef} className='practice-input' type='text' />
          <button className='cta--next' onClick={nextAction}>
            Check
          </button>
        </section>
      )

    case 'correct':
      nextAction = () => nextQuestion()
      return (
        <section className='section section--correct section--read-practice'>
          <p className='assignment-result'>
            <span role='img' aria-label='check'>
              ✔
            </span>{' '}
            Correct!
          </p>
          <button className='cta--next' onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'incorrect':
      nextAction = () => nextQuestion()
      return (
        <section className='section section--incorrect section--read-practice'>
          <p className='assignment-result'>
            <span role='img' aria-label='cross'>
              ❌
            </span>{' '}
            Incorrect!
          </p>
          <p className='assignment-description'>Your answer:</p>
          <p className='assignment-description'>{answers[question].answer}</p>
          <p className='assignment-description'>Correct answer(s):</p>
          {direction.answers(answers[question]).map((x) => (
            <p className='assignment-description'>{x}</p>
          ))}
          <button className='cta--next' onClick={nextAction}>
            Continue
          </button>
        </section>
      )

    case 'done':
      nextAction = () => setState('start')
      const results = getResults(answers)
      return (
        <section className='section section--vocab-practice'>
          <p className='assignment-result'>
            {results.correct} out of {results.total} ({results.percentage}%)
          </p>
          <button className='cta--next' onClick={nextAction}>
            Restart
          </button>
        </section>
      )

    case 'choose-vocab':
      nextAction = (vocab) => () => {
        setAnswers(shuffleData(direction.list(data, vocab)))
        setQuestion(0)
        setState('question')
      }
      return (
        <section className='section section--read-practice'>
          <p className='assignment-description assignment-description--header'>
            {format.name} &raquo; {direction.name}
          </p>
          <p className='assignment-description'>
            What vocabulary do you want to practice?
          </p>
          {direction.vocabs.map((vocab) => (
            <button className='cta' onClick={nextAction(vocab)}>
              {vocab.toUpperCase()}
            </button>
          ))}
        </section>
      )

    case 'choose-direction':
      nextAction = (direction) => () => {
        setDirection(direction)
        if (isArr(direction.vocabs)) return setState('choose-vocab')

        setAnswers(shuffleData(direction.list(data)))
        setQuestion(0)
        setState('question')
      }
      return (
        <section className='section section--read-practice'>
          <p className='assignment-description assignment-description--header'>
            {format.name}
          </p>
          <p className='assignment-description'>
            What direction do you want to practice?
          </p>
          {format.directions.map((direction) => (
            <button
              className='cta cta--smaller'
              onClick={nextAction(direction)}
            >
              {direction.name}
            </button>
          ))}
        </section>
      )

    default:
    case 'start':
    case 'choose-type':
      nextAction = (format) => () => {
        setFormat(format)
        setState('choose-direction')
      }
      return (
        <section className='section section--read-practice'>
          <p className='assignment-description'>
            What format do you want to practice?
          </p>
          {fn.read.map((format) => (
            <button className='cta' onClick={nextAction(format)}>
              {format.name}
            </button>
          ))}
        </section>
      )
  }
}
