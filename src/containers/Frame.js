

export default class Frame extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {

        super(scene, x, y, []);

        this.setScrollFactor(0);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.scene.add.existing(this);

        let graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0x000000, 1);
        graphics.strokeRect(17, 38, 926, 503)

        let leftside = this.scene.add.graphics(0, 0);
        leftside.fillStyle(0xf0e2d0, 1);
        leftside.fillRect(0, 0, 17, 560);

        let rightside = this.scene.add.graphics(0, 0);
        rightside.fillStyle(0xf0e2d0, 1);
        rightside.fillRect(943, 0, 17, 560);

        let topside = this.scene.add.graphics(0, 0);
        topside.fillStyle(0xf0e2d0, 1);
        topside.fillRect(0, 0, 960, 38);

        let bottomside = this.scene.add.graphics(0, 0);
        bottomside.fillStyle(0xf0e2d0, 1);
        bottomside.fillRect(0, 541, 960, 19);

        this.add([
            leftside, 
            rightside,
            topside,
            bottomside,
            graphics
        ])
    }
}
