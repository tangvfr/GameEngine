import Vector from "./Vector.js";

export default class Angle {

    private _angleDeg: number;
    private _angleRad: number;

    public constructor(angleDeg: number) {
        if (angleDeg == undefined)
            this.set(0);
        else
            this.set(angleDeg);
    }

    public getDeg(): number {
        return this._angleDeg;
    }

    public getRad(): number {
        return this._angleRad;
    }

    public add(angleDeg: number): Angle {
        this.set(this._angleDeg+angleDeg);
        return this;
    }

    public substrat(angleDeg: number): Angle {
        this.set(this._angleDeg-angleDeg);
        return this;
    }

    public set(angleDeg: number): Angle {
        this._angleDeg = angleDeg%360;
        this._angleRad = this._angleDeg/180/Math.PI;
        return this;
    }

    public forward(): Vector {
        return new Vector(Math.cos(this._angleRad), Math.sin(this._angleRad));
    }

    public back(): Vector {
        return new Vector(-Math.cos(this._angleRad), -Math.sin(this._angleRad));
    }

    public left(): Vector {
        let angle: number = this._angleRad-(Math.PI/2);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    public right(): Vector {
        let angle: number = this._angleRad+(Math.PI/2);
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    public clone(): Angle {
        return new Angle(this._angleDeg);
    }

}