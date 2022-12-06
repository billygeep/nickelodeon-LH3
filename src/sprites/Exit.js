
export default class Exit extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], data) {

        super(scene, x, y, []);

        this.scene = scene;
        this.mydata = data;

        this.scene.add.existing(this);

        this.x = this.mydata.x;
        this.y = this.mydata.y;

        this.sprite = this.scene.add.sprite(0, 0, this.mydata.sheet, this.mydata.image).setDepth(11).setInteractive({ useHandCursor: true  });
        this.sprite.displayWidth = 100
        this.sprite.displayHeight = 100;

        this.sensor = this.scene.matter.add.image(this.mydata.x + this.mydata.mx, this.mydata.y + this.mydata.my, "gamesprites", "droparea_active.png", { isSensor: true });
        this.sensor.visible = false;

        this.scene.matterCollision.addOnCollideStart({
            objectA: [this.sensor],
            callback: this.onSensorStartCollide,
            context: this
        });
        this.scene.matterCollision.addOnCollideEnd({
            objectA: [this.sensor],
            callback: this.onSensorEndCollide,
            context: this
        });

        this.add([
            this.sprite,
            this.sensor
        ]);

    }

    onSensorStartCollide({ bodyA, bodyB, pair }) {

        if (!this.mydata.active) return;

        if (bodyB.label == "PLAYER") {
            this.scene.registry.set("current_exit_id", this.mydata.id);
            if (this.mydata.status === 1) {
                this.scene.changeScene()
            } else {
                this.scene.isInteracting = 1;
                this.scene.updateToolTip(this.mydata);
            }
            
        }
    }

    onSensorEndCollide({ bodyA, bodyB, pair }) {

        if (!this.mydata.active) return;

        this.scene.hideToolTip();
        this.scene.isInteracting = false;
        this.scene.registry.set("current_exit_id", -1);
    }

    destroyMe () {
        this.scene.matterCollision.removeOnCollideStart({ objectA: this.sensor });
        this.scene.matterCollision.removeOnCollideEnd({ objectA: this.sensor });

        this.sprite.destroy();
        this.sensor.destroy();

        this.destroy();
    }
}