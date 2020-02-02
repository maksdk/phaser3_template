//@ts-check
import Phaser from "phaser";
import BaseGame from "../../lib/BaseGame";
import {
   Intro as InitScene,
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
      
      this.scenes = { Init:  InitScene };
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

   /**
    * @description Создаем игру и инициализируем все сцены
    */
   init() {
      const game = new Phaser.Game(Game.config);
      this.scene = game.scene;
      this.scene.add("Init", InitScene);
      console.log(this.scene)
      // this.scene.add("Preload", PreloaderScene);
      // this.scene.add("Game", GameScene);
   }

   startScene(key, options) {
      if (!this.scenes[key]) {
         throw new Error(`Scene key: ${key} is not registered!`);
      }
      const scene = this.scene.start(key, {...options, controller: this });
   }

   onPreload(cb) {
      this.scene.start("Boot", { assets: this.assets, callback: cb });
   }

   onRun() {

   }

   
}