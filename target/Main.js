function setStyle100P(element) {
    element.style.height = "100%";
    element.style.width = "100%";
    element.style.margin = "0%";
    element.style.background = "BLACK";
}
setStyle100P(document.documentElement);
setStyle100P(document.body);
//init canvas
let _canvas = document.createElement("canvas");
_canvas.width = 640;
_canvas.height = 360;
document.body.appendChild(_canvas);
//display canvas
let resCanvas = _canvas.width / _canvas.height;
function initMargin() {
    let res = document.body.clientWidth / document.body.clientHeight;
    if (res <= resCanvas) {
        _canvas.style.marginTop = `${Math.round((document.body.clientHeight - (document.body.clientWidth / resCanvas)) / 2)}px`;
        _canvas.style.marginLeft = "0px";
        _canvas.style.width = "100%";
        _canvas.style.height = "auto";
    }
    else {
        _canvas.style.marginTop = "0px";
        _canvas.style.marginLeft = `${Math.round((document.body.clientWidth - (document.body.clientHeight * resCanvas)) / 2)}px`;
        _canvas.style.width = "auto";
        _canvas.style.height = "100%";
    }
}
document.body.onresize = initMargin;
document.body.onload = initMargin;
//create game
import GameTank from "./game/GameTank.js";
import StatGame from "./gamestat/StatGame.js";
import StatMenu from "./gamestat/StatMenu.js";
import EnumStats from "./gamestat/EnumStats.js";
import Loader from "./loader/Loader.js";
import Load from "./loader/Load.js";
//resources
let resource = [];
resource.push(new Load("test_image_test", "textures/carte_size.png"));
//start loading
class Loading extends Loader {
    constructor() {
        super(resource);
    }
    finish(current, max) {
        //list stats
        let states = [new StatMenu()];
        function addStates(stat) {
            states[stat.getID()] = stat;
        }
        //add states
        addStates(new StatMenu());
        addStates(new StatGame());
        //start game
        let gameTank = new GameTank(_canvas, _canvas.width, _canvas.height, states, this.keepImages());
        gameTank.start(EnumStats.STAT_MENU);
    }
    error(current, max, load) {
        let canvas = _canvas.getContext("2d");
        canvas.fillStyle = "#FFDDDD";
        canvas.fillRect(0, 0, _canvas.width, _canvas.height);
        canvas.fillStyle = "FF0000";
        canvas.fillText("Error loading !", 300, 180);
    }
}
new Loading().loading();
