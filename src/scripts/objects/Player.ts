import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';

import createAnimations from './playerAnimations';
import collidable from '../mixins/collidable';


class Player extends Phaser.Physics.Arcade.Sprite {
  gravity: number = 500;
  speed: number = 200;
  jumpSpeed: number = 500;
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  body: Phaser.Physics.Arcade.Body;

  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign<Player, typeof collidable>(this, collidable);

    this.init();
    this.initUpdate();
  }

  init() {
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    createAnimations(this.anims);
  }

  initUpdate() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    const { left, right, up } = this.cursor;
    const upJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (left.isDown) {
      this.setVelocityX(-this.speed);
      this.play('run', true);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
      this.play('run', true);
      this.setFlipX(false);
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
  }
}

export default Player;