import Game from "../game/Game.js";
import GameStat from "./GameStat.js";
import EnumStats from "./EnumStats.js";
import Button from "../elementsgui/Button.js";
import Vector from "../util/Vector.js";
import ElementManager from "../elementsgui/ElementManager.js";
import Element from "../elementsgui/Element.js";

export default class StatMenu implements GameStat {

    private elementManager: ElementManager;

    public init(game: Game): void {
        this.elementManager = new ElementManager();
        class ButtonStart extends Button {

            public constructor() {
                super(new Vector(50, 50), new Vector(100, 30), "Start Test");
            }

            public action(game: Game, stat: GameStat, element: Element): void {
                game.changeStat(EnumStats.STAT_GAME);
            }

        }
        this.elementManager.add(new ButtonStart());
        this.elementManager.enable();
        this.elementManager.init(game, this);
    }

    public update(game: Game, delta: number): void {
        this.elementManager.update(game, this, delta);
    }

    public render(game: Game, canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "#0000FF";
        canvas.fillRect(0, 0, game.width, game.height);
        this.elementManager.render(game, this, canvas);
        canvas.drawImage(game.getResource("test_image_test"), 0, 0, 64, 64);
        canvas.drawImage(game.getResource("test_image_red"), 128, 0, 64, 64);
    }

    public getID(): number {
        return EnumStats.STAT_MENU;
    }

} 