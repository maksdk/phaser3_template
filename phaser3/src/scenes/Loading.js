//@ts-check
import Phaser from "phaser";
import { ImageExt } from "../extensions";
import ASSETS from "../../assets";

export default class LoadingScene extends Phaser.Scene {
   constructor() {
      super({key: "loading"});

   }

   preload() {
      const { images=[], atlases=[] } = ASSETS;

      this.load.crossOrigin = "anonymous";

      images.forEach(
         ({ name, src }) => this.load.image(name, src)
      );

      atlases.forEach(({name, src, img }) => {
         this.load.atlas(name, img, src);
      });
   }

   create() {
      const bg = new ImageExt(this, "bg");
      bg.setPosition(this.centerX, this.centerY);
      this.add.existing(bg);

      const smile = new ImageExt(this, "cool");
      smile.setPosition(this.centerX, this.centerY);
      this.add.existing(smile);
   }

   get centerX() {
      return this.sys.game.renderer.width / 2;
   }

   get centerY() {
      return this.sys.game.renderer.height / 2;
   }
}