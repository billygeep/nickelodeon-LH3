
import Frame from '../containers/Frame';
import MyText from "../sprites/MyText";
// import trackEvent from "../helpers/trackEvent"
import { STYLE_completetitle_text, STYLE_completepara_text } from "../helpers/MyConstants";
import TextButton from "../sprites/TextButton";


class MainCompleteScene extends Phaser.Scene {
    constructor(config) {
        super("MainCompleteScene");
        this.copy = window.CONFIG.maincomplete_scene
    }
    create() {

        window.MANAGERS.audioManager.playAudio("cheer");

        this.bg = this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_balloons').setOrigin(0, 0);
        
        let frame = new Frame(this, 0, 0, []);

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(true);
        universalScene.toggleLogo(false);
        
        let linc = this.add.sprite(480, 600, 'gamesprites', 'charswap_lincoln.png').setOrigin(0.5, 1);
        let desc = (window.CONFIG.data.medals_collected < 16) ? window.CONFIG.maincomplete_scene.desc_incomplete : window.CONFIG.maincomplete_scene.desc_complete;
     //   let titletxt = new MyText(this, 480, 200, this.copy.title, STYLE_completetitle_text).setOrigin(0.5, 0);
        let desctxt = new MyText(this, 480, 220, desc, STYLE_completepara_text).setOrigin(0.5, 0);

        if (window.CONFIG.data.medals_collected < window.CONFIG.data.medals_total) {
            this.backbtn = new TextButton(this, 120, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.back_button);
            this.backbtn.button.on('pointerdown', () => {
                window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
                this.backToMainGame();
            });
        }

        this.resumebtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.boss_button);
        this.resumebtn.button.on('pointerdown', () => {
            window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            this.loadBossLevel();
        });

    }

    backToMainGame() {

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(false);
        universalScene.toggleLogo(true);

        this.scene.start('SceneLoader');
        this.scene.stop("MainCompleteScene");
    }

    loadBossLevel() {
        this.scene.start('BossSceneLoader');
        this.scene.stop("MainCompleteScene");
    }
}

export default MainCompleteScene;
