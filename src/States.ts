import EnumStats from "./gamestat/EnumStats.js";
import GameStat from "./gamestat/GameStat.js";
import StatGame from "./gamestat/StatGame.js";
import StatMenu from "./gamestat/StatMenu.js";

let states: GameStat[] = [];
function addStates(stat: GameStat): void {
    states[stat.getID()] = stat;
}

//add states
addStates(new StatMenu());
addStates(new StatGame());

//startState
let startState: number = EnumStats.STAT_MENU;

//export
export default {states, startState};