
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskLuna {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.luna_id = 600;

        this.cassette_id = 601;
    }

    interactWithTask (_item_id, _target_id) {

        let item_id = _item_id, target_id = _target_id;
        let a = (item_id === this.cassette_id && target_id === this.luna_id && this.taskdata.t2_open) ? this.dropCassette() : false ;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(6, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(600,601);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.dialogueManager.updateDialogueID(600,603);
        window.MANAGERS.taskManager.addTaskAlert(6, 'task', 0);

        addDropIDsToCharacter(this.cassette_id, this.luna_id);
    }

    turnUpToEleven () {
        this.taskdata.dials_turned = true;
        this.taskdata.t1_complete = true;
        window.MANAGERS.alertManager.addAlert('taskcomplete', 6);
        window.MANAGERS.dialogueManager.updateDialogueID(600,602);

    }

    dropCassette (_item) {
        this.taskdata.t2_complete = true;
        window.GAME.hideToolTip();
        window.GAME.player.changePlayerStance(0);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 6);
        window.MANAGERS.dialogueManager.updateDialogueID(600,604);
    }

}

export default TaskLuna;