
export default class BossObstacle extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], img, id) {

        super(scene, x, y, []);

        this.scene = scene;
        this.img = img;
        this.scene.add.existing(this);

        this.x = x;
        this.y = y;
        this.id = id;

        this.ring = this.scene.add.sprite(0, 0, 'gamesprites', 'bossicon_ring.png');
        this.sprite = this.scene.add.sprite(0, 0, 'gamesprites', this.img);

        this.ring.tint = 0xea822c;

        this.scene.tweens.add({
            targets: this.ring,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 800,
            repeat: -1,
            yoyo: true,
            ease: 'Quad.easeInOut'
        });
        
        this.sensor = this.scene.matter.add.image(this.x, this.y, "gamesprites", "bossicon_van.png", { isSensor: true });
        this.sensor.visible = false;

        this.scene.matterCollision.addOnCollideStart({
            objectA: [this.sensor],
            callback: this.onSensorStartCollide,
            context: this
        });

        this.add([
            this.ring,
            this.sprite,
            this.sensor
        ]);
    }

    moveEnemy (vx, vy) {
        this.x += vx;
        this.y += vy;

        this.sensor.x = this.x;
        this.sensor.y = this.y;
    }

    onSensorStartCollide({ bodyA, bodyB, pair }) {
        if (bodyB.label == "PLAYER") {
            this.scene.callAlertScene(this.id);
        }
    }

    destroyMe () {
        this.scene.matterCollision.removeOnCollideStart({ objectA: this.sensor });
        this.scene.matterCollision.removeOnCollideEnd({ objectA: this.sensor });

        this.sprite.destroy();
        this.sensor.destroy();

        this.destroy();
    }
}
