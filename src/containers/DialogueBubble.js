
import MyText from "../sprites/MyText";
import AlphaButton from "../sprites/AlphaButton";

import { STYLE_dialoguetext } from "../helpers/MyConstants";

export default class DialogueBubble extends Phaser.GameObjects.Container {
    constructor(scene, x, y, data) {

        super(scene, x, y, []);

        this.scene = scene;
        this.mydata = data;
        this.counter = 0;
        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.createBubble();
    }

    createBubble () {

        this.alpha = 0;

        let data = this.mydata[this.counter];

        let speech = new MyText(this.scene, 360, 200, data, STYLE_dialoguetext).setOrigin(1, 0);
        let x = speech.x - speech.width - 24;
        let tailx = x + speech.width + 55, tailscalex = 1;

        if (data.char === 0) {
            speech.setOrigin(0, 0);
            speech.x = 600
            x = speech.x - 24;
            tailx = x + 5;
            tailscalex = -1;
        }

        let okx = speech.x + speech.width;
        
        speech.y = 280 - (speech.height / 2);
        
        let width = speech.width + 24
        let height = speech.height + 24;
        let y = speech.y - 24

        this.borders = [
            this.scene.add.image(x, y, 'gamesprites', 'bub_tl.png').setOrigin(0),
            this.scene.add.image(x + width, y, 'gamesprites', 'bub_tr.png').setOrigin(0),
            this.scene.add.image(x + width, y + height, 'gamesprites', 'bub_br.png').setOrigin(0),
            this.scene.add.image(x, y + height, 'gamesprites', 'bub_bl.png').setOrigin(0),
            this.scene.add.tileSprite(x + 24, y, width - 24, 24, 'gamesprites', 'bub_t.png').setOrigin(0),
            this.scene.add.tileSprite(x + 24, y + height, width - 24, 24, 'gamesprites', 'bub_b.png').setOrigin(0),
            this.scene.add.tileSprite(x, y + 24, 24, height - 24, 'gamesprites', 'bub_l.png').setOrigin(0),
            this.scene.add.tileSprite(x + width, y + 24, 24, height - 24, 'gamesprites', 'bub_r.png').setOrigin(0),
            this.scene.add.tileSprite(x + 22, y + 22, width - 20, height - 20, 'gamesprites', 'bub_c.png').setOrigin(0)
        ];

        // Add all of the above to this sprite
        this.borders.map((item) => {
            this.add(item)
        });

        this.okbtn = new AlphaButton(this.scene, x + speech.width + 24, speech.y + height + 40, 'tick_button.png');
        this.okbtn.on('pointerdown', () => {
           this.updateBubble();
        });

        let tail = this.scene.add.image(tailx, y + (height/2), 'gamesprites', 'bub_tail.png').setOrigin(0);
        tail.scaleX = tailscalex;
        this.add([
            tail,
            speech,
            this.okbtn
        ])

        this.counter++;

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 200
        });
    }

    updateBubble () {

        this.okbtn.destroy();
        window.MANAGERS.audioManager.playAudio("dialogue_sfx");

        if (this.counter < this.mydata.length) {
            this.removeAll(true);
            this.createBubble();
        } else {
            window.GAME.removedDialogueBubble()
            this.destroyBubble();
        }
    }

    isDialogueOver () {
        let bool =  (this.counter >= this.mydata.length) ? true : false;
        return bool;
    }

    destroyBubble() {
        this.removeAll(true);
        this.destroy();
    }
}


