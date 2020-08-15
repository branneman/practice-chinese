import React from 'react'

import './index.scss'

function Logo() {
  return (
    <figure className="logo">
      <img className="logo__svg" alt="练习中文" src="./static/img/logo.svg" />
      <h1 className="logo__title" lang="en">
        <span>Practice</span> <span>Chinese</span>
      </h1>
    </figure>
  )
}

export default Logo
