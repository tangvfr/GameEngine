export default class Vector {

    private _x: number;
    private _y: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    
    public setX(x: number): Vector {
        this._x = x;
        return this;
    }

    public setY(y: number): Vector {
        this._y = y;
        return this;
    }

    public getX() : number {
        return this._x;
    }

    public getY() : number {
        return this._y;
    }

    public setVal(x: number): Vector {
        this._x = x;
        this._y = x;
        return this;
    }

    public set(x: number, y: number): Vector {
        this._x = x;
        this._y = y;
        return this;
    }

    public setVec(vec: Vector): Vector {
        this._x = vec._x;
        this._y = vec._y;
        return this;
    }

    public addVal(x: number): Vector {
        this._x += x;
        this._y += x;
        return this;
    }

    public add(x: number, y: number): Vector {
        this._x += x;
        this._y += y;
        return this;
    }

    public addVec(vec: Vector): Vector {
        this._x += vec._x;
        this._y += vec._y;
        return this;
    }

    public substratVal(x: number): Vector {
        this._x -= x;
        this._y -= x;
        return this;
    }

    public substrat(x: number, y: number): Vector {
        this._x -= x;
        this._y -= y;
        return this;
    }

    public substratVec(vec: Vector): Vector {
        this._x -= vec._x;
        this._y -= vec._y;
        return this;
    }

    public multipleVal(x: number): Vector {
        this._x *= x;
        this._y *= x;
        return this;
    }

    public multiple(x: number, y: number): Vector {
        this._x *= x;
        this._y *= y;
        return this;
    }

    public multipleVec(vec: Vector): Vector{
        this._x *= vec._x;
        this._y *= vec._y;
        return this;
    }

    public diviseVal(x: number): Vector {
        this._x /= x;
        this._y /= x;
        return this;
    }

    public divise(x: number, y: number): Vector {
        this._x /= x;
        this._y /= y;
        return this;
    }

    public diviseVec(vec: Vector): Vector {
        this._x /= vec._x;
        this._y /= vec._y;
        return this;
    }

    public distance(vec: Vector): number {
        let width: number = this._x-vec._x;
        let height: number = this._y-vec._y;
        return Math.sqrt((width*width)+(height*height));
    }

    public normalize(): Vector {
        let v: number = Math.sqrt((this._x*this._x)+(this._y*this._y));
        return this.diviseVal(v);
    }

    public clone(): Vector {
        return new Vector(this._x, this._y);
    }

}