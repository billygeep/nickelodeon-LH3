
window.LHCOOKIE = "lhcookie4"
console.log("version 1.0.5");

import {Game} from 'phaser';
import regeneratorRuntime from "regenerator-runtime";
import loadWebFonts from "./helpers/loadWebFonts";
import 'whatwg-fetch'; 

import BootScene from './scenes/BootScene';
import UniversalScene from './scenes/UniversalScene';
import TitleScene from './scenes/TitleScene';
import PauseScene from './scenes/PauseScene';
import CodeUnlockScene from './scenes/CodeUnlockScene';
import SceneLoader from './scenes/SceneLoader';
import GameScene from './scenes/GameScene';
import MainCompleteScene from './scenes/MainCompleteScene';
import TutorialScene from './scenes/TutorialScene';
import BossScene from './scenes/BossScene';
import BossTutorialScene from './scenes/BossTutorialScene';
import BossSceneLoader from './scenes/BossSceneLoader';
import SavedGameScene from './scenes/SavedGameScene';
import BossAlertScene from './scenes/BossAlertScene';
import BossCompleteScene from './scenes/BossCompleteScene';
//import config from './config.js'
// import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin/src";
import PhaserMatterCollisionPlugin from "./lib/phaser-matter-collision-plugin/src";

window.userHasInteracted = false;
window.base_path = jsembed.baseUrl();

let cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = window.base_path + 'src/css/style.css';
    link.media = 'all';
    head.appendChild(link);
}

async function asyncCall() {
  let config = await fetch(window.base_path + "src/data/config.json")
    .then(res => res.json())
    .catch(() => {
      throw new Error("Configuration JSON invalid");
    });

    // Store our config
    window.CONFIG = config;

  const phaserConfig = {
    type: Phaser.AUTO,
    antialias: true,
    parent: 'embedtarget',
    width: 960,
    height: 560,
    scale: {
      mode: Phaser.Scale.FIT
    },
    physics: {
        default: "matter",
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
        }
    },
    audio: {
        disableWebAudio: true
    },
    plugins: {
      scene: [
        {
          plugin: PhaserMatterCollisionPlugin, // The plugin class
          key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
          mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }
      ]
    },
    scene: [
      new BootScene(config),
      UniversalScene,
      TitleScene,
      PauseScene,
      SceneLoader,
      CodeUnlockScene,
      MainCompleteScene,
      GameScene,
      TutorialScene,
      SavedGameScene,
      BossScene,
      BossTutorialScene,
      BossSceneLoader,
      BossAlertScene,
      BossCompleteScene
    ]
  };

  let game;

  if (config.fonts) {
    game = loadWebFonts(config.fonts, startGame);
  } else {
    game = startGame();
  }   

  function startGame() {  

    game = new Phaser.Game(phaserConfig);
    
    game.registry.set("current_exit_id", -1);
    game.registry.set("current_item_id", -1);
    game.registry.set("mute", false);

    return game;
  }
}

window.USER_IS_TOUCHING = false;
window.DEVICE_USED = "_desk";

if ("ontouchstart" in document.documentElement) {
  window.USER_IS_TOUCHING = true;
  window.DEVICE_USED = "_mob";
}
//check for first interaction to set desktop/touchscreen
window.addEventListener('touchstart', function onFirstTouch() {
  window.USER_IS_TOUCHING = true;
  window.DEVICE_USED = "_mob";
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

asyncCall();
