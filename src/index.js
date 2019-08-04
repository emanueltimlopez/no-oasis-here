import 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Menu');
  }
}
 
window.game = new Game();