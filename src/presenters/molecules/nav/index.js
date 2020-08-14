import React from 'react'

import Logo from '../../atoms/logo'

function Nav() {
  return (
    <nav className="section section--nav nav">
      <Logo />
      <a className="nav__radical-table button" href="#radical-table">
        部首
      </a>
      <a className="nav__radical-random button" href="#radical-random">
        随机部首
      </a>
      <a className="nav__pinyin-table button" href="#pinyin-table">
        拼音
      </a>
      <a className="nav__pinyin-random button" href="#pinyin-random">
        随机拼音
      </a>
    </nav>
  )
}

export default Nav
