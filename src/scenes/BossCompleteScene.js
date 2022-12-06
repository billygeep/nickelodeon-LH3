import MyText from "../sprites/MyText";

import AlphaButton from "../sprites/AlphaButton";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from "../sprites/TextButton";
import Frame from "../containers/Frame";

import { STYLE_completetitle_text, playervars } from "../helpers/MyConstants";

class BossCompleteScene extends Phaser.Scene {
    constructor(config) {
        super("BossCompleteScene");
        this.copy = window.CONFIG.bosscomplete_scene;
    }

    preload () {

    }

    create() {

        this.add.image(0, 0, 'endwinbg').setOrigin(0, 0);

        let frame = new Frame(this, 0, 0, []);

        this.createFurniture();

        localStorage.setItem(window.LHCOOKIE, 'reset');
        window.CONFIG.data.playervars.level =  'main'
        window.MANAGERS.audioManager.playAudio("winsound_sfx");
    }

    createFurniture () {
        this.furniture_container = this.add.container().setScrollFactor(0).setDepth(24);

        let titletxt = new MyText(this, 480, 280, this.copy.title, STYLE_completetitle_text).setOrigin(0.5, 0.5);

        this.quitbtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.quit_button);
        this.quitbtn.button.on('pointerdown', () => {
            this.backToTitleScene();
        });

        this.input.keyboard.on('keydown_SPACE', (evt) => {
            this.backToTitleScene();
        })

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(true);

        this.furniture_container.add(this.quitbtn)
    }

    backToTitleScene () {


        this.furniture_container.destroy();
        this.input.keyboard.off('keydown_SPACE');
        this.scene.start('TitleScene');


        this.scene.stop('BossCompleteScene');
    }
}

export default BossCompleteScene;