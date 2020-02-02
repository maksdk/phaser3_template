
//@ts-check
import BaseState from "../../../lib/BaseState";
import { STATE_IDS } from "./index"; 

export default class PreloadInitResourses extends BaseState {
   constructor(fsm) {
      super(fsm);
      this.nextState = STATE_IDS.PRELOAD_GAME_RESOURSES;
      this.id = PreloadInitResourses.id;
   }

   static get id() { 
      return STATE_IDS.PRELOAD_INIT_RESOURSES;
   }

   onEnter() {
      const { assets={}, game } = this.fsm.app;
      const { imagesLoadingScreen=[] } = assets;

      game.startScene("Init",{
         assets: { images: imagesLoadingScreen }, 
         onPreloadCb: (res={}) => {
            const { error } = res;
            if (error) {
               console.error(error);
               return;
            }
            this.fsm.setState(this.nextState);
         }
      });
   }
}