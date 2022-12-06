//alert manager lines up all alerts into an array so nothing is missed

// all 'alerts' are first added to the alertlist
// if the alert list is greater than 1, ignore the 'callAlert' function and wait for the displayed alert to be closed.
// if alertlist is 1 then disable the game and fire the callAlert function. 
// The callAlert func targets the type and acts accordingly, often hiding the hud.
// the alert is closed from within the specific popup itself. For example, if you close the inventory, 
// the close button inside inventory calls closeAlert using window.MANAGERS.alertManager.closeAlert() and the closeAlert function will do the rest.

import { saveGameData } from '../helpers/DataFactory';


class AlertManager {
    constructor() {
        this.alertlist = [];
    }

    //add alert to the list, give type and id
    addAlert (_type, _id, _extra) {
        //if alert list is longer than 1 then dont call function, else do
        let alert = { type: _type, id: _id, extra: _extra }

        this.alertlist.push(alert); 

        if (this.alertlist.length > 1) {
            return false;
        } else {
            window.GAME.disablePlay = true;
            this.callAlert();
        }
    }

    // call the specific alert based on type
    callAlert () {
    
        let type = this.alertlist[0].type, id = this.alertlist[0].id, extra = this.alertlist[0].extra;

        switch (type) {
            case 'maincomplete' :
                window.GAME.mainComplete();
            break;
            case 'item' : // item/medal popup
                window.GAME.hideHud(false,960);
                window.GAME.createItemPopup(id, false);
                window.GAME.alertOpen = true;
            break;
            case 'medal' : // item/medal popup
                window.GAME.hideHud(false,960);           
                window.GAME.createItemPopup(id, true);
                window.GAME.alertOpen = true;
            break;
            case 'cutscene' : // popup for task related stuff like photos
                window.GAME.hideHud(false,960);
                window.GAME.createCutScene(id);
                window.GAME.alertOpen = true;
            break;
            case 'inventory' : // inventory screen
                window.GAME.hideHud(false,960);
                window.GAME.createInventoryFull();
                window.GAME.alertOpen = true;
            break;
            case 'taskcomplete' : // task and location screen
                window.GAME.hideHud(false,960);
                window.GAME.createCompleteTaskScreen(id);
                window.GAME.alertOpen = true;
                window.MANAGERS.taskManager.taskComplete();
            break;
            case 'taskscreen' : // task and location screen
                window.GAME.hideHud(false,960);
                window.GAME.createTaskScreen();
                window.GAME.alertOpen = true;
            break;
            case 'characterswap' : // game menu screen
                window.GAME.hideHud(false,960);
                window.GAME.createCharacterSwap();
                window.GAME.alertOpen = true;
            break;
        }

        saveGameData(); 
    }

    clearAlerts () {
        this.alertlist = [];
    }

    // clear the alert from the from of the queue and check for next
    nextAlert () {

        this.alertlist.shift();
        if (this.alertlist.length > 0) {
            this.callAlert();
        } else {
            window.GAME.alertOpen = false;
        }
    }
    // close the alert based on the type
    closeAlert () {
    
    if (this.alertlist.length === 0) return;

        let type = this.alertlist[0].type, id = this.alertlist[0].id;

        switch (type) {
            case 'item' :
                window.GAME.item_popup.closeItemPopup();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'medal' :
                window.GAME.item_popup.closeItemPopup();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'cutscene' : // popup for task related stuff like photos
                window.GAME.cut_scene.destroyCutScene();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'taskcomplete' :
                window.GAME.task_complete.closeScreen();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'inventory' :
                window.GAME.inventory_full.destroyInventoryFull();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'taskscreen' :
                window.GAME.task_screen.closeScreen();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
            case 'characterswap' :
                window.GAME.character_swap.destroyScreen();
                if (!this.stopHudShow()) window.GAME.showHud(false, 1);
                this.nextAlert();
            break;
        }
    }
    
    stopHudShow () {
        let boo = false;

        if (this.alertlist.length > 1) {
            if (this.alertlist[1].type === 'item' || this.alertlist[1].type === 'taskcomplete' || this.alertlist[1].type === 'inventory') boo = true;
        }
        return boo;
    }
}

export default AlertManager;