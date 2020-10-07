import CollideBox from "../collide/CollideBox.js";
import Game from "../game/Game.js";
import GameStat from "../gamestat/GameStat.js";

export default abstract class Element extends CollideBox {

    public abstract init(game: Game, stat :GameStat): void;
    public abstract update(game: Game, stat :GameStat, delta:number): void;
    public abstract render(game: Game, stat :GameStat, canvas: CanvasRenderingContext2D): void;

}