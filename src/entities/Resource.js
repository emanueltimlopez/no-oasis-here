export default class Resource extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type, index, img) {
    super(scene, x, y, img);
    this.scene = scene;
    this.scene.add.existing(this);

    this._type = type;
    
    this.setOrigin(0, 1);
    this.setScale(0.6);
    this.setX(this._getPositionX(index));
  }

  _getPositionX(index) {
    return index * this.displayWidth - (index * 25) + 60;
  }

  get type() {
    return this._type;
  }
}