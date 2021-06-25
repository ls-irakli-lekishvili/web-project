import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';
import { ENEMY_TYPES } from '../types';
import collidable from '../mixins/collidable';

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: MainScene) {
    super(scene);

    Object.assign<Enemies, typeof collidable>(this, collidable);
  }

  getTypes() {
    return ENEMY_TYPES;
  }
}

export default Enemies;