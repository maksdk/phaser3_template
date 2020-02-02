//@ts-check
import AssetsLoader from "./AssetsLoader";
import FontLoader from "./FontLoader";
import GameDataLoader from "./GameDataLoader";
import SoundLoader from "./SoundLoader";
import ERROR from "../cst/error";

export default class Loader {
   constructor(app) {
      this.app = app;
   }

   assets(scene, assets={}) {
      return new AssetsLoader(scene, assets);
   }

   loadAssets(assets={}, cb) {
      console.log(this.app.game.scene.scene);
      const loader = new AssetsLoader(this.app.game.scene.scene, assets);
      const promise = loader.load();
      
      promise.then((res={}) => {
            cb && cb(null, res);
            return Promise.resolve(res);
         })
         .catch((error) => {
            cb && cb({ error: error || ERROR.LOADING_ASSETS_FAILED });
            return { error: error || ERROR.LOADING_ASSETS_FAILED };
         });
   }

   loadGameData({}, cb) {
      const loader = new GameDataLoader(this.app.providers.network, this.app.providers.social, this.app.config);
      const promise = loader.load();

      promise.then(res => {
            cb && cb(null, res);
            return Promise.resolve(res);
         });
   }

   loadSounds(sounds=[], cb) {
      const loader = new SoundLoader(this.app.game.scene, sounds);
      const promise = loader.load();
      
      promise.then((res={}) => {
            cb && cb(null, res);
            return Promise.resolve(res);
         })
         .catch((error) => {
            cb && cb({ error: error || ERROR.LOADING_SOUNDS_FAILED });
            return Promise.resolve({ error: error || ERROR.LOADING_SOUNDS_FAILED });
         });
   }

   loadFonts(fonts=[], cb) {
      const loader = new FontLoader(fonts);
      const promise = loader.load();
      
      promise.then((res={}) => {
            cb && cb(null, res);
            return Promise.resolve(res);
         })
         .catch((error) => {
            cb && cb({ error: error || ERROR.LOADING_FONTS_FAILED });
            return Promise.resolve({ error: error || ERROR.LOADING_FONTS_FAILED });
         });
   }
}