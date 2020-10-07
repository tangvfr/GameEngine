import Vector from "../util/Vector.js";

export default class CollideBox {

    private _size: Vector;
    private _loc: Vector;

    public constructor (loc: Vector, size: Vector) {
        this._loc = loc;
        this._size = size;
    }

    public collide(collide: CollideBox): boolean {
        let loc2: Vector = collide._loc.clone().addVec(collide._size);
        let _loc2: Vector = this._loc.clone().addVec(this._size);
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

    public getLoc(): Vector {
        return this._loc;
    }

    public setLoc(loc: Vector): void {
        this._loc = loc;
    }

    public getSize(): Vector {
        return this._size;
    }

    public setSize(size: Vector): void {
        this._size = size;
    }

}