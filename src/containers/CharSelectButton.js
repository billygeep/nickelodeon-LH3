
import MyText from "../sprites/MyText";
import GrowButton from "../sprites/GrowButton";

export default class CharSelectButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, [], currentchar) {
        
        super(scene, x, y, []);

        this.scene = scene;
        this.scene.add.existing(this);

        this.rooty = 54;
        this.canclick = false;

        this.setScrollFactor(0);
        this.setDepth(21);

        this.lincolnButton = new GrowButton(this.scene, 0, 0, 'gamesprites', 'Select_player_Lincoln.png').setOrigin(0.5);
        this.clydeButton = new GrowButton(this.scene, 0, 0, 'gamesprites', 'Select_player_Clyde.png').setOrigin(0.5);
        this.ronnieButton = new GrowButton(this.scene, 0, 0, 'gamesprites', 'Select_player_Ronnie_Anne.png').setOrigin(0.5);
        this.bobbyButton = new GrowButton(this.scene, 0, 0, 'gamesprites', 'Select_player_Bobby.png').setOrigin(0.5);

        this.lincolnButton.id = 0;
        this.clydeButton.id = 1;
        this.ronnieButton.id = 2;
        this.bobbyButton.id = 3;

        this.buttonArray = [
            this.lincolnButton,
            this.clydeButton,
            this.ronnieButton,
            this.bobbyButton
        ]

        this.sortButtonArray();
        this.charButton = new GrowButton(this.scene, 0, 0, 'gamesprites', this.buttonArray[0].frame.name).setOrigin(0.5);

        this.charButton.on('pointerdown', () => {
            if (this.canclick) return;
            this.expandMenu();
            window.MANAGERS.audioManager.playAudio("airpop_sfx");
        })     

        this.buttonArray.map((btn, index) => {
            btn.on('pointerdown', () => {
                if (this.canclick) {
                    this.charButton.y = btn.y;

                    this.charButton.setTexture('gamesprites', btn.frame.name);

                        this.scene.tweens.add({
                            targets: this.charButton,
                            y: 0,
                            duration: 300,
                            delay: btn.id * 50,
                            ease: 'Back.easeIn'
                        })

                    this.selectCharacter(btn.id) 
                }
            });
            btn.visible = false;
        });

        this.add([
            this.lincolnButton,
            this.clydeButton,
            this.ronnieButton,
            this.bobbyButton,
            this.charButton
        ]);

        //this.setButtonVisibility();
        //this.sortButtonArray();
    }

    setButtonVisibility () {

        this.buttonArray
            .map((btn, i) => {
                btn.visible = false;
            })
    }

    sortButtonArray () {
        this.buttonArray
            .sort(function(x,y){ return x.id == window.CONFIG.data.playervars.currentCharacter ? -1 : y.id == window.CONFIG.data.playervars.currentCharacter ? 1 : 0; });
    }

    expandMenu () {
        this.canclick = true;

        this.buttonArray.map((btn, i) => {
            btn.visible = true;
            this.scene.tweens.add({
                targets: btn,
                alpha: 1,
                y: i * 100,
                duration: 300,
                delay: i * 50,
                ease: 'Back.easeOut'
            });
        })

        this.timer = this.scene.time.delayedCall(4000, () => { this.collapseMenu();  }); 
    }

    collapseMenu () {
        let c = 0;

        this.buttonArray.map((btn, i) => {

            this.scene.tweens.add({
                targets: btn,
                y: 0,
                duration: 300,
                delay: i * 50,
                ease: 'Back.easeIn',
                onComplete: () => {
                    c++;
                    if (c === this.buttonArray.length) {
                        this.setButtonVisibility();
                        this.sortButtonArray();
                        this.canclick = false;
                    }
                }
            });
        });
    }

    selectCharacter (_val) {
        window.CONFIG.data.playervars.currentCharacter = _val;
        let c = 0;
        window.GAME.player.changePlayerStance(0);
        clearTimeout(this.timer);
        
        this.buttonArray.map((btn, i) => {

            this.scene.tweens.add({
                targets: btn,
                y: 0,
                duration: 300,
                delay: i * 50,
                ease: 'Back.easeIn',
                onComplete: () => {
                    c++;
                    if (c === this.buttonArray.length) {
                        this.canclick = false;
                        this.setButtonVisibility();
                        this.sortButtonArray();
                        // this.sortButtonArray();
                    }
                }
            });
        });

        window.MANAGERS.alertManager.addAlert('characterswap');
        window.MANAGERS.medalManager.checkCharacterUsage(_val);
    }

    hideMe () {
        this.scene.tweens.add({
            targets: this,
            y: -250,
            duration: 300,
            ease: 'Back.easeIn'
        });
    }
    showMe () {
        this.scene.tweens.add({
            targets: this,
            y: this.rooty,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }
    destroyMe () {
        this.removeAll(true)
        this.destroy();
    }
}
