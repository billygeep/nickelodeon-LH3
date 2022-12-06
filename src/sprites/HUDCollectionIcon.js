
export default class HUDCollectionIcon extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], img) {

        super(scene, x, y, []);

        this.scene = scene;
        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.setDepth(22);
        this.x = x;
        this.y = y;

        this.bg = this.scene.add.sprite(0, 0, 'gamesprites', img);
        this.tick = this.scene.add.sprite(0, 0, 'gamesprites', 'task_tick.png');
        this.tick.visible = false;
        this.add([
            this.bg,
            this.tick
        ]);
    }

    showTick () {
        this.tick.visible = true;
    }
}
