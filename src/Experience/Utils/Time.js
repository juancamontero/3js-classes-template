import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    //! don't use 0-> bugs coming
    this.delta = 16 // 60 fps

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {

    const currentTime = Date.now()
  
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  
}
