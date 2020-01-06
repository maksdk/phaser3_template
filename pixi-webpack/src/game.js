import * as PIXI from "pixi.js";

const game = () => {
    const app = new PIXI.Application({width: 600, height: 600, backgroundColor: 0xFF0000 });
    document.body.appendChild(app.view);
};

export default game;
