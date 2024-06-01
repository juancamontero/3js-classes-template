import GUI from 'lil-gui'


export default class Debug {
  constructor() {
    //         Instead of always having the debug UI, we are going to let the user choose to have it.
    // If the user has accessed the URL with #debug at the end, they will have the debug UI. Otherwise, no debug UI.
    // This is handy because most users will access the website without seeing the UI, but users that know what they are doing (like you as the developer) can access the UI without having to rebuild the project.
    // To test the presence of #debug in the URL, we can use window.location.hash:
    this.active = window.location.hash === '#debug'
    if(this.active)
        {
            this.ui = new GUI()
        }
  }
}
