export default class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    setX(x) {
        this._x = x;
        return this;
    }
    setY(y) {
        this._y = y;
        return this;
    }
    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    setVal(x) {
        this._x = x;
        this._y = x;
        return this;
    }
    set(x, y) {
        this._x = x;
        this._y = y;
        return this;
    }
    setVec(vec) {
        this._x = vec._x;
        this._y = vec._y;
        return this;
    }
    addVal(x) {
        this._x += x;
        this._y += x;
        return this;
    }
    add(x, y) {
        this._x += x;
        this._y += y;
        return this;
    }
    addVec(vec) {
        this._x += vec._x;
        this._y += vec._y;
        return this;
    }
    substratVal(x) {
        this._x -= x;
        this._y -= x;
        return this;
    }
    substrat(x, y) {
        this._x -= x;
        this._y -= y;
        return this;
    }
    substratVec(vec) {
        this._x -= vec._x;
        this._y -= vec._y;
        return this;
    }
    multipleVal(x) {
        this._x *= x;
        this._y *= x;
        return this;
    }
    multiple(x, y) {
        this._x *= x;
        this._y *= y;
        return this;
    }
    multipleVec(vec) {
        this._x *= vec._x;
        this._y *= vec._y;
        return this;
    }
    diviseVal(x) {
        this._x /= x;
        this._y /= x;
        return this;
    }
    divise(x, y) {
        this._x /= x;
        this._y /= y;
        return this;
    }
    diviseVec(vec) {
        this._x /= vec._x;
        this._y /= vec._y;
        return this;
    }
    distance(vec) {
        let width = this._x - vec._x;
        let height = this._y - vec._y;
        return Math.sqrt((width * width) + (height * height));
    }
    normalize() {
        let v = Math.sqrt((this._x * this._x) + (this._y * this._y));
        return this.diviseVal(v);
    }
    clone() {
        return new Vector(this._x, this._y);
    }
}
