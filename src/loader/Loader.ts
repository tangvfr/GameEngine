import Load from "./Load.js";

export default abstract class Loader {

    private _images: Map<string, CanvasImageSource>;
    private _resources: Load[];

    public constructor(resources: Load[]) {//make interface for each, and add render for wait in asycro 
        this._resources = resources;
        this._images = new Map<string, CanvasImageSource>();
    }

    public loading(): void {
        if (this._resources.length >= 1)
            this.load(0);
        else
            throw "Loader loading is impossible, dont's has resource !";
    }

    private load(number: number): void {
        if (number == this._resources.length) {
            this.finish(number, this._resources.length);
        } else {
            let load: Load = this._resources[number];
            let src = new Image();
            src.onload = () => {
                this._images.set(load._name, src);
                this.load(number+1);
            };
            src.onerror = () => {
                this.error(number, this._resources.length, load);
            }
            src.src = load._path;
        }
    }

    public keepImages(): Map<string, CanvasImageSource> {
        if (this._images.size <= 0)
            throw "Images is not load !";
        else
            return this._images;
    }

    public abstract error(current: number, max: number, load: Load): void;
    public abstract finish(current: number, max: number): void;

}