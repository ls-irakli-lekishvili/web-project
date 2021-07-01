export default (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'hit_effect',
    frames: anims.generateFrameNumbers('hit_effect',
      { start: 0, end: 4 }),
    frameRate: 10
  });

}