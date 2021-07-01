import Phaser from 'phaser';
import Enemy from '../objects/Enemy';

class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  target: Enemy;
  effectName: string;
  impactPositionY: number;

  constructor(scene: Phaser.Scene, x: number, y: number, effectName: string, impactPositionY: number) {
    super(scene, x, y, effectName);
    this.effectName = effectName;
    this.impactPositionY = impactPositionY;
    scene.add.existing(this);
    scene.physics.add.existing(this);


    this.on('animationcomplete', animation => {
      if (animation.key === this.effectName) {
        this.destroy();
      }
    }, this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.placeEffect();
  }

  placeEffect() {
    if (!this.target || !this.body) {
      return;
    }
    const center = this.target.getCenter();
    this.body.reset(center.x, this.impactPositionY);
  }

  playOn(target: Enemy) {
    this.target = target;
    this.play(this.effectName, true);
    this.placeEffect();
  }
}

export default SpriteEffect;