
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskLana {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.lana_id = 300;
	    this.nail_array = [ 301, 302, 303, 304, 305, 306 ];

        this.coolant_id = 309;
        this.nailgroup_id = 314;
    }

    interactWithTask (_item_id, _target_id) {

        let item_id = _item_id, target_id = _target_id;
            
        let nails = (this.nail_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpNail() : false;

        let a = (this.nailgroup_id ===  item_id && target_id === this.lana_id) ? this.dropNails(item_id) : false;
        let b = (item_id === this.coolant_id && target_id === this.lana_id) ? this.dropCoolant() : false ;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(3, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(300,301);

        addDropIDsToCharacter(this.coolant_id, 300);
    }

    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(3, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(300,303);

        if (this.taskdata.nails_collected === this.taskdata.nails_total) {
           addDropIDsToCharacter(314, 300); 
        }
    }

    pickUpNail () {
        this.taskdata.nails_collected++;
        if (this.taskdata.nails_collected === this.taskdata.nails_total && this.taskdata.t2_open) {
           addDropIDsToCharacter(314, 300); 
        }
    }

    dropNails (_item) {
        this.taskdata.t2_complete = true;
        window.GAME.hideToolTip();
        window.GAME.player.changePlayerStance(0);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 3);
        window.MANAGERS.dialogueManager.updateDialogueID(300,304);
    }

    dropCoolant () {  
        this.taskdata.t1_complete = true;

        window.MANAGERS.alertManager.addAlert('taskcomplete', 3);
        window.MANAGERS.dialogueManager.updateDialogueID(300,302);
    }

}

export default TaskLana;