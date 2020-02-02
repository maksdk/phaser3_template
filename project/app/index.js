//@ts-check
import BaseApp from "../lib/BaseApp";
import Game from "./game";
import Store from "./store";
import Loader from "../loaders/Loader";
import FSM from "./fsm";
import {
   Network as NetworkProvider,
   Social as SocialProvider
} from "../providers";

import ASSETS from "../assets/assets";

class App extends BaseApp {
   constructor() {
      super();
      this.game = null;
      this.store = null;
      this.fsm = null;
      this.loader = null;
      this.assets = ASSETS;
      this.providers = {};
   }

   init() {
      const assets = {
         atlases:[{name: "smile", src: "../assets/emoji.png"}],
         images:[],
         loadingScreenImages: []
      };

      this.game = new Game(this, assets);
      this.game.init();

      this.loader = new Loader(this);

      this.store = new Store(this);

      this.fsm = new FSM(this);
      this.fsm.init();

      this.providers.network = NetworkProvider;
      this.providers.social = SocialProvider;
   }

   // load(cb) {
   //    this.fsm.nextState("LOAD-RESOURSES");

   //    this.game.onPreload(() => {
   //       console.log("you need to load all resourses here")
   //       cb && cb();
   //    });
   // }

   run() {
      this.fsm.nextState();
   }
}

const app = new App();
app.init();
app.run();