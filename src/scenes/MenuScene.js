import 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }

  init () {
    const element = document.createElement('style');
    document.head.appendChild(element);
    const sheet = element.sheet;
    sheet.insertRule('@font-face { font-family: "JGJUncial"; src: url("src/assets/fonts/JGJUNCIA.ttf"); }\n', 0);
    sheet.insertRule('@font-face { font-family: "Justinian2"; src: url("src/assets/fonts/Justv2.ttf"); }', 0);
  }
 
  preload () {
    this.load.image('bg', 'src/assets/bg.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
 
  create () {
    this.cameras.main.backgroundColor.setTo(255,255,255);

    this.add
      .sprite(0, 0, 'bg')
      .setOrigin(0);

    WebFont.load({
      custom: {
        families: [ 'JGJUncial', 'Justinian2' ]
      },
      active: () => {
        this.add.text(this.sys.game.config.width / 2, 170, 'No Oasis', 
          { fontFamily: 'JGJUncial', fontSize: 80, color: '#ffffff' })
          .setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, 245, 'here', 
          { fontFamily: 'JGJUncial', fontSize: 80, color: '#ffffff' })
          .setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, 315, 'An adventure where you can',
          { fontFamily: 'Justinian2', fontSize: 16, color: '#ffffff' })
          .setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, 335, 'exchange friends for water', 
            { fontFamily: 'Justinian2', fontSize: 16, color: '#ffffff' })
            .setOrigin(0.5);

        const startButton = this.add.text(this.sys.game.config.width / 2, 460, 'START', 
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
    });

    this.add.text(this.sys.game.config.width - 100, this.sys.game.config.height - 40, 'v.1.0.0',
      { font: "15px Arial", fill: "#000000" });
  }
};