export default class CollideBox {
    constructor(loc, size) {
        this._loc = loc;
        this._size = size;
    }
    collide(collide) {
        let loc2 = collide._loc.clone().addVec(collide._size);
        let _loc2 = this._loc.clone().addVec(this._size);
        if (this._loc.getY() > loc2.getY())
            return false;
        if (this._loc.getX() > loc2.getX())
            return false;
        if (collide._loc.getY() >= _loc2.getY())
            return false;
        if (collide._loc.getX() >= _loc2.getX())
            return false;
        return true;
    }
    getLoc() {
        return this._loc;
    }
    setLoc(loc) {
        this._loc = loc;
    }
    getSize() {
        return this._size;
    }
    setSize(size) {
        this._size = size;
    }
}
