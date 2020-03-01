//@ts-check
import FontFaceObserver from 'fontfaceobserver';
export default class FontLoader {
   /**
    * @param {Object[]} fonts 
    * @param {String} fonts.name 
    * @param {String} fonts.src 
    */
   constructor(fonts=[]) {
      this.fonts = fonts;
   }

   load() {
      if (!this.fonts || this.fonts.length === 0) {
         return Promise.resolve();
      }

      const container = document.getElementsByTagName('head')[0];

      const promises = this.fonts.map(({ name, src }) => {
         const s = document.createElement('style');
         s.type = "text/css";
         s.appendChild(document.createTextNode("@font-face {font-family: " + name + "; src: url(" + src + ");" + "}"));
         container.appendChild(s);
         return new FontFaceObserver(name).load();
      });

      return Promise.all(promises);
   }
};