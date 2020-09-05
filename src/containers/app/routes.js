import Home from '../pages/home'

import HSK from '../pages/hsk'

import Numbers from '../pages/numbers'
import NumbersPractice from '../pages/numbers/practice'

import NotFound from '../pages/not-found'

export default [
  {
    path: '/hsk',
    component: HSK,
    name: 'HSK',
  },

  {
    path: '/numbers',
    component: Numbers,
    name: 'Numbers',
    routes: [
      {
        path: '/numbers/practice',
        component: (props) =>
          props.match.isExact ? NumbersPractice(props) : NotFound(props),
        name: 'Practice',
      },
    ],
  },

  {
    path: '/',
    component: (props) => (props.match.isExact ? Home(props) : NotFound(props)),
    name: 'Home',
  },
]
