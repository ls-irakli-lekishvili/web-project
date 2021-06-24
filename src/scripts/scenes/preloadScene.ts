class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/maps/world_map_1.json');
    this.load.image('tiles_1', 'assets/tiles/main_lev_build_1.png');
    this.load.image('move', 'assets/tiles/main_lev_build_1.png');
    this.load.spritesheet('player', 'assets/player/move_sprite.png', {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32
    });
  }

  create() {
    this.scene.start('MainScene');

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}

export default PreloadScene;
