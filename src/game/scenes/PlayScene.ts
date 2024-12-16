import Phaser from "phaser";
import Meteor from "../entities/Meteor";
import Laser from "../entities/Laser";

export default class PlayScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Image;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys
  score: number;
  scoreText: Phaser.GameObjects.BitmapText;
  meteorGroup: Phaser.Physics.Arcade.Group;
  meteorArray: Meteor[];
  laserGroup: Phaser.Physics.Arcade.Group;
  
  
  constructor() {
    super('play-scene');
  }

  preload(): void {
    this.load.image('player', '/assets/player.png');
    console.log("Asset loaded");
  }

  create(): void {

  
    // Create player sprite and set properties
    console.log("Creating scene...");
   
      this.player = this.physics.add.image(200, 200, 'player');
      console.log("Player created:", this.player);
    
  
      this.player.setDrag(0.99);
      this.player.setMaxVelocity(150);
      this.player.setScale(0.5);
      this.player.setCollideWorldBounds(true);
      console.log("Player properties:", this.player.x, this.player.y, this.player.scale); // Log player position and scale
  

    // Initialize cursor keys
    if (this.input.keyboard) {  // Null check to ensure `this.input` is not null
        this.cursor = this.input.keyboard.createCursorKeys();
      } 
    // Initialize score and scoreText
    const width = this.cameras.main.width;
    const height = this.cameras.main.height; // Fixed the typo here (height was being set incorrectly)
    this.score = 0;
    this.scoreText = this.add.bitmapText(width - 200, 20, 'arcade', 'Score: 0000', 24);

    // Generate meteors
    this.meteorGroup = this.physics?.add.group();
    this.meteorArray = [];

    for (let i = 0; i < 10; i++) {
      const meteor = new Meteor(this, 300, 300);
      const xPos = Phaser.Math.RND.between(0, 800);
      const yPos = Phaser.Math.RND.between(0, 600);

      meteor.setPosition(xPos, yPos);
      meteor.setActive(true);
      meteor.setVisible(true);

      this.meteorGroup?.add(meteor, true);
      this.meteorArray.push(meteor);
    }

    // Laser group
    this.laserGroup = this.physics?.add.group({
      classType: Laser,
      maxSize: 1,
      runChildUpdate: true
    });

    type LaserMeteorCollisionCallback = (laser: Laser, meteor: Meteor) => void;

    // Then use it like this:
    this.physics.add.collider(this.laserGroup, this.meteorGroup, (laser, meteor) => {
      const laserInstance = laser as Laser;
      const meteorInstance = meteor as Meteor;
      laserInstance.destroy()
      meteorInstance.destroy()
      this.score +=10
      this.sound.play('explosion')
      // Handle the collision logic
    });
      // 
}

  update(time: number, delta: number): void {
    // Player movement with arrow keys
    if (this.player?.body) {
        if (this.cursor.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.velocity);
        } else {
            this.player.setVelocity(0);
        }
    
        if (this.cursor.left.isDown) {
            this.player.setAngularVelocity(-300);
        } else if (this.cursor.right.isDown) {
            this.player.setAngularVelocity(300);
        } else {
            this.player.setAngularVelocity(0);
        }
    }

    // Laser shooting
    if (this.cursor.space.isDown) {
      const shoot = this.laserGroup?.get();
      if (shoot) {
        shoot.fire(this.player.x, this.player.y, this.player.rotation);
        this.sound.play('shoot');
      }
    }

    // Update score display
    this.scoreText.setText('Score: ' + this.score);

    // Update meteors
    for (const meteor of this.meteorArray) {
      meteor.update(time, delta);
    }

    if(this.score===100){
        this.scene.switch('win-scene')
    }
  
  }

//   collision(Laser:Laser,meteor:Meteor){
//     Laser.destroy()
//     meteor.destroy()
//     this.score +=10
//     this.sound.play('explosion')
// }


}
