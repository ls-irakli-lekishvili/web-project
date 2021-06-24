import Phaser from 'phaser';
import Player from '../objects/Player';

interface Props {
  offset: number;
  width: number;
  height: number;
}

class MainScene extends Phaser.Scene {

  config: Props;

  constructor(config: Props) {
    super({ key: 'MainScene' });

    this.config = config;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones)
    const player = this.createPlayer(playerZones);

    this.createLevelFinish(playerZones.end, player);

    this.addPlayerCollider(player, layers.collider);

    this.initFollowerCamera(player);
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
    const playerZones = map.getObjectLayer('player_zones');

    collider.setCollisionByExclusion([-1], true);

    return { platforms, environment, collider, playerZones };
  }

  createPlayer({start, end}: {start: Phaser.Types.Tilemaps.TiledObject; end: Phaser.Types.Tilemaps.TiledObject;}) {
    return new Player(this, start.x!, start.y!);
  }

  addPlayerCollider(player: any, collider: Phaser.Tilemaps.TilemapLayer) {
    player.addCollider(collider, () => {
    });

  }

  initFollowerCamera(player: Player) {
    const {height, width, offset} = this.config;
    console.log(offset);
    // more height for falling effect
    this.physics.world.setBounds(0, 0, width - offset, height + 200);
    this.cameras.main.setBounds(0, 0, width - offset, height).setZoom(1.5);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer: Phaser.Tilemaps.ObjectLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones[0],
      end: playerZones[1]
    }
  }

  createLevelFinish(end: Phaser.Types.Tilemaps.TiledObject, player: Player) {
    const finishLine = this.physics.add.sprite(end.x!, end.y! ,'end')
      .setAlpha(0)
      .setSize(5, 200)
      .setOrigin(.5, 1);

    this.physics.add.overlap(player, finishLine, () => {
      console.log('moige ?');
    })
  }

}

export default MainScene;