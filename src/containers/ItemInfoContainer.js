
import MyText from "../sprites/MyText";
import { STYLE_iteminfotitle, STYLE_iteminfodesc, STYLE_itemcount } from "../helpers/MyConstants";
import { factoryFindDataByIDProperty, factoryGetCollectedTotal, factoryGetCollectedMedals } from '../helpers/DataFactory';

export default class ItemInfoContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, _medal = false) {

        super(scene, x, y, []);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.medal = _medal;
        this.alpha = 0;
        
        let rect = this.scene.add.rectangle(0, 0, 300, 200, 0x829fc9).setOrigin(0, 0);
        rect.setStrokeStyle(4, 0x000000);

        this.add(rect);

        this.collected_text = (!this.medal) ? new MyText(this.scene, 150, 212, window.CONFIG.inventorypage.board_label_item, STYLE_iteminfodesc).setOrigin(0.5, 0) : new MyText(this.scene, 150, 212, window.CONFIG.inventorypage.board_label_medal, STYLE_iteminfodesc).setOrigin(0.5, 0);
        this.total = (!this.medal) ? factoryGetCollectedTotal(window.CONFIG.data.item_data) : factoryGetCollectedMedals(window.CONFIG.data.medal_data.medals)
        this.total_text = this.scene.add.text(150, 235, this.total, STYLE_itemcount).setOrigin(0.5, 0);

        this.add([
            this.collected_text,
            this.total_text
        ]);

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 50,
            delay:300,
            repeat: 6
        });

        this.updateCollectedTotal(_medal);
    }

    showInfo (_id, _medal = false) {

        let info = (_medal) ? factoryFindDataByIDProperty(window.CONFIG.medals, _id) : factoryFindDataByIDProperty(window.CONFIG.items, _id);

        this.titletxt = this.titletxt || new MyText(this.scene, 150, 30, info.title, STYLE_iteminfotitle).setOrigin(0.5, 0);
        this.desctxt = this.desctxt || new MyText(this.scene, 150, 0, info.desc, STYLE_iteminfodesc).setOrigin(0.5, 0);
        
        this.titletxt.changeText(info.title);
        this.desctxt.changeText(info.desc);
        this.desctxt.y = this.titletxt.y + this.titletxt.height + 10;
        this.titletxt.alpha = 0;
        this.desctxt.alpha = 0;

        this.scene.tweens.add({
            targets: this.titletxt,
            alpha: 1,
            duration: 200
        });

        this.scene.tweens.add({
            targets: this.desctxt,
            alpha: 1,
            duration: 200,
            delay: 100
        });

        this.add([
            this.titletxt,
            this.desctxt
        ])
    }

    updateCollectedTotal (_medal) {
        let text = (!_medal) ? window.CONFIG.inventorypage.board_label_item : window.CONFIG.inventorypage.board_label_medal;
        this.collected_text.changeText(text);

        this.total = (!_medal) ? factoryGetCollectedTotal(window.CONFIG.data.item_data) : factoryGetCollectedMedals(window.CONFIG.data.medal_data.medals);
        this.total_text.setText(this.total);
    }

    destroyInfoContiner() {
        this.removeAll(true);
        this.destroy();
    }
}