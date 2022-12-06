

import ToolTip from "../containers/ToolTip";
import DialogueBubble from "../containers/DialogueBubble";
import ItemPopup from "../containers/ItemPopup";
import InventoryFull from "../containers/InventoryFull";
import HudInventory from "../containers/HudInventory";
import Frame from "../containers/Frame";
import CutScene from "../containers/CutScene";
import CharacterSwap from "../containers/CharacterSwap";
import TaskScreen from "../containers/TaskScreen";
import TouchPad from "../containers/TouchPad";
import CharSelectButton from "../containers/CharSelectButton";
import TaskAlertButton from "../containers/TaskAlertButton";
import TaskCompleteScreen from "../containers/TaskCompleteScreen";

import GrowButton from "../sprites/GrowButton";
import TextButton from "../sprites/TextButton";
import MyText from "../sprites/MyText";
import Player from "../sprites/Player";
import Item from "../sprites/Item";
import PovItem from "../sprites/PovItem";   
import Exit from "../sprites/Exit";


// import trackEvent from "../helpers/trackEvent";
import { callTaskInitiator } from "../helpers/TaskInitiator";
import { saveGameData, getSceneContent, factoryFindNumberInArray, factoryFindDataByIDProperty, setItemDataStatus, setItemDataActive, setExitDataActive } from '../helpers/DataFactory';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });

        window.GAME = this.scene = this;
    }

    preload() {
    }

    // MRK
    create() {

        this.currentScene = factoryFindDataByIDProperty(window.CONFIG.scenes, window.CONFIG.data.playervars.currentScene);

       // console.log(this.currentScene.id + " IS THE CURRENT SCENE ID!")

        window.CONFIG.data.playervars.crawl = (this.currentScene.crawl === true) ? true : false;
        window.CONFIG.data.playervars.playerScale = (this.currentScene.scale !== undefined) ? this.currentScene.scale : 1;

        this.pov = (this.currentScene.type === 'pov') ? true : false;
        this.isInteracting = 0; // int used to see if player is interacting with exit (1), item (2), character
        this.spaceIsDown = false;
        this.notifications = [];
        this.alertOpen = this.dialogueOpen = this.cutsceneOpen = false;
        this.disablePlay = false;
        
        this.mapW = 0;
        this.mapH = 0;

        this.touchPadDown = [
            false,
            false,
            false,
            false
        ];

        this.item_group = this.add.group();
        this.furniture_group = this.add.group();

        if (!this.pov) {
            this.createPlayableAreas();
            this.createFurniture();
            this.createHero();
            this.createToolTip();
            // this.createTouchPad();
            if (window.USER_IS_TOUCHING) this.createTouchPad();
        } else {
            this.createPOVScene();
            this.createPovToolTip();
        }

        this.createToolTip();
        this.createExits();
        this.createSprites();
        this.createHUD();

        this.sceneChange = false;


        // if popup open close it with space bar hit
        this.input.keyboard.on('keydown_SPACE', (evt) => {

            if (this.disablePlay) { // if play disabled then look for alert or dialogue to close
              if (this.alertOpen) {
                window.MANAGERS.alertManager.closeAlert();
                return;
              } else {
                if (this.dialogueOpen) {
                  this.dialogueBubble.updateBubble();
                  return;
                }
              }
            } else {
                this.clickSpace();
            }

            if (this.pov) {
                window.GAME.selectPovExit(0);
                return;
            }
        });


        // dicates the task ordering
        callTaskInitiator(this.currentScene.id, this.currentScene.location);
        // check location medals
        window.MANAGERS.medalManager.checkLocation();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.ronnieCounter();
        saveGameData();
    }

    ronnieCounter () {
        if (window.CONFIG.data.medal_data.medals[4].status === 1) return;
        window.MANAGERS.medalManager.checkRonniTime()
        let timedEvent = this.time.delayedCall(1000, this.ronnieCounter, [], this);
    }

    createPOVScene () {
        this.add.sprite(0, 0, this.currentScene.key).setOrigin(0);
    }
    createPlayableAreas () {
        let objectmaps = this.cache.json.get('object_maps');
        // sprites are positioned at their center of mass
        let ground = this.matter.add.sprite(0, 0, this.currentScene.key, '', {shape: objectmaps[this.currentScene.map]});

        this.mapW = ground.width;
        this.mapH = ground.height;
        this.matter.world.setBounds(0, 0, this.mapW, this.mapH);
 
        ground.setPosition(ground.centerOfMass.x, ground.centerOfMass.y);  // corrected position: (0,280)
        ground.setStatic(true);
    }
    createTouchPad  () {
        this.touchpad = new TouchPad(this, 100, 660, []);
    }
    createHero () {
        this.player = new Player(this, window.CONFIG.data.playervars.x, window.CONFIG.data.playervars.y);

        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, this.mapW, this.mapH)
        this.camera.startFollow(this.player.sprite);
    }
    createSprites () {
        // filter the items in the scene and then add them
        const items = window.CONFIG.items
            .filter(item => item.scene.some(scene => scene === this.currentScene.id))
            .map((i) => {
                window.CONFIG.data.item_data.map((data) => {
                    if (data.id === i.id && data.status === 0) this.addSpriteToScene(i)
                })
            });
    }
    addSpriteToScene (_item) { 
        let item = (this.pov) ? new PovItem(this, 0, 0, [], _item) : new Item(this, 0, 0, [], _item);        
        item.id = _item.id;
        item.setDepth(11);
        this.item_group.add(item);

    }
    createFurniture () {
        let furniture = this.currentScene.furniture;
        
        furniture.forEach((item) => {
            let furniturebody = this.add.sprite(item.x,item.y, item.spritesheet, item.img).setDepth(11);
            this.furniture_group.add(furniturebody)
            furniturebody.visible = true;
            furniturebody.name = item.img
        });    
    }
    createExits () {
        let exits = this.currentScene.exits;
        exits.forEach((ex) => {
            let exit = (this.pov) ? new TextButton(this, 120, 495, 'gamesprites', 'button_template_medium.png', 0xcccd4d, 0xeabd37, window.CONFIG.povscene.exit_button) : new Exit(this, 0, 0, [], ex);
            exit.id = ex.id;
            if (this.pov) {
                exit.setDepth(11);
                exit.button.on('pointerdown', () => {
                    this.selectPovExit(exit.id);
                });
            }
        });
    }
    createHUD () {
        this.frame = new Frame(this, 0, 0, []).setDepth(21);
        
        this.pause_button = new GrowButton(this, 202, 52, 'gamesprites', 'pause_btn.png').setDepth(22);
        this.pause_button.on('pointerdown', () => {
           this.openPauseScene();
        });

        this.hud_inventory = new HudInventory(this, 0, 6, []);
        this.char_button = new CharSelectButton(this, 314, 54, []);
        if (this.currentScene.id === 123) this.char_button.visible = false;
        this.task_button = new TaskAlertButton(this, 880, 540, []);
    }


    // TOOL TIP STUFF
    createToolTip () {
        this.toolTip = new ToolTip(this, 0, 0).setDepth(19);
        this.toolTip.visible = false;
    }
    createPovToolTip () {
        this.toolTip = new ToolTip(this, 0, 0).setDepth(23);
        this.toolTip.visible = false;
    }
    updateToolTip (_data, _position = null) {
        this.toolTip.updateMe(_data, _position);
        this.toolTip.visible = true;
    }
    hideToolTip () {
        this.toolTip.visible = false;
    }

    createTaskTimer (_time, _task) {
        let universalScene = this.scene.get('Universal');
        // pass time and task id to timer
        universalScene.createTimer(_time, _task);
    }

    cancelTimer (){
        let universalScene = this.scene.get('Universal');
        universalScene.cancelTimer();
    }


    // HUD FUNCTIONALITY
    hideHud () {
        this.hud_inventory.hideMe();
        this.pause_button.hideMe();
        this.task_button.hideMe();
        this.char_button.hideMe();
        if (!this.pov && window.USER_IS_TOUCHING) this.touchpad.hideMe();
        if (this.dialogueOpen) {
            window.GAME.removedDialogueBubble()
            this.dialogueBubble.destroyBubble();
        }
    }
    showHud () {
        this.hud_inventory.showMe();
        this.pause_button.showMe();
        this.task_button.showMe();
        this.char_button.showMe();
        if (!this.pov && window.USER_IS_TOUCHING) this.touchpad.showMe();
    }
    hideControls () {
        if (!this.pov && window.USER_IS_TOUCHING) this.touchpad.hideMe();
    }
    showControls () {
        if (!this.pov && window.USER_IS_TOUCHING) this.touchpad.showMe();
    }

    // GENERATE ON THE FLY
    createTaskScreen (val = null) {
        this.task_screen = new TaskScreen(this, val);
    }
    addNewTaskAlert () {
        this.task_button.addTaskAlert();
    }
    removeNewTaskAlert () {
        this.task_button.removeTaskAlert();
    }
    createTaskAlert () {
        this.task_screen = new TaskScreen(this, 'alert', 0);
    }
    createCodeUnlock () {
        this.code_unlock = new CodeUnlock(this, 0, 0);
    }
    createCharacterSwap () {
        this.character_swap = new CharacterSwap(this, 0, 0);
        this.player.newPhase = -1;
    }
    createInventoryFull () {
        this.inventory_full = new InventoryFull(this, 0, 0);
    }
    createItemPopup (_id, _medal) {
        this.item_popup = new ItemPopup(this, _id, _medal);
    }
    createCutScene (_id) {
        this.cut_scene = new CutScene(this, _id);
    }
    createCompleteTaskScreen (_id) {
        this.task_complete = new TaskCompleteScreen(this, _id);
    }


    // MRK - UPDATE FUNCTIONS
    update (time, delta) {

        this.disablePlay = false;
        // console.log(this.sceneChange, this.alertOpen, this.dialogueOpen, this.hintOpen, this.pov)
        if (this.sceneChange || this.alertOpen || this.dialogueOpen || this.pov) this.disablePlay = true;

        if (!this.disablePlay) {
            this.checkInput()
            this.checkZindex();
        } else {

        }
    }
    checkZindex () {

       // console.log(this.item_group.children)
        this.furniture_group.children.iterate((furniture) => {
            let z = (this.player.sprite.y + 10 > furniture.y + furniture.displayHeight/2) ? 9 : 12;
            furniture.setDepth(z);
        })

        this.item_group.children.iterate((item) => {
            if (item.z === true) {
                let zpos = (this.player.sprite.y > item.y + item.sprite.displayHeight/2) ? 9 : 11;
                item.setDepth(zpos);
            } else {
                item.setDepth(item.z);
            }
        })
    }
    checkInput () {
        // controls, move player if directional keys pressed
        this.player.checkInput(
            this.cursors.left.isDown, 
            this.cursors.right.isDown, 
            this.cursors.up.isDown, 
            this.cursors.down.isDown, 
            this.spaceIsDown
        );

        window.CONFIG.data.playervars.x = this.player.sprite.x
        window.CONFIG.data.playervars.y = this.player.sprite.y
    }

    clickSpace () {
        if (this.isInteracting === 0 || this.alertOpen) return;
        this.playerIsInteracting();
    }
    // switch statement to handle player interactions.
    playerIsInteracting () {
        switch(this.isInteracting) {
            case 0 :
                // do nothing
            break;
            case 1 :
                this.changeScene();
            break;
            case 2 :
                this.selectItem();
            break;
        }
    }
    checkIfCharCanCollect (arr) {
        arr.map((i) => {
            if (i[0] === window.CONFIG.data.playervars.character) return i[1];
        })

        return -1;
    }
    selectItem () {

        if (this.alertOpen) return;

        let item_id = this.registry.get("current_item_id");
        let item_data = factoryFindDataByIDProperty(window.CONFIG.items, item_id);
        let container = this.item_group.getChildren().find(item => item.id === item_id);

        window.MANAGERS.taskManager.setCurrentTask(item_data.task);

        // check if item is restricted
        let canUseItem = this.checkIfCanUseItem(item_data);
        if (canUseItem !== true) {
            let d = window.CONFIG.restriction_dialogue.find(dialogue => dialogue.id === canUseItem);
            this.createDialogueBubble(d.chat);
            return;
        }

        switch (item_data.type) {

            case "item" :
            window.MANAGERS.taskManager.currenttask.interactWithTask(item_id, null);
                container.destroyMe();
                this.hideToolTip();
                window.MANAGERS.itemManager.collectItem(item_id);
                window.MANAGERS.alertManager.addAlert('item', item_id); // show popup
                this.registry.set("current_item_id", -1)
                this.isInteracting = 0;
            break;
            case "groupitem" :
                window.MANAGERS.taskManager.currenttask.interactWithTask(item_id, null);
                container.destroyMe();
                this.hideToolTip();
                window.MANAGERS.itemManager.collectItem(item_id);
                window.MANAGERS.alertManager.addAlert('item', item_id); // show popup
                
                this.registry.set("current_item_id", -1)
                this.isInteracting = 0;
            break;
            case "char" :
                if (!this.dialogueOpen) {
                    window.MANAGERS.dialogueManager.startDialogueSequence(item_id);
                    window.MANAGERS.taskManager.currenttask.interactWithTask();

                    window.MANAGERS.medalManager.talkToSister(item_id);
                }
            break;
            case "static" :
                console.log("THIS IS STATIC")
            break;
            case "interact" :
                window.MANAGERS.taskManager.currenttask.interactWithTask(item_id);
            break;
            case "openexit" :
            case "openitem" :

                let show = (item_data.type === "openitem") 
                    ? item_data.showid.map((id) => this.showOpenItems(id, item_data.sfx)) :
                    this.showOpenExit(item_data.exitchange);
             
                setItemDataStatus(item_id, -1); //set the item status to used
                this.hideToolTip();
                container.destroyMe();
                this.isInteracting = 0;

                if (item_data.sfx !== "") window.MANAGERS.audioManager.playAudio(item_data.sfx); 
            break;
        }   

        saveGameData(); 
    }
    checkIfCanUseItem(_item) {
        let item = _item;
        if (item.restrict) {
            let entry = item.restrict_array.find(id => id[0] === window.CONFIG.data.playervars.currentCharacter);
            let result = (entry === undefined) ? true : entry[1]
            return result;
        } else {
            return true;
        }
    }
    removeItemFromScene (id) {
        let item_data = factoryFindDataByIDProperty(window.CONFIG.items, id);
        let container = this.item_group.getChildren().find(item => item.id === id);
        container.destroyMe();
    }
    collectPovItem (_data) {
      //  let item_id = _id;
        let item_data = _data;

        window.MANAGERS.taskManager.setCurrentTask(item_data.task);

        if (item_data.type === "openitem") {
            item_data.showid.map((id) => { this.showOpenItems(id, item_data.sfx) })
             
            setItemDataStatus(item_data.id, -1); //set the item status to used
            window.MANAGERS.audioManager.playAudio(item_data.sfx); 

        } else {
            if (item_data.type === "groupitem") window.MANAGERS.taskManager.currenttask.interactWithTask(item_data.id, null); 

            window.MANAGERS.itemManager.collectItem(item_data.id);
            window.MANAGERS.alertManager.addAlert('item', item_data.id); // show popup  

            if (item_data.id === 2) window.CONFIG.data.playervars.codeUnlocked = true;
        }

        let container = this.item_group.getChildren().find(item => item.id === item_data.id);
        container.destroyMe();
    }
    
    showOpenItems (_new_id, _sfx) {
        let new_id = _new_id, sfx = _sfx;
        if (new_id === undefined) return;
        let newitem = factoryFindDataByIDProperty(window.CONFIG.items, new_id);
        setItemDataStatus(new_id, 0); //set the item status to used
        this.addSpriteToScene(newitem);


        if (sfx !== "") window.MANAGERS.audioManager.playAudio(sfx); 
    }
    showOpenExit (_arr, _sfx) {
        let arr = _arr, sfx = _sfx;
        setExitDataActive(this.currentScene.id, arr[0], arr[1]);
    }


    createDialogueBubble (_dialogue) {
        this.dialogueOpen = true;
        this.dialogueBubble = new DialogueBubble(this, 0, 0, _dialogue).setDepth(19);
    }
    removedDialogueBubble () {
        window.MANAGERS.dialogueManager.endDialogueSequence();
        this.dialogueOpen = false;
    }

    // check if dragged item can be dropped on game item
    canDropItem (_id) {
        let receiving_id = this.registry.get("current_item_id");
        // if interacting with no item then no drop allowed
        if (receiving_id < 0) return false;

        let receiving_data = factoryFindDataByIDProperty(window.CONFIG.items, receiving_id);
        let item_data = factoryFindDataByIDProperty(window.CONFIG.items, _id);
        
        let canUseItem = this.checkIfCanUseItem(item_data);
        if (canUseItem !== true) {
            if (this.dialogueOpen) this.dialogueBubble.updateBubble()
            let d = window.CONFIG.restriction_dialogue.find(dialogue => dialogue.id === canUseItem);
            this.createDialogueBubble(d.chat);
            return false;
        }

        window.MANAGERS.taskManager.setCurrentTask(receiving_data.task);
        let receiving_item = factoryFindDataByIDProperty(window.CONFIG.data.item_data, receiving_id);
        if (!receiving_item.dropids) return false;

        // check if receiving item has drop id in its array
        let candrop = !factoryFindNumberInArray(receiving_item.dropids, _id) ? false : true
        if (candrop) window.MANAGERS.audioManager.playAudio(item_data.sfx); 
        return candrop;
    }

    // SCENE CHANGE / MAP EXIT
    changeScene () {
        // look if exit is restricted to certain characters
        let exit_id = this.registry.get("current_exit_id");
        let exit = getSceneContent(this.currentScene, 'exits', exit_id);
        let canUseExit = this.checkIfCanUseExit(exit);

        if (canUseExit === true) {
            // if exit is a cutscene then load the correct scene
            if (exit.cutscene) {
                if (this.cutsceneOpen) return;
                window.MANAGERS.alertManager.addAlert('cutscene', exit.cutscene);
                this.cutsceneOpen = true;
            } else {

                this.sceneChange = true;

                window.CONFIG.data.playervars.previousScene = this.currentScene.id;
                window.CONFIG.data.playervars.currentScene = exit.newscene;
                window.CONFIG.data.playervars.x = exit.sx;
                window.CONFIG.data.playervars.y = exit.sy;

                if (exit.sfx !== "") window.MANAGERS.audioManager.playAudio(exit.sfx); 

                this.cleanUpScene();
                this.scene.restart("GameScene");
            }
        } else {
            let d = window.CONFIG.restriction_dialogue.find(dialogue => dialogue.id === canUseExit);
            this.createDialogueBubble(d.chat);
        }
    }

    checkIfCanUseExit(_exit) {
        let exit = _exit;
        if (exit.restrict) {
            let entry = exit.restrict_array.find(id => id[0] === window.CONFIG.data.playervars.currentCharacter);
            let result = (entry === undefined) ? true : entry[1]
            
            return result;
        } else {
            return true;
        }
    }

    selectPovExit (_id) {

        let exit_id = _id;
        let exit = getSceneContent(this.currentScene, 'exits', exit_id);

        window.CONFIG.data.playervars.currentScene = exit.newscene;
        window.CONFIG.data.playervars.x = exit.sx;
        window.CONFIG.data.playervars.y = exit.sy;

        this.cleanUpScene();
        this.scene.restart("GameScene");
    }

    // SCENE CHANGE / MAP EXIT
    changeLocation (_id) {

        window.CONFIG.data.playervars.currentLocation = _id;
        window.CONFIG.data.playervars.currentScene = 100 * _id;
        
        this.cleanUpScene();

        this.scene.stop("GameScene");
        this.scene.start("SceneLoader");
    }


    openPauseScene () {
        this.cleanUpScene();
        this.scene.stop('GameScene');
        this.scene.start('PauseScene');
    }

    mainComplete () {
        window.MANAGERS.alertManager.closeAlert();

        this.cleanUpScene();
        window.CONFIG.data.playervars.level =  'boss';

        this.scene.stop("GameScene");
        this.scene.start('MainCompleteScene')
    }

    // CLEAN UP
    cleanUpScene () {

        window.MANAGERS.alertManager.clearAlerts();

        saveGameData(); 

        if (!this.pov) this.camera.stopFollow(this.player.sprite); 
        this.input.keyboard.off('keydown_SPACE');

        this.hud_inventory.destroyMe();
        this.frame.destroy();
    }
}

export default GameScene;
