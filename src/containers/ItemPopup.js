
import ItemInfoContainer from "../containers/ItemInfoContainer";
import PhoneBg from "../containers/PhoneBg";

import MyText from "../sprites/MyText";
import BackgroundSprite from "../sprites/BackgroundSprite"
import TextButton from "../sprites/TextButton";

import { factoryFindDataByIDProperty } from '../helpers/DataFactory';
import { STYLE_iteminfotitle, STYLE_iteminfodesc } from "../helpers/MyConstants";

export default class ItemPopup {
    constructor(scene, id, medal = false) {

        this.copy = window.CONFIG.inventorypage;

        this.scene = scene;
        this.id = id
        this.medal = medal;
        
        this.bg = new BackgroundSprite(this.scene, 480, 280, 'bg_standard').setDepth(19);

        this.phonebg = new PhoneBg(this.scene, 480, 280);
        this.item_container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(23);
        let item = this.medal ? factoryFindDataByIDProperty(window.CONFIG.medals, this.id) : factoryFindDataByIDProperty(window.CONFIG.items, this.id);

        this.item = this.scene.add.image(310, 280, item.img_src, item.inv_img).setOrigin(0.5, 0.5)
        this.item.alpha = 0;
        this.scene.tweens.add({
            targets: this.item,
            alpha: 1,
            duration: 50,
            delay:300,
            repeat: 6
        });


        this.info_container = new ItemInfoContainer(this.scene, 460, 140, medal).setDepth(23);
        this.info_container.showInfo(this.id, medal);

        this.closebtn = new TextButton(this.scene, 840, 495, 'gamesprites', 'button_template_medium.png', 0xf38634, 0xeabd37, this.copy.close_button);
        this.closebtn.button.on('pointerdown', () => {
           window.MANAGERS.alertManager.closeAlert();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });

        this.item_container.add([
            this.item,
            this.closebtn
        ])

        window.MANAGERS.audioManager.playAudio("collect_sfx");
    }

    closeItemPopup () {

        this.bg.destroyMe();
        this.phonebg.destroyPhoneBg();

        this.item_container.destroy();
        this.info_container.destroyInfoContiner();     
    }
};