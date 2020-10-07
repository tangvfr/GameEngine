import Game from "../game/Game.js";

export default interface GameStat {

    init(game: Game): void;
    update(game: Game, delta:number): void;
    render(game: Game, canvas: CanvasRenderingContext2D): void;
    getID(): number;

}