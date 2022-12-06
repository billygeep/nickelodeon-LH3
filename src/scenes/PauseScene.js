import MyText from "../sprites/MyText";
// import Button from "../sprites/Button";
// import PausePanel from "../containers/PausePanel";
import Frame from "../containers/Frame";
import AlphaButton from "../sprites/AlphaButton";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from "../sprites/TextButton";

import PhoneBg from "../containers/PhoneBg";
// import trackEvent from "../helpers/trackEvent";
import { STYLE_h1text, playervars } from "../helpers/MyConstants";

class PauseScene extends Phaser.Scene {
    constructor() {
        super("PauseScene");
        this.copy = window.CONFIG.pausemenu;
    }

    create () {

        window.MANAGERS.audioManager.playAudio("inventoryexpand_sfx"); 
        
        this.bg = new BackgroundSprite(this, 480, 280, 'bg_standard');
        let frame = new Frame(this, 0, 0, []);
        this.phonebg = new PhoneBg(this, 480, 280);
        this.createFurniture();
    }

    createFurniture () {

        this.furniture_container = this.add.container().setDepth(22);
        this.furniture_container.alpha = 0;
        this.title = new MyText(this, 480, 150, this.copy.title, STYLE_h1text).setOrigin(0.5, 0.5);


        this.resumebtn = new TextButton(this, 680, 300, 'gamesprites', 'button_template_medium.png', 0xf38634, 0xeabd37, this.copy.resume_button);
        this.resumebtn.button.on('pointerdown', () => {
           this.resumeGame();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });
        this.quitbtn = new TextButton(this, 680, 380, 'gamesprites', 'button_template_medium.png', 0xf4695b, 0xeabd37, this.copy.quit_button);
        this.quitbtn.button.on('pointerdown', () => {
            this.showQuitScreen()
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });

        
        this.howtobtn = new TextButton(this, 280, 380, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.howto_button);
        this.howtobtn.button.on('pointerdown', () => {
            window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            this.showTutorial();
        });

        let lincoln = this.add.sprite(280, 280, 'gamesprites', 'howto_lincoln.png').setOrigin(0.5);

        this.tweens.add({
            targets: this.furniture_container,
            alpha: 1,
            duration: 300
        });
    

        let mute = 'sound_off_inactive.png', unmute = 'sound_on_active.png';

        this.mutebtn = this.add.sprite(450, 260, 'gamesprites', mute, 0).setOrigin(0.5, 0.5);
        this.unmutebtn = this.add.sprite(510, 260, 'gamesprites', unmute, 0).setOrigin(0.5, 0.5);

        this.soundbtn = new TextButton(this, 480, 380, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.sound_button);
        this.soundbtn.button.on('pointerdown', () => {
            this.onMute();
            window.MANAGERS.audioManager.clickMute();
            this.swapTextures();
        });
        this.swapTextures();

        this.furniture_container.add([
            this.title,
            this.resumebtn,
            this.quitbtn,
            lincoln,
            this.howtobtn,
            this.soundbtn,
            this.mutebtn,
            this.unmutebtn
        ]); 

        if (window.CONFIG.codeunlock.active) {
            this.codeunlockbtn = new TextButton(this, 680, 220, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.codeunlock_button);
            this.codeunlockbtn.button.on('pointerdown', () => {
               this.goToCodeUnlock();
               window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            });
            this.codeunlockbtn.visible = !window.CONFIG.data.playervars.codeUnlocked;
            this.furniture_container.add(this.codeunlockbtn);
        }


        this.quit_container = this.add.container(0, 560).setDepth(22);
        
        let quit_title = new MyText(this, 480, 200, this.copy.quit_title, STYLE_h1text).setOrigin(0.5, 0.5);

        let yesbtn = new TextButton(this, 360, 320, 'gamesprites', 'button_template_medium.png', 0xf4695b, 0xeabd37, this.copy.yes_button);
        yesbtn.button.on('pointerdown', () => {
           this.quitGame();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });
        let nobtn = new TextButton(this, 600, 320, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.no_button);
        nobtn.button.on('pointerdown', () => {
           this.returnToMenu();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });

        this.quit_container.add([quit_title, yesbtn, nobtn]);

        let shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(170, 112, 622, 334);
        shape.setScrollFactor(0);
        let mask = shape.createGeometryMask();
        this.furniture_container.setMask(mask);

        let shape2 = this.make.graphics();
        shape2.fillStyle(0xffffff);
        shape2.beginPath();
        shape2.fillRect(170, 112, 622, 334);
        shape2.setScrollFactor(0);
        let mask2 = shape2.createGeometryMask();
        this.quit_container.setMask(mask2);
    }

    showQuitScreen () {
        this.tweens.add({
            targets: this.furniture_container,
            y: -560,
            duration: 400,
            ease: 'Back.easeInOut'
        });

        this.tweens.add({
            targets: this.quit_container,
            y: 0,
            duration: 400,
            ease: 'Back.easeInOut'
        });
    }

    returnToMenu () {
        this.tweens.add({
            targets: this.furniture_container,
            y: 0,
            duration: 400,
            ease: 'Back.easeInOut'
        });

        this.tweens.add({
            targets: this.quit_container,
            y: 560,
            duration: 400,
            ease: 'Back.easeInOut'
        });
    }


    swapTextures () {
        let mute = (this.registry.get("mute")) ? 'sound_off_active.png' : 'sound_off_inactive.png';
        let unmute = (this.registry.get("mute")) ? 'sound_on_inactive.png' : 'sound_on_active.png';
            
        this.mutebtn.setTexture('gamesprites', mute);
        this.unmutebtn.setTexture('gamesprites', unmute);
    }

    onMute() {
        this.registry.set("mute", !this.registry.get("mute"));
    }

    showTutorial () {
        this.scene.stop("PauseScene");

        if (window.CONFIG.data.playervars.level === 'main') {
            this.scene.start('TutorialScene');
        } else {
            this.scene.start('BossTutorialScene');
        }
    }

    goToCodeUnlock () {
        this.scene.stop('PauseScene');
        this.scene.start("CodeUnlockScene", { playing: true });
    }

    resumeGame () {
        this.scene.stop("PauseScene");
        
        if (window.CONFIG.data.playervars.level === 'main') {
            this.scene.start('GameScene');
        } else {
            this.scene.start('BossScene');
        }
    }

    quitGame () {
        this.scene.start('TitleScene');
        this.scene.stop("PauseScene");
    }

}

export default PauseScene;
