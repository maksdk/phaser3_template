//@ts-check
import Phaser from "phaser";
// import TEXTS from "../../../../../../five-differences/src/game/modules/Texts";
import { ImageExt } from "../../../extensions";


const LOADING_BAR_WIDTH = 290;
const LOADING_BAR_HEIGHT = 50;
const LOADING_BAR_RADIUS = 24;

export default class LoadingStage extends Phaser.GameObjects.Container {
   constructor(scene) {
      super(scene);

      this.progress = null;
      this.loadingBar = null;

      this.createElems();
   }

   completeBar(cb) {
      const progresObj = { val: 75, x: 0, id: "progress" };
      const tween = this.scene.add.tween({
         callbackScope: this,
         targets: [this.loadingBar, progresObj],
         x: 0,
         val: 99,
         duration: 100,
         onComplete() {
            tween.remove();
            if (cb) cb();
         },
         onUpdate(tw, target) {
            if (target.id === "progress") {
               // this.progress.setText(Math.round(target.val) + TEXTS.LOADING_PROGRESS.text);
               this.progress.setText(Math.round(target.val) + "%");
            }
         }
      });
   }

   updateBar(percent) {
      let x = -LOADING_BAR_WIDTH + LOADING_BAR_WIDTH * (percent * 0.75);
      if (x > LOADING_BAR_WIDTH) x = LOADING_BAR_WIDTH;
      this.loadingBar.setX(x);
      // this.progress.setText(Math.round(percent * 0.75 * 100) + TEXTS.LOADING_PROGRESS.text);
      this.progress.setText(Math.round(percent * 0.75 * 100) + "%");
   }

   createElems() {
      const w = this.scene.sys.renderer.width;
      const h = this.scene.sys.renderer.height;

      const barPos = { 
         x: w * 0.5, 
         y: h * 0.9
      };

      const barMaskProps = {
         x: barPos.x - LOADING_BAR_WIDTH * 0.5, 
         y: barPos.y - LOADING_BAR_HEIGHT * 0.5, 
         w: LOADING_BAR_WIDTH, 
         h: LOADING_BAR_HEIGHT
      };
      
      const bg = new ImageExt(this.scene, "loading-screen/bg");
      bg.setOrigin(0);
      this.add(bg);

      const bar = new Phaser.GameObjects.Container(this.scene);
      bar.setPosition(barPos.x, barPos.y);
      this.add(bar);

      const barBot = new ImageExt(this.scene, "loading-screen/bot");
      bar.add(barBot);

      const barFill = new ImageExt(this.scene, "loading-screen/fill");
      barFill.setPosition(-barMaskProps.w, 0);
      bar.add(barFill);
      this.loadingBar = barFill;

      const barTop = new ImageExt(this.scene, "loading-screen/top");
      bar.add(barTop);

      const barMask = new Phaser.GameObjects.Graphics(this.scene);
      barMask.fillStyle(0xFF0000, 0.5);
      barMask.fillRoundedRect(barMaskProps.x, barMaskProps.y, barMaskProps.w, barMaskProps.h, LOADING_BAR_RADIUS);
      barFill.setMask(barMask.createGeometryMask()); 

      // const progress = new Phaser.GameObjects.Text(this.scene, 0, 0, "0" + TEXTS.LOADING_PROGRESS.text, TEXTS.LOADING_PROGRESS.style);
      const progress = new Phaser.GameObjects.Text(this.scene, 0, 0, "0" + "%", {});
      progress.setOrigin(0.5);
      this.progress  = progress;
      bar.add(progress);
   }
}