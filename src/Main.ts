function setStyle100P(element: HTMLElement): void {
    element.style.height = "100%";
    element.style.width = "100%";
    element.style.margin = "0%";
    element.style.background = "BLACK";
}

setStyle100P(document.documentElement);
setStyle100P(document.body);

//init canvas
let _canvas: HTMLCanvasElement = document.createElement("canvas");
_canvas.width = 640;
_canvas.height = 360;
document.body.appendChild(_canvas);

//display canvas
let resCanvas: number = _canvas.width/_canvas.height;
function initMargin(): void {
    let res: number = document.body.clientWidth/document.body.clientHeight;
    if (res <= resCanvas) {
        _canvas.style.marginTop = `${Math.round((document.body.clientHeight-(document.body.clientWidth/resCanvas))/2)}px`;
        _canvas.style.marginLeft = "0px";
        _canvas.style.width = "100%";
        _canvas.style.height = "auto";
    } else {
        _canvas.style.marginTop = "0px";
        _canvas.style.marginLeft = `${Math.round((document.body.clientWidth-(document.body.clientHeight*resCanvas))/2)}px`;
        _canvas.style.width = "auto";
        _canvas.style.height = "100%";
    }
}
document.body.onresize = initMargin;
document.body.onload = initMargin;

//create game
import GameShoe from "./game/GameShoe.js";
import Loader from "./loader/Loader.js";
import Load from "./loader/Load.js";

//resources
import Resource from "./Resources.js";
let resource: Load[] = [];
for (let i = 0; i < Resource.resource.length; i++) {
    let itm: string[] = Resource.resource[i];
    resource.push(new Load(itm[0], itm[1]));
}

//states
import States from "./States.js";

//start loading
class Loading extends Loader {

    public constructor() {
        super(resource);
    }

    public finish(current: number, max: number): void {
        //start game
        let gameShoe: GameShoe = new GameShoe(_canvas, _canvas.width, _canvas.height, States.states, this.keepImages());
        gameShoe.start(States.startState);
    }

    public error(current: number, max: number, load: Load): void {
        let canvas = _canvas.getContext("2d");
        canvas.fillStyle = "#FFDDDD";
        canvas.fillRect(0, 0, _canvas.width, _canvas.height);
        canvas.fillStyle = "FF0000";
        canvas.fillText("Error loading with \""+load._path+"\"!", 30, 180);
    }

}
new Loading().loading();