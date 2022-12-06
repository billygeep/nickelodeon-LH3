
import Frame from '../containers/Frame';
import MyText from "../sprites/MyText";
// import trackEvent from "../helpers/trackEvent"
import { STYLE_h1text, playervars } from "../helpers/MyConstants";
import { saveGameData } from '../helpers/DataFactory';
import TextButton from "../sprites/TextButton";

class SavedGameScene extends Phaser.Scene {
    constructor() {
        super("SavedGameScene");
        this.copy = window.CONFIG.savedgame_scene
    }

    preload () {
        this.cache.json.remove('content')
        this.load.json('content', window.base_path + "src/data/config.json");
    }

    create() {

        this.bg = this.add.image(0, 0, 'bg_standard').setOrigin(0, 0);
        
        let frame = new Frame(this, 0, 0, []);
        let titletxt = new MyText(this, 480, 180, this.copy.title, STYLE_h1text).setOrigin(0.5, 0.5);

        this.resumebtn = new TextButton(this, 350, 320, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.resume_button);
        this.resumebtn.button.on('pointerdown', () => {
           this.resumeGame();
        });
        this.resumebtn = new TextButton(this, 610, 320, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.new_button);
        this.resumebtn.button.on('pointerdown', () => {
           this.newGame();
        });  
    }

    resumeGame () {
        let savedgamedata = localStorage.getItem(window.LHCOOKIE);
        let parsedata = JSON.parse(savedgamedata)

        window.CONFIG.scenes = parsedata.scenes;
        window.CONFIG.data = parsedata.data

        window.MANAGERS.taskManager.setupTaskList();

        if (window.CONFIG.data.playervars.level ===  'boss') {
            this.scene.start('BossSceneLoader');
        } else {
            this.scene.start('SceneLoader');
        }

        this.scene.stop("SavedGameScene");
    }

    newGame() {
        window.CONFIG = this.cache.json.get('content');
        
       // window.CONFIG.data.playervars.assign({}, playervars)
        window.CONFIG.data.playervars = Object.assign({}, playervars);
        window.MANAGERS.taskManager.setupTaskList();

        this.scene.stop("SavedGameScene");
        this.scene.start('SceneLoader');
    }
}

export default SavedGameScene;
