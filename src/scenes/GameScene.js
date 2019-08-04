import 'phaser';
import Card from '../entities/Card';
import Resource from '../entities/Resource';
import resources, { PRISIONER, WATER } from '../cards/resources';
import cards, { RIOT, EXTREME, HEALTH, OASIS } from '../cards/paths';


export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');

    this._stack_resources = null;
    this._stack_cards = null;

    this.onCloseCard = this.onCloseCard.bind(this);
  }
 
  preload () {
    this.load.image('card-background', 'src/assets/card.png');
    this.load.image('waterKey', 'src/assets/w.png');
    this.load.image('moneyKey', 'src/assets/m.png');
    this.load.image('objectKey', 'src/assets/o.png');
    this.load.image('prisionerKey', 'src/assets/p.png');
    this.load.image('friendKey', 'src/assets/f.png');
    this.load.image('water', 'src/assets/water.png');
    this.load.image('money', 'src/assets/money.png');
    this.load.image('object', 'src/assets/object.png');
    this.load.image('prisioner', 'src/assets/prisioner.png');
    this.load.image('friend', 'src/assets/friend.png');
    this.load.image('assault', 'src/assets/assault.png');
    this.load.image('health', 'src/assets/health.png');
    this.load.image('lastchance', 'src/assets/lastchance.png');
    this.load.image('n/n', 'src/assets/nn.png');
    this.load.image('merchant', 'src/assets/merchant.png');
    this.load.image('oasis', 'src/assets/oasis.png');
    this.load.image('rain', 'src/assets/rain.png');
    this.load.image('riot', 'src/assets/riot.png');
  }

  create () {
    this._startCardStack();
    this._startResourcesStack();
    this._onDataChange();    
  }

  _randomCards(cards) {
    return [...cards.sort(() => Math.random() - 0.5), OASIS];
  }

  _startCardStack() {
    this.registry.set('stackcards', this._randomCards(cards));
    this.registry.set('actualcard', null);
  }

  _startResourcesStack() {
    this.registry.set('stackresources', resources);
    this._generateResources();
  }

  _generateResources() {
    const resources = this.registry.get('stackresources');
    this._stack_resources = resources.map((resource, index) => new Resource(this, 0, 600, resource.type, index, resource.img));
  }

  _onDataChange() {
    this.registry.events.on('changedata', this._updateData, this);
  }

  _updateData(_, key, value) {
    if (key === 'actualcard') {
      const actualCard = this.registry.get('actualcard');
      const stackCards = this.registry.get('stackcards');
      this._renderCard(stackCards[index], actualCard);
    }
  }

  _renderCard(card, index) {
    new Card(this, this.sys.game.config.width / 2, 0, card.img, card.options, index, this.onCloseCard);
  }

  onCloseCard(index, option) {
    switch(option.status) {
      case 'LOSE':
        break;
      case 'CONTINUE':
        this._startCardStack();
        break;
      case 'ELIMINATE':
        this._eliminateCardFromStack(index);
        break;
      default:
        break;
    }
    this._resourcesChanges(option);
    this._nextCard(index);
  }

  _nextCard(index) {
    this.registry.set('actualcard', index + 1);
  }

  _eliminateCardFromStack(cards, index) {
    cards[index] = null;
    return [...cards.filter(Boolean)];
  }

  _addCardToStack(cards, newCard) {
    cards.push(newCard);
    return [...cards];
  }

  _boundsResources(stack) {
    const cards = this.registry.get('stackcards');
    if (stack.find(resource => resource.type === PRISIONER.type) >= 5 ) {
      cards = this._addCardToStack(cards, RIOT);
    } else if (stack.find(resource => resource.type === WATER.type) == 0 ) {
      cards = this._addCardToStack(cards, EXTREME);
    }
    this.registry.set('stackcards', [...cards]);
  }

  _setConsequences(option) {
    const cards = this.registry.get('stackcards');
    if (option.consecuences) {
      cards = this._addCardToStack(cards, HEALTH);
    }
    this.registry.set('stackcards', [...cards]);
  }

  _resourcesChanges(options) {
    const stack = this.registry.get('stackresources');

    if (option.resourcesIn) {
      stack = this._addResources(stack, option.resourcesIn);
    }

    if (option.resourcesOut) {
      if (typeof option.resourcesOut === 'boolean') {
        stack = this._removeRandomResources(stack, option.resourcesOut);
      } else {
        stack = this._removeResources(stack, option.resourcesOut);
      }
    }

    this._boundsResources(stack);
    this._setConsequences();
    this.registry.set('stackresources', [...stack]);
  }

  _removeResources(stack, resources) {
    const foundIndex = resources.map(resource => stack.findIndex(res => res.type === resource));
    foundIndex.forEach(index => { stack[index] = null; } );
    return [...stack.filter(Boolean)];
  }

  _removeRandomResources(stack, resources) {
    const finalesources = stack.filter(() => (Math.random() < 0.5));
    return [...finalesources];
  }

  _addResources(stack, resources) {
    resources.forEach(resource => stack.push(resources.find(res => res.type === resource)[0]));
    return [...stack];
  }
};