// * To emit and listen to other classes events
import EventEmitter from './EventEmitter'

// ? HANDLES SIZES
export default class Sizes extends EventEmitter {
  constructor() {
    // * Call super cause we are extending it
    super()

    // * setup

    // setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // * methods

    // resize event
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize') //*trigger this event
    })
  }
}
