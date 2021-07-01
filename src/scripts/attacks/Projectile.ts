import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';
import Enemy from '../objects/Enemy';
import SpriteEffect from '../effects/SpriteEffect';
import EffectManager from '../effects/EffectManager';


class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed: number = 300;
  maximumDistance: number = 400;
  traveledDistance: number = 0;
  damage: number = 10;
  effectManager: EffectManager;

  constructor(scene: any, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(this.width - 13, this.height - 20);

    this.effectManager = new EffectManager(scene);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.traveledDistance >= this.maximumDistance) {
      this.setActive(false);
      this.setVisible(false);
      this.traveledDistance = 0;
      this.body.reset(0, 0);
    }

    this.traveledDistance += this.body.deltaAbsX();

  }

  collidesWithTarget(target: Enemy) {
    this.activateProjectile(false);
    this.traveledDistance = 0;
    const impactPositionY = this.y;
    this.body.reset(0, 0);
    this.effectManager
      .playEffectOn('hit_effect', target, impactPositionY);
  }

  fire(x: number, y: number) {
    this.activateProjectile(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
  }

  activateProjectile(isActive: boolean) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }
}

export default Projectile;