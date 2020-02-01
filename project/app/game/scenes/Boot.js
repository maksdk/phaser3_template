//@ts-check
export default class BootScene extends Phaser.Scene {
   constructor() {
      super("Boot");
      this.assets = {};
      this.loadCallback = null;
   }
   
   init(data={}) {
      const { assets=[], callback=()=>{} } = data;
      this.assets = assets;
      this.loadCallback = callback;
   }
   
   preload() {
      const { atlases=[] } = this.assets;
      atlases.forEach(({name, src}) => {
         this.load.image(name, src);
      });

      this.load.on("complete", () => {
         if (this.loadCallback) this.loadCallback();
         this.loadCallback = null;

         const image = new Phaser.GameObjects.Image(this, this.sys.renderer.width / 2, this.sys.renderer.height / 2, "smile");
         this.add.existing(image);
      });
   }
}