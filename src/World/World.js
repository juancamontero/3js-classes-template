

import Experience from '../Experience/Experience'
import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

// ? HANDLES EVERYTHING VISIBLE
export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    //* TEST
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial({ color: 0xffffff })
    // )
    // this.scene.add(testMesh)

    // * listen
    this.resources.on('ready', () => {
      
        // Setup
        this.floor = new Floor()
        this.fox = new Fox()
        
        this.environment = new Environment()
    })
  }
  update() {
    if (this.fox) this.fox.update()
  }
}
