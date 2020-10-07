import EnumStats from "./EnumStats.js";
import Button from "../elementsgui/Button.js";
import Vector from "../util/Vector.js";
import ElementManager from "../elementsgui/ElementManager.js";
export default class StatMenu {
    init(game) {
        this.elementManager = new ElementManager();
        class ButtonStart extends Button {
            constructor() {
                super(new Vector(50, 50), new Vector(100, 30), "Start Test");
            }
            action(game, stat, element) {
                game.changeStat(EnumStats.STAT_GAME);
            }
        }
        this.elementManager.add(new ButtonStart());
        this.elementManager.enable();
        this.elementManager.init(game, this);
    }
    update(game, delta) {
        this.elementManager.update(game, this, delta);
    }
    render(game, canvas) {
        canvas.fillStyle = "#0000FF";
        canvas.fillRect(0, 0, game.width, game.height);
        this.elementManager.render(game, this, canvas);
        canvas.drawImage(game.getResource("test_image_test"), 0, 0, 64, 64);
    }
    getID() {
        return EnumStats.STAT_MENU;
    }
}
