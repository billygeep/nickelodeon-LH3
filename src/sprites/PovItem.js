
import AlphaButton from "../sprites/AlphaButton"

export default class PovItem extends Phaser.GameObjects.Container  {

    constructor(scene, x, y, [], data) {

        super(scene, x, y, []);

        this.scene = scene;
        this.mydata = data;

        this.scene.add.existing(this);

        this.x = this.mydata.x;
        this.y = this.mydata.y;

        this.sprite = this.scene.add.sprite(0, 0, this.mydata.img_src, this.mydata.img).setOrigin(0.5);
        this.sprite.w = this.mydata.w;
        this.sprite.h = this.mydata.h;

        this.add(this.sprite);

        if (this.mydata.animation) this.sprite.play(this.mydata.animation);

        if (this.mydata.type !== "static") {
            this.clickarea = new AlphaButton(this.scene, 0, 0, 'droparea_active.png').setOrigin(0.5);
            this.clickarea.on('pointerdown', () => {
                window.GAME.collectPovItem(this.mydata);
            });

            this.scene.tweens.add({
                targets: this.clickarea,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 600,
                repeat: -1,
                yoyo: true
            });

            this.add(this.clickarea);
        }


        this.setDepth(11);
    }

    destroyMe () {

        this.destroy();
    }
}