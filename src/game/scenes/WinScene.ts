import Phaser from "phaser";

export default class WinScene extends Phaser.Scene{
    

    constructor(){
        super('win-scene')
    }

    create(){
        const width=this.cameras.main.width
        const height=this.cameras.main.width

        this.add.bitmapText(width/2,height/2-50,'arcade','You with score: 100',40).setOrigin(0.5,2)

         
         }

 
    

}