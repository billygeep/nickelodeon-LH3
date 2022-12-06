
import MyText from "../sprites/MyText";
import ClickButton from "../sprites/ClickButton";

export default class TouchPad extends Phaser.GameObjects.Container {
    constructor(scene, x, y, []) {
        
        super(scene, x, y, []);

        this.scene = scene;
        this.scene.add.existing(this);

        this.posx = 100;
        this.posy = 460;

        this.setScrollFactor(0);
        this.setDepth(25);
        
        this.touchpadgraphic = this.scene.add.sprite(0, 0, 'gamesprites', 'touchpad.png');

        this.add([
            this.touchpadgraphic
        ]);

        let coords = [
            { x: 0, y: -48, r: 45 },
            { x: -42, y: -5, r: -45 },
            { x: 41, y: -5, r: 135 },
            { x: 0, y: 38, r: 225 }
        ];
        
        coords.map((coord, i) => {
            let button = new ClickButton(this.scene, coord.x, coord.y, 'touchpad_down.png').setOrigin(0.5);
            button.width = button.height = 60;
            button.angle = coord.r;
            button.id = i;
   
            button.on('pointerdown', () => {
                this.scene.touchPadDown[i] = true;
            });

            button.on('pointerup', () => {
                this.scene.touchPadDown[i] = false;
            });
            button.on('pointerout', () => {
                this.scene.touchPadDown[i] = false;
                button.alpha = 0.1;
            });

            this.add(button);
        });

        this.y = this.posy;
    }

    hideMe () {
        this.scene.tweens.add({
            targets: this,
            y: 660,
            duration: 300,
            ease: 'Back.easeIn'
        });
    }
    showMe () {
        this.scene.tweens.add({
            targets: this,
            y: this.posy,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }
    destroyMe () {
        this.removeAll(true)
        this.destroy();
    }
}
