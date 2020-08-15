import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function RenderRoute(props) {
  return (
    <Switch>
      {props.routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          render={(props) => (
            <route.component {...props} routes={route.routes} />
          )}
        />
      ))}
    </Switch>
  )
}
