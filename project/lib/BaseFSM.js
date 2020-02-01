//@ts-check
export default class BaseFSM {
   constructor(app, states) {
      this.app = app;

      this.states = new Map();

      this.states.forEach(state => {
         if (this.states.has(state.key)) {
            throw Error(`State: ${state.key} is already registered!`);
         }
         this.states.set(state.key, state);
      });

      this.currentState = null;
      this.prevState = null;
   }

   setState(key) {
      const StateClass = this.getState(key);

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

   getState(key) {
      if (!this.states.has(key)) {
         throw Error(`State: ${key} is not registered!`);
      }

      return this.states.get(key);
   }
}