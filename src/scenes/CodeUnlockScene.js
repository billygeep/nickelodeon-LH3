import MyText from "../sprites/MyText";
// import Button from "../sprites/Button";
// import PausePanel from "../containers/PausePanel";
import Frame from "../containers/Frame";
import AlphaButton from "../sprites/AlphaButton";

import ItemInfoContainer from "../containers/ItemInfoContainer";
// import trackEvent from "../helpers/trackEvent";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from '../sprites/TextButton';
import { factoryFindDataByIDProperty, setItemDataStatus } from '../helpers/DataFactory';
import { STYLE_h1text, STYLE_inputtext } from "../helpers/MyConstants";

class CodeUnlockScene extends Phaser.Scene {
    constructor() {
        super("CodeUnlockScene");
        this.copy = window.CONFIG.codeunlock;
    }

    init (data) {
        this.playing = data.playing;
    }

    create () {
        this.bg = new BackgroundSprite(this, 480, 280, 'bg_standard');
        let frame = new Frame(this, 0, 0, []);
        this.createFurniture();
    }

    createFurniture () {

        this.codeString = this.copy.inputfield;

        this.furniture_container = this.add.container().setScrollFactor(0).setDepth(20);
        this.furniture_container.alpha = 0;
        this.title = new MyText(this, 480, 120, this.copy.title, STYLE_h1text).setOrigin(0.5, 1);

        this.submitbtn = new TextButton(this, 840, 415, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.submit_button);
        this.submitbtn.button.on('pointerdown', () => {
           this.submitCode();
        });
        this.resumebtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xf38634, 0xeabd37, this.copy.resume_button);
        this.resumebtn.button.on('pointerdown', () => {
           this.goBack();
        });

        let xpos = 0, ypos = 0;
        let startx = (960 - (6 * 70))/ 2 
        let me = this;

        this.input_box = this.add.sprite(480, 180, 'gamesprites', 'button_template_large.png');
        this.input_text = new MyText(this, 480, 180, this.codeString, STYLE_inputtext).setOrigin(0.5, 0.5);

        this.furniture_container.add([
            this.title,
            this.input_box,
            this.input_text,
            this.submitbtn
        ]);

        this.copy.keys.map((_key, i) => {

            let key = new TextButton(this, startx + (xpos * 70), 270 + (ypos * 70), 'gamesprites', 'button_template_small.png', 0xcccd4d, 0xeabd37, _key);
            key.button.name = _key.id

            key.button.on('pointerdown', function() {
                let outcome = (this.name !== "DEL") ? me.addKey(this.name) : me.deleteKey()
            });

            this.furniture_container.add(key);

            xpos++;

            if (xpos > 6) {
                xpos = 0;
                ypos++;
            }
        })

        this.tweens.add({
            targets: this.furniture_container,
            alpha: 1,
            duration: 300
        });
    }

   
    addKey (_val) {
        if (this.codeString.text.length > 12) return;

        this.codeString.text = this.codeString.text + _val;
        this.input_text.changeText(this.codeString);
    }
    deleteKey () {
        this.codeString.text = this.codeString.text.substring(0, this.codeString.text.length-1);
        this.input_text.changeText(this.codeString);
    }

    submitCode () {
        if (this.codeString.text === this.copy.password) {
            this.collectItem();
        } else {
            this.input_box.tint = 0xf38634;
            this.codeString.text = "";

            this.tweens.add({
                targets: [this.input_text, this.input_box],
                x: 490,
                yoyo: true,
                repeat: 11,
                duration: 50,
                onComplete: () => {
                    this.input_text.changeText(this.codeString);
                    this.input_box.clearTint()
                }
            });
        }
    }

    collectItem () {

        window.CONFIG.data.playervars.codeUnlocked = true;

        this.confetti_container = this.add.container().setDepth(20);

        for (var i = 0; i < 200; i++) {

            let c =(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)

            let confetti = this.add.sprite(310, 320, 'gamesprites', 'confetti.png');

            let plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
            let plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
            let randomX = Math.random()*500 * plusOrMinusX;
            let randomY = Math.random()*300 * plusOrMinusY;

            let rs = 0.3 + Math.random()*0.7;
            confetti.scaleX = confetti.scaleY = rs;
            confetti.tint = '0x' + c

            let d = 800 + Math.random()*400

            this.tweens.add({
                targets: confetti,
                x: 480 + randomX,
                y: 280 + randomY,
                duration: d,
                delay: 300,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            this.tweens.add({
                targets: confetti,
                alpha: 1,
                duration: 100,
                delay: d,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            this.confetti_container.add(confetti);
        }

        this.furniture_container.destroy();
        this.unlocktxt = new MyText(this, 480, 120, this.copy.unlocktitle, STYLE_h1text).setOrigin(0.5, 1);

        let item = factoryFindDataByIDProperty(window.CONFIG.items, this.copy.unlock_id);

        this.item = this.add.image(310, 320, item.img_src, item.inv_img).setOrigin(0.5, 0.5).setDepth(21);
        this.item.scaleX = this.item.scaleY = 0;
        this.tweens.add({
                targets: this.item,
                scaleX:1,
                scaleY: 1,
                duration: 400,
                delay: 200,
                ease: 'Back.easeOut'
            });


        setItemDataStatus(2, 1);
        window.CONFIG.data.inventory.push(item);
        window.MANAGERS.audioManager.playAudio("collect_sfx");

        this.info_container = new ItemInfoContainer(this, 460, 180, false).setDepth(23);
        this.info_container.showInfo(this.copy.unlock_id, false);

    }

    goBack () {
        let outcome = (this.playing) ? this.scene.start('PauseScene') : this.scene.start('TitleScene');
        this.scene.stop("CodeUnlockScene");
    }

}

export default CodeUnlockScene;
