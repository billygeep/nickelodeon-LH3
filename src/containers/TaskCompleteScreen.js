
import BackgroundSprite from "../sprites/BackgroundSprite"
import MyText from "../sprites/MyText";
import TextButton from "../sprites/TextButton";

import PhoneBg from "../containers/PhoneBg";

import { STYLE_taskcomplete, sistervars } from "../helpers/MyConstants";

export default class TaskCompleteScreen {

    constructor(scene, _id) {
            
        this.scene = scene;
        this.copy = window.CONFIG.taskcompletescreen;
        
        this.bg = new BackgroundSprite(this.scene, 480, 280, 'bg_standard').setDepth(19);

        this.phonebg = new PhoneBg(this.scene, 480, 280);

        this.taskcontent_container = this.scene.add.container().setScrollFactor(0).setDepth(23);
        this.taskcontent_container.alpha = 0;

        let shape = this.scene.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(170, 112, 622, 334);
        shape.setScrollFactor(0);
        let mask2 = shape.createGeometryMask();
        this.taskcontent_container.setMask(mask2);

        this.showTaskCompleteMessage(_id);

        this.scene.tweens.add({
            targets: this.taskcontent_container,
            alpha: 1,
            duration: 300,
            delay: 300,
            ease: 'Linear'
        });

        this.resumebtn = new TextButton(this.scene, 840, 495, "gamesprites", 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.resume_button);
        this.resumebtn.button.on('pointerdown', () => {
           window.MANAGERS.alertManager.closeAlert();
        });    

        window.MANAGERS.audioManager.playAudio("taskcomplete_sfx");
    }

    showTaskCompleteMessage (_id) {

        let avatar = this.scene.add.sprite(240, 180, "gamesprites", sistervars[_id].icon  + "_115x115.png");
        let title = new MyText(this.scene, 480, 350, this.copy.title, STYLE_taskcomplete).setOrigin(0.5, 0.5);
        title.alpha = 0;
   
        for (var i = 0; i < 200; i++) {

            let c =(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)

            let confetti = this.scene.add.sprite(480, 280, 'gamesprites', 'confetti.png');

            let plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
            let plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
            let randomX = Math.random()*500 * plusOrMinusX;
            let randomY = Math.random()*300 * plusOrMinusY;

            let rs = 0.3 + Math.random()*0.7;
            confetti.scaleX = confetti.scaleY = rs;
            confetti.tint = '0x' + c

            let d = 800 + Math.random()*400

            this.scene.tweens.add({
                targets: confetti,
                x: 480 + randomX,
                y: 280 + randomY,
                duration: d,
                delay: 300,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            this.scene.tweens.add({
                targets: confetti,
                alpha: 1,
                duration: 100,
                delay: d,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            this.taskcontent_container.add(confetti);
        }

        this.taskcontent_container.add([
            avatar,
            title
        ]);

        this.scene.tweens.add({
            targets: title,
            alpha: 1,
            angle: -10,
            y: 280,
            duration: 500,
            delay: 450,
            ease: 'Back.easeOut'
        });

    }

    closeScreen () {
        this.bg.destroyMe();
        this.resumebtn.destroy();
        this.phonebg.destroyPhoneBg();
        this.taskcontent_container.destroy();
    }
}