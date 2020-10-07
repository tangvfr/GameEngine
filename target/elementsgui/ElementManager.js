import Element from "./Element.js";
import Vector from "../util/Vector.js";
export default class ElementManager extends Element {
    constructor() {
        super(new Vector(0, 0), new Vector(0, 0));
        this._list = [];
        this._enable = false;
    }
    add(element) {
        this._list.push(element);
    }
    enable() {
        this._enable = true;
    }
    disable() {
        this._enable = false;
    }
    init(game, stat) {
        this._list.forEach((element) => {
            element.init(game, stat);
        });
    }
    update(game, stat, delta) {
        if (this._enable)
            this._list.forEach((element) => {
                element.update(game, stat, delta);
            });
    }
    render(game, stat, canvas) {
        if (this._enable)
            this._list.forEach((element) => {
                element.render(game, stat, canvas);
            });
    }
}
