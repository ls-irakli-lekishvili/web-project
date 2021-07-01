import Phaser from 'phaser';

export default (anims: Phaser.Animations.AnimationState) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player',
      { start: 0, end: 8 }),
    frameRate: 5
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player',
      { start: 11, end: 16 }),
    frameRate: 10
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player',
      { start: 17, end: 23 }),
    frameRate: 5
  });

  anims.create({
    key: 'attack_fireball',
    frames: anims.generateFrameNumbers('player_attack',
      { start: 0, end: 6 }),
    frameRate: 14
  });
}