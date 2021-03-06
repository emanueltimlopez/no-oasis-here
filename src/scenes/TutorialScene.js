import 'phaser';

export default class TutorialScene extends Phaser.Scene {
  constructor () {
    super('Tutorial');
  }

  preload () {
    this.load.image('tutorial1', 'src/assets/tutorial1.png');
    this.load.image('tutorial2', 'src/assets/tutorial2.png');
    this.load.image('tutorial3', 'src/assets/tutorial3.png');
  }
 
  create () {
    this.cameras.main.backgroundColor.setTo(255,255,255);
    let step = 0;

    const music = this.sound.add('menu-music')
    music.play({ loop: true });

    this.add
      .sprite(0, 0, 'bg')
      .setOrigin(0)
      .setInteractive({
        useHandCursor: true
      })
      .on('pointerdown', () => {
        if (step === 0) {
          img1.setVisible(false);
          text.setText('For a travel');
          img2.setVisible(true);
        } else if (step === 1) {
          img2.setVisible(false);
          text.setText('Choose carefully what option follow');
          img3.setVisible(true);
        } else if (step >= 2) {
          music.stop();
          this.scene.start('Game');
        }
        step += 1;
      });

    const img1 = this.add
      .sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tutorial1')
      .setOrigin(0.5)
      .setScale(0.8)
      .setVisible(true);

    const img2 = this.add
      .sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tutorial2')
      .setOrigin(0.5)
      .setScale(0.8)
      .setVisible(false);

    const img3 = this.add
      .sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tutorial3')
      .setOrigin(0.5)
      .setScale(0.8)
      .setVisible(false);

    const text = this.add.text(this.sys.game.config.width / 2, 150, 'You have different resources', 
      { fontFamily: 'Justinian2', fontSize: 20, color: '#ffffff' })
      .setOrigin(0.5);
  }
};