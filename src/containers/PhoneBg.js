
import { charactervars } from "../helpers/MyConstants";

export default class PhoneBg {
    constructor(scene, x, y, id) {

        this.scene = scene;

        this.frame = this.scene.add.sprite(480, 280, "gamesprites", "taskphone_bg.png").setOrigin(0.5).setScrollFactor(0).setDepth(22);
        this.bg = this.scene.add.sprite(480, 280, "gamesprites", "phone_screen_bg" + charactervars[window.CONFIG.data.playervars.currentCharacter].ext + ".png").setOrigin(0.5).setScrollFactor(0).setDepth(22);

        this.frame.tint = charactervars[window.CONFIG.data.playervars.currentCharacter].color;

        this.phoneArray = [this.frame, this.bg];

        this.phoneArray.map((el) => {

            el.alpha = 0;
            el.scaleX = 0.7;
            el.scaleY = 0.7;
            el.angle = -45;

            this.scene.tweens.add({
                targets: el,
                alpha: 1,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                duration: 300,
                ease: 'Back.easeOut'
            });
        });
    }

    destroyPhoneBg () {

        this.phoneArray.map((el) => {
            this.scene.tweens.add({
                targets: el,
                angle: -45,
                alpha: 0,
                scaleX: 0.7,
                scaleY: 0.7,
                duration: 400,
                ease: 'Back.easeIn',
                onComplete: () => {
                  el.destroy();
                }
            });
        })
    }
};