/* global Phaser: false */
// import sounds from "../helpers/sounds";

export default class BackgroundSprite extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y, img) {

        super(scene, x, y, img);

        this.scene = scene;

        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.setScrollFactor(0);

        this.alpha = 0;
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.angle = -45;

        this.scene.tweens.add({
            targets: this,
            angle: 0,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }

    destroyMe () {
        this.scene.tweens.add({
            targets: this,
            angle: -45,
            alpha: 0,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 400,
            ease: 'Back.easeIn',
            onComplete: () => {
              this.destroy();
            }
        });
    }
}
