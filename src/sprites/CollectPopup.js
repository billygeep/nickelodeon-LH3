
export default class CollectPopup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, 'track', key);

        this.scene = scene;    
        this.scene.add.existing(this);
        this.setScrollFactor(0);
        this.setOrigin(0.5, 0.5);
        // let bg = this.scene.add.sprite(0, 0, 'furniture', popup.image).setOrigin(0.5, 0.5)
        // // let popuptext = new MyText(this.scene, 0, 0, this.popup.text, this.popup).setOrigin(0.5, 0.5);
        // // popuptext.setStroke('#2b2b2a', 8);

        // let me = this

        // this.add([ bg ])

        // this.alpha = 0;

        this.scene.tweens.add({
            targets: this,
            y: 280,
            duration: 500,
            ease: 'Back.easeOut',
            yoyo: true,
            repeat: 0,
            onComplete: () => { this.destroy(); }
        });
    }
}
