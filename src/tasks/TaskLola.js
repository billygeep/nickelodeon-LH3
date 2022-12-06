
import { factoryFindDataByIDProperty, setItemDataActive, addDropIDsToCharacter, setItemDataStatus } from '../helpers/DataFactory';

class TaskLola {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.lola_id = 200;
        this.lavender_id = 201;
        // this.cake_id = 18;

    }

    interactWithTask (_item_id, _target_id) {
        let item_id = _item_id, target_id = _target_id;
        let a = (item_id === this.lavender_id && target_id === this.lola_id && this.taskdata.t1_open) ? this.dropOil() : false ;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(2, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(200,201);

        addDropIDsToCharacter(this.lavender_id, 200);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(2, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(200,203);

        this.startOvenTimer();
    }

    dropOil () {
        this.taskdata.t1_complete = true;

        window.GAME.hideToolTip();
        window.GAME.player.changePlayerStance(0);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 2);
        window.MANAGERS.dialogueManager.updateDialogueID(200,202);
    }

    startOvenTimer () {
        this.taskdata.oven_on = true;
        window.GAME.createTaskTimer(60, 2);
    }

    endTimer () {
        window.MANAGERS.dialogueManager.updateDialogueID(200,204);
        this.taskdata.oven_on = false;
        this.taskdata.t2_open = false;
        window.MANAGERS.taskManager.addTaskAlert(2, 'alert', 1);
    }

    turnOffOven () {
        this.taskdata.t2_complete = true;
        this.taskdata.oven_on = false;

        window.GAME.cancelTimer();
        window.MANAGERS.alertManager.addAlert('taskcomplete', 2);
        window.MANAGERS.dialogueManager.updateDialogueID(200,205);
    }

}

export default TaskLola;