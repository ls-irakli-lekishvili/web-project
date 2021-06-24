import Phaser from 'phaser';
import Player from '../objects/Player';

class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    const map = this.createMap();
    const layers = this.createLayers(map);
    const player = this.createPlayer();

    this.addPlayerCollider(player, layers.collider);
  }

  createMap(): Phaser.Tilemaps.Tilemap {
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' });
    map.addTilesetImage('main_lev_build_1', 'tiles_1');
    return map;
  }

  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileSet = map.getTileset('main_lev_build_1');
    const collider = map.createLayer('platform_collider', tileSet);
    const environment = map.createLayer('environment', tileSet);
    const platforms = map.createLayer('platforms', tileSet);

    collider.setCollisionByExclusion([-1], true);

    return { platforms, environment, collider };
  }

  createPlayer() {
    return new Player(this, 150, 200);
  }

  addPlayerCollider(player: any, collider: Phaser.Tilemaps.TilemapLayer) {
    player.addCollider(collider, () => {
    });

  }
}

export default MainScene;