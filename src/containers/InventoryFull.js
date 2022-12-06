
import BackgroundSprite from "../sprites/BackgroundSprite"
import AlphaButton from "../sprites/AlphaButton"
import GrowButton from "../sprites/GrowButton"
import TextButton from "../sprites/TextButton"
import MyText from "../sprites/MyText";

import { factoryFindDataByIDProperty, factoryGetAllInventoryItems } from '../helpers/DataFactory';
import { STYLE_h1text } from "../helpers/MyConstants";

import PhoneBg from "../containers/PhoneBg";
import ItemInfoContainer from "../containers/ItemInfoContainer";

export default class InventoryFull {
    constructor(scene, x, y, id) {

        this.scene = scene;

        this.copy = window.CONFIG.inventorypage;

        this.screen = 0;
        this.counter = 0;
        this.itemStartX = 60;
        this.itemStartY = 150;
        this.containerWidth = 0;

        this.bg = new BackgroundSprite(this.scene, 480, 280, 'bg_standard').setDepth(19);
        this.title = new MyText(this.scene, 480, 100, this.copy.title_items, STYLE_h1text).setOrigin(0.5, 0.5);
        // this.phonebg = new PhoneBg(this.scene, 480, 280);
        this.item_container = this.scene.add.container(this.itemStartX, this.itemStartY).setScrollFactor(0).setDepth(23);

        let shape = this.scene.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(this.itemStartX, this.itemStartY, 499, 300);
        shape.setScrollFactor(0);
        let mask = shape.createGeometryMask();
        this.item_container.setMask(mask);

        this.furniture_container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(23);
        this.info_container = new ItemInfoContainer(this.scene, 600, this.itemStartY).setDepth(23);

        this.furniture_container.add(this.title);

        this.setupInventory();
        this.addItems();

    }

    setupInventory () {

        let scrolly = 498
        let scrollx = 170

         //set up slider
        this.sliderbg =  this.scene.add.sprite(scrollx, scrolly - 3, 'gamesprites', 'slider.png').setOrigin(0, 0.5);

        this.sliderhub = new AlphaButton(this.scene, scrollx, scrolly, 'slider_hub.png').setOrigin(0.5).setDepth(23);
        // this.sliderhub.input.enableDrag(true);
        // this.sliderhub.input.allowVerticalDrag = false;
        this.scene.input.setDraggable(this.sliderhub);
        let children = this.item_container.getAll();

        this.sliderhub.on('drag', (evt, _x, _y) => {
        
            this.sliderhub.x = _x;
            this.sliderhub.y = scrolly;

            if (this.sliderhub.x < scrollx) {
                this.sliderhub.x = scrollx;
            } else if (this.sliderhub.x > scrollx + this.sliderbg.width) {
                this.sliderhub.x = scrollx + this.sliderbg.width;
            }

            let percent = (this.sliderhub.x - scrollx) / this.sliderbg.width;
            let children = this.item_container.getAll();

            this.item_container.x = this.itemStartX - ((100 * (Math.ceil(children.length/3)) - 500) * percent);
        });
        this.sliderhub.on('dragend', () => {
            this.sliderhub.y = scrolly;

            if (this.sliderhub.x < scrollx) {
                this.sliderhub.x = scrollx;
            } else if (this.sliderhub.x > scrollx + this.sliderbg.width) {
                this.sliderhub.x = scrollx + this.sliderbg.width;
            }
        });

        this.timertext = this.scene.add.text(100, 50, "0", { fontFamily: "Arial", fontSize: 20, color: '#000000' }).setOrigin(0);

        this.furniture_container.add([
            this.sliderbg,
            this.sliderhub,
            this.timertext
        ]);

        this.item_button = new AlphaButton(this.scene, 575, 495, 'button_template_items.png', true);
        this.item_button.on('pointerdown', () => {
           this.clickItems();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });

        this.medal_button = new AlphaButton(this.scene, 690, 495, 'button_template_medals.png', true);
        this.medal_button.on('pointerdown', () => {
           this.clickMedals();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });
        this.medal_button.tint = 0x333333;

        this.close_button = new TextButton(this.scene, 840, 495, 'gamesprites', 'button_template_medium.png', 0xf38634, 0xeabd37, this.copy.close_button);
        this.close_button.button.on('pointerdown', () => {
           window.MANAGERS.alertManager.closeAlert();
        });

        this.furniture_container.add([ this.item_button, this.medal_button, this.close_button ])
    }

    clickItems () {

        if (this.screen === 0) return; 

        this.title.changeText(this.copy.title_items);

        this.medal_button.tint = 0x333333; 
        this.item_button.clearTint(); 

        this.info_container.updateCollectedTotal(false);
        // gameaudio.playSFX('stackpaper');
        this.screen = 0;
        this.clearItems(true);
    }

    clickMedals () {
        if (this.screen === 1) return; 

        this.title.changeText(this.copy.title_medals);

        this.item_button.tint = 0x333333; 
        this.medal_button.clearTint(); 

        this.info_container.updateCollectedTotal(true);
        // gameaudio.playSFX('stackpaper');
        this.screen = 1;
        this.clearItems(true);
    }

    clearItems (_thenAddItems) {
        let children = this.item_container.getAll();
        let c = 0;

        children.map((child, index) => {

            child.off('pointerdown');

            this.scene.tweens.add({
                targets: child,
                angle: -45,
                scaleX: 0,
                scaleY: 0,
                duration: 200,
                delay: 5 * index,
                ease: 'Back.easeIn',
                onComplete: () => {
                    child.destroy();
                    c++;
                    if (c === children.length) {
                        let outcome = (_thenAddItems) ? this.addItems() : this.item_container.destroy();
                    }
                }
            });
        })
    }

    addItems () {

        this.counter = 0;
        this.sliderhub.x = this.sliderbg.x;
        this.item_container.x = this.itemStartX;

        let data = (this.screen === 0) ? factoryGetAllInventoryItems(window.CONFIG.items) : window.CONFIG.medals;

        let xpos = 0, ypos = 0;

        data.map((i, index) => {
            let item = this.addItemToInventory(i);
            
            item.x = 50 + (xpos * 100);
            item.y = 50 + (ypos * 100);

            ypos++;

            if (ypos >= 3) {
                ypos = 0;
                xpos++;
            }

            item.scaleX = item.scaleY = 0;
            item.angle = -45;
            item.displayWidth = item.displayHeight = 0;

            this.scene.tweens.add({
                targets: item,
                angle: 0,
                displayWidth: 100,
                displayHeight: 100,
                duration: 200,
                delay: 5 * index,
                ease: 'Back.easeOut'
            });

            this.item_container.add(item);

        });
        // get the width of the container so we can scroll effectively
        this.containerWidth = (xpos + 1) * 100;
        this.timertext.setText(this.counter + '/' + data.length);
    }

    addItemToInventory (_item) {
        
        let item = _item, sprite;

        let item_data = (this.screen === 0) ? factoryFindDataByIDProperty(window.CONFIG.data.item_data, item.id) : factoryFindDataByIDProperty(window.CONFIG.data.medal_data.medals, item.id);
        let medal = (this.screen === 0) ? false : true;

        if (item_data.status >= 1) {
            sprite = new GrowButton(this.scene, 0, 0, item.img_src, item.inv_img).setOrigin(0.5);
            sprite.dw = 100;
            sprite.dh = 100;

            sprite.on('pointerdown', () => {
               this.info_container.showInfo(item.id, medal);
               window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            });

            this.counter++;
        } else {
            sprite = this.scene.add.sprite(0, 0, item.img_src, item.inv_img).setOrigin(0.5); 
            sprite.tint = 0x333333;
        }
        return sprite;
    }

    destroyInventoryFull () {

        this.clearItems(false);

        this.bg.destroyMe();

        this.scene.tweens.add({
            targets: [ this.furniture_container, this.info_container ],
            alpha: 0,
            duration: 200,
            onComplete: () => {
                this.info_container.destroy();
            }
        });
    }
};