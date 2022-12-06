
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskLuan {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.luan_id = 500;

        this.creditcard_id = 501;
        this.gift_id = 502;
        this.deliveryvan_id = 503;

    }

    interactWithTask (_item_id, _target_id) {
        let item_id = _item_id, target_id = _target_id;
        // check credit card drop
        let a = (item_id === this.creditcard_id && target_id === this.luan_id) ? this.dropCard() : false ;
        let b = (item_id === this.deliveryvan_id && !this.taskdata.t2_complete) ? this.getGift() : false;
    }  

    // OPEN TASK && SHOW TASK ALERT / ACTIVATE ANY ITEMS OR ADD TO DROP ARRAYS
    setupTaskOne () {
        this.taskdata.t1_open = true;
        window.MANAGERS.taskManager.addTaskAlert(5, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(500,501);

        addDropIDsToCharacter(this.creditcard_id, this.luan_id);
    }
    setupTaskTwo () {
        this.taskdata.t2_open = true;
        window.MANAGERS.taskManager.addTaskAlert(5, 'task', 0);
        window.MANAGERS.dialogueManager.updateDialogueID(500,503);

        this.startGiftTimer();
    }

    startGiftTimer () {
        setItemDataStatus(this.deliveryvan_id, 0);
        this.taskdata.gift_outfordelivery = true;
        window.GAME.createTaskTimer(60, 5);
    }

    getGift () {

        this.taskdata.gift_outfordelivery = false;
        this.taskdata.t2_complete = true;

        window.MANAGERS.itemManager.collectItem(this.gift_id);
        window.MANAGERS.alertManager.addAlert('item', this.gift_id); // show popup


        setItemDataStatus(this.deliveryvan_id, -1);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 5);
        window.MANAGERS.dialogueManager.updateDialogueID(500,504);

        window.GAME.cancelTimer();

        window.GAME.hud_inventory.autoRemoveItemFromInventory(this.gift_id);
    }

    dropCard (_item) {

        this.taskdata.t1_complete = true;
        window.GAME.hideToolTip();
        window.GAME.player.changePlayerStance(0);

        window.MANAGERS.alertManager.addAlert('taskcomplete', 5);
        window.MANAGERS.dialogueManager.updateDialogueID(500,502);
    }

    endTimer () {
        window.MANAGERS.dialogueManager.updateDialogueID(500,502);

        this.taskdata.gift_outfordelivery = false;
        this.taskdata.t2_open = false;

        window.MANAGERS.taskManager.addTaskAlert(5, 'alert', 2);

        setItemDataStatus(this.deliveryvan_id, -1);

        if (window.GAME.currentScene.id === 1) {
            let container = window.GAME.item_group.getChildren().find(item => item.id === this.deliveryvan_id);
            window.GAME.tweens.add({
                targets: container,
                y: 395,
                duration: 40,
                repeat:5,
                yoyo: true,
                ease: 'Quad.easeInOut'
            });

            window.GAME.tweens.add({
                targets: container,
                x: 3200,
                duration: 2000,
                ease: 'Quad.easeIn'
            });
        }
    }
}

export default TaskLuan;