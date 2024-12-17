import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene{
    cursor: Phaser.Types.Input.Keyboard.CursorKeys
    constructor(){
        super('main-menu-scene')
    }

    preload(){
       

    }

    create(){
        const width=this.cameras.main.width
        const height=this.cameras.main.height

        const titleText=this.add.bitmapText(width/2,height/2-50,'arcade','Start Meteor Swarm Pressing Space',40).setOrigin(0.5,2)

        if (this.input.keyboard) {  // Null check to ensure `this.input` is not null
            this.cursor = this.input.keyboard.createCursorKeys();
          }   
         }

    update(){
       if(this.cursor.space.isDown){
        this.scene.switch('play-scene')
        console.log("space")
       }
    }

}