import Phaser from 'phaser';
import Player from '../objects/Player';
import Enemies from '../groups/Enemies';
import Enemy from '../objects/Enemy';
import Projectile from '../attacks/Projectile';
import EnemyBird from '../objects/EnemyBird';
import initAnims from '../animations/hittingAnimations';
import Timer from '../hud/Timer';

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

    new Timer(this, 100, 100, 20)
      .updateTimer();

    initAnims(this.anims);

    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(layers.enemySpawns, layers.collider);

    this.createLevelFinish(playerZones.end, player);

    this.addPlayerCollider(player, { platform: layers.collider });
    this.addEnemiesCollider(enemies, { platform: layers.collider, player });

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
    const enemySpawns = map.getObjectLayer('enemy_spawns');

    collider.setCollisionByExclusion([-1], true);

    return { platforms, environment, collider, playerZones, enemySpawns };
  }

  createPlayer(start: Phaser.Types.Tilemaps.TiledObject) {
    return new Player(this, start.x!, start.y!, this.config);
  }

  createEnemies(enemySpawnsLayer: Phaser.Types.Tilemaps.ObjectLayerConfig, collider: Phaser.Tilemaps.TilemapLayer) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    enemySpawnsLayer.objects?.forEach(config => {
        const enemy = new enemyTypes[config.type](this, config.x, config.y);
        enemy.setColliderLayer(collider);
        enemies.add(enemy);
      }
    );
    return enemies;
  }

  addPlayerCollider(player: any, { platform }: { platform: Phaser.Tilemaps.TilemapLayer }) {
    player.addCollider(platform);

  }

  onWeaponHit(enemy: EnemyBird, source: Projectile) {
    enemy.takesHit(source);
  }

  addEnemiesCollider(enemies: any, { platform, player }: { platform: Phaser.Tilemaps.TilemapLayer, player: Player }) {
    enemies
      .addCollider(platform)
      .addCollider(player, (enemy: Enemy, player: Player) => {
        player.takesDamage(enemy);
      })
      .addCollider(player.projectiles, this.onWeaponHit);
  }

  initFollowerCamera(player: Player) {
    const { height, width, offset } = this.config;
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
    };
  }

  createLevelFinish(end: Phaser.Types.Tilemaps.TiledObject, player: Player) {
    const finishLine = this.physics.add.sprite(end.x!, end.y!, 'end')
      .setAlpha(0)
      .setSize(5, 400)
      .setOrigin(0, 1);

    const finishGameOverlap = this.physics.add.overlap(player, finishLine, () => {
      finishGameOverlap.active = false;
      this.scene.start('WinningScene');
    });
  }

}

export default MainScene;