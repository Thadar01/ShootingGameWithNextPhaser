import Phaser from "phaser";

export default class LoaderScene extends Phaser.Scene{
    constructor(){
        super('loader-scene')
    }

    
    preload(){
        //loading image
        this.load.image('player','/assets/player.png')
        this.load.image('laser','/assets/laserBlue16.png')
        this.load.image('small','/assets/meteor_small.png')
        this.load.image('medium','/assets/meteor_med.png')
        this.load.image('large','/assets/meteor_large.png')

        //loading audio
        this.load.audio('shoot','/assets/laser-shoot.wav')
        this.load.audio('explosion','/assets/laser-explosion.wav')

        //bitmapFont
        this.load.bitmapFont(
            "arcade",
            '/assets/fonts/arcade.png',
            '/assets/fonts/arcade.xml'
        )

    }

    create(){
        this.scene.switch('main-menu-scene')
    }


}