
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskLynn {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.lynn_id = 400;
        this.ducttape_id = 404;
        this.tape_droparea_id = 403;
        this.ducttapeon_id = 413;
        this.leak_id = 402;
        this.fountain_id = 401;
        this.wrench_id = 405;
        this.stopcock_array = [408, 409, 410, 411];

        this.code = "410,408,411,409";
        this.current_code = "";
    }

    interactWithTask (_item_id, _target_id) {

        let item_id = _item_id, target_id = _target_id;
        let a = (item_id === this.ducttape_id && target_id === this.tape_droparea_id) ? this.ductTapeLeak() : false ;
    } 

    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(4, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(this.lynn_id,401);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(4, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(this.lynn_id,403);

        setItemDataStatus(this.tape_droparea_id, 0);
    }

    addFountainLeak () {
        this.taskdata.t1_complete = true;
        
        window.MANAGERS.alertManager.addAlert('taskcomplete', 4);
        window.MANAGERS.dialogueManager.updateDialogueID(this.lynn_id,402);

        setItemDataStatus(this.tape_droparea_id, 0);
        setItemDataStatus(this.leak_id, 0);

        window.GAME.hud_inventory.autoRemoveItemFromInventory(this.wrench_id);
    }

    ductTapeLeak () {
        this.taskdata.t2_complete = true;
        
        window.MANAGERS.alertManager.addAlert('taskcomplete', 4);
        window.MANAGERS.dialogueManager.updateDialogueID(this.lynn_id,404);
        
        setItemDataStatus(this.fountain_id, 0);
        let fountainOn = factoryFindDataByIDProperty(window.CONFIG.items, this.fountain_id)
        window.GAME.addSpriteToScene(fountainOn);

        setItemDataStatus(this.leak_id, -1);
        window.GAME.removeItemFromScene(this.leak_id)

        setItemDataStatus(this.ducttapeon_id, 0);
        setItemDataActive(this.tape_droparea_id, false);

        let tapeon = factoryFindDataByIDProperty(window.CONFIG.items, this.ducttapeon_id)
        window.GAME.addSpriteToScene(tapeon);

        window.GAME.player.changePlayerStance(0);
        window.GAME.hideToolTip();
    }

}

export default TaskLynn;