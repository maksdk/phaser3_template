//@ts-check
import Phaser from "phaser";

export default class AssetsLoader extends Phaser.Loader.LoaderPlugin {
   /**
    * @param {Phaser.Scene} scene 
    * @param {Object} assets 
    * 
    * @param {Object[]} [assets.images] 
    * @param {string} assets.images.name 
    * @param {string} assets.images.src
    *  
    * @param {Object[]} [assets.jsons] 
    * @param {string} assets.jsons.name 
    * @param {string} assets.jsons.src 
    * 
    * @param {Object[]} [assets.atlases] 
    * @param {string} assets.atlases.name 
    * @param {string} assets.atlases.src 
    * @param {string} assets.atlases.img 
    * 
    * @param {Object[]} [assets.imagesBase64]
    * @param {string} assets.imagesBase64.name
    * @param {string} assets.imagesBase64.src
    */
   constructor(scene, assets) {
      super(scene);

      this.scene = scene;
      this._assets = assets;

      this.crossOrigin = 'anonymous';
   }

   setOptions(options={}) {
      const { crossOrigin="", baseURL="" } = options;
      this.crossOrigin = crossOrigin;
      this.baseURL = baseURL;
   }

   load() {
      this.loadImage(false);
      this.loadJson(false);
      this.loadAtlases(false);

      this.start();

      return new Promise((resolve, reject) => {
         this.on("complete", resolve);
         this.on("loaderror", reject);
      });
   }

   loadJson(autoStart=true) {
      const { jsons=[] } = this._assets;

      jsons.forEach(
         ({ name, src, settings={} }) => this.json(name, src, settings)
      );

      if (autoStart) {
         this.start();
         return new Promise((resolve, reject) => {
            this.on("complete", resolve);
            this.on("loaderror", reject);
         });
      }
   }

   loadImage(autoStart=true) {
      const { images=[]} = this._assets;
      
      images.forEach(({ name, src, settings={} }) => {
         if (this.scene.textures.exists(name)) {
            console.error(`Such image name: "${name}" already registered!`)
         }
         this.image(name, src, settings);
      });

      if (autoStart) {
         this.start();
         return new Promise((resolve, reject) => {
            this.on("complete", resolve);
            this.on("loaderror", reject);
         });
      }
   }

   loadAtlases(autoStart=true) {
      const { atlases=[] } = this._assets;

      atlases.forEach(({name, src, img }) => {
         this.atlas(name, img, src);
      });

      if (autoStart) {
         this.start();
         return new Promise((resolve, reject) => {
            this.on("complete", resolve);
            this.on("loaderror", reject);
         });
      }
   }

   loadImagesBase64() {
      const { imagesBase64 } = this._assets;

      imagesBase64.forEach(({ name, src }) => {
         this.scene.textures.addBase64(name, src);
      });

      let error = false;
      let count = imagesBase64.length;

      return new Promise((resolve, reject) => {
         this.scene.textures.on("onload", () => {
            count -= 1;
            if (count <= 0 && error === false) {
               resolve();
            }
         });
         this.scene.textures.on("onerror", reject);
      });
   }

   removeAll() {
      this.removeJson();
      this.removeImage();
   }

   /**
    * @param {Array | string} [keys] 
    */
   removeJson(keys) {
      if (!keys) {
         const { jsons=[] } = this._assets;
         jsons.forEach(
            ({ name }) => this.scene.cache.json.remove(name)
         );
      }
      else if (typeof keys === "string") {
         this.scene.cache.json.remove(keys);
      }
      else if (Array.isArray(keys)) {
         keys.forEach(key => 
            this.scene.cache.json.remove(name)
         );
      }
      else {
         console.warn("Keys is not found");
         console.log("Keys is not found");
      }
   }

   /**
    * @param {Array | string} [keys] 
    */
   removeImage(keys) {
      if (!keys) {
         const { images=[]} = this._assets;
         images.forEach(
            ({ name }) => this.scene.textures.remove(name)
         );
      }
      else if (typeof keys === "string") {
         this.scene.textures.remove(keys);
      }
      else if (Array.isArray(keys)) {
         keys.forEach(key => 
            this.scene.textures.remove(key)
         );
      }
      else {
         console.warn("Keys is not found");
         console.log("Keys is not found");
      }
   }
}