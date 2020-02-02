//@ts-check
import { AssetsLoader } from "../../../loaders";

export default class InitScene extends Phaser.Scene {
   constructor() {
      super("Init")
      this.assets = {};
      this.controller = null;
      this.onPreloadCb = null;
   }
   
   init(data={}) {
      const { assets=[], onPreloadCb=()=>{}, controller } = data;
      this.assets = assets;
      this.controller = controller;
      this.onPreloadCb = onPreloadCb;
   }
   
   preload() {
      // const loader = new AssetsLoader(this, this.assets);
      const loader = new AssetsLoader(this, { images:[{name: "smile", src: "../assets/emoji.png"}]});
      loader.load()
         .then(() => {
            if (this.onPreloadCb) this.onPreloadCb();
            this.onPreloadCb = null;
         })
         .catch(() => {
            if (this.onPreloadCb) this.onPreloadCb({ error: "Init assets is not loaded. Scene: Init" });
            this.onPreloadCb = null;
         });
   }
}