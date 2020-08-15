import React from 'react'

import RenderRoute from '../../../utils/render-route'

export default function Numbers({ routes }) {
  return (
    <div>
      Route: Numbers
      <RenderRoute routes={routes} />
    </div>
  )
}
