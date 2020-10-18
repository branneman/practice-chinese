import Home from '../pages/home'
import NotFound from '../pages/not-found'

import Read from '../pages/practice/read'
import Numbers from '../pages/numbers'

export default [
  {
    path: '/read',
    component: Read,
    name: 'Practice: Read',
  },

  {
    path: '/numbers',
    component: Numbers,
    name: 'Practice: Numbers',
  },

  {
    path: '/',
    component: (props) => (props.match.isExact ? Home(props) : NotFound(props)),
    name: 'Home',
  },
]
