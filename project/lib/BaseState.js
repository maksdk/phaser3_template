//@ts-check
export default class BaseState {
   constructor(fsm) {
      this.fsm = fsm;
      this.key = BaseState.key;
   }

   static get key() {
      return "BaseState";
   }

   onExit(cb) {
      cb && cb();
   }

   onEnter(cb) {
      cb && cb();
   }
}