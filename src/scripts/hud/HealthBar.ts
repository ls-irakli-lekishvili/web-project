import Phaser from 'phaser';

class HealthBar {
  bar: Phaser.GameObjects.Graphics;
  x: number;
  y: number;
  health: number;
  size: { width: number; height: number };
  pixelsPerHealth: number;

  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0, 0);
    this.x = x;
    this.y = y;
    this.health = health;
    this.size = {
      width: 100,
      height: 15
    };
    scene.add.existing(this.bar);
    this.pixelsPerHealth = this.size.width / this.health;
  }

  draw(x: number, y: number) {
    this.bar.clear();

    const margin = 2;
    const { width, height } = this.size;

    this.bar.fillStyle(0x9B00FF);
    this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xFFFFFF);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.health * this.pixelsPerHealth);
    this.bar.fillStyle(this.health > 40 ? 0x00FF00 : 0xFF0000);
    this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
  }

  updateHealth(value: number) {
    this.health = value;
    this.draw(this.x, this.y);
  }

}

export default HealthBar;