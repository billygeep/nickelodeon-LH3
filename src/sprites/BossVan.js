
export default class BossVan {
    constructor(scene, x, y) {

        this.scene = scene;
        this.x = x;
        this.y = y;
  
        this.ring = this.scene.add.sprite(0, 0, 'gamesprites', 'bossicon_ring.png');
        this.scene.tweens.add({
            targets: this.ring,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 800,
            repeat: -1,
            yoyo: true,
            ease: 'Quad.easeInOut'
        });

        this.sprite = this.scene.matter.add.sprite(x, y, 'gamesprites', 'bub_c.png');
        this.character = this.scene.add.sprite(x, y, 'gamesprites', 'bossicon_van.png').setOrigin(0.5);
        this.sprite.visible = false;
        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
        const { width: w, height: h } = this.sprite;
        const bodyFront = Bodies.circle(x, y, 20);

        this.oldPhase = -1;
        this.newPhase = 0;

        this.oldx = this.sprite.x;
        this.oldy = this.sprite.y;
        
        this.sensors = {
          main: Bodies.circle(x, y , 40, { isSensor: true, label: "PLAYER" })
        };

        this.compoundBody = Body.create({
          parts: [bodyFront, this.sensors.main],
          frictionStatic: 1,
          frictionAir: 0.7,
          friction: 0.7,
          density: 1
        });

        this.sprite
          .setScale(1)
          .setOrigin(0.5, 1)
          .setPosition(x, y)
          .setExistingBody(this.compoundBody)
          .setBounce(0)
          .setFriction(0)
          .setFixedRotation(0);
    }

    movePlayer (vx, vy) {
        this.sprite.x += vx;
        this.sprite.y += vy;

        this.character.x = this.ring.x = this.sprite.x;
        this.character.y = this.ring.y = this.sprite.y;
    }

    moveSprite (vx, vy) {
        this.sprite.x += vx;
        this.sprite.y += vy;

        this.ring.x = this.sprite.x;
        this.ring.y = this.sprite.y;
    } 

    destroyMe () {
        this.scene.matterCollision.removeOnCollideStart({ objectA: this.sensor });
        this.scene.matterCollision.removeOnCollideEnd({ objectA: this.sensor });

        this.sprite.destroy();
        this.sensor.destroy();

        this.destroy();
    }
}
