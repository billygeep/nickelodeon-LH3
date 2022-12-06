
import BackgroundSprite from "../sprites/BackgroundSprite"
import MyText from "../sprites/MyText";
import AlphaButton from "../sprites/AlphaButton";
import TextButton from "../sprites/TextButton";

import PhoneBg from "../containers/PhoneBg";

import { setItemDataStatus, factoryFindDataByIDProperty, setExitDataActive } from '../helpers/DataFactory';
import { STYLE_h1text, STYLE_padlock } from "../helpers/MyConstants";

export default class CutScene {

    constructor(scene, _id) {
        
        this.copy = window.CONFIG.cutscenes
        this.scene = scene;
        this.id = _id;
        
        this.furniture_container = this.scene.add.container().setScrollFactor(0).setDepth(20);
        this.stop = false;

        switch (_id) {
            case 'computer' :
                this.createComputerCutScene();
            break;
            case 'oven' :
                this.createOvenCutScene();
            break;
            case 'delivery' :
                this.createDeliveryScene();
            break;
            case 'fusebox' :
                this.createFuseBox();
            break;
            case 'locker' :
                this.createLocker();
            break;
            case 'stopcock' :
                this.createTaps();
            break;
        }


        this.closebtn = new TextButton(this.scene, 120, 495, 'gamesprites', 'button_template_medium.png', 0xf38634, 0xeabd37, this.copy.close_button);
        this.closebtn.button.on('pointerdown', () => {
           window.MANAGERS.alertManager.closeAlert();
        });

        this.furniture_container.add(this.closebtn)
    }

    createTaps () {

        let bg = this.scene.add.image(0, 0, 'pov_lynnstable_stopcock').setOrigin(0, 0);
        this.furniture_container.add(bg);

        window.MANAGERS.taskManager.setCurrentTask(4);
        let wrench = factoryFindDataByIDProperty(window.CONFIG.data.item_data, 405);

        this.wrench = this.scene.add.sprite(600, 400, 'item_sprites', 'wrench_inv.png').setOrigin(0,0)

            let coords = [
                { x: 247, y: 300, code: "O" },
                { x: 416, y: 339, code: "D" },
                { x: 550, y: 301, code: "L" },
                { x: 672, y: 322, code: "U" }
            ]
            this.code = [];
            this.counter = 0;
            this.canClick = (window.MANAGERS.taskManager.currenttask.taskdata.t1_open && !window.MANAGERS.taskManager.currenttask.taskdata.t1_complete && wrench.status === 1) ? true : false;
            this.wrench.visible = (wrench.status === 1) ? true : false;
            this.furniture_container.add(this.wrench);

            for (var i = 0; i < 4; i++) {
                let btn = this.scene.add.sprite(coords[i].x, coords[i].y, 'cutscene_sprites', 'lynn_taphandle.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true });
                btn.code = coords[i].code;

                this.furniture_container.add(btn);

                btn.on('pointerdown', () => { 
                    if (!this.canClick) return;
                    this.canClick = false;
                    btn.off('pointerdown');

                    this.counter++;
                    this.code.push(btn.code);
                    this.checkTaps();

                    this.scene.tweens.add({
                        targets: this.wrench,
                        angle: 45,
                        repeat: 2,
                        yoyo: true,
                        delay: 400,
                        duration: 100
                    });

                    this.scene.tweens.add({
                        targets: btn,
                        angle: 360,
                        delay: 400,
                        duration: 400
                    });

                    this.scene.tweens.add({
                        targets: this.wrench,
                        x: btn.x - 20,
                        y: btn.y - 40,
                        duration: 400,
                        ease: 'Quad.easeInOut',
                        onComplete: () => {
                            window.MANAGERS.audioManager.playAudio("valve_sfx"); 
                        }
                    });

                    this.scene.tweens.add({
                        targets: this.wrench,
                        x: 600,
                        y: 400,
                        duration: 400,
                        delay: 1000,
                        ease: 'Quad.easeInOut',
                        onComplete: () => {
                            this.canClick = true;
                        }
                    });
                });
            }
        
    }

    checkTaps () {

        let code = this.code.join();
        if (code === "L,O,U,D") {
            // play sfx
            window.MANAGERS.taskManager.currenttask.addFountainLeak();

            setTimeout(() => {
                if (this.stop) return;
                this.showFountain();
            }, 1000)
            
        }
    }

    showFountain () {
        let bg = this.scene.add.image(0, 0, 'pov_fountain').setOrigin(0, 0);
        let leak = this.scene.add.sprite(594, 617, "spritesheets", "fountain_leak/001.png").play("leak_animation")

        leak.alpha = 0;
        this.animation = this.scene.tweens.add({
            targets: leak,
            duration: 200,
            delay: 1000,
            alpha: 1,
            onComplete: () => {
                if (this.stop) return;
                window.MANAGERS.audioManager.playAudio("fountain_sfx"); 
                this.animation = this.scene.tweens.add({
                    targets: leak,
                    duration: 10,
                    delay: 2000,
                    alpha: 0,
                    onComplete: () => {
                        if (this.stop) return;
                        window.MANAGERS.alertManager.closeAlert();
                    }
                });
            }
        });

        this.furniture_container.add([
            bg,
            leak
        ]);
    }

    createComputerCutScene () {

        window.MANAGERS.taskManager.setCurrentTask(0);

        this.code = '';
        this.counter = 0;

        let bg = this.scene.add.image(0, 0, 'pov_computer').setOrigin(0, 0);
        // let printbtn = new AlphaButton(this.scene, 480, 375, 'button_template_medium.png');

        this.lunabtn = this.scene.add.sprite(300, 280, 'cutscene_sprites', 'computer_btn_luna.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.lanabtn = this.scene.add.sprite(480, 280, 'cutscene_sprites', 'computer_btn_lana.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.lucybtn = this.scene.add.sprite(660, 280, 'cutscene_sprites', 'computer_btn_lucy.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });

        this.tick = this.scene.add.sprite(480, 280, 'cutscene_sprites', 'computer_tick.png').setOrigin(0.5);
        this.cross = this.scene.add.sprite(480, 280, 'cutscene_sprites', 'computer_cross.png').setOrigin(0.5);

        this.tick.scaleX = this.tick.scaleY = this.cross.scaleX = this.cross.scaleY = 0;

        if (window.MANAGERS.taskManager.currenttask.taskdata.printout_collected || !window.MANAGERS.taskManager.currenttask.taskdata.t2_open) {
            this.lunabtn.visible = this.lanabtn.visible = this.lucybtn.visible = false;
        } else {
            this.lunabtn.on('pointerdown', () => { 
                this.lunabtn.off('pointerdown');
                this.lunabtn.tint = 0x777777;
                this.clickSister('0'); 
            });
            this.lanabtn.on('pointerdown', () => { 
                this.lanabtn.off('pointerdown');
                this.lanabtn.tint = 0x777777;
                this.clickSister('1'); 
            });
            this.lucybtn.on('pointerdown', () => { 
                this.lucybtn.off('pointerdown');
                this.lucybtn.tint = 0x777777;
                this.clickSister('2'); 
            });
        };
    
        this.furniture_container.add([
            bg,
            this.lanabtn,
            this.lunabtn,
            this.lucybtn,
            this.tick,
            this.cross
        ]);
    }
    clickSister (val) {
        this.code += val;
        this.counter++;
        if (this.counter === 3) {
            this.closebtn.visible = false;

            this.lanabtn.visible = false;
            this.lunabtn.visible = false;
            this.lucybtn.visible = false;

            if (this.code === '021') {

                window.MANAGERS.taskManager.currenttask.collectPrintOut();    

                this.scene.tweens.add({
                    targets: this.tick,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 300,
                    ease: 'Back.easeOut'
                });

                this.scene.tweens.add({
                    targets: this.cross,
                    alpha: 0,
                    duration: 1500,
                    ease: 'Cubic.easeInOut',
                    onComplete: () => {
                        window.MANAGERS.alertManager.closeAlert();      
                    }
                });
                
            } else {
                this.scene.tweens.add({
                    targets: this.cross,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 300,
                    ease: 'Back.easeOut'
                });

                this.scene.tweens.add({
                    targets: this.tick,
                    alpha: 0,
                    duration: 1500,
                    ease: 'Cubic.easeInOut',
                    onComplete: () => {
                        window.MANAGERS.alertManager.closeAlert();                        
                    }
                });

                window.MANAGERS.audioManager.playAudio("buzzfail_sfx"); 
            }
        }
    }


    createOvenCutScene () {

        window.MANAGERS.taskManager.setCurrentTask(2);

        this.counter = 0;

        let bg = this.scene.add.image(0, 0, 'pov_oven').setOrigin(0, 0);

        this.btn1 = this.scene.add.sprite(372, 170, 'cutscene_sprites', 'oven_btn.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.btn2 = this.scene.add.sprite(449, 170, 'cutscene_sprites', 'oven_btn.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.btn3 = this.scene.add.sprite(531, 170, 'cutscene_sprites', 'oven_btn.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.btn4 = this.scene.add.sprite(604, 170, 'cutscene_sprites', 'oven_btn.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });

        this.oven_on = this.scene.add.sprite(482, 365, 'cutscene_sprites', 'pov_oven_on.jpg').setOrigin(0.5);

        this.oven_on.alpha = 0;

        if (window.MANAGERS.taskManager.currenttask.taskdata.oven_on) {

            this.oven_on.alpha = 1;

            this.btn1.on('pointerdown', () => { 
                this.btn1.off('pointerdown');
                this.scene.tweens.add({
                    targets: this.btn1,
                    angle: -270,
                    duration: 300,
                    ease: 'Cubic.easeInOut'
                });
                this.clickOven('0'); 
            });
            this.btn2.on('pointerdown', () => { 
                this.btn2.off('pointerdown');
                this.scene.tweens.add({
                    targets: this.btn2,
                    angle: -270,
                    duration: 300,
                    ease: 'Cubic.easeInOut'
                });
                this.clickOven('0'); 
            });
            this.btn3.on('pointerdown', () => { 
                this.btn3.off('pointerdown');
                this.scene.tweens.add({
                    targets: this.btn3,
                    angle: -270,
                    duration: 300,
                    ease: 'Cubic.easeInOut'
                });
                this.clickOven('0'); 
            });
            this.btn4.on('pointerdown', () => { 
                this.btn4.off('pointerdown');
                this.scene.tweens.add({
                    targets: this.btn4,
                    angle: -270,
                    duration: 300,
                    ease: 'Cubic.easeInOut'
                });
                this.clickOven('0'); 
            });
        };
    
        this.furniture_container.add([
            bg,
            this.btn1,
            this.btn2,
            this.btn3,
            this.btn4,
            this.oven_on
        ]);
    }
    clickOven () {
        this.counter++;

        if (this.counter === 4) {

            this.oven_on.alpha = 0;

            window.GAME.cancelTimer();

            window.MANAGERS.taskManager.currenttask.turnOffOven();  
            window.MANAGERS.alertManager.closeAlert(); 
        }
    }

    createDeliveryScene () {

    }

    createFuseBox () {

        window.MANAGERS.taskManager.setCurrentTask(6);

        this.score = 0;

        let bg = this.scene.add.sprite(0, 30, 'pov_fusebox').setOrigin(0, 0);

        this.a1 = 0;
        this.a2 = 0;
        this.a3 = 0;

        this.arrow1 = this.scene.add.sprite(404, 373, 'cutscene_sprites', 'fusebox_arrow.png').setOrigin(0.5);
        this.arrow2 = this.scene.add.sprite(512, 377, 'cutscene_sprites', 'fusebox_arrow.png').setOrigin(0.5);
        this.arrow3 = this.scene.add.sprite(617, 371, 'cutscene_sprites', 'fusebox_arrow.png').setOrigin(0.5);

        this.btn1 = this.scene.add.sprite(405, 444, 'cutscene_sprites', 'fusebox_click_off.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.btn2 = this.scene.add.sprite(511, 445, 'cutscene_sprites', 'fusebox_click_off.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
        this.btn3 = this.scene.add.sprite(618, 444, 'cutscene_sprites', 'fusebox_click_off.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });

        this.switch = this.scene.add.sprite(588, 233, 'cutscene_sprites', 'fusebox_switch_off.png').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });

        if (window.MANAGERS.taskManager.currenttask.taskdata.t1_open && !window.MANAGERS.taskManager.currenttask.taskdata.dials_turned) {

            this.btn1.setTexture("cutscene_sprites",  'fusebox_click_on.png');
            this.btn2.setTexture("cutscene_sprites",  'fusebox_click_on.png');
            this.btn3.setTexture("cutscene_sprites",  'fusebox_click_on.png');

            this.btn1.on('pointerdown', () => { 
                this.a1++
                if (this.a1 > 4) this.a1 = 0;

                this.scene.tweens.add({
                    targets: this.arrow1,
                    angle: this.a1 * 72,
                    duration: 200,
                    ease: 'Back.easeInOut'
                });
            });
            this.btn2.on('pointerdown', () => { 
                this.a2++
                if (this.a1 > 4) this.a1 = 0;
                this.scene.tweens.add({
                    targets: this.arrow2,
                    angle: this.a2 * 72,
                    duration: 200,
                    ease: 'Back.easeInOut'
                });
            });
            this.btn3.on('pointerdown', () => { 
                this.a3++
                if (this.a3 > 4) this.a3 = 0;
                this.scene.tweens.add({
                    targets: this.arrow3,
                    angle: this.a3 * 72,
                    duration: 200,
                    ease: 'Back.easeInOut'
                });
            });
            this.switch.on('pointerdown', () => { 

                if (this.a1 + this.a2 + this.a3 + 3 === 11) {

                    this.switch.setTexture('cutscene_sprites', 'fusebox_switch_on.png')

                    this.btn1.off('pointerdown');
                    this.btn2.off('pointerdown');
                    this.btn3.off('pointerdown');
                    this.switch.off('pointerdown');

                    window.MANAGERS.audioManager.playAudio("unlock_sfx"); 

                    window.MANAGERS.taskManager.currenttask.turnUpToEleven(); 
                    window.MANAGERS.alertManager.closeAlert(); 
                } 
            });
        }
       // }
    
        this.furniture_container.add([
            bg,
            this.arrow1,
            this.arrow2,
            this.arrow3,
            this.btn1,
            this.btn2,
            this.btn3,
            this.switch
        ]);
    }

    clickSwitch () {
        // this.counter++;

        // if (this.counter === 4) {

        //     window.GAME.cancelTimer();

        //     window.MANAGERS.taskManager.currenttask.turnOffOven();  
        //     window.MANAGERS.alertManager.closeAlert(); 
        // }
    }

    createLocker () {
        window.MANAGERS.taskManager.setCurrentTask(3);

        this.score = 0;
        this.padlockcode = "5,6,7,4";
        let bg = this.scene.add.sprite(0, 0, 'padlock_locker').setOrigin(0, 0);

        this.furniture_container.add([
            bg
        ]);

        this.counterArray = [];
        this.anim;

        for (var i = 0; i < 4; i++) {

            let shape = this.scene.make.graphics();
            shape.fillStyle(0xffffff);
            shape.beginPath();
            shape.fillRect(260 + (i * 110), 250, 100, 100);
            shape.setScrollFactor(0);
            let mask = shape.createGeometryMask();
            let container = this.scene.add.container(310 + (i * 110), 300).setScrollFactor(0).setDepth(20);

            let wheel = this.scene.add.sprite(0, 0, 'cutscene_sprites', 'popup_padlock_combo_bg.jpg').setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true  });
            let counter = 0;
            let number = this.scene.add.text(0, 0, "0", STYLE_padlock).setOrigin(0.5);
            let canclick = true;
            wheel.id = i;
            this.counterArray.push(counter);

            wheel.on('pointerdown', () => { 
                if (!canclick) return;

                window.MANAGERS.audioManager.playAudio("clickbutton_sfx"); 
                canclick = false;
                this.scene.tweens.add({
                    targets: number,
                    y: -80,
                    duration: 200,
                    ease: 'Back.easeIn',
                    onComplete: () => {
                        if (this.stop) return;
                        counter++;
                        if (counter > 9) counter = 0;
                        this.counterArray[wheel.id] = counter;
                        number.y = 80;
                        number.setText(counter);
                        this.scene.tweens.add({
                            targets: number,
                            y: 0,
                            duration: 200,
                            ease: 'Back.easeOut',
                            onComplete: () => {
                                if (this.stop) return;
                                canclick = true;
                                this.checkCode();
                            }
                        });
                    }
                });

                this.scene.tweens.add({
                    targets: wheel,
                    y: -5,
                    duration: 100,
                    repeat:1,
                    yoyo: true,
                    ease: 'Back.easeInOut'
                });


            }); 

            container.add([
                wheel,
                number
            ])

            container.setMask(mask);

            this.furniture_container.add([
                container
            ]);
        }
    }

    checkCode () {
        let code = this.counterArray.join();
        if (code === this.padlockcode) {

            setItemDataStatus(308, -1);
            setItemDataStatus(309, 0);

            window.GAME.removeItemFromScene(308)

            window.MANAGERS.audioManager.playAudio("locker_sfx");

            let newitem = factoryFindDataByIDProperty(window.CONFIG.items, 309);
            window.GAME.addSpriteToScene(newitem);

            window.GAME.hideToolTip();
            window.GAME.player.changePlayerStance(0);

            setExitDataActive(this.scene.currentScene.id, 2, false);

            window.MANAGERS.alertManager.closeAlert();
        }
    }

    destroyCutScene () {
        window.GAME.cutsceneOpen = false;
        console.log(window.GAME.cutsceneOpen)
        this.stop = true;
        this.furniture_container.destroy();
    }
}