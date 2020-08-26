import Home from '../pages/home'

import Numbers from '../pages/numbers'
import NumbersPractice from '../pages/numbers/practice'

import NotFound from '../pages/not-found'

export default [
  {
    path: '/numbers',
    component: Numbers,
    name: 'Numbers',
    routes: [
      {
        path: '/numbers/practice',
        component: NumbersPractice,
        name: 'Practice'
      }
    ]
  },

  {
    path: '/',
    component: ({ location }) =>
      location.pathname === '/' ? Home() : NotFound(),
    name: 'Home'
  }
]
