import CollidePoint from "../collide/CollidePoint.js";
import Vector from "../util/Vector.js";
export default class Game {
    constructor(canvas, width, height, states, resource) {
        this._resources = resource;
        this._canvas = canvas.getContext("2d");
        this.__canvas = canvas;
        this.width = width;
        this.height = height;
        this._states = states;
        this._keys = [];
        this._mouse = [];
        this._keysClick = [];
        this._mouseClick = [];
        this._mouseCollide = new CollidePoint(new Vector(0, 0));
        this._altDown = false;
        this._ctrlDown = false;
        this._shiftDown = false;
    }
    getResource(name) {
        let img = this._resources.get(name);
        if (img == undefined)
            throw `Image nommed "${name}" dont exist !`;
        else
            return img;
    }
    setMouse(x, y) {
        this._mouseCollide.getLoc().set(x, y);
    }
    getMouse() {
        return this._mouseCollide;
    }
    keyIsDown(code) {
        let result = this._keys[code];
        return result == undefined ? false : result;
    }
    mouseIsDown(code) {
        let result = this._mouse[code];
        return result == undefined ? false : result;
    }
    keyIsClick(code) {
        return this._keysClick[code] != undefined;
    }
    mouseIsClick(code) {
        return this._mouseClick[code] != undefined;
    }
    resetClicked() {
        this._keysClick = [];
        this._mouseClick = [];
    }
    altIsDown() {
        return this._altDown;
    }
    shiftIsDown() {
        return this._shiftDown;
    }
    ctrlIsDown() {
        return this._ctrlDown;
    }
    getStateID() {
        return this._stateID;
    }
    changeStat(stateID) {
        this._stateID = stateID;
        this._states[this._stateID].init(this);
    }
    loopRender(time) {
        window.requestAnimationFrame(() => {
            let delta = new Date().getMilliseconds() - time;
            delta = (delta < 0 ? 0 : delta) / 1000.;
            this.update(this, delta);
            this._states[this._stateID].update(this, delta);
            this._canvas.beginPath();
            this.render(this, this._canvas);
            this._states[this._stateID].render(this, this._canvas);
            this._canvas.save();
            this.loopRender(new Date().getMilliseconds());
            this.resetClicked();
        });
    }
    updateUtilKey(ev) {
        this._altDown = ev.altKey;
        this._shiftDown = ev.shiftKey;
        this._ctrlDown = ev.ctrlKey;
    }
    start(stateID) {
        // init
        this._stateID = stateID;
        this.init(this);
        this._states[this._stateID].init(this);
        // input
        this.__canvas.onmousemove = (ev) => {
            this.setMouse((ev.offsetX / this.__canvas.clientWidth) * this.width, (ev.offsetY / this.__canvas.clientHeight) * this.height);
            this.updateUtilKey(ev);
        };
        window.onmouseup = (ev) => {
            this._mouse[ev.button] = false;
            this._mouseClick[ev.button] = true;
            this.updateUtilKey(ev);
        };
        window.onmousedown = (ev) => {
            this._mouse[ev.button] = true;
            this.updateUtilKey(ev);
        };
        window.onkeyup = (ev) => {
            this._keys[ev.keyCode] = false;
            this._keysClick[ev.keyCode] = true;
            this.updateUtilKey(ev);
        };
        window.onkeydown = (ev) => {
            this._keys[ev.keyCode] = true;
            this.updateUtilKey(ev);
        };
        // update / render
        this.loopRender(new Date().getMilliseconds());
    }
}
