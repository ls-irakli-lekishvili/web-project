import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    const map = this.createMap();
    this.createLayer(map);

    // (map as any).createStaticLayer('environment', tileSet);
    // (map as any).createStaticLayer('platforms', tileSet);
  }

  createMap(): Phaser.Tilemaps.Tilemap {
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: 'map'});
    map.addTilesetImage('main_lev_build_1', 'tiles_1');
    return map;
  }

  createLayer(map: Phaser.Tilemaps.Tilemap) {
    const tileSet = map.getTileset('main_lev_build_1');
    map.createLayer('environment', tileSet);
    map.createLayer('platforms', tileSet);
  }

  update() {
  }
}

export default MainScene