import Element from "./Element.js";
export default class Button extends Element {
    constructor(loc, size, text) {
        super(loc, size);
        this._text = text;
        this._isSelect = false;
    }
    isSelect() {
        return this._isSelect;
    }
    setText(text) {
        this._text = text;
    }
    getText() {
        return this._text;
    }
    init(game, stat) { }
    update(game, stat, delta) {
        this._isSelect = game.getMouse().collide(this);
        if (this._isSelect && game.mouseIsClick(0)) {
            this.action(game, stat, this);
        }
    }
    render(game, stat, canvas) {
        canvas.fillStyle = (this._isSelect ? "#00FF00" : "#FF0000");
        canvas.fillRect(this.getLoc().getX(), this.getLoc().getY(), this.getSize().getX(), this.getSize().getY());
        canvas.fillStyle = "#FFFFFF";
        canvas.fillText(this._text, this.getLoc().getX(), this.getLoc().getY() + this.getSize().getY());
    }
}
