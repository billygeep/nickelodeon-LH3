import MyText from "../sprites/MyText";
import Frame from "../containers/Frame";
import AlphaButton from "../sprites/AlphaButton";
import { factoryGetAllEntriesByType, saveGameData } from '../helpers/DataFactory';
import { STYLE_loaderscenetext } from "../helpers/MyConstants";

class BossSceneLoader extends Phaser.Scene {
  constructor(config) {
    super("BossSceneLoader");
    this.copy = window.CONFIG.bootscene;
    this.loadItems = this.loadItems.bind(this);

  }

  create() {

    window.CONFIG.data.playervars.level =  'boss';
    window.CONFIG.data.playervars.codeUnlocked = true;
    
    saveGameData();

    this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
    this.add.image(0, 0, 'bg_balloons').setOrigin(0, 0);

    let frame = new Frame(this, 0, 0, []);
    let titletxt = new MyText(this, 480, 300, this.copy.loadtext, STYLE_loaderscenetext).setOrigin(0.5, 0.5);
  
        this.loadItems();

        let universalScene = this.scene.get('Universal');
        universalScene.showButton(false);
        universalScene.toggleLogo(true);
      }
    // load the current level data
    loadItems () {

      this.load.image('bossbg', window.base_path+'src/assets/images/scenes/boss_bg.jpg');
      this.load.image('bosswinbg', window.base_path+'src/assets/images/scenes/boss_win.jpg');
      this.load.image('endwinbg', window.base_path+'src/assets/images/scenes/end_win_scene.jpg');
      this.load.audio('boss_theme', [window.base_path+'src/assets/audio/bosstheme.mp3', window.base_path+'src/assets/audio/bosstheme.ogg']);
      // // Register a load complete event to launch the title screen when all files are loaded
      this.load.on('complete', () => {

        this.load.off('complete')

        this.scene.start('BossTutorialScene');
        this.scene.stop('BossSceneLoader');

        window.MANAGERS.audioManager.addMusic('boss_theme');
        window.MANAGERS.audioManager.stopMusic();
        window.MANAGERS.audioManager.playMusic('boss_theme');
        });

        // // start loading
        this.load.start();
      }
    }

    export default BossSceneLoader;