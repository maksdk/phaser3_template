//@ts-check
import BaseApp from "../lib/BaseApp";
import Game from "./game";
import Store from "./store";
import FSM from "./fsm";
import {
   Network as NetworkProvider,
   Social as SocialProvider
} from "../providers";

class App extends BaseApp {
   constructor() {
      super();

      this.game = null;
      this.store = null;
      this.fsm = null;
      this.providers = {};
      // this.loaders = {};
   }

   init() {
      const assets = {
         atlases:[{name: "smile", src: "../assets/emoji.png"}],
         images:[],
         loadingScreenImages: []
      };
      this.game = new Game(this, assets);
      this.game.init();

      this.store = new Store(this);
      this.fsm = new FSM(this);

      this.providers.network = NetworkProvider;
      this.providers.social = SocialProvider;

      // this.loaders.font = {};
      // this.loaders.image = {};
      // this.loaders.data = {};
      // this.loaders.sound = {};
   }

   load(cb) {
      this.game.onPreload(() => {
         console.log("you need to load all resourses here")
         cb && cb();
      });
   }

   run() {
      console.log("run")
   }
}

const app = new App();
app.init();
app.load(app.run);