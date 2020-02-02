
//@ts-check
import BaseState from "../../../lib/BaseState";
import { STATE_IDS } from "./index"; 
import { GameDataLoader } from "../../../loaders";

export default class PreloadGameResourses extends BaseState {
   constructor(fsm) {
      super(fsm);
      this.nextState = STATE_IDS.START_GAME;
      this.id = PreloadGameResourses.id;
   }

   static get id() { 
      return STATE_IDS.PRELOAD_GAME_RESOURSES;
   }

   onEnter() {
      const { assets={}, providers, game, config } = this.fsm.app;

      game.startScene("Preloading", {
         onPreload: () => {

            this.loadAssets(assets)
         },

      })
   }

   loadAssets(assets) {
      const promises = [];

      promises.push(this.loadImages());
      promises.push(this.loadSpriteAnims());
      promises.push(this.loadSounds());

      return Promise.all(promises);
   }

   loadGameData() {
      const { providers, config } = this.fsm.app;
      const dataLoader = new GameDataLoader(providers.network, providers.social, config);
      return dataLoader.load();
   }
}