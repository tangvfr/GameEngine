export default class Loader {
    constructor(resources) {
        this._resources = resources;
        this._images = new Map();
    }
    loading() {
        if (this._resources.length >= 1)
            this.load(0);
        else
            throw "Loader loading is impossible, dont's has resource !";
    }
    load(number) {
        if (number == this._resources.length) {
            this.finish(number, this._resources.length);
        }
        else {
            let load = this._resources[number];
            let src = new Image();
            src.onload = () => {
                this._images.set(load._name, src);
                this.load(number + 1);
            };
            src.onerror = () => {
                this.error(number, this._resources.length, load);
            };
            src.src = load._path;
        }
    }
    keepImages() {
        if (this._images.size <= 0)
            throw "Images is not load !";
        else
            return this._images;
    }
}
