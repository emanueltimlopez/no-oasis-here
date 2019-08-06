import 'phaser';
import Option from './Option';

export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img, options, index, onCloseCard, resources) {
    super(scene, x, y, img);
    this.scene = scene;
    this.scene.add.existing(this);

    this._options = options;
    this._optionsInstances = null;
    this._open = false;
    this._index = index;
    this._onCloseCard = onCloseCard;
    this._resources = resources;

    this.setOrigin(0.5, 0);
    this.setScale(0.8);
    this.setInteractive({
      useHandCursor: true
    });
    this.on('pointerdown', this._openHandler);

    this.closeHandler = this.closeHandler.bind(this);
  }

  _openHandler() {
    if (!this._open) {
      this._optionsInstances = this._options.map((option, index) => new Option(this.scene, 0, 60, option, index, this.closeHandler, this._resources));
    }
    this._open = true;
  }

  closeHandler(option) {
    if (this._open) {
      this._optionsInstances.forEach(option => option.destroy());
    }
    this._onCloseCard(this._index, option);
    this.destroy();
  }
}