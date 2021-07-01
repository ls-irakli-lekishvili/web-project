class Timer extends Phaser.GameObjects.Text {
  time: number;

  constructor(scene: Phaser.Scene, x: number, y: number, time: number) {
    super(scene, x, y, time.toString(), { font: '16px Arial Black', color: '#fff' });
    this.time = time;
    this.setOrigin(.5);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.x = this.scene.cameras.main.width / 2;
    this.y = 100;

  }

  updateTimer() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.setTimer,
      callbackScope: this,
      loop: true
    });
  }

  setTimer() {
    if (!this.time) {
      this.scene.scene.start('GameOverScene');
    } else {
      this.text = (--this.time).toString();
    }
  }
}

export default Timer;