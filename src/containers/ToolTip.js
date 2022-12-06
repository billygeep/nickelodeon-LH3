
import { STYLE_tooltiptext } from "../helpers/MyConstants";
import MyText from "../sprites/MyText";
import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

export default class ToolTip extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y, []);

        this.scene = scene;
        this.x = x;
        this.y = y;

        this.scene.add.existing(this);
        this.tooltipbg = this.scene.add.image(0, 0, 'gamesprites', 'tooltip_label_left.png').setOrigin(0.5);
        this.tooltiphitarea = this.scene.add.sprite(0, 0, 'gamesprites', 'droparea_active.png').setInteractive({ useHandCursor: true  });

        this.tooltiphitarea.on("pointerdown", () => {
           if (this.scene.isInteracting === 2) this.scene.selectItem();
           if (this.scene.isInteracting === 1) this.scene.changeScene();
        })

        this.add([ 
            this.tooltiphitarea, 
            this.tooltipbg
        ]);
    }

    updateMe (_data, _position = null) {

        let data = _data;

        this.x = (_position === null) ? data.x : _position.x;
        this.y = (_position === null) ? data.y : _position.y;
    
        this.tooltipbg.setTexture('gamesprites', data.tooltip_img)
        let label = factoryFindDataByIDProperty(window.CONFIG.tooltips, data.tooltip_id);

        if (this.tooltiptext === undefined) {
            this.tooltiptext = new MyText(this.scene, 0, 0, label, STYLE_tooltiptext).setOrigin(0.5, 0.5);
            this.add(this.tooltiptext);
        }

        switch (data.tooltip_img) {
            case 'tooltip_label_left.png' :
                this.tooltipbg.x = -(this.tooltipbg.width/2) - 50
                this.tooltipbg.y = 0

                this.tooltiptext.x = -this.tooltipbg.width + 10
                this.tooltiptext.y = 0
            break;
            case 'tooltip_label_top.png' :
                this.tooltipbg.x = 0
                this.tooltipbg.y = -(this.tooltipbg.height/2) - 50

                this.tooltiptext.x = 0
                this.tooltiptext.y = -this.tooltipbg.height - 32
            break;
            case 'tooltip_label_right.png' :
                this.tooltipbg.x = (this.tooltipbg.width/2) + 50
                this.tooltipbg.y = 0

                this.tooltiptext.x = this.tooltipbg.width  - 10
                this.tooltiptext.y = 0
            break;
        }

        this.tooltiptext.changeText(label);
    }

    showDropFail () {
        this.scene.tweens.add({
            targets: this.tooltiphitarea,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.tooltiphitarea.setTexture("gamesprites", "droparea_fail.png");
                this.showDropActive();
            }
        });
    }

    showDropSuccess () {
        this.scene.tweens.add({
            targets: this.tooltiphitarea,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.tooltiphitarea.setTexture("gamesprites", "droparea_tick.png");
                this.showDropActive();
            }
        });
    }

    showDropActive () {
        this.scene.tweens.add({
            targets: this.tooltiphitarea,
            scaleX: 1,
            scaleY: 1,
            angle: 360,
            duration: 400,
            delay: 500,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.tooltiphitarea.setTexture("gamesprites", "droparea_active.png");
            }
        });
    }
}
