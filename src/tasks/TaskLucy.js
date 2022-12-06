
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskLucy {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.lucy_id = 100;
	    this.pet_array = [ 101, 102, 103, 104, 105 ];

        this.izzy_id = 110;
        this.lure_id = 107;
        this.lure_dropped_id = 108;
        this.lure_droparea_id = 109;
    }

    interactWithTask (_item_id, _target_id) {

        let item_id = _item_id, target_id = _target_id;

        let a = (this.pet_array.find(i => _item_id) && target_id === this.lucy_id) ? this.dropPet(item_id) : false;
        let b = (item_id === this.lure_id && target_id === this.lure_droparea_id) ? this.dropLure() : false ;
        let c = (item_id === this.izzy_id && target_id === this.lucy_id) ? this.dropIzzy() : false ;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(1, 'task', 0);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(1, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(100,102);
        
        //make the drop area active
        setItemDataStatus(this.lure_droparea_id, 0);
        addDropIDsToCharacter(this.lure_id, this.lure_droparea_id)
    }

    dropPet (_item) {

        this.taskdata.pets_collected++;

        if (this.taskdata.pets_collected === this.taskdata.pets_total) {
        	this.taskdata.t1_complete = true;

            window.GAME.hideToolTip();
            window.GAME.player.changePlayerStance(0);

            window.MANAGERS.alertManager.addAlert('taskcomplete', 1);
            window.MANAGERS.dialogueManager.updateDialogueID(100,101);
        }
    }

    // TASK 2
    dropLure () {
        // make lure area inactive
        setItemDataActive(this.lure_droparea_id, false);
        window.GAME.hideToolTip();

        this.taskdata.lure_placed = true;

        setItemDataStatus(this.lure_dropped_id, 0);
        let droppedlure = factoryFindDataByIDProperty(window.CONFIG.items, this.lure_dropped_id)
        window.GAME.addSpriteToScene(droppedlure);
    }
    addIzzy () {
        let izzy = factoryFindDataByIDProperty(window.CONFIG.data.item_data, this.izzy_id)
        if (!this.taskdata.lure_placed || !this.taskdata.t2_open || izzy.status !== -1) return;
        setItemDataStatus(this.izzy_id, 0);
    }
    dropIzzy () {  
        this.taskdata.t2_complete = true;
        window.MANAGERS.alertManager.addAlert('taskcomplete', 1);
        window.MANAGERS.dialogueManager.updateDialogueID(100,103);
    }


}

export default TaskLucy;