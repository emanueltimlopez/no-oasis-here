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
    this._stack_cards = null;

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
  }

  create () {
    this.add
      .sprite(0, 0, 'bg')
      .setOrigin(0);

    this._startCardStack();
    
    this.registry.set('stackresources', resources);
    this._generateResources(resources);

    this.registry.events.on('changedata', this._updateData, this);
  }

  _startCardStack() {
    const getCards = (c) => [...c.sort(() => Math.random() - 0.5), OASIS];
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
  }

  _renderCard(card, index) {
    const resources = this.registry.get('stackresources');
    new Card(this, this.sys.game.config.width / 2, 50, card.img, card.options, index, this.onCloseCard, resources);
  }

  onCloseCard(index, option) {
    this._resourcesChanges(option);

    switch(option.status) {
      case 'LOSE':
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
    this.registry.set('actualcard', index + 1);
  }

  _boundsResources(stack, consecuences) {
    let cards = this.registry.get('stackcards');
    if (countResource(stack, PRISIONER) >= 5 ) {
      cards = addCardToStack(cards, RIOT);
    } else if (countResource(stack, WATER) == 0 ) {
      cards = addCardToStack(cards, EXTREME);
    }

    if (consecuences) {
      cards = addCardToStack(cards, HEALTH);
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

    this._boundsResources(stack, option.consecuences);
    this._generateResources(stack);
    this.registry.set('stackresources', [...stack]);
  }

};