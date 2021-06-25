import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';

import collidable from '../mixins/collidable';


class Enemy extends Phaser.Physics.Arcade.Sprite {
  gravity: number = 500;
  speed: number = 100;
  body: Phaser.Physics.Arcade.Body;
  rayGraphics: Phaser.GameObjects.Graphics;
  platformColliderLayer: Phaser.Tilemaps.TilemapLayer | null;
  facingRight: boolean = true;
  timeFromLastTurn = 0;
  damage: number = 20;

  constructor(scene: MainScene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign<Enemy, typeof collidable>(this, collidable);

    this.init();
    this.initUpdate();

  }

  init() {
    this.platformColliderLayer = null;
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: { width: 2, color: 0xaa00aa }
    });
    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.setSize(20, 45);
    this.setOffset(8, 20);
    this.setVelocityX(this.speed);
  }

  initUpdate() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time: number, delta: number) {
    this.patrol(time);

  }

  patrol(time: number) {
    if (!this.body || !this.body.onFloor()) {
      return;
    }

    const { ray, hasHit } = (this as any).rayCast(this.body, this.platformColliderLayer, this.facingRight, 2);
    // this.rayGraphics.clear();
    // this.rayGraphics.strokeLineShape(ray);
    if (!hasHit && this.timeFromLastTurn + 100 < time) {
      this.facingRight = !this.facingRight;
      this.setFlipX(!this.flipX);
      this.setVelocityX(-this.body.velocity.x);
      this.timeFromLastTurn = time;
    }
  }


  setColliderLayer(collider: Phaser.Tilemaps.TilemapLayer) {
    this.platformColliderLayer = collider;
  }


}

export default Enemy;