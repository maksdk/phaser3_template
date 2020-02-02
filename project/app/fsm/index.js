//@ts-check
import BaseFSM from "../../lib/BaseFSM";
import  { STATE_IDS, STATES } from "./states";

export default class FSM extends BaseFSM {
   constructor(app) {
      super();
      this.app = app;
      this.states = new Map();
      this.currentState = null;
      this.prevState = null;
   }

   static get transactions() {
      return [
         { "from": STATE_IDS.INIT_APP,               "to":  STATE_IDS.PRELOAD_INIT_RESOURSES },
         { "from": STATE_IDS.PRELOAD_INIT_RESOURSES,  "to":  STATE_IDS.PRELOAD_GAME_RESOURSES },
         { "from": STATE_IDS.PRELOAD_GAME_RESOURSES,  "to":  STATE_IDS.START_GAME }
      ]
   }

   init() {
      STATES.forEach(state => {
         if (this.states.has(state.id)) {
            throw Error(`State: ${state.id} is already registered!`);
         }
         this.states.set(state.id, state);
      });

      this.setState(STATE_IDS.INIT_APP);
   }

   nextState(id) {
      id = id || this.currentState.nextState;
      // console.log(id)
      this.setState(id);
   }

   setState(id) {
      const StateClass = this.getState(id);

      const callback = () => {
         this.currentState = new StateClass(this);
         this.currentState.onEnter();
      };

      if (this.currentState) {
         this.currentState.onExit(callback);
      }
      else {
         callback();
      }
   }

   getState(id) {
      if (!this.states.has(id)) {
         throw Error(`State: ${id} is not registered!`);
      }

      return this.states.get(id);
   }
}
