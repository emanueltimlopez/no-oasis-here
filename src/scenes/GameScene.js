import 'phaser';
import Card from '../entities/Card';
import Resource from '../entities/Resource';
import resources, { PRISIONER, WATER, all } from '../cards/resources';
import cards, { RIOT, EXTREME, HEALTH, OASIS } from '../cards/paths';
import { removeResources, removeRandomResources, addResources, 
  addCardToStack, eliminateCardFromStack, countResource } from '../utils/stackUtils'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');

    this._stack_resources = null;

    this.onCloseCard = this.onCloseCard.bind(this);
  }
 
  preload () {
    this.load.image('w', 'src/assets/w.png');
    this.load.image('m', 'src/assets/m.png');
    this.load.image('o', 'src/assets/o.png');
    this.load.image('p', 'src/assets/p.png');
    this.load.image('f', 'src/assets/f.png');
    this.load.image('water', 'src/assets/water.png');
    this.load.image('money', 'src/assets/money.png');
    this.load.image('object', 'src/assets/object.png');
    this.load.image('prisioner', 'src/assets/prisioner.png');
    this.load.image('friend', 'src/assets/friend.png');
    this.load.image('assault', 'src/assets/assault.png');
    this.load.image('health', 'src/assets/health.png');
    this.load.image('lastchance', 'src/assets/lastchance.png');
    this.load.image('nn', 'src/assets/nn.png');
    this.load.image('merchant', 'src/assets/merchant.png');
    this.load.image('oasis', 'src/assets/oasis.png');
    this.load.image('rain', 'src/assets/rain.png');
    this.load.image('riot', 'src/assets/riot.png');
    this.load.image('blank', 'src/assets/blank.png');
    this.load.image('bg', 'src/assets/bg.png');
    this.load.audio('game-music', 'src/assets/game_music.mp3');
  }

  create () {
    this.add
      .sprite(0, 0, 'bg')
      .setOrigin(0);

    this.music = this.sound.add('game-music')
    this.music.play({ loop: true });
      
    this._startCardStack();
    
    this.registry.set('stackresources', resources);
    this.registry.set('score', 0);
    this._generateResources(resources);

    this.registry.events.on('changedata', this._updateData, this);

    this.scoreLabel = this.add.text(this.sys.game.config.width - 150, 30, "0Km", 
      { fontFamily: 'Arial', fontSize: 30, fill: "#ffffff", stroke: "#535353", strokeThickness: 5 }); 
  }

  _startCardStack() {
    const getCards = (c) => [...c.sort(() => Phaser.Math.Between(0, 1)), OASIS];
    this.registry.set('stackcards', getCards(cards));
    this.registry.set('actualcard', 0);
  }

  _generateResources(resources) {
    if (this._stack_resources) this._stack_resources.forEach(resource => resource.destroy());
    this._stack_resources = resources.map((resource, index) => new Resource(this, 0, 550, resource.type, index, resource.img));
  }

  _updateData(_, key, value) {
    if (key === 'actualcard') {
      const actualCard = this.registry.get('actualcard');
      const stackCards = this.registry.get('stackcards');
      this._renderCard(stackCards[actualCard], actualCard);
    }
    if (key === 'score') {
      this.scoreLabel.setText(`${value}Km`);
    }
  }

  _renderCard(card, index) {
    const resources = this.registry.get('stackresources');
    new Card(this, this.sys.game.config.width / 2, 50, card.img, card.options, index, this.onCloseCard, resources);
  }

  onCloseCard(index, option) {
    this._resourcesChanges(option);

    switch(option.status) {
      case 'LOSE':
        this.music.stop();
        this.scene.start('Result');
        break;
      case 'CONTINUE':
        this._startCardStack();
        break;
      default:
        this._nextCard(index);
        break;
    }
  }

  _nextCard(index) {
    this.registry.set('score', this.registry.get('score') + Phaser.Math.Between(1, 4));
    this.registry.set('actualcard', index + 1);
  }

  _boundsResources(stack, consequence) {
    let cards = this.registry.get('stackcards');
    const actualCard = this.registry.get('actualcard');

    if (countResource(stack, PRISIONER) >= 4 ) {
      cards = addCardToStack(cards, RIOT, actualCard + 1);
    } else if (countResource(stack, WATER) == 0 ) {
      cards = addCardToStack(cards, EXTREME, actualCard + 1);
    }

    if (consequence) {
      cards = addCardToStack(cards, HEALTH, actualCard + 1);
    }
    this.registry.set('stackcards', [...cards]);
  }


  _resourcesChanges(option) {
    let stack = this.registry.get('stackresources');

    if (option.resourcesIn) {
      stack = addResources(stack, all, option.resourcesIn);
    }

    if (option.resourcesOut) {
      if (option.resourcesOut.length === 0) {
        stack = removeRandomResources(stack, option.resourcesOut);
      } else {
        stack = removeResources(stack, option.resourcesOut);
      }
    }

    this._boundsResources(stack, option.consequence);
    this._generateResources(stack);
    if (stack.length === 0) {
      this.music.stop();
      this.scene.start('Result');
    }
    this.registry.set('stackresources', [...stack]);
  }

};