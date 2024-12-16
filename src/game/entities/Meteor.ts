import Phaser from "phaser";

export default class Meteor extends Phaser.Physics.Arcade.Image {
  meteorType: number;
  speed: number;
  direction: number;
  angleRotation: number;
  active: boolean;
  visible: boolean;
  factor: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Pass 'small' texture as the default texture
    super(scene, x, y, 'small');

    this.meteorType = Phaser.Math.RND.between(0, 2);

    switch (this.meteorType) {
      case 0:
        this.setTexture('small');
        break;
      case 1:
        this.setTexture('medium');
        break;
      case 2:
        this.setTexture('large');
        break;
    }

    this.speed = Phaser.Math.GetSpeed(100, 1);
    this.direction = Phaser.Math.RND.angle();
    this.angleRotation = Phaser.Math.RND.between(0.8, 2);
    this.active = false;
    this.visible = false;
    this.factor = 1;
  }

  update(time: number, delta: number): void {
    if (this.active) {
      this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
      this.y += Math.cos(this.direction) * this.speed * delta;
      this.angle += this.angleRotation;

      if (this.x < 0) {
        this.x = 800;
      } else if (this.x > 800) {
        this.x = 0;
      }

      if (this.y < 0) {
        this.y = 600;
      } else if (this.y > 600) {
        this.y = 0;
      }
    }
  }
}
