
import Frame from '../containers/Frame';

import MyText from "../sprites/MyText";
import TextButton from "../sprites/TextButton";
import trackEvent from "../helpers/trackEvent"
import { STYLE_h1text, playervars } from "../helpers/MyConstants";

class TitleScene extends Phaser.Scene {
    constructor(config) {
        super("TitleScene");
        this.copy = window.CONFIG.titlescene
    }

    preload () {
        this.cache.json.remove('content')
        this.load.json('content', window.base_path + "src/data/config.json");
    }

    create() {

        trackEvent(window.CONFIG.tracking.trackpoints[0])

        window.MANAGERS.audioManager.stopMusic();

        if (!window.userHasInteracted) {
            this.input.on('pointerdown', ()=> { if (window.userHasInteracted) return true;  window.userHasInteracted = true; window.MANAGERS.audioManager.playMusic('intro_theme'); });
        } else {
            window.MANAGERS.audioManager.playMusic('intro_theme');
        }
        
         

        this.game.config.audio.context = new (window.AudioContext || window.webkitAudioContext)();

        this.bg = this.add.image(0, 0, 'bg_title').setOrigin(0, 0);
        
        let frame = new Frame(this, 0, 0, []);

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(true);
        universalScene.toggleLogo(false);
    
        this.lori = this.add.sprite(650, 230, 'cutscene_sprites', 'title_lori.png').setOrigin(0.5);
        this.lori.alpha = 0;
        this.lori.angle = -5;
        this.tweens.add({
            targets: this.lori,
            alpha: 1,
            angle: 0,
            x: 693,
            y: 210,
            duration: 100,
            delay: 1200
        });
        
        this.ronnie = this.add.sprite(320, 230, 'cutscene_sprites', 'title_ronnie.png').setOrigin(0.5);
        this.ronnie.alpha = 0;
        this.ronnie.angle = 6;
        this.tweens.add({
            targets: this.ronnie,
            y: 191,
            x: 270,
            alpha: 1,
            angle: 0,
            duration: 200,
            delay: 1100,
            ease: 'back.easeOut'
        });

        this.leni = this.add.sprite(376, 257, 'cutscene_sprites', 'title_leni.png').setOrigin(0.5);
        this.leni.alpha = 0;
        this.leni.angle = 4;
        this.tweens.add({
            targets: this.leni,
            alpha: 1,
            angle: 0,
            x: 356,
            y: 207,
            duration: 200,
            delay: 1200
        });

        this.luan = this.add.sprite(148, 300, 'cutscene_sprites', 'title_luan.png').setOrigin(0.5);
        this.luan.alpha = 0;
        this.tweens.add({
            targets: this.luan,
            y: 201,
            alpha: 1,
            duration: 200,
            delay: 1200,
            ease: 'quad.easeInOut'
        });

        this.bobby = this.add.sprite(730, 327, 'cutscene_sprites', 'title_bobby.png').setOrigin(0.5);

        this.luna = this.add.sprite(288, 393, 'cutscene_sprites', 'title_luna.png').setOrigin(0.5);
        this.luna.angle = 2;
        this.tweens.add({
            targets: this.luna,
            angle: 0,
            x: 291,
            y: 389,
            duration: 50,
            ease: 'quad.easeInOut',
            yoyo: true,
            repeat: 16
        });

        this.clyde = this.add.sprite(540, 230, 'cutscene_sprites', 'title_clyde.png').setOrigin(0.5);
        this.clyde.alpha = 0;
        this.clyde.angle = -3;
        this.tweens.add({
            targets: this.clyde,
            alpha: 1,
            angle: 0,
            x: 555,
            y: 131,
            duration: 100,
            delay: 1500
        });

        this.lucy = this.add.sprite(185, 331, 'cutscene_sprites', 'title_lucy.png').setOrigin(0.5);
        this.tweens.add({
            targets: this.lucy,
            y: 340,
            duration: 450,
            ease: 'quad.easeInOut',
            yoyo: true,
            repeat: 1
        });

        this.lisa = this.add.sprite(186, 433, 'cutscene_sprites', 'title_lisa.png').setOrigin(0.5);

        this.lola = this.add.sprite(450, 450, 'cutscene_sprites', 'title_lola.png').setOrigin(0.5);
        this.lola.scaleX = 0.9;
        this.tweens.add({
            targets: this.lola,
            scaleX: 1,
            duration: 1600,
            ease: 'back.easeInOut',
        });

        this.lynn = this.add.sprite(600, 430, 'cutscene_sprites', 'title_lynn.png').setOrigin(0.5);
        this.tweens.add({
            targets: this.lynn,
            x: 712,
            duration: 1600
        });
        this.tweens.add({
            targets: this.lynn,
            y: 400,
            duration: 300,
            ease: 'back.easeInOut',
            yoyo: true,
            repeat: 2
        });

        this.splat = this.add.sprite(435, 295, 'cutscene_sprites', 'title_splat.png').setOrigin(0.5);  
        this.splat.scaleX = this.splat.scaleY = 0;
        this.tweens.add({
            targets: this.splat,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            delay: 1000
        });

        this.logo = this.add.sprite(472, 300, 'logo_large').setOrigin(0.5); 
        this.logo.alpha = 0;
        this.tweens.add({
            targets: this.logo,
            alpha: 1,
            duration: 200,
            delay: 1200
        });

        this.lily = this.add.sprite(430, 300, 'cutscene_sprites', 'title_lily.png').setOrigin(0.5);
        this.tweens.add({
            targets: this.lily,
            y: 100,
            duration: 1600
        });

        this.lincoln = this.add.sprite(608, 800, 'cutscene_sprites', 'title_lincoln.png').setOrigin(0.5);
        this.tweens.add({
            targets: this.lincoln,
            y: 480,
            duration: 500,
            ease: 'quad.easeOut',
            delay: 1000
        });

        this.phone = this.add.sprite(980, 1200, 'cutscene_sprites', 'title_phone.png').setOrigin(1, 1)
        this.phone.angle = -20;
    
        let flash = this.add.rectangle(142, 69, 648, 432, 0xffffff).setOrigin(0);
        flash.angle = 1;
        flash.alpha = 0;

        this.tweens.add({
            targets: this.phone,
            angle: 0,
            y: 570,
            duration: 600,
            delay: 1000,
            ease: 'Quad.easeInOut',
            onComplete: () => {
                this.tweens.add({
                    targets: flash,
                    alpha: 1,
                    duration: 100,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        this.addFurniture();
                    }
                });
            }
        });

       // this.bossbtn = new TextButton(this, 840, 495, 'gamesprites', 'button_template_medium.png', 0xbcc85a, 0xeabd37, this.copy.boss_button);
       //  this.bossbtn.button.on('pointerdown', () => {
       //      this.goToBossLevel();
       //  });

      //  this.goToGameSelect();
      //this.goToBossLevel();
    }

    addFurniture () {

        this.bg.setInteractive({ useHandCursor: true  });
        this.bg.on('pointerdown', () => {
            this.game.config.audio.context = new (window.AudioContext || window.webkitAudioContext)();
           this.goToGameSelect();
        });

        this.input.keyboard.on('keydown_SPACE', (evt) => {
            this.game.config.audio.context = new (window.AudioContext || window.webkitAudioContext)();
            this.goToGameSelect();
        })

        let titletxt = new MyText(this, 480, 520, this.copy['title'+window.DEVICE_USED], STYLE_h1text).setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: titletxt,
            alpha: 0,
            duration: 500,
            delay: 500,
            ease: 'quad.easeInOut',
            yoyo:true,
            repeat: -1
        });
    }

    goToBossLevel () {

        window.CONFIG.data.playervars = playervars;
        window.MANAGERS.taskManager.setupTaskList();

        this.bg.off('pointerdown'); 
        this.input.keyboard.off('keydown_SPACE');

        this.scene.stop("TitleScene");
        this.scene.start("BossSceneLoader");
    }

    goToGameSelect() {
        
        this.bg.off('pointerdown'); 
        this.input.keyboard.off('keydown_SPACE');

        if (localStorage.getItem(window.LHCOOKIE) === null || localStorage.getItem(window.LHCOOKIE) === 'reset') {
            window.CONFIG = this.cache.json.get('content');
            window.CONFIG.data.playervars = Object.assign({}, playervars);
            window.MANAGERS.taskManager.setupTaskList();
            this.scene.start('SceneLoader');
        } else {
            this.scene.start('SavedGameScene');
        }

        this.scene.stop("TitleScene");
        window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
    }
}

export default TitleScene;
