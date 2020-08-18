import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoute from '../../utils/render-route'
import routes from './routes.js'

import Header from '../../presenters/atoms/header'

import './index.scss'

export default function App() {
  return (
    <Router>
      <div className="layout__container">
        <header className="layout__header">
          <Header routes={routes} />
        </header>
        <main className="layout__body">
          <RenderRoute routes={routes} />
        </main>
      </div>
    </Router>
  )
}
