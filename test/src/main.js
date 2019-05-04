import { done } from 'tape-modern'
import color from 'tap-browser-color'

import '../../src/test'

color()

window.done = done
