import Vector from "./Vector.js";
export default class Angle {
    constructor(angleDeg) {
        if (angleDeg == undefined)
            this.set(0);
        else
            this.set(angleDeg);
    }
    getDeg() {
        return this._angleDeg;
    }
    getRad() {
        return this._angleRad;
    }
    add(angleDeg) {
        this.set(this._angleDeg + angleDeg);
        return this;
    }
    substrat(angleDeg) {
        this.set(this._angleDeg - angleDeg);
        return this;
    }
    set(angleDeg) {
        this._angleDeg = angleDeg % 360;
        this._angleRad = this._angleDeg / 180 / Math.PI;
        return this;
    }
    forward() {
        return new Vector(Math.cos(this._angleRad), Math.sin(this._angleRad));
    }
    back() {
        return new Vector(-Math.cos(this._angleRad), -Math.sin(this._angleRad));
    }
    left() {
        let angle = this._angleRad - (Math.PI / 2);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    right() {
        let angle = this._angleRad + (Math.PI / 2);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    clone() {
        return new Angle(this._angleDeg);
    }
}
