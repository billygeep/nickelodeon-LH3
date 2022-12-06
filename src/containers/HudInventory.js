
import AlphaButton from "../sprites/AlphaButton"

import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

// hud inventory holds the collected unused items.
// scroll through and drag/drop onto the screen. If user is interacting with an ingame item then there is potential for drop.
// if item is dropped, check if recieving item dropid array contains the dropped item id 
// if successful, remove item in particle flourish and call necessary task function.
// if unsuccessful, animate drop item back to inventory, call onscreen item tool tip to show error icon

export default class HudInventory {
  constructor(scene, x, y, id) {

        this.scene = scene;
    //    this.mydata = data;
        this.scene.add.existing(this);

        this.counter = 0;
        this.scrollposition = window.CONFIG.data.playervars.inventoryPosition;
        this.spritewidth = 80;
        this.rooty = 6;
        this.canclick = true;
        this.oldx = 0;
        this.oldy = 0;
        this.startx = 480;
        this.gap = 7;

        this.bg = this.scene.add.sprite(380, this.rooty, 'gamesprites', 'hud_inventory.png').setOrigin(0).setScrollFactor(0).setDepth(21);
        this.bg.tint = 0x7cc3bd;

        this.spriteinventory_group = this.scene.add.group();

        this.setupInventoryList();
        this.setupInventoryButtons();
        this.setupDraggableSprite();
        this.positionInventoryOnInitiation();
    }

    setupInventoryButtons () {
     
        this.leftbutton = new AlphaButton(this.scene, 30, 48, 'hud_inventory_arrowleft.png').setOrigin(0.5);
        this.leftbutton.on('pointerdown', () => {
            if (this.canclick) this.scrollInventory(1);
            window.MANAGERS.audioManager.playAudio("wind_sfx");
           // window.AUDIO.playAudio('FOLEY MUD DOUBLE SUCTION 01');
        });
        this.leftbutton.tint = 0x00766c;

        this.rightbutton = new AlphaButton(this.scene, 519, 48, 'hud_inventory_arrowright.png').setOrigin(0.5);
        this.rightbutton.on('pointerdown', () => {
           if (this.canclick) this.scrollInventory(-1);
           window.MANAGERS.audioManager.playAudio("wind_sfx");
        });
        this.rightbutton.tint = 0x00766c;
        let expandbutton = this.scene.add.sprite(275, 86, 'gamesprites', 'hud_button_expand.png');
        expandbutton.tint = 0x7cc3bd;
        this.plus = new AlphaButton(this.scene, 275, 86, 'hud_inventory_plus.png').setOrigin(0.5);
        this.plus.on('pointerdown', () => {
            if (window.GAME.alertOpen) return;
            window.MANAGERS.alertManager.addAlert('inventory',0);
            window.MANAGERS.audioManager.playAudio("inventoryexpand_sfx");
            // window.AUDIO.playAudio('FOLEY MUD DOUBLE SUCTION 01');
        })
        this.plus.tint = 0x00766c;

        this.button_container = this.scene.add.container(380, this.rooty).setScrollFactor(0).setDepth(22);

        this.button_container.add([
            this.leftbutton,
            this.rightbutton,
            expandbutton,
            this.plus
        ])
    }

    setupInventoryList () {

        this.sprite_container = this.scene.add.container(this.startx, this.rooty).setScrollFactor(0).setDepth(21);

        let shape = this.scene.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(440, 14, 430, 85);
        shape.setScrollFactor(0);
        let mask = shape.createGeometryMask();
        this.sprite_container.setMask(mask);

        window.CONFIG.data.inventory.forEach((item) => {
            this.addItemToInventory(item);
        });
    }

    positionInventoryOnInitiation () {
        this.scrollposition = window.CONFIG.data.playervars.inventoryPosition;
        this.sprite_container.x =  this.startx + (this.scrollposition * (this.gap + this.spritewidth))
        //this.inventoryshadowgroup.position.x = this.inventorygroup.px;
    }

    setupDraggableSprite () {
        this.draggableSprite = this.scene.add.sprite(100, 100, "item_sprites", "blank.png").setOrigin(0.5).setScrollFactor(0).setDepth(22);
        this.draggableSprite.displayWidth = this.draggableSprite.displayHeight = 80;
        this.draggableSprite.visible = false;
    }

    addItemToInventory (item) {


        let singleContainer = this.scene.add.container(this.counter * (this.spritewidth + this.gap), 0)

        let sprite = this.scene.add.sprite(0, 48, item.img_src, item.inv_img).setOrigin(0.5);
        sprite.displayWidth = sprite.displayHeight = this.spritewidth;
        sprite.id = item.id;
        sprite.task = item.task;
        sprite.setInteractive({ useHandCursor: true  }).setScrollFactor(0);
        singleContainer.add(sprite);

        this.scene.input.setDraggable(sprite);

        if (item.type === 'group') {
            let item_data = factoryFindDataByIDProperty(window.CONFIG.data.task_data, item.task)
            let t = item_data[item.collection_data[0]]+ '/' + item_data[item.collection_data[1]]
            
            sprite.collection_data = item.collection_data;
            sprite.group_id = item.groupid;
            var counter = this.scene.add.sprite(-20, 28, 'gamesprites', 'inventory_item_counter.png').setOrigin(0.5);
            counter.tint = 0xff8f3a
            if (item_data[item.collection_data[0]] === item_data[item.collection_data[1]]) counter.tint = 0xcccd4d
            let text = this.scene.add.text(-20, 28, t, { fontSize: 14, fontFamily: 'Arial', stroke: '#000000', strokeThickness: 4, color: '#FFFFFF' }).setOrigin(0.5);
            // var text = game.add.text(-33, -38, t, style.inventory_counter);
            singleContainer.add(counter)
            singleContainer.add(text)
        }

        let me = this

        sprite.on('dragstart', function (pointer, _gameObject) {

            this.visible = false;
            

            me.draggableSprite.setTexture("item_sprites", this.frame.name)
            me.draggableSprite.x = me.oldx = this.x + this.parentContainer.x + me.sprite_container.x;
            me.draggableSprite.y = me.oldy = this.y + this.parentContainer.y + me.sprite_container.y;
            me.draggableSprite.visible = true;
            me.draggableSprite.displayWidth = me.draggableSprite.displayHeight = 80;
            me.scene.tweens.add({
                targets: me.draggableSprite,
                displayWidth: 100,
                displayHeight: 100,
                duration: 200
            });
        });
        sprite.on('drag', function (pointer, _dragX, _dragY) {
            me.draggableSprite.x = _dragX + this.parentContainer.x + me.sprite_container.x;
            me.draggableSprite.y = _dragY + this.parentContainer.y + me.sprite_container.y;
        });
        sprite.on('dragend', function (pointer, _gameObject) {

            if (me.scene.canDropItem(this.id)) {
                me.removeItemSpriteFromInventory(this);
                window.MANAGERS.itemManager.removeItemDataFromInventory(this.id)
                me.shuffleInventoryAfterRemoving();
                me.scene.toolTip.showDropSuccess();

                window.MANAGERS.taskManager.currenttask.interactWithTask(this.id, me.scene.registry.get("current_item_id"));

                window.MANAGERS.audioManager.playAudio("goodidea_sfx");
            } else {

                me.scene.toolTip.showDropFail();

                window.MANAGERS.audioManager.playAudio("wrongitem_sfx");

                me.scene.tweens.add({
                    targets: me.draggableSprite,
                    x: me.oldx,
                    y: me.oldy,
                    displayWidth: me.spritewidth,
                    displayHeight: me.spritewidth,
                    duration: 400,
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        this.visible = true;
                        me.draggableSprite.visible = false;
                    }
                });
            } 
        });

        this.sprite_container.add(singleContainer);
        this.spriteinventory_group.add(singleContainer);
        this.counter++;
    }

    // if inventory has more than 5 items, scroll to show the new item
    scrollToNewlyAddedItem () {
        if (this.counter > 5) {

            this.scrollposition = 5 - this.counter;

            this.scene.tweens.add({
                targets: this.sprite_container,
                x: this.startx + (this.scrollposition * (this.gap + this.spritewidth)),
                duration: 300,
                ease: 'Back.easeInOut'
            });

            window.CONFIG.data.playervars.inventoryPosition = this.scrollposition;
        }
    }

    // if a group item already exists in inventory then add to it with number counter
    addItemToExistingGroup (_id) {

        var id = _id;
        
        this.spriteinventory_group.getChildren().map(member => {
            if (member.list[0].id === id) {
                let item_data = factoryFindDataByIDProperty(window.CONFIG.data.task_data, member.list[0].task)
                let t = item_data[member.list[0].collection_data[0]]+ '/' + item_data[member.list[0].collection_data[1]]

                member.list[2].setText(t)
                if (item_data[member.list[0].collection_data[0]] === item_data[member.list[0].collection_data[1]]) {
                    member.list[1].tint = 0xcccd4d;
                }
            }     
        });
    }

    // if you need to remove an inventory item without 'using' like ther wrench, call this
    autoRemoveItemFromInventory (_id) {
        let id = _id;
        this.sprite_container.list.map((c) => {
            if (c.list[0].id === id) {
                this.removeItemSpriteFromInventory(c.list[0]);
                window.MANAGERS.itemManager.removeItemDataFromInventory(id)
                this.shuffleInventoryAfterRemoving();
            }
        })
    }

    removeItemSpriteFromInventory (_item) {
        let item = _item;
        // destroy the inventory list sprite
        item.removeInteractive();
        item.parentContainer.destroy();

        // hide the draggable
        this.scene.tweens.add({
            targets: this.draggableSprite,
            displayWidth: 0,
            displayHeight: 0,
            duration: 400,
            ease: 'Back.easeInOut',
            onComplete: () => {
                this.draggableSprite.visible = false;
            }
        });
    }

    // realign all sprites in the item inventory
    shuffleInventoryAfterRemoving () {
        this.counter = 0;
        this.spriteinventory_group.getChildren().map(child => { 
            this.scene.tweens.add({
                targets: child,
                x: this.counter * (this.spritewidth + this.gap),
                duration: 300,
                ease: 'Back.easeInOut'
            });
            this.counter++;
        });

        // reset  inventory position when less than 5 items visible
        if (this.counter + this.scrollposition <= 5) {

            if (this.scrollposition < 0) this.scrollposition++;

            this.scene.tweens.add({
                targets: this.sprite_container,
                x: this.startx + (this.scrollposition * (this.gap + this.spritewidth)),
                duration: 300,
                ease: 'Back.easeInOut'
            });

            window.CONFIG.data.playervars.inventoryPosition = this.scrollposition;
        }
    }

    scrollInventory (_val) {
        // this.canclick = false;
        //gameaudio.playSFX('clickbutton')
        let val = _val;
        if (val === -1) {
            if (this.counter <= 5 || 5 - this.counter == this.scrollposition) return;
        } else {
            if (this.scrollposition == 0) return;
        }
       
        this.scrollposition += val;
        window.CONFIG.data.playervars.inventoryPosition = this.scrollposition;

        this.scene.tweens.add({
            targets: this.sprite_container,
            x: this.startx + (this.scrollposition * (this.gap + this.spritewidth)),
            duration: 300,
            ease: 'Back.easeInOut'
        });
    };

    hideMe () {
        this.scene.tweens.add({
            targets: [this.bg, this.button_container, this.sprite_container],
            y: -250,
            duration: 300,
            ease: 'Back.easeIn'
        });
    }

    showMe () {
        this.scene.tweens.add({
            targets: [this.bg, this.button_container, this.sprite_container],
            y: this.rooty,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }

    destroyMe () {
        this.sprite_container.removeAll(true)
        this.sprite_container.destroy();
        this.button_container.destroy();
        this.draggableSprite.destroy();
        this.bg.destroy();
    }
}
