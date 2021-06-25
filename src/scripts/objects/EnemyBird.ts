import MainScene from '../scenes/mainScene';
import Enemy from './Enemy';
import createAnimations from '../animations/birdEnemyAnimations';


class EnemyBird extends Enemy {
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, 'enemy_bird');
    createAnimations(this.anims);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.play('bird-enemy-idle', true);
  }


  deleteEnemy() {
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.setActive(false);
    this.setVisible(false);
    this.body.reset(-100, -100);

  }
}

export default EnemyBird;