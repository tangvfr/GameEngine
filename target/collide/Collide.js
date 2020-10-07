export default class Collide {
    constructor(loc) {
        this._loc = loc;
    }
    getLoc() {
        return this._loc;
    }
    setLoc(loc) {
        this._loc = loc;
    }
    static collide(collide) {
        console.log(collide);
    }
}
