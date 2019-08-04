import 'phaser';

export default class Option extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, option, index, closeHandler) {
    super(scene, x, y, 'card-background');
    this.scene = scene;
    this.scene.add.existing(this);

    this._option = option;
    this._closeHandler = closeHandler;

    this.setOrigin(0.5, 0);
    this.setScale(0.7);
    this.setX(this._getPositionX(index));
    this.setInteractive();
    this.on('pointerdown', this._selectHandler);

    this.renderText(option);
    this.renderResources(option);
  }

  _getPositionX(index) {
    if (index === 0) {
      return this.scene.cameras.main.centerX - this.width;
    } else if (index === 1) {
      return this.scene.cameras.main.centerX;
    } else if (index === 2) {
      return this.scene.cameras.main.centerX + this.width;
    }
  }

  _selectHandler() {
    this._closeHandler(this._option);
  }

  renderText(option) {

  }

  renderResources(option) {

  }

}