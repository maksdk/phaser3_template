//@ts-check
import Phaser from "phaser";
import BaseGame from "../../lib/BaseGame";
import {
   Boot as BootScene,
   // Preloader as PreloaderScene,
   // Game as GameScene
} from "./scenes";
import GameConfig from "../../configs/game";


export default class Game extends BaseGame {
   constructor(app, assets) {
      super();
      this.app = app;
      this.assets = assets;
      this.scene = null;
   }

   static get config() {
      return {
         type: Phaser.AUTO,
         scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
         },
         ...GameConfig
      }
   }

   init(assets) {
      const game = new Phaser.Game(Game.config);
      this.scene = game.scene;
      this.scene.add("Boot", BootScene);
      // this.scene.add("Preload", PreloaderScene);
      // this.scene.add("Game", GameScene);
   }

   onPreload(cb) {
      this.scene.start("Boot", { assets: this.assets, callback: cb });
   }

   onRun() {

   }

   
}