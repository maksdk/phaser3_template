//@ts-check
import Phaser from "phaser";
import BaseGame from "../../lib/BaseGame";
import * as  gameScenes  from "./scenes";
import GameConfig from "../../configs/game";


export default class Game extends BaseGame {
   constructor(app, assets) {
      super();
      this.app = app;
      this.assets = assets;
      this.scene = null;

      this.scenes = Object.values(gameScenes)
         .reduce((acc, scene) => {
            return {...acc, [scene.key]: scene };
         }, {});
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

      Object.values(this.scenes)
         .forEach(scene => {
            this.scene.add(scene.key, scene);
         });
   }

   startScene(key, options) {
      if (!this.scenes[key]) {
         throw new Error(`Scene key: ${key} is not registered!`);
      }
      this.scene.start(key, {...options, app: this });
   }

   onPreload(cb) {
      this.scene.start("Boot", { assets: this.assets, callback: cb });
   }

   onRun() {

   }

   
}