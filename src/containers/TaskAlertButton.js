
import MyText from "../sprites/MyText";
import AlphaButton from "../sprites/AlphaButton"

import { charactervars, STYLE_alertcountertext, sistervars } from "../helpers/MyConstants";

export default class TaskAlertButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], currentchar) {
        
        super(scene, x, y, []);

        this.scene = scene;
        this.scene.add.existing(this);

        this.rootx = x;
        this.y = this.rooty = 580;
        this.canclick = false;

        this.setScrollFactor(0);
        this.setDepth(23);
        
        this.bg = this.scene.add.sprite(0, 0, "gamesprites", "phone_alert_bg.png").setInteractive({ useHandCursor: true  }).setScrollFactor(0);
        this.screen = this.scene.add.sprite(0, 0, "gamesprites", "phone_btn_bg" + charactervars[window.CONFIG.data.playervars.currentCharacter].ext + ".png");
        this.bg.tint = charactervars[window.CONFIG.data.playervars.currentCharacter].color;
        
        this.screen_avatar = this.scene.add.sprite(10, 0, "gamesprites", "luna_70x70.png");
        this.message_counter_bg = this.scene.add.circle(-25, -80, 9, 0xff0000).setOrigin(0.5);
        this.message_counter_bg.setStrokeStyle(1, 0x000000);
        this.message_counter_number = this.scene.add.text(-29, -85, "1", STYLE_alertcountertext).setOrigin(0.5);

        this.active = false;

        this.add([
            this.bg,
            this.screen,
            this.screen_avatar,
            this.message_counter_bg,
            this.message_counter_number
        ]);

        this.message_counter_bg.visible = this.screen_avatar.visible = this.message_counter_number.visible = false;

        this.bg.on("pointerdown", () => {
            if (window.GAME.alertOpen) return;
            window.MANAGERS.medalManager.clickPhone();
            window.MANAGERS.alertManager.addAlert("taskscreen");
        });

        this.bg.on("pointerover", () => {
            if (this.active || window.USER_IS_TOUCHING) return;
            this.scene.tweens.add({
                targets: this,
                angle: 7,
                duration: 40,
                yoyo: true,
                repeat: 2
            });
        });


        this.addAlertCounter();
    }

    addAlertCounter () {
        let counter = window.CONFIG.data.taskalert_data.length;
        this.message_counter_bg.visible = this.message_counter_number.visible = (counter > 0) ? true : false;
        this.message_counter_number.setText(counter)
    }    

    addTaskAlert () {

        let counter = window.CONFIG.data.taskalert_data.length;
        let alert = window.CONFIG.data.taskalert_data[window.CONFIG.data.taskalert_data.length - 1];

        this.screen_avatar.setTexture("gamesprites", sistervars[alert.task_id].icon + "_70x70.png");
        this.screen_avatar.visible = true;

        this.addAlertCounter();

        window.CONFIG.data.playervars.taskScreen = 0;

        window.MANAGERS.audioManager.playAudio("phonealert_sfx"); 

        this.active = true;

        this.alert_anim = this.scene.tweens.add({
            targets: this,
            y: 460,
            duration: 300,
            ease: "Back.easeOut",
            onComplete: () => {
                this.alert_anim = this.scene.tweens.add({
                    targets: this,
                    x: this.rootx + 5,
                    y: 465,
                    angle: 1,
                    duration: 30,
                    repeat: 17,
                    yoyo: true,
                    onComplete: () => {
                        this.alert_anim = this.scene.tweens.add({
                            targets: this,
                            y: this.rooty,
                            x: this.rootx,
                            duration: 300,
                            ease: "Back.easeIn",
                            onComplete: () => {
                                this.active = false;
                                this.screen_avatar.visible = false;
                            }
                        })
                    }
                }); 
            }
        })
    }

    removeTaskAlert () {
        let outcome = (window.CONFIG.data.taskalert_data.length > 0) ? 
            this.message_counter_number.setText(window.CONFIG.data.taskalert_data.length) : 
            this.message_counter_bg.visible = this.message_counter_number.visible = false;
    }

    updatePhone () {
        this.bg.tint = charactervars[window.CONFIG.data.playervars.currentCharacter].color;
        this.screen.setTexture("gamesprites", "phone_btn_bg" + charactervars[window.CONFIG.data.playervars.currentCharacter].ext + ".png");
    }

    hideMe () {

        if (this.alert_anim) this.alert_anim.stop();
        this.screen_avatar.visible = false;

        this.scene.tweens.add({
            targets: this,
            y: 700,
            duration: 300,
            ease: "Back.easeIn"
        });
    }
    showMe () {
        this.scene.tweens.add({
            targets: this,
            y: this.rooty,
            duration: 300,
            ease: "Back.easeOut"
        });
    }
    destroyMe () {
        this.removeAll(true)
        this.destroy();
    }
}
