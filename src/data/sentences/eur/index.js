import { reduce, concat } from 'ramda'

import l1to3 from './1.json'
import l4 from './4.json'

export default reduce(concat, [], [l1to3, l4])
