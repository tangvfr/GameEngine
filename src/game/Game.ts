import CollideBox from "../collide/CollideBox.js";
import CollidePoint from "../collide/CollidePoint.js";
import GameStat from "../gamestat/GameStat.js";
import Vector from "../util/Vector.js";

export default abstract class Game {

    public width: number;
    public height: number;

    private _resources: Map<string, CanvasImageSource>;

    private _mouseCollide: CollidePoint;
    private _altDown: boolean;
    private _ctrlDown: boolean;
    private _shiftDown: boolean;
    private _keys: boolean[];
    private _keysClick: boolean[];
    private _mouse: boolean[];
    private _mouseClick: boolean[];
    private _stateID: number;
    private _states: GameStat[];
    private _canvas: CanvasRenderingContext2D;
    private __canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLCanvasElement, width: number, height: number, states: GameStat[], resource: Map<string, CanvasImageSource>) {
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

    public getResource(name: string): CanvasImageSource {
        let img = this._resources.get(name);
        if (img == undefined)
            throw `Image nommed "${name}" dont exist !`;
        else
            return img; 
    }

    private setMouse(x: number, y:number): void {
        this._mouseCollide.getLoc().set(x, y);
    }

    public getMouse(): CollidePoint {
        return this._mouseCollide;
    }

    public abstract init(game: Game): void;
    public abstract update(game: Game, delta:number): void;
    public abstract render(game: Game, canvas: CanvasRenderingContext2D): void;

    public keyIsDown(code: number): boolean {
        let result: boolean = this._keys[code];
        return result == undefined ? false : result;
    }

    public mouseIsDown(code: number): boolean {
        let result: boolean = this._mouse[code];
        return result == undefined ? false : result;
    }

    public keyIsClick(code: number): boolean {
        return this._keysClick[code] != undefined;
    }

    public mouseIsClick(code: number): boolean {
        return this._mouseClick[code] != undefined;
    }

    private resetClicked() {
        this._keysClick = [];
        this._mouseClick = [];
    }

    public altIsDown(): boolean {
        return this._altDown;
    }

    public shiftIsDown(): boolean {
        return this._shiftDown;
    }

    public ctrlIsDown(): boolean {
        return this._ctrlDown;
    }

    public getStateID(): number {
        return this._stateID;
    }

    public changeStat(stateID: number): void {
        this._stateID = stateID;
        this._states[this._stateID].init(this);
    }

    private loopRender(time: number): void {
        window.requestAnimationFrame(() => {
            let delta: number = new Date().getMilliseconds()-time;
            delta = (delta < 0 ? 0 : delta)/1000.;
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

    private updateUtilKey(ev: any) {
        this._altDown = ev.altKey;
        this._shiftDown = ev.shiftKey;
        this._ctrlDown = ev.ctrlKey;
    }

    public start(stateID: number): void {
        // init
        this._stateID = stateID;
        this.init(this);
        this._states[this._stateID].init(this);
        // input
        this.__canvas.onmousemove = (ev: MouseEvent) => {
            this.setMouse((ev.offsetX/this.__canvas.clientWidth)*this.width,
                (ev.offsetY/this.__canvas.clientHeight)*this.height);
            this.updateUtilKey(ev);
        }
        window.onmouseup = (ev: MouseEvent) => {
            this._mouse[ev.button] = false;
            this._mouseClick[ev.button] = true;
            this.updateUtilKey(ev);
        }
        window.onmousedown = (ev: MouseEvent) => {
            this._mouse[ev.button] = true;
            this.updateUtilKey(ev);
        }
        window.onkeyup = (ev: KeyboardEvent) => {
            this._keys[ev.keyCode] = false;
            this._keysClick[ev.keyCode] = true;
            this.updateUtilKey(ev);
        }
        window.onkeydown = (ev: KeyboardEvent) => {
            this._keys[ev.keyCode] = true;
            this.updateUtilKey(ev);
        }
        // update / render
        this.loopRender(new Date().getMilliseconds());
    }

}