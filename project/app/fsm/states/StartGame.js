
//@ts-check
import BaseState from "../../../lib/BaseState";
import { STATE_IDS } from "./index"; 

export default class StartGame extends BaseState {
   constructor(fsm) {
      super(fsm);
      this.nextState = null;
      this.id = StartGame.id;
   }

   static get id() { 
      return STATE_IDS.START_GAME;
   }
}