import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';

import createAnimations from '../animations/playerAnimations';
import collidable from '../mixins/collidable';
import Enemy from './Enemy';
import HealthBar from '../hud/HealthBar';
import Projectiles from '../attacks/Projectiles';


class Player extends Phaser.Physics.Arcade.Sprite {
  mainScene: MainScene;
  gravity: number = 500;
  speed: number = 200;
  jumpSpeed: number = 350;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  body: Phaser.Physics.Arcade.Body;
  isTouching: boolean = false;
  throwVelocity = 250;
  health: number = 100;
  hp: HealthBar;
  leftTopCorner: { x: number, y: number };
  lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT;
  projectiles: Projectiles;

  constructor(scene: MainScene, x: number, y: number, config) {
    super(scene, x, y, 'player');
    this.mainScene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.leftTopCorner = config.leftTopCorner;

    Object.assign<Player, typeof collidable>(this, collidable);

    this.init();
    this.initUpdate();
  }

  init() {
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.body.setSize(20, 36);

    this.hp = new HealthBar(this.scene, this.leftTopCorner.x, this.leftTopCorner.y, this.health);
    this.hp.draw(this.leftTopCorner.x + 5, this.leftTopCorner.y + 5);
    createAnimations(this.anims);

    this.projectiles = new Projectiles(this.scene);
    this.scene.input.keyboard.on('keydown-SPACE', () => {
      this.play('attack_fireball', true);
      this.projectiles.fireProjectile(this);
    });
  }

  initUpdate() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.isTouching) return;
    const { left, right, up } = this.cursor;
    const upJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (this.anims.isPlaying && this.anims.getFrameName() === ('throw')) {
      return;
    }

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.play('run', true);
      this.setFlipX(true);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.play('run', true);
      this.setFlipX(false);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

    } else {
      this.setVelocityX(0);
      if (this.body.velocity.y === 0) {
        this.play('idle', true);
      }
    }

    if (upJustDown && this.body.onFloor()) {
      this.setVelocityY(-this.jumpSpeed);
      this.play('jump', true);
    }
    if (this.y >= 720) {
      this.mainScene.scene.start('GameOverScene');

    }
  }

  takesDamage(attacker: Enemy) {
    this.health -= attacker.damage;
    if (this.health <= 0) {
      this.hp.updateHealth(0);
      this.mainScene.scene.start('GameOverScene');

    } else {
      this.hp.updateHealth(this.health);
    }
    this.throwPlayer();
  }

  throwPlayer() {
    this.body.touching.right ?
      this.setVelocity(-this.throwVelocity, -this.throwVelocity) :
      this.setVelocity(this.throwVelocity, -this.throwVelocity);
    this.isTouching = true;

    const hitAnimation = this.playDamageTween();


    this.scene.time.delayedCall(1000, () => {
      this.isTouching = false;
      hitAnimation.stop();
      this.clearTint();
    });
  }

  playDamageTween() {
    return this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      tint: 0xffffff
    });
  }
}

export default Player;