import 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import TutorialScene from './scenes/TutorialScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Tutorial', TutorialScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Menu');
  }
}
 
window.game = new Game();