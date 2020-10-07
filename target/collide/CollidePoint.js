import Vector from "../util/Vector.js";
import CollideBox from "./CollideBox.js";
export default class CollidePoint extends CollideBox {
    constructor(loc) {
        super(loc, new Vector(0, 0));
    }
}
