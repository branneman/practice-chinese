import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { find, filter, concat } from 'ramda'

import './index.scss'

// Sort 'Search' first, remove NotFound
export function sortRoutes(routes) {
  const isSearch = (x) => x.path === '/'
  const isNotFound = (x) => x.path
  const x = find(isSearch, routes)
  const xs = filter((y) => y !== x && isNotFound(y), routes)
  return concat([x], xs)
}

export default function Nav({ routes }) {
  const [isOpen, setOpen] = useState(false)

  // Recursively render ol>li
  const renderRoutes = (routes, indent = 0) => (
    <ol className={`menu menu--indent${indent}`}>
      {routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path} onClick={() => setOpen(false)}>
            {route.name}
          </Link>
          {route.routes && renderRoutes(route.routes, indent + 1)}
        </li>
      ))}
    </ol>
  )

  if (!isOpen) {
    return (
      <div className="nav">
        <button
          className="nav__toggle nav__toggle--open"
          onClick={() => setOpen(true)}
        ></button>
      </div>
    )
  }

  return (
    <div className="nav">
      <button
        className="nav__toggle nav__toggle--close"
        onClick={() => setOpen(false)}
      ></button>
      <nav className="nav__menu">{renderRoutes(sortRoutes(routes))}</nav>
    </div>
  )
}
