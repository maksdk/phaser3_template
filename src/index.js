//@ts-check
import Phaser from 'phaser';
import LoadingScene from './scenes/Loading';

const config = {
   type: Phaser.AUTO,
   width: 1920,
   height: 1080,
   scene: LoadingScene,
   scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
   },
   backgroundColor: 0x4c89fe
};

const game = new Phaser.Game(config);
