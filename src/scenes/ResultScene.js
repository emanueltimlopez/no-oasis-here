import 'phaser';

export default class ResultScene extends Phaser.Scene {
  constructor () {
    super('Result');
  }

  preload () {
    this.load.image('bg', 'src/assets/bg.png');
  }
 
  create () {
    this.cameras.main.backgroundColor.setTo(255,255,255);

    this.add
      .sprite(0, 0, 'bg')
      .setOrigin(0);

    this.add.text(this.sys.game.config.width / 2, 170, 'You Die', 
      { fontFamily: 'JGJUncial', fontSize: 80, color: '#ffffff' })
      .setOrigin(0.5);

    const startButton = this.add.text(this.sys.game.config.width / 2, 460, 'RESTART', 
      { fontFamily: 'Justinian2', fontSize: 35, color: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerover', () => {
        startButton.setScale(1.2);
      })
      .on('pointerout', () => {
        startButton.setScale(1);
      })
      .on('pointerdown', () => {
        this.scene.start('Tutorial');
      });
  }
};