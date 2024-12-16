
import LoaderScene from './scenes/LoaderScene';
import MainMenuScene from './scenes/MainMenuScene';
import PlayScene from './scenes/PlayScene';
import { AUTO, Game } from 'phaser';
import WinScene from './scenes/WinScene';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',  // Ensure 'arcade' physics is enabled
        arcade: {
          gravity: {x:0, y: 0 },
          debug: false
        }
      },
    scene: [
      LoaderScene,
      MainMenuScene,
      PlayScene,
      WinScene,
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
