import 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }
 
  preload () {
    this.load.image('logo', 'src/assets/logo.png');
  }
 
  create () {
    this.cameras.main.backgroundColor.setTo(255,255,255);

    this.add
      .sprite(this.sys.game.config.width / 2, 180, 'logo')
      .setScale(0.9)
      .setOrigin(0.5);

    this.add
      .text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, 'START',
        { font: "20px Arial", fill: "#000000" })
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Game');
        setTimeout(() => { this.registry.set('actualcard', 0); }, 500);
      });

    this.add.text(this.sys.game.config.width - 100, this.sys.game.config.height - 40, 'v.1.0.0',
      { font: "20px Arial", fill: "#000000" });
  }
};