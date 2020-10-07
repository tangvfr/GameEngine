import Game from "../game/Game.js";
import GameStat from "../gamestat/GameStat.js";
import Element from "./Element.js";

export default interface ActionElement {

    action(game: Game, stat: GameStat, element: Element): void;

}
