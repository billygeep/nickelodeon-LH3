import MyText from "../sprites/MyText";

import AlphaButton from "../sprites/AlphaButton";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from "../sprites/TextButton";
import Frame from "../containers/Frame";

import { STYLE_completetitle_text, STYLE_loribubbletext } from "../helpers/MyConstants";

class BossAlertScene extends Phaser.Scene {
    constructor() {
        super("BossAlertScene");
        this.copy = window.CONFIG.bossalert_scene;
    }

    init (data) {
        this.win = data.win;
    }

    create() {

        this.bg = (this.win) ? this.add.image(0, 0, 'bosswinbg').setOrigin(0, 0) : this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        let frame = new Frame(this, 0, 0, []);
        this.createFurniture();
    }

    createFurniture () {
        this.furniture_container = this.add.container().setScrollFactor(0).setDepth(24);

        let lori = this.add.sprite(50, 600, 'gamesprites', 'lori_lose.png').setOrigin(0, 1);
        lori.visible = !this.win;

        let sound = (this.win) ? window.MANAGERS.audioManager.playAudio("taskcomplete_sfx") : window.MANAGERS.audioManager.playAudio("buzzfail_sfx");

        let speechbubble = this.add.sprite(860, 280, 'gamesprites', 'lori_bubble.png').setOrigin(1, 0.5);
        
        let text = (this.win) ? this.copy.lori_win : this.copy.lori_lose;
        let bubble = new MyText(this, 480, 280, text, STYLE_loribubbletext).setOrigin(0, 0.5);

        this.nextbtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.next_button);
        this.nextbtn.button.on('pointerdown', () => {
            this.closeBubble();
        });

        this.input.keyboard.on('keydown_SPACE', (evt) => {
            this.closeBubble();
        })

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(true);

        this.furniture_container.add([lori, speechbubble, bubble, this.nextbtn])
    }

    closeBubble () {
        this.input.keyboard.off('keydown_SPACE');
        this.furniture_container.destroy();
        let outcome = (this.win) ? this.showCompleteScreen() : this.showRetryScreen();
    }

    showCompleteScreen () {
        this.furniture_container.destroy();
        this.scene.start('BossCompleteScene');
        this.scene.stop('BossAlertScene');
    }

    quitGame () {
        this.scene.start('TitleScene');
        this.scene.stop('BossAlertScene');
    }

    retryGame () {
        let universalScene = this.scene.get('Universal');
        universalScene.showButton(false);

        this.scene.start('BossScene');
        this.scene.stop('BossAlertScene');
    }

    showRetryScreen () {

        this.retry_container = this.add.container().setScrollFactor(0).setDepth(24);

        this.quitbtn = new TextButton(this, 120, 495, 'gamesprites', 'button_template_medium.png', 0xf3a338, 0xeabd37, this.copy.quit_button);
        this.quitbtn.button.on('pointerdown', () => {
            this.quitGame();
        });
        this.retrybtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xbcc85a, 0xeabd37, this.copy.retry_button);
        this.retrybtn.button.on('pointerdown', () => {
            this.retryGame();
        });

        let title = new MyText(this, 480, 280, this.copy.bobby_lose, STYLE_completetitle_text).setOrigin(0.5);
        let bobby = this.add.sprite(480, 560, 'gamesprites', 'bobby_lose.png').setOrigin(0.5, 1);

        this.retry_container.add([bobby, title, this.quitbtn, this.retrybtn])
    }
}

export default BossAlertScene;