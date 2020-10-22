import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import RenderRoute from '../../utils/render-route'
import pkg from '../../../package.json'
import routes from './routes.js'

import Header from '../../presenters/molecules/header'

import './index.scss'

import WebFont from 'webfontloader'
WebFont.load({
  google: {
    families: ['Noto Sans SC:400', 'Noto Serif SC:400', 'Ma Shan Zheng:400'],
  },
})

export default function App() {
  return (
    <Router basename={pkg.homepage}>
      <div className='layout__container'>
        <header className='layout__header'>
          <Header routes={routes} />
        </header>
        <main className='layout__body'>
          <RenderRoute routes={routes} />
        </main>
      </div>
    </Router>
  )
}
