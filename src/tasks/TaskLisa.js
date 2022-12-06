
import { factoryFindDataByIDProperty, setItemDataStatus, setItemDataActive } from '../helpers/DataFactory';

class TaskLisa {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.lisa_id = 0;
	    this.paperweight_id = 1;
	    this.jar_id = 2;
	    this.stone_id = 3;
	    this.log_id = 4;

        // this.blanket_id = 12;
        this.dropped_paperweight_id = 13;
        this.dropped_jar_id = 14;
        this.vstone_id = 15;
        this.dropped_log_id = 16;
        this.printout_id = 17;

	    this.heavy_array = [ 1, 2, 3, 4 ];
        this.dropped_array = [ 13, 14, 15, 16 ]
    }

    interactWithTask (_item_id, _target_id) {
        let item_id = _item_id, target_id = _target_id;

        let outcome = (this.heavy_array.find(i => item_id) && target_id === this.lisa_id) ? this.dropHeavyItem(item_id) : false;
        if (item_id === this.printout_id && target_id === this.lisa_id) this.dropPrintOut();
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(0, 'task', 0);
    }

    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(0, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(0,2);
    }

    dropHeavyItem (_item) {

        this.taskdata.heavyitems_collected++;

        if (this.taskdata.heavyitems_collected === this.taskdata.heavyitems_total) {

            // drop blanket and items            
            this.dropped_array.map((item_id) => {
                let item = factoryFindDataByIDProperty(window.CONFIG.items, item_id)
                setItemDataStatus(item_id, 0);
                window.GAME.addSpriteToScene(item);
            })

        	this.taskdata.t1_complete = true;
    
            window.GAME.hideToolTip();
            window.GAME.player.changePlayerStance(0);

            window.MANAGERS.alertManager.addAlert('taskcomplete', 0);
            window.MANAGERS.dialogueManager.updateDialogueID(0,1);
        }
    }

    collectPrintOut () {
        this.taskdata.printout_collected = true;
        window.MANAGERS.audioManager.playAudio("print_sfx"); 
        window.MANAGERS.itemManager.collectItem(this.printout_id);
        window.MANAGERS.alertManager.addAlert('item', this.printout_id); // show popup
    }

    dropPrintOut () {
        this.taskdata.t2_complete = true;
        window.MANAGERS.alertManager.addAlert('taskcomplete', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(0,3);
    }


}

export default TaskLisa;