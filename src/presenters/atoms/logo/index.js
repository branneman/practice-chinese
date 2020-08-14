import React from 'react'

function Logo() {
  return (
    <figure className="logo">
      {/* eslint-disable-next-line */}
      <a href="#">
        <img className="logo__svg" alt="练习中文" src="./static/img/logo.svg" />
        <h1 className="logo__title" lang="en">
          <span>Practice</span> <span>Chinese</span>
        </h1>
      </a>
    </figure>
  )
}

export default Logo
