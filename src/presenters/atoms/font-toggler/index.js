import React, { useEffect, useState } from 'react'

import './index.scss'

const toCl = (s) => 'f-' + s
const FONTS = ['notosanssc', 'notoserifsc', 'mashanzheng']

function FontToggler() {
  const [font, setFont] = useState(0)

  useEffect(() => {
    const body = document.body
    const xs = body.className.split(' ')

    if (xs.includes(toCl(FONTS[font]))) return

    FONTS.forEach((x) => body.classList.remove(toCl(x)))
    body.classList.add(toCl(FONTS[font]))
  }, [font])

  const setNextFont = () => {
    const maxIndex = FONTS.length - 1
    const nextIndex = font + 1 > maxIndex ? 0 : font + 1
    setFont(nextIndex)
  }

  return (
    <button className='font-toggler f' onClick={() => setNextFont()}></button>
  )
}

export default FontToggler
