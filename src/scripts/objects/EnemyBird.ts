import MainScene from '../scenes/mainScene';
import Enemy from './Enemy';
import createAnimations from '../animations/birdEnemyAnimations';
import Projectile from '../attacks/Projectile';


class EnemyBird extends Enemy {
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, 'enemy_bird');
    createAnimations(this.anims);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    if(!this.active) { return; }

    if (this.anims.isPlaying && this.anims.getName() === 'bird-enemy-hurt') {
      return;
    }

    this.play('bird-enemy-idle', true);
  }

  takesHit(source: Projectile) {
    super.takesHit(source);
    this.play('bird-enemy-hurt', true);
  }


}

export default EnemyBird;