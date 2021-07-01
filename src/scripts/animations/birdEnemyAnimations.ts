export default (anims: Phaser.Animations.AnimationState) => {
  anims.create({
    key: 'bird-enemy-idle',
    frames: anims.generateFrameNumbers('enemy_bird',
      { start: 0, end: 12 }),
    frameRate: 8
  });

  anims.create({
    key: 'bird-enemy-hurt',
    frames: anims.generateFrameNumbers('enemy_bird',
      { start: 25, end: 26 }),
    frameRate: 5
  });
}