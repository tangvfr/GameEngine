import GameStat from "../gamestat/GameStat.js";
import Element from "./Element.js";
import Game from "../game/Game.js";
import Vector from "../util/Vector.js";
import ActionElement from "./ActionElement.js";

export default abstract class Button extends Element implements ActionElement {

    private _text: string;
    private _isSelect: boolean;

    public constructor(loc: Vector, size: Vector, text: string) {
        super(loc, size);
        this._text = text;
        this._isSelect = false;
    }

    public isSelect() {
        return this._isSelect;
    }

    public setText(text: string): void {
        this._text = text;
    }

    public getText(): string {
        return this._text;
    }

    public abstract action(game: Game, stat: GameStat, element: Element): void;

    public init(game: Game, stat: GameStat): void {}

    public update(game: Game, stat: GameStat, delta: number): void {
        this._isSelect = game.getMouse().collide(this);
        if (this._isSelect && game.mouseIsClick(0)) {
            this.action(game, stat, this);
        }
    }

    public render(game: Game, stat: GameStat, canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = (this._isSelect ? "#00FF00" : "#FF0000");
        canvas.fillRect(this.getLoc().getX(), this.getLoc().getY(), this.getSize().getX(), this.getSize().getY());
        canvas.fillStyle = "#FFFFFF";
        canvas.fillText(this._text, this.getLoc().getX(), this.getLoc().getY()+this.getSize().getY());
    }

}