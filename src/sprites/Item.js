
// import ToolTip from "../containers/ToolTip";

export default class Item extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], data) {

        super(scene, x, y, []);

        this.scene = scene;
        this.mydata = data;

        this.scene.add.existing(this);

        this.x = this.mydata.x;
        this.y = this.mydata.y;

        this.sprite = this.scene.add.sprite(0, 0, this.mydata.img_src, this.mydata.img).setDepth(11);

        this.z = this.mydata.z;

        this.add( this.sprite );

        if (this.mydata.animation) this.sprite.play(this.mydata.animation);

        this.item_data = window.CONFIG.data.item_data.find((i) => i.id === this.mydata.id)

        if (this.item_data.active) {

            this.sensor = this.scene.matter.add.image(this.mydata.x + this.mydata.mx, this.mydata.y + this.mydata.my, "gamesprites", "droparea_active.png", { isSensor: true });

            this.scene.matterCollision.addOnCollideStart({
                objectA: [this.sensor],
                callback: this.onSensorStartCollide,
                context: this
            });
            this.scene.matterCollision.addOnCollideActive({
                objectA: [this.sensor],
                callback: this.onSensorActiveCollide,
                context: this
            });
            this.scene.matterCollision.addOnCollideEnd({
                objectA: [this.sensor],
                callback: this.onSensorEndCollide,
                context: this
            });

            this.add( this.sensor );

            let movement = (this.mydata.movement !== undefined) ? this.startMovement() : false;
        }
    }

    startMovement () {

        this.sprite.scaleX = 1;

        this.tween1 = this.scene.tweens.add({
            targets: [ this, this.sensor ],
            x: this.mydata.movement.ex,
            y: this.mydata.movement.ey,
            duration: this.mydata.movement.t,
            onComplete: () => {

                this.sprite.scaleX = -1;

                this.tween2 = this.scene.tweens.add({
                    targets: [ this, this.sensor ],
                    x: this.mydata.x,
                    y: this.mydata.y,
                    duration: this.mydata.movement.t,
                    onComplete: () => {
                        this.startMovement();
                    }
                });
            }
        });
    }

    onSensorStartCollide({ bodyA, bodyB, pair }) {

        if (!this.item_data.active) return;

        if (bodyB.label == "PLAYER") {
            this.scene.isInteracting = 2;
            this.scene.registry.set("current_item_id", this.mydata.id);
            this.scene.updateToolTip(this.mydata);
        }
    }

    onSensorActiveCollide({ bodyA, bodyB, pair }) {

        if (!this.item_data.active) return;
        if (bodyB.label == "PLAYER" && this.mydata.movement !== undefined) {
            this.scene.toolTip.x = bodyA.position.x;
            this.scene.toolTip.y = bodyA.position.y;
        }
    }

    onSensorEndCollide({ bodyA, bodyB, pair }) {

        if (!this.item_data.active) return;
        
        this.scene.hideToolTip();
        this.scene.isInteracting = 0;
        this.scene.registry.set("current_item_id", -1);
    }

    destroyMe () {

        if (this.tween1) this.tween1.stop();
        if (this.tween2) this.tween2.stop();

        if (this.sensor) {
            this.scene.matterCollision.removeOnCollideStart({ objectA: this.sensor });
            this.scene.matterCollision.removeOnCollideActive({ objectA: this.sensor });
            this.scene.matterCollision.removeOnCollideEnd({ objectA: this.sensor });
            this.sensor.destroy();
        }

        this.sprite.destroy();
        this.destroy();
    }
}