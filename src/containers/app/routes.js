import Home from '../pages/home'
import NotFound from '../pages/not-found'

import Vocab from '../pages/vocab'
import HSK from '../pages/hsk'
import Numbers from '../pages/numbers'

export default [
  {
    path: '/vocab',
    component: Vocab,
    name: 'Vocab: Test',
  },

  {
    path: '/hsk',
    component: HSK,
    name: 'HSK: Test',
  },

  {
    path: '/numbers',
    component: Numbers,
    name: 'Numbers: Test',
  },

  {
    path: '/',
    component: (props) => (props.match.isExact ? Home(props) : NotFound(props)),
    name: 'Home',
  },
]
