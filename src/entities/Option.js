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

    this.container = this.scene.add.container();
    const t = this._renderText(this.x, this.y + 10, 130, option.text);
    this.container.add(t);

    if (option.resourcesOut) {
      const resOut = this._renderResourcesKeys(this.x - 30, this.y + 90, option.resourcesOut);
      this.container.add(resOut);
      this._checkActive(resourcesStack, option.resourcesOut);
    }

    if (option.resourcesIn) {
      const resIn = this._renderResourcesKeys(this.x - 30, this.y + 125, option.resourcesIn);
      this.container.add(resIn);
    }
  }

  _checkActive(resources, resourcesOut) {
    let find = true;
    resourcesOut.forEach(resource => {
      const index = resources.filter(Boolean).findIndex(res => res.type === resource);
      if (index === -1) find = false;
      resources[index] == null;
    })
    if (find) {
      this.setInteractive({
        useHandCursor: true
      });
    }
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
    this.container.destroy();
    this._closeHandler(this._option);
  }

  _renderText(x, y, cardWidth, text) {
    return this.scene.add
      .text(x, y, text, 
        { fontFamily: 'Justinian2', fontSize: 12, fill: "#000000",
          wordWrap: { width: cardWidth, useAdvancedWrap: true }})
      .setOrigin(0.5, 0);
  }

  _createResourceKey(x, y, key) {
    return this.scene.add
      .sprite(x, y, key)
      .setScale(0.5)
      .setOrigin(0.5);
  }

  _renderResourcesKeys(x, y, resources) {
    return resources.map((resource, index) => this._createResourceKey(x + (index * 30), y, resourcesKeys[resource]))
  }
}