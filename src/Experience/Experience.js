import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from '../World/World'
import Resources from './Utils/Resources'

import sources from './sources'
import Debug from './Utils/Debug'

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
    // ! keep order
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // * set up event listeners

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
    this.renderer.resize()
  }

  update() {
    // todo : update what? animations?

    //! keep this order
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    // *remove listeners
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key]

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })
    //* dispose controls
    this.camera.controls.dispose()

    // *dispose debuguer
    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
