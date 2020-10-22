import React from 'react'

import { Link } from 'react-router-dom'

import FontToggler from '../../atoms/font-toggler'
import Logo from '../../atoms/logo'
import Nav from '../../atoms/nav'

export default function Header({ routes }) {
  return (
    <>
      <Link to={'/'} className='logo__parent'>
        <Logo />
      </Link>
      <FontToggler />
      <Nav routes={routes} />
    </>
  )
}
