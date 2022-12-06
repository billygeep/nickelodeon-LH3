
import MyText from "../sprites/MyText";
import { STYLE_buttontext } from "../helpers/MyConstants";

export default class TextButton extends Phaser.GameObjects.Container {
    constructor (scene, x, y, sheet, img, outtint, overtint, text) {
        super(scene, x, y, []);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = text;

        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.setDepth(23);

        this.button = this.scene.add.sprite(0, 0, sheet, img).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true  }).setScrollFactor(0);

        this.button.alpha = 0;
        this.button.scaleX = 0.7;
        this.button.scaleY = 0.7;
        this.button.angle = -45;

        this.overtint = overtint;
        this.outtint = outtint
        this.button.tint = this.outtint;

        this.setActive();

        this.button_txt = new MyText(this.scene, 0, 0, this.text, STYLE_buttontext).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.button_txt.alpha = 0;
        
        this.add([
            this.button,
            this.button_txt
        ]);

        this.showButton();
    }

    updateText (text) {
        this.button_txt.changeText(text)
    }

    setActive() {
        this.button.on("pointerover", this.onOver.bind(this));
        this.button.on("pointerout", this.onOut.bind(this));
        this.button.on("pointerdown", this.onDown.bind(this));
    }

    onDown() {
      window.MANAGERS.audioManager.playAudio("clickbutton_sfx"); 
    }

    onOver() {
      this.button.tint = this.overtint;
    }

    onOut() {
      this.button.tint = this.outtint;
    }

    hideButton (_destroy) {
        this.scene.tweens.add({
            targets: this.button,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            angle: -400,
            duration: 300,
            ease: 'Back.easeIn'
        });

        this.scene.tweens.add({
            targets: this.button_txt,
            alpha: 0,
            duration: 100
        });
    }

    showButton () {
        this.scene.tweens.add({
            targets: this.button,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            angle: 0,
            duration: 300,
            ease: 'Back.easeOut'
        });

        this.scene.tweens.add({
            targets: this.button_txt,
            alpha: 1,
            duration: 100,
            delay: 200
        });
    }
}
