import MyText from "../sprites/MyText";
import Frame from "../containers/Frame";
import AlphaButton from "../sprites/AlphaButton";
import { factoryGetAllEntriesByType } from '../helpers/DataFactory';
import { STYLE_loaderscenetext } from "../helpers/MyConstants";

class SceneLoader extends Phaser.Scene {
    constructor(config) {
        super("SceneLoader");
        this.copy = window.CONFIG.bootscene;
        this.loadItems = this.loadItems.bind(this);
    }

    create() {

        window.CONFIG.data.playervars.level = 'main';

        this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_balloons').setOrigin(0, 0);

        let frame = new Frame(this, 0, 0, []);
        let titletxt = new MyText(this, 480, 300, this.copy.loadtext, STYLE_loaderscenetext).setOrigin(0.5, 0.5);
        // loader.play('load');
        
        this.loadItems();

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(false);
        universalScene.toggleLogo(true);
    }
    // load the current level data
    loadItems () {

      let scenes = factoryGetAllEntriesByType(window.CONFIG.scenes, 'location', window.CONFIG.data.playervars.currentLocation);

      scenes.map((scene) => {
          this.load.image(scene.key, window.base_path+'src/assets/images/scenes/'+scene.img);
          if (window.CONFIG.data.playervars.currentScene === scene.id) {
              window.CONFIG.data.playervars.x = scene.sx;
              window.CONFIG.data.playervars.y = scene.sy;
          }
      })

        // // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            this.load.off('complete')

            let scene = (window.CONFIG.data.playervars.showTutorial) ? this.scene.start('TutorialScene') : this.scene.start('GameScene');
            window.CONFIG.data.playervars.showTutorial = false;
            this.scene.stop('SceneLoader');

            if (!window.MANAGERS.audioManager.checkMusic('audio_theme')) {
              window.MANAGERS.audioManager.stopMusic();
              window.MANAGERS.audioManager.playMusic('audio_theme');
            };

            
        });

        // // start loading
        this.load.start();
    }
}

export default SceneLoader;