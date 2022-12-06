
import { factoryFindDataByIDProperty, setItemDataActive, setItemDataStatus, addDropIDsToCharacter } from '../helpers/DataFactory';

class TaskMedals {
    constructor(_i) {
        
        this.taskdata = window.CONFIG.data.task_data[_i];

        this.golfball_id = 801;
        this.golfballhole_id = 800;

        this.hole_id = 14;
        this.schnitzel_id = 13;
        this.milkingit_id = 12;
        this.luanlost_id = 11;
        this.bigsoftie_id = 10; 
        this.herringmedal_id = 16;
        this.flytheflag_id = 17;

        this.beargroup_id = 818;
        this.schnitzelgroup_id = 808;
        this.milkgroup_id = 828;
        this.prankgroup_id = 835;
        this.herring_id = 837;

        this.ingredient_array = [ 802, 803, 804, 805, 806, 807 ];
        this.bear_array = [ 811, 812, 814, 815, 816, 817 ];
        this.prank_array = [ 829, 830, 831, 832, 833, 834 ];
        this.miulk_array = [ 821, 822, 823, 824, 825, 826, 827 ];

        this.flag_id = 838;
        this.flagdrop_id = 839;
        this.flagraised_id = 840;
    }

    interactWithTask (_item_id, _target_id) {

        let item_id = _item_id, target_id = _target_id;
        let golf = (item_id === this.golfball_id && target_id === this.golfballhole_id) ? this.dropBall() : false ;
        
        let schnitzel = (this.ingredient_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpIngredient() : false;
        let bear = (this.bear_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpBear() : false;
        let prank = (this.prank_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpPrank() : false;
        let miulk = (this.miulk_array.find((i) => { return i === item_id }) && target_id === null) ? this.pickUpMilk() : false;

        let flag = (item_id === this.flag_id && target_id === this.flagdrop_id) ? this.raiseFlag() : false ;

        let herring = (item_id === this.herring_id && target_id === null) ? this.pickUpHerring() : false;
    }

    pickUpHerring () {
        window.CONFIG.data.medal_data.medals[this.herringmedal_id].status = 1;

        setTimeout(() => {
            window.MANAGERS.alertManager.addAlert('medal', this.herringmedal_id);
            window.CONFIG.data.medals_collected++;
            window.GAME.hud_inventory.autoRemoveItemFromInventory(this.herring_id);
        }, 50)
    }

    pickUpIngredient () {
        window.CONFIG.data.task_data[8].schnitzel_collected++;

        if (window.CONFIG.data.task_data[8].schnitzel_collected === window.CONFIG.data.task_data[8].schnitzel_total) {
            window.CONFIG.data.medal_data.medals[this.schnitzel_id].status = 1;
            setTimeout(() => {
                window.MANAGERS.alertManager.addAlert('medal', this.schnitzel_id);
                window.CONFIG.data.medals_collected++;
                window.GAME.hud_inventory.autoRemoveItemFromInventory(this.schnitzelgroup_id);
            }, 50)
            
        }
    }

    pickUpBear () {
        window.CONFIG.data.task_data[8].bears_collected++;

        if (window.CONFIG.data.task_data[8].bears_collected === window.CONFIG.data.task_data[8].bears_total) {
            window.CONFIG.data.medal_data.medals[this.bigsoftie_id].status = 1;
            setTimeout(() => {
                window.MANAGERS.alertManager.addAlert('medal', this.bigsoftie_id);
                window.CONFIG.data.medals_collected++;
                window.GAME.hud_inventory.autoRemoveItemFromInventory(this.beargroup_id);
            }, 50)
            
        }
    }

    pickUpMilk () {
        window.CONFIG.data.task_data[8].milk_collected++;

        if (window.CONFIG.data.task_data[8].milk_collected === window.CONFIG.data.task_data[8].milk_total) {
            window.CONFIG.data.medal_data.medals[this.milkingit_id].status = 1;
            setTimeout(() => {
                window.MANAGERS.alertManager.addAlert('medal', this.milkingit_id);
                window.CONFIG.data.medals_collected++;
                window.GAME.hud_inventory.autoRemoveItemFromInventory(this.milkgroup_id);
            }, 50)
            
        }
    }

    pickUpPrank () {
        window.CONFIG.data.task_data[8].pranks_collected++;

        if (window.CONFIG.data.task_data[8].pranks_collected === window.CONFIG.data.task_data[8].pranks_total) {
            window.CONFIG.data.medal_data.medals[this.luanlost_id].status = 1;
            setTimeout(() => {
                window.MANAGERS.alertManager.addAlert('medal', this.luanlost_id);
                window.CONFIG.data.medals_collected++;
                window.GAME.hud_inventory.autoRemoveItemFromInventory(this.prankgroup_id);
            }, 50)
            
        }
    }

    raiseFlag() {
        window.CONFIG.data.medal_data.medals[this.flytheflag_id].status = 1;
        window.MANAGERS.alertManager.addAlert('medal', this.flytheflag_id);
        window.CONFIG.data.medals_collected++;

        window.GAME.hideToolTip();

        setItemDataActive(this.flagdrop_id, false);
        setItemDataStatus(this.flagraised_id, 0);

        let raisedflag = factoryFindDataByIDProperty(window.CONFIG.items, this.flagraised_id)
        window.GAME.addSpriteToScene(raisedflag);
    };
    
    dropBall() {
        window.CONFIG.data.medal_data.medals[this.hole_id].status = 1;
        window.MANAGERS.alertManager.addAlert('medal', this.hole_id);
        window.CONFIG.data.medals_collected++;

        window.GAME.hideToolTip();
        
        setItemDataActive(this.golfballhole_id, false);
    };
}

export default TaskMedals;