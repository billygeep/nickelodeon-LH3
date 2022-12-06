
import { factoryFindDataByIDProperty, addDropIDsToCharacter, setItemDataActive, setItemDataStatus } from '../helpers/DataFactory';

class TaskLeni {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.leni_id = 700;
	    this.cash_array = [ ];
        this.ticket_id = 707;

        this.cash_array = [ 701, 702, 703, 704, 705, 706 ];

        this.creditcard_id = 501;
        this.cashgroup_id = 713;
    }

    interactWithTask (_item_id, _target_id) {

        // collect credit card if luan task open
        if (_item_id === undefined && window.CONFIG.data.task_data[5].t1_open && !window.CONFIG.data.task_data[5].creditcard_collected) {
            window.CONFIG.data.task_data[5].creditcard_collected = true;
            window.MANAGERS.itemManager.collectItem(this.creditcard_id);
            window.MANAGERS.alertManager.addAlert('item', this.creditcard_id); // show popup
            return;
        }

        let item_id = _item_id, target_id = _target_id;
     //   let c = (this.cash_array.find(i => item_id) && target_id === null) ? this.pickUpCash() : false;

        let cash = (this.cash_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpCash() : false;

        let a = (this.cashgroup_id ===  item_id && target_id === this.leni_id) ? this.dropCash(item_id) : false;
        let b = (item_id === this.ticket_id && target_id === this.leni_id) ? this.dropTicket() : false ;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(7, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(700,701);

        addDropIDsToCharacter(this.ticket_id, this.leni_id);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(7, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(700,703);

        if (this.taskdata.cash_collected === this.taskdata.cash_total) {
           addDropIDsToCharacter(this.cashgroup_id, this.leni_id); 
        }
    }

    dropTicket () {
        this.taskdata.t1_complete = true;
        
        window.MANAGERS.alertManager.addAlert('taskcomplete', 7);
        window.MANAGERS.dialogueManager.updateDialogueID(700,702);
    }

    pickUpCash () {
        this.taskdata.cash_collected++;
        if (this.taskdata.cash_collected === this.taskdata.cash_total && this.taskdata.t2_open) {
           addDropIDsToCharacter(this.cashgroup_id, this.leni_id); 
        }
    }

    dropCash (_item) {

        this.taskdata.t2_complete = true;
        // setItemDataActive(this.trashcan_id, false);
        window.GAME.hideToolTip();
        window.GAME.player.changePlayerStance(0);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 7);
        window.MANAGERS.dialogueManager.updateDialogueID(700,704);
    }

}

export default TaskLeni;