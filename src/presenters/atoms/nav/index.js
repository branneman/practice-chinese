import React from 'react'
import { Link } from 'react-router-dom'

import { find, filter, concat } from 'ramda'

import './index.scss'

// Sort 'Search' first, remove NotFound
function sortRoutes(routes) {
  const isSearch = (x) => x.path === '/'
  const isNotFound = (x) => x.path
  const x = find(isSearch, routes)
  const xs = filter((y) => y !== x && isNotFound(y), routes)
  return concat([x], xs)
}

// Recursively render ol>li
function renderRoutes(routes, indent = 0) {
  return (
    <ol className={`navigation__menu navigation__menu--indent${indent}`}>
      {routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
          {route.routes && renderRoutes(route.routes, indent + 1)}
        </li>
      ))}
    </ol>
  )
}

export default function Nav({ routes }) {
  const sortedRoutes = sortRoutes(routes)
  return <nav className="navigation">{renderRoutes(sortedRoutes)}</nav>
}
