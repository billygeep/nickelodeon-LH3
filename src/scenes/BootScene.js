import MyText from "../sprites/MyText";

import Frame from "../containers/Frame";

import ItemManager from '../managers/ItemManager.js';
import AlertManager from '../managers/AlertManager.js';
import DialogueManager from '../managers/DialogueManager.js';
import TaskManager from '../managers/TaskManager.js';
import AudioManager from '../managers/AudioManager.js';
import MedalManager from '../managers/MedalManager.js';

import { STYLE_loaderscenetext } from "../helpers/MyConstants";
import makeAnimations from '../helpers/animations';

class BootScene extends Phaser.Scene {
    constructor(config) {
        super("BootScene");
        this.copy = window.CONFIG.bootscene
        this.loadItems = this.loadItems.bind(this);
    }
    preload() {
        this.load.image('bg_standard', window.base_path + 'src/assets/images/scenes/bg_standard.jpg');
        this.load.image('bg_balloons', window.base_path + 'src/assets/images/scenes/bg_balloons.png');
    }

    create() {

        this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_balloons').setOrigin(0, 0);
        let frame = new Frame(this, 0, 0, []);
        let titletxt = new MyText(this, 480, 300, this.copy.loadtext, STYLE_loaderscenetext).setOrigin(0.5, 0.5);
        
        this.loadItems();
    }

    loadItems () {
        const progress = this.add.graphics();
        
        this.load.image('bg_title', window.base_path + 'src/assets/images/scenes/bg_title.jpg');
        this.load.image('logo_large', window.base_path + 'src/assets/images/scenes/logo_large.png');
        this.load.image('logo_small', window.base_path + 'src/assets/images/scenes/logo_small.png');

        this.load.json('object_maps', window.base_path+'src/assets/images/objectmaps.json');
        this.load.atlas('cutscene_sprites', window.base_path+'src/assets/images/cutscene_sprites.png', window.base_path+'src/assets/images/cutscene_sprites.json');
        this.load.atlas('item_sprites', window.base_path+'src/assets/images/item_sprites.png', window.base_path+'src/assets/images/item_sprites.json');
        this.load.atlas('spritesheets', window.base_path+'src/assets/images/spritesheets.png', window.base_path+'src/assets/images/spritesheets.json');
        this.load.atlas('furniture_sprites', window.base_path+'src/assets/images/furniture_sprites.png', window.base_path+'src/assets/images/furniture_sprites.json');
        this.load.atlas('gamesprites', window.base_path+'src/assets/images/gamesprites.png', window.base_path+'src/assets/images/gamesprites.json');
        this.load.atlas('lincoln_sprites', window.base_path+'src/assets/images/lincoln_sprites.png', window.base_path+'src/assets/images/lincoln_sprites.json');
        this.load.atlas('clyde_sprites', window.base_path+'src/assets/images/clyde_sprites.png', window.base_path+'src/assets/images/clyde_sprites.json');
        this.load.atlas('bobby_sprites', window.base_path+'src/assets/images/bobby_sprites.png', window.base_path+'src/assets/images/bobby_sprites.json');


        this.load.audio('audio_theme', [window.base_path+'src/assets/audio/gametheme.ogg',window.base_path+'src/assets/audio/gametheme.mp3']);
        this.load.audio('intro_theme', [window.base_path+'src/assets/audio/introtheme.ogg',window.base_path+'src/assets/audio/introtheme.mp3']);
        this.load.audioSprite('sfx', window.base_path + 'src/assets/audio/audiosprite.json', [ window.base_path + 'src/assets/audio/audiosprite.ogg', window.base_path + 'src/assets/audio/audiosprite.mp3' ]);

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {

            window.MANAGERS = {
              itemManager: new ItemManager(),
              alertManager: new AlertManager(),
              dialogueManager: new DialogueManager(),
              taskManager: new TaskManager(),
              audioManager: new AudioManager(this),
              medalManager: new MedalManager()
            };

            // prepare all animations, defined in a separate file
            makeAnimations(this);

            window.MANAGERS.audioManager.addMusic('audio_theme');
            window.MANAGERS.audioManager.addMusic('intro_theme');
            // progress.destroy();

            this.scene.launch("Universal");
            this.scene.start('TitleScene');
            this.scene.stop('BootScene');
        });
        // start loading
        this.load.start();
    }
}

export default BootScene;
