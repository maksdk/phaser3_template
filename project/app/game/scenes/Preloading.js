//@ts-check
import { AssetsLoader } from "../../../loaders";
import LoadingStage from "../components/LoadingStage";

export default class PreloadingScene extends Phaser.Scene {
   constructor() {
      super("Preloading")
      this.assets = {};
      this.controller = null;
      this.onPreloadCb = null;
      this.onPreload = null;

      this.imageLoader = null;
      this.loadingStage = null;

      this.successLoadedData = this.successLoadedData.bind(this);
      this.failLoadedData = this.failLoadedData.bind(this);
      this.loadAvatars = this.loadAvatars.bind(this);
      this.completeLoadingBar = this.completeLoadingBar.bind(this);
   }
   
   init(data={}) {
      const { 
         assets=[], 
         onPreloadCb=()=>{}, 
         controller 
      } = data;

      this.assets = assets;
      this.controller = controller;
      this.onPreloadCb = onPreloadCb;

      this.loadingStage = new LoadingStage(this);
      this.add.existing(this.loadingStage);
   }
   
   preload() {
      if (this.onPreload) {
         this.onPreload(this);
         this.onPreload = null;
      }
      
      const promises = [];

      promises.push(this.loadUserData());
      promises.push(this.loadImages());
      promises.push(this.loadSpriteAnims());
      promises.push(this.loadSounds());
 
      Promise.all(promises) 
         .then(this.successLoadedData)
         .then(this.loadAvatars)
         .then(this.completeLoadingBar)
         .catch(this.failLoadedData);

      this.startLoadingBar();
   }

   completeLoadingBar() {
      this.loadingStage.completeBar(() => this.startMainStage());
      return Promise.resolve();
   }

   successLoadedData(data) {
      const [ loadedData ] = data;
      const { usersData:{ avatars=[], ...usersRest }, ...rest } = loadedData;
      
      Game.data.setData({...rest, usersData: {...usersRest}});
      Game.data.init();

      return Promise.resolve(avatars);
   }

   failLoadedData(error) {
      console.log("Error: loading game")
      console.error(error)
   }

   loadUserData() {
      const dataLoader = new DataLoader(Game.environment);
      return dataLoader.load();
   }

   loadSpriteAnims() {
      const assets = [
         { name: "ice_time_in", sprite: "./assets/sprites/ice_time_in.png", atlas: "./assets/sprites/ice_time_in.json", config :{frameHeight: 30, frameWidth: 1366}},
         { name: "ice_time_out", sprite: "./assets/sprites/ice_time_out.png", atlas: "./assets/sprites/ice_time_out.json", config :{frameHeight: 30, frameWidth: 1366}}
      ];
      
      const promises = assets.map(({name, atlas, sprite, config }) => {
         this.load.spritesheet(name, sprite, config);
         this.load.atlas(name + "_json", sprite, atlas);
      });

      return new Promise(resolve => {
         this.load.on("complete", () => {
            resolve();
         });
      });
   }

   loadAvatars(avatars) {
      if (!avatars || avatars.length <= 0) {
         return Promise.resolve();
      }

      const loader = new ImageLoader(this, { imagesBase64: avatars });
      return loader.loadImagesBase64()
         .catch(error => {
            console.error("Error. Load users avatars", error);
            return Promise.resolve();
         });
   }

   loadImages() {
      const { images=[], atlases=[] } = ASSETS;
      const loader = new ImageLoader(this, { images, atlases });
      this._imgLoader = loader;
      return loader.load();
   }

   loadSounds() {
      const { sounds=[] } = ASSETS;
      const loader = new SoundLoader(this, sounds);
      return loader.load();
   }

   startLoadingBar() {
      if (this._imgLoader) {
         this._imgLoader.on("progress", (percent) =>  {
            this.loadingStage.updateBar(percent)
         }, this.loadingStage);
      }
   }
}