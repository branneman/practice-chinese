import React from 'react'

import { Link } from 'react-router-dom'

import Logo from '../logo'
import Nav from '../nav'

export default function Header({ routes }) {
  return (
    <>
      <Link to={'/'} className="logo__parent">
        <Logo />
      </Link>
      <Nav routes={routes} />
    </>
  )
}
