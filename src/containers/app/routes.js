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
        name: 'Practice',
      },
    ],
  },

  // Must be second to last (matches /)
  {
    path: '/',
    component: Home,
    name: 'Home',
  },

  // Must be last (failed to match anything)
  {
    component: NotFound,
    name: '404 Not Found',
  },
]
