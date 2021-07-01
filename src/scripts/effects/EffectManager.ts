import Enemy from '../objects/Enemy';
import SpriteEffect from './SpriteEffect';

class EffectManager {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  playEffectOn(effectName: string, target: Enemy, impactPositionY: number) {
    const effect = new SpriteEffect(this.scene, 0, 0, effectName, impactPositionY);
    effect.playOn(target);
  }
}

export default EffectManager;