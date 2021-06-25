import Phaser from 'phaser';
import Projectile from './Projectile';
import Player from '../objects/Player';
import { getTimestamp } from '../utils/functions';

class Projectiles extends Phaser.Physics.Arcade.Group {
  coolDownTime = 500;
  timeFromLastShoot: number | null;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'fireball',
      classType: Projectile
    });

  }

  fireProjectile(attacker: Player) {
    const projectile: Projectile = this.getFirstDead(false);

    if (!projectile) {
      return;
    }
    if (this.timeFromLastShoot &&
      this.timeFromLastShoot + this.coolDownTime > getTimestamp()) {
      return;
    }

    if (attacker.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
    }
    projectile.fire(attacker.x, attacker.y);
    this.timeFromLastShoot = getTimestamp();
  }


}

export default Projectiles;