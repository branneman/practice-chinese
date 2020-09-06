import { useState, useEffect } from 'react'

const DEBOUNCE_MS = 50

// `window.visualViewport` cant be used in useState directly
const mapFn = ({ width, height }) => ({ width, height })

export default function useVisualViewport() {
  const [viewport, setViewport] = useState(mapFn(window.visualViewport))

  useEffect(() => {
    let timeoutId = null
    const handler = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setViewport(mapFn(window.visualViewport))
      }, DEBOUNCE_MS)
    }

    window.visualViewport.addEventListener('resize', handler)
    window.visualViewport.addEventListener('scroll', handler)
    return () => {
      window.visualViewport.removeEventListener('resize', handler)
      window.visualViewport.removeEventListener('scroll', handler)
    }
  }, [viewport])

  return viewport
}
