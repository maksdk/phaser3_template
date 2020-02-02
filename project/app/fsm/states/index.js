//@ts-check
import InitApp from "./InitApp";
import StartGame from "./StartGame";
import PreloadInitResourses from "./PreloadInitResourses";
import PreloadGameResourses from "./PreloadGameResourses";

const STATES = [
   StartGame,
   InitApp,
   PreloadInitResourses,
   PreloadGameResourses
];

const STATE_IDS = {
   "INIT_APP": "INIT_APP",
   "PRELOAD_INIT_RESOURSES": "PRELOAD_INIT_RESOURSES",
   "PRELOAD_GAME_RESOURSES": "PRELOAD_GAME_RESOURSES",
   "START_GAME": "START_GAME",

   "LOAD_RESOURSES_ERROR": "LOAD_RESOURSES_ERROR"
};

export {
   STATE_IDS,
   STATES
};