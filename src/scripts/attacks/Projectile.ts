import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';


class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed: number = 300;
  maximumDistance: number = 400;
  traveledDistance: number = 0;

  constructor(scene: any, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.traveledDistance >= this.maximumDistance) {
      this.setActive(false);
      this.setVisible(false);
      this.traveledDistance = 0;
    }

    this.traveledDistance += this.body.deltaAbsX();

  }

  fire(x: number, y: number) {
    this.setActive(true);
    this.setVisible(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
  }
}

export default Projectile;