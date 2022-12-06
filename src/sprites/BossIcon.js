
export default class BossIcon extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], img, id) {

        super(scene, x, y, []);

        this.scene = scene;
        this.img = img;

        this.scene.add.existing(this);

        this.x = x;
        this.y = y;

        this.id = id;

       // this.ring = this.scene.add.sprite(0, 0, 'gamesprites', 'bossicon_ring.png');
        this.sprite = this.scene.add.sprite(0, 0, 'gamesprites', this.img);
        
        this.scene.tweens.add({
            targets: this,
            y: y - 20,
            duration: 350,
            repeat: -1,
            yoyo: true,
            ease: 'Quad.easeOut'
        });
        

        let mylabel = (id < 5) ? "icon" : "gate";
        this.gateOpen = false;

        this.sensor = this.scene.matter.add.image(this.x, this.y, "gamesprites", "bossicon_van.png", { isSensor: true, label: mylabel });
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
            // this.ring,
            this.sprite,
            this.sensor
        ]);
    }

    openGate () {
        this.gateOpen = true;
        this.sprite.setTexture("gamesprites", "bossicon_park_open.png")
    }

    onSensorStartCollide({ bodyA, bodyB, pair }) {

        if (bodyA.label == "icon" && bodyB.label == "PLAYER") {
            this.scene.collectItem(this.id);
            this.destroyMe();
        }

        if (bodyA.label == "gate" && bodyB.label == "PLAYER" && this.gateOpen) {
            this.scene.callCompleteScene();
            this.destroyMe();
        }
    }

    onSensorEndCollide({ bodyA, bodyB, pair }) {

    }

    destroyMe () {
        this.scene.matterCollision.removeOnCollideStart({ objectA: this.sensor });
        this.scene.matterCollision.removeOnCollideEnd({ objectA: this.sensor });

        this.sprite.destroy();
        this.sensor.destroy();

        this.destroy();
    }
}
