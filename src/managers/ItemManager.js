
import { factoryFindDataByIDProperty, setItemDataStatus } from '../helpers/DataFactory';

class ItemManager {
    constructor() {
        
        this.itemlist = window.CONFIG.items;
        this.inventoryscreenitems = this.getInventoryScreenItems();
    
       // this.filterById = FACTORY.getById(id, this.itemlist)

        //  function (id, jsonObject) {

        //     return jsonObject.filter(function(jsonObject) {
        //         return (jsonObject['id'] == id);
        //     })[0];
        // }
    }

    getInventoryScreenItems () {

        let array = [], 
            j = 0;
        
        this.itemlist.map((item) => {
            j++;
            if (item.type === 'item' || item.type === 'groupitem') array.push(item);
            // if (j === this.itemlist.length) return array;
        })

        return array;
    }

    collectItem (_id, _share) {
    
        let id = _id
        let item = factoryFindDataByIDProperty(window.CONFIG.items, id);

        //collect an item, set the item data to collected status of 1
        // add the item to the inventory list, call hud inventory to add the visual item
        if (item.type === 'groupitem') {
            let bool = (!this.checkIfGroupExists(item.groupid)) ? false : true;
            if (bool) {
                window.GAME.hud_inventory.addItemToExistingGroup(item.groupid);
            } else {
                let group = this.itemlist.find((i) => i.id === item.groupid);
                window.CONFIG.data.inventory.push(group);
                window.GAME.hud_inventory.addItemToInventory(group); 
                window.GAME.hud_inventory.scrollToNewlyAddedItem();
                setItemDataStatus(item.groupid, 1); //set the item status to used
            }
            setItemDataStatus(id, 2); //set the item status to group collection
        } else {
            setItemDataStatus(id, 1); //set the item status to collected
            window.CONFIG.data.inventory.push(item);
            window.GAME.hud_inventory.addItemToInventory(item); 
            window.GAME.hud_inventory.scrollToNewlyAddedItem();
        }
    };

    removeItemDataFromInventory (_id) {
        window.CONFIG.data.inventory.forEach((i, index) => {
            if (i.id === _id) window.CONFIG.data.inventory.splice(index, 1);
        })
    }

    checkIfGroupExists (_id) {
        let id = _id;
        let entry = window.CONFIG.data.inventory.find(item => item.id === id)

        return entry;
    }


    // this.itemlist = window.CONFIG.items;
    // //globalvars.gamedata.currentinventory = globalvars.gamedata.currentinventory;
    // this.inventoryscreenitems = this.getInventoryScreenItems();

    // this.filterById = function (id, jsonObject) {

    //     return jsonObject.filter(function(jsonObject) {
    //         return (jsonObject['id'] == id);
    //     })[0];
    // }
}
//get all inventoryscreen items in array
// ItemManager.prototype.getInventoryScreenItems = function () {
    
//     var array = [];
//     var j = 0;
    
//     for (var i = 0; i < this.itemlist.length; i++) {
//         j++;
//         if (this.itemlist[i].type === 'item' || this.itemlist[i].type === 'groupitem') array.push(this.itemlist[i]);
//         if (j === this.itemlist.length) return array;
//     }
// }
//collect an item, set the item data to collected status of 1
// ItemManager.prototype.collectItem = function(_item_id, _share) {
    
//     var item_id = _item_id
//     var item = this.filterById(item_id, this.itemlist);

//     if (item.type === 'groupitem') {
//         if (this.checkIfGroupExists(item.groupid)) {
//             gameview.inventory.addToExistingItem(item.groupid, _share);
//         } else {
//             var group = this.filterById(item.groupid, this.itemlist);
//             globalvars.gamedata.currentinventory.push(group);
//             gameview.inventory.addItemToInventory(group);
//             group.status = 1;
//         }
//         item.status = 2;
//     } else {
//         item.status = 1;
//         globalvars.gamedata.currentinventory.push(item);
//         gameview.inventory.addItemToInventory(item);
//     }
// };
// ItemManager.prototype.checkIfGroupExists = function(_groupitem_id) {

//     for (var i = 0; i < globalvars.gamedata.currentinventory.length; i++) {
//         if (globalvars.gamedata.currentinventory[i].id === _groupitem_id) {
//             return true;
//         }
//         if (i === globalvars.gamedata.currentinventory.length) return false;
//     }
// }


// ItemManager.prototype.useItemSuccessfully = function(_item_id) {
//     //when item is used set its status

//     var item_id = _item_id

//     for (var i = 0; i < globalvars.gamedata.currentinventory.length; i++) {
//         if (globalvars.gamedata.currentinventory[i].id === item_id) {
//             globalvars.gamedata.currentinventory[i].status = 2;
//             globalvars.gamedata.currentinventory.splice(i, 1);
//         }
//     }
// };
// //when item is used set its status back to 1
// ItemManager.prototype.moveItemBackToInventory = function(_item_id) {
//     for (var i = 0; i < globalvars.gamedata.currentinventory.length; i++) {
//         if (globalvars.gamedata.currentinventory[i].id === _item_id) {
//             globalvars.gamedata.currentinventory[i].status = 1;
//             globalvars.gamedata.currentinventory.splice(i, 1);
//             return i;
//         }
//     }
// };
// //check if the player already has the item when the quest is started
// ItemManager.prototype.isItemInInventory = function (_id) {
//     for (var i = 0; i < globalvars.gamedata.currentinventory.length; i++) {
//         if (globalvars.gamedata.currentinventory[i].id === _id) {
//             return true;
//         }
//     }
// };

// //change item status
// ItemManager.prototype.setItemStatus = function(_item_id, _status) {
//     var item = this.filterById(_item_id, this.itemlist);
//     item.status = _status;
// }
// // add item id to item drop array when group collection complete
// ItemManager.prototype.addItemIdToDropArray = function(_item_id, _drop_item) {
//     var item = this.filterById(_item_id, this.itemlist);
//     item.dropid.push(_drop_item);
// }

// //change item active value
// ItemManager.prototype.setActiveValue = function(_item_id, _active) {
//     var item = this.filterById(_item_id, this.itemlist);
//     item.active = _active;
// }

// //if item is removed from inventory or status is changed then up here
// ItemManager.prototype.removeItemFromInventory = function(_item_id, _status) {
    
//     this.setItemStatus(_item_id, _status)

//     for (var i = 0; i < globalvars.gamedata.currentinventory.length; i++) {
//         if (globalvars.gamedata.currentinventory[i].id === _item_id) {
//             globalvars.gamedata.currentinventory.splice(i, 1);
//             return;
//         }
//     }
// };

export default ItemManager;
