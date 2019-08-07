import 'phaser';
import { resourcesKeys } from '../cards/resources';

export default class Option extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, option, index, closeHandler, resourcesStack) {
    super(scene, x, y, 'blank');
    this.scene = scene;
    this.scene.add.existing(this);

    this._option = option;
    this._closeHandler = closeHandler;

    this.setOrigin(0.5, 0);
    this.setScale(0.8);
    this.setX(this._getPositionX(index));
    this.on('pointerdown', this._selectHandler);

    this._container = [];
    const t = this._renderText(this.x, this.y + 10, 130, option.text);
    this._container.push(t);

    let active = true;

    if (option.resourcesOut) {
      active = this._checkActive(resourcesStack, option.resourcesOut);
      const resOut = this._renderResourcesKeys(this.x - 30, this.y + 80, option.resourcesOut, active);
      resOut.forEach(res => this._container.push(res));
    }

    if (option.resourcesIn) {
      const resIn = this._renderResourcesKeys(this.x - 30, this.y + 125, option.resourcesIn, true);
      resIn.forEach(res => this._container.push(res));
    }

    if (option.consequence) {
      const consequence = this._renderText(this.x, this.y + 150, 130, `Adds card ${option.consequence}`);
      this._container.push(consequence);
    }

    if (active) {
      this.setInteractive({
        useHandCursor: true
      });
    }
  }

  _checkActive(resources, resourcesOut) {
    let find = true;
    resourcesOut.forEach(resource => {
      const index = resources.findIndex(res => res && res.type === resource);
      if (index === -1) find = false;
      resources[index] == null;
    })
    return find;
  }

  _getPositionX(index) {
    if (index === 0) {
      return this.scene.cameras.main.centerX - this.displayWidth;
    } else if (index === 1) {
      return this.scene.cameras.main.centerX;
    } else if (index === 2) {
      return this.scene.cameras.main.centerX + this.displayWidth;
    }
  }

  _selectHandler() {
    this._closeHandler(this._option);
  }

  _renderText(x, y, cardWidth, text) {
    return this.scene.add
      .text(x, y, text, 
        { fontFamily: 'Justinian2', fontSize: 12, fill: "#000000",
          wordWrap: { width: cardWidth, useAdvancedWrap: true }})
      .setOrigin(0.5, 0);
  }

  _createResourceKey(x, y, key, active) {
    return this.scene.add
      .sprite(x, y, key)
      .setScale(0.5)
      .setOrigin(0.5)
      .setAlpha(active ? 1 : 0.3);
  }

  _renderResourcesKeys(x, y, resources, active) {
    return resources.map((resource, index) => this._createResourceKey(x + (index * 30), y, resourcesKeys[resource], active))
  }

  removeAll() {
    this._container.forEach(child => child.destroy());
  }
}