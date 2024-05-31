import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Utils/Camera'

let instance = null

export default class Experience {
  constructor(canvas) {
    // * to only create one instance
    if (instance) {
      return instance //! stops here if already exists
    }
    instance = this

    //? Global access
    //! new experiences will be over written
    window.experience = this

    // options
    this.canvas = canvas

    //setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()

    // * listen to sizes events
    // ? Resize
    this.sizes.on('resize', () => {
      // ! use a callback ALWAYS
      this.resize() //* trigger this event
    })

    // ? time tick event
    this.time.on('tick', () => {
      // ! use a callback ALWAYS
      this.update() //* trigger this event
    })
  }

  // * Methods
  resize() {
    //* resize Camera
    this.camera.resize()
  }

  update() {
    // todo : update what? animations?
  }
}
