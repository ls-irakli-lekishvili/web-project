import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import GameOverScene from './scenes/gameOverScene';
import WinningScene from './scenes/winningScene';

const MAP_WIDTH = 1600;

const DEFAULT_WIDTH = document.body.offsetWidth;
const DEFAULT_HEIGHT = 720;


const SHARED_CONFIG = {
  offset: MAP_WIDTH <= DEFAULT_WIDTH ? DEFAULT_WIDTH - MAP_WIDTH: 0,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  leftTopCorner: {
    x: (DEFAULT_WIDTH - (DEFAULT_WIDTH / 1.5)) / 2,
    y: (DEFAULT_HEIGHT - (DEFAULT_HEIGHT / 1.5)) / 2
  }
};


const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [new PreloadScene(), new MainScene(SHARED_CONFIG), new GameOverScene(SHARED_CONFIG), new WinningScene(SHARED_CONFIG)],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // gravity: { y: 400 }
    }
  }
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
