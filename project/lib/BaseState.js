//@ts-check
export default class BaseState {
   constructor(fsm) {
      this.fsm = fsm;
   }

   onExit(cb) {
      // console.error("Exit: BaseState");
      cb && cb();
   }
   
   onEnter(cb) {
      // console.error("Enter: BaseState");
      cb && cb();
   }
}