
//@ts-check
import BaseState from "../../../lib/BaseState";
import { STATE_IDS } from "./index"; 

export default class InitApp extends BaseState {
   constructor(fsm) {
      super(fsm);
      this.nextState = STATE_IDS.PRELOAD_INIT_RESOURSES;
      this.id = InitApp.id;
   }

   static get id() { 
      return STATE_IDS.INIT_APP;
   }
}