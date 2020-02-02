//@ts-check
import Phaser from "phaser";
import ASSETS from "../assets/assets.js";
 
export default class ImageExt extends Phaser.GameObjects.Image {
   /**
    * @param {Phaser.Scene} scene 
    * @param {String} texture 
    */
   constructor(scene, texture) {

      if (!!ASSETS.imagesMap[texture]) {
         const { atlasName  } = ASSETS.imagesMap[texture];

         super(scene, 0, 0, atlasName, texture);
      }
      else {
         super(scene, 0, 0, texture);
      }
   }
}