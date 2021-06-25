class GameOverScene extends Phaser.Scene {
  config;

  constructor(config) {
    super({ key: 'GameOverScene' });
    this.config = config;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    const title = this.add.text(this.config.width / 2 - 10, this.config.height / 2 - 10, 'Game Over!',
      { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    title.setSize(2, 2);
    title.setOrigin(0);
  }
}

export default GameOverScene;
