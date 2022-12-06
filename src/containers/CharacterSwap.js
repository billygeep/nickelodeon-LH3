
import BackgroundSprite from "../sprites/BackgroundSprite"
import MyText from "../sprites/MyText";

import { STYLE_h1text, STYLE_charchangetext } from "../helpers/MyConstants";

export default class CharacterSwap {

    constructor(scene) {
        
        this.scene = scene;
        this.copy = window.CONFIG.characterswap;
        
        this.bg = new BackgroundSprite(this.scene, 480, 280, 'bg_standard').setDepth(19);
        this.createFurniture();
    }

    createFurniture () {

        this.furniture_container = this.scene.add.container().setScrollFactor(0).setDepth(20);
        this.furniture_container.alpha = 0;
        
        let newCharacter = window.CONFIG.data.playervars.currentCharacter;

        let charArray = [ 'charswap_lincoln.png', 'charswap_clyde.png', 'charswap_ronnie.png', 'charswap_bobby.png' ]
     //   this.sfxArray = [ 'whoopee_sfx', 'squeakytoy_sfx',  'trumpet_sfx', 'pahping_sfx' ];

        this.char = this.scene.add.sprite(480, 560, 'gamesprites', charArray[newCharacter]).setOrigin(0.5, 1);
        this.title = new MyText(this.scene, 480, 100, this.copy.title, STYLE_h1text).setOrigin(0.5, 0);

        let charTextArray = [
            this.copy.lincoln_text,
            this.copy.clyde_text,
            this.copy.ronnie_text,
            this.copy.bobby_text,
        ]

        this.chartxt = new MyText(this.scene, 480, 160, charTextArray[newCharacter], STYLE_charchangetext).setOrigin(0.5, 0);

        this.scene.tweens.add({
            targets: this.furniture_container,
            alpha: 1,
            duration: 300,
            onComplete: () => {
                this.closeSwapScreen();
            }
        });
   
        this.furniture_container.add([
            this.char,
            this.title,
            this.chartxt
        ]);      
    }

    closeSwapScreen () {
        this.scene.task_button.updatePhone();
        this.scene.tweens.add({
            targets: this.furniture_container,
            alpha: 1,
            delay: 1000,
            onComplete: () => {
                window.MANAGERS.alertManager.closeAlert();
            }
        });
        window.MANAGERS.audioManager.playAudio("cheer");
    //    window.MANAGERS.audioManager.playAudio(this.sfxArray[window.CONFIG.data.playervars.currentCharacter]);
    }

    destroyScreen () {
        
        this.bg.destroyMe();
        this.furniture_container.destroy();
    }
}