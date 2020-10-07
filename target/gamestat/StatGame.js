import EnumStats from "./EnumStats.js";
import Button from "../elementsgui/Button.js";
import Vector from "../util/Vector.js";
export default class StatGame {
    init(game) {
        class OB extends Button {
            action(game, stat, element) {
                game.changeStat(EnumStats.STAT_MENU);
            }
        }
        this.loc = new Vector(40, 20);
        this.ob = new OB(this.loc, new Vector(50, 50), "Back");
        this.depX = 170;
        this.depY = 120;
    }
    update(game, delta) {
        this.loc.add(delta * this.depX, delta * this.depY);
        if (this.loc.getX() + this.ob.getSize().getX() >= game.width || this.loc.getX() <= 0) {
            this.depX = -this.depX;
            this.loc.add(delta * this.depX, 0);
        }
        if (this.loc.getY() + this.ob.getSize().getY() >= game.height || this.loc.getY() <= 0) {
            this.depY = -this.depY;
            this.loc.add(0, delta * this.depY);
        }
        this.ob.update(game, this, delta);
    }
    render(game, canvas) {
        canvas.fillStyle = "#FFFF00";
        canvas.fillRect(0, 0, game.width, game.height);
        this.ob.render(game, this, canvas);
    }
    getID() {
        return EnumStats.STAT_GAME;
    }
}
