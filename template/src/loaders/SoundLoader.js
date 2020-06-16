//@ts-check
import Phaser from "phaser";

export default class SoundLoader extends Phaser.Loader.LoaderPlugin {
   /**
    * @param {Phaser.Scene} scene 
    * @param {Object[]} sounds 
    * @param {String} sounds.name 
    * @param {String} sounds.src 
    */
   constructor(scene, sounds) {
      super(scene);

      this.scene = scene;
      this._sounds = sounds;
   }

   load() {
      this._sounds.forEach(sound => {
         const { name, src } = sound;
         this.audio(name, [src]);
      });

      this.start();

      return new Promise((resolve, reject) => {
         this.on("complete", resolve);
         this.on("loaderror", reject);
      });
   }
}