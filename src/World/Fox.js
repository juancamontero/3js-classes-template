import * as THREE from 'three'
import Experience from '../Experience/Experience'

export default class Fox {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources.items.foxModel
    this.time = this.experience.time
    // Debug
    this.debug = this.experience.debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fox')
    }

    //setup
    this.setModel()
    this.setAnimation()

 
  }

  setModel() {
    this.model = this.resources.scene

    this.model.scale.set(0.02, 0.02, 0.02)
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {
      idle: this.animation.mixer.clipAction(this.resources.animations[0]),
      walk: this.animation.mixer.clipAction(this.resources.animations[1]),
      run: this.animation.mixer.clipAction(this.resources.animations[2]),
    }
    this.animation.actions.current = this.animation.actions.run
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      // * With transitions
      // * to..
      const newAction = this.animation.actions[name]
      // * from..
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      // * crossfade duration
      newAction.crossFadeFrom(oldAction, 3)

      this.animation.actions.current = newAction
    }

    // Debug
  
    if (this.debug.active) {
      // * create debug object
      const debugObject = {
        playIdle: ()=>{this.animation.play('idle')},
        playWalk: ()=>{this.animation.play('walk')},
        playRun: ()=>{this.animation.play('run')}
      }
      this.debugFolder.add(debugObject, 'playIdle')
      this.debugFolder.add(debugObject, 'playWalk')
      this.debugFolder.add(debugObject, 'playRun')
    }
  }
  update() {
    // console.log('update fox')
    this.animation.mixer.update(this.time.delta * 0.001)
    // this.animation.mixer.update(0)
    // console.log(this.time.delta)
  }
}
