import Element from "./Element.js";
import Game from "../game/Game.js";
import GameStat from "../gamestat/GameStat.js";
import Vector from "../util/Vector.js";

export default class ElementManager extends Element {

    private _list: Element[];
    private _enable: boolean;

    public constructor() {
        super(new Vector(0, 0), new Vector(0, 0));
        this._list = [];
        this._enable = false;
    }

    public add(element: Element): void {
        this._list.push(element);
    }

    public enable(): void {
        this._enable = true;
    }

    public disable(): void {
        this._enable = false;
    }

    public init(game: Game, stat: GameStat): void {
        this._list.forEach((element: Element) => {
            element.init(game, stat);
        });
    }

    public update(game: Game, stat: GameStat, delta: number): void {
        if (this._enable)
            this._list.forEach((element: Element) => {
                element.update(game, stat, delta);
            });
    }

    public render(game: Game, stat: GameStat, canvas: CanvasRenderingContext2D): void {
        if (this._enable)
            this._list.forEach((element: Element) => {
                element.render(game, stat, canvas);
            });
    }

} 