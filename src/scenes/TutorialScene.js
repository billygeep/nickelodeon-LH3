import MyText from "../sprites/MyText";

import AlphaButton from "../sprites/AlphaButton";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from "../sprites/TextButton";

import PhoneBg from "../containers/PhoneBg";
import Frame from "../containers/Frame";

import { STYLE_h1text, STYLE_tutorialdesctext } from "../helpers/MyConstants";

class TutorialScene extends Phaser.Scene {
    constructor(config) {
        super("TutorialScene");
        this.copy = window.CONFIG.tutorialpopup;
    }

    create() {

        this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        this.canClick = false;
        let frame = new Frame(this, 0, 0, []);

        this.createFurniture();

        this.content_container = this.add.container().setDepth(23);
        this.content_container.setScrollFactor(0);

        this.counter = 0;
        this.tutorialArray = this.copy.tutorials;
      
        this.createHint();

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(true);
    }

    createFurniture () {
        this.furniture_container = this.add.container().setScrollFactor(0).setDepth(24);
        this.phonebg = new PhoneBg(this, 480, 280);
        
        this.closebtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.next_button);
        this.closebtn.button.on('pointerdown', () => {

            if (!this.canClick) return;
           if (this.tutorialOver()) {
              this.finishTutorial();
           } else {
              this.nextHint();
           }
        });

        this.input.keyboard.on('keydown_SPACE', (evt) => {

            if (!this.canClick) return;
            window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            if (this.tutorialOver()) {
              this.finishTutorial();
            } else {
              this.nextHint();
            }
        })

        this.furniture_container.add(this.closebtn)
    }

    createHint () {

        this.canClick = false;

        let title = this.tutorialArray[this.counter].title;
        let desc = this.tutorialArray[this.counter]['desc'+window.DEVICE_USED];
        let img = this.tutorialArray[this.counter]['img'+ window.DEVICE_USED];

        let title_txt = new MyText(this, 480, 140, title, STYLE_h1text).setOrigin(0.5, 0);
        let desc_txt = new MyText(this, 480, title_txt.y + title_txt.height + 20, desc, STYLE_tutorialdesctext).setOrigin(0.5, 0);
        let tut_img = this.add.sprite(480, desc_txt.y + desc_txt.height + 20, 'gamesprites', img).setOrigin(0.5, 0);

        title_txt.alpha = desc_txt.alpha = tut_img.alpha = 0;

        this.tweens.add({
            targets: [title_txt, desc_txt, tut_img],
            alpha: 1,
            duration: 200,
            delay: 100,
            onComplete: () => {
                this.canClick = true;
            }
        });

        this.content_container.add([
            title_txt,
            desc_txt,
            tut_img
        ]);

        this.counter++;

        if (this.tutorialOver()) this.closebtn.updateText(this.copy.close_button);
    }

    tutorialOver () {
        let outcome = (this.counter >= this.tutorialArray.length) ? true : false;
        return outcome;
    }

    nextHint () {

        let children = this.content_container.getAll()

        this.tweens.add({
            targets: children,
            alpha: 0,
            duration: 100,
            onComplete: () => {
                this.content_container.removeAll(true);
                this.createHint();
            }
        });
    } 

    destroyTutorial () {

        this.bg.destroyMe();
        this.phonebg.destroyPhoneBg();
        this.furniture_container.destroy();
        this.content_container.destroy();
    }


    finishTutorial () {
      this.scene.start('GameScene');

      let universalScene = this.scene.get('Universal');
      universalScene.showButton(false);

      this.scene.stop('TutorialScene');
    }
}

export default TutorialScene;