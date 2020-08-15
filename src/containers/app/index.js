import React from 'react'

import { Link, BrowserRouter as Router } from 'react-router-dom'
import RenderRoute from '../../utils/render-route'
import routes from './routes.js'

import Logo from '../../presenters/atoms/logo'
import Nav from '../../presenters/atoms/nav'

import './index.scss'

export default function App() {
  return (
    <Router>
      <div className="grid__container">
        <div className="grid__nav">
          <Link to={'/'} className="logo__parent">
            <Logo />
          </Link>
          <Nav routes={routes} />
        </div>
        <div className="grid__body">
          <RenderRoute routes={routes} />
        </div>
      </div>
    </Router>
  )
}
