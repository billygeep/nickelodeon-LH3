

import Frame from "../containers/Frame";
import BossTouchPad from "../containers/BossTouchPad";

import BossVan from "../sprites/BossVan";
import BossIcon from "../sprites/BossIcon";
import HUDCollectionIcon from "../sprites/HUDCollectionIcon";
import BossObstacle from "../sprites/BossObstacle";
import GrowButton from "../sprites/GrowButton"; 

// import trackEvent from "../helpers/trackEvent";
import { STYLE_bosscounter } from "../helpers/MyConstants";
import { saveGameData, factoryFindDataByIDProperty } from '../helpers/DataFactory';

class BossScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BossScene'
        });

        this.scene = this;
    }

    // MRK
    create() {
    
        this.currentPathId = 0;
        this.currentPath = 0;
        this.keyPress = null;
        this.endZone = false;
        this.nextId = 0

        this.endIndicator = 0;

        // 0 U 1 L 2 R 3 D
        //k: [ [ 0, 4 ], [ 1, 2 ], [ 2, 4 ], [ 3, 4 ] ],
        this.paths = [
            { 
                id: 0, x: [ 1775, 1248 ], y: [ 1069, 1069 ],
                auto: 2,
                keys: [ 12, 2, 1, -1 ],
                flip: [ 2, 1 ]
            },
            { 
                id: 1, x: [ 1248, 1775 ], y: [ 1069, 1069 ],
                auto: 0,
                keys: [ 22, 0, -1, -1 ],
                flip: [ 1, 0 ]
            },
            { 
                id: 2, x: [ 1248, 895 ], y: [ 1069, 1069],
                auto: 4,
                keys: [ 8, 4, 3, -1 ],
                flip: [ 2, 3 ]
            },
            { 
                id: 3, x: [ 895, 1248] , y: [ 1069, 1069],
                auto: 1,
                keys: [ 12, 2, 1, -1 ],
                flip: [ 1, 2 ]
            },
            { 
                id: 4, x: [ 895, 385 ], y: [ 1069, 1069],
                auto: 5,
                keys: [ 6, -1, 5, -1 ],
                flip: [ 2, 5 ]
            },
            { 
                id: 5, x: [ 385, 895], y: [ 1069, 1069],
                auto: 3,
                keys: [ 8, 4, 3, -1 ],
                flip: [ 1, 4 ]
            },
            { 
                id: 6, x: [ 385, 383 ], y: [ 1069, 720 ],
                auto: 30,
                keys: [ 30, -1, 21, 7 ],
                flip: [ 3, 7 ]
            },
            { 
                id: 7, x: [ 383, 385 ], y: [ 720, 1069 ],
                auto: 6,
                keys: [ -1, 6, 5, -1 ],
                flip: [ 0, 6 ]
            },
            { 
                id: 8, x: [ 895, 839 ], y: [ 1069, 792 ],
                auto: 10,
                keys: [ 10, -1, 15, 9 ],
                flip: [ 3, 9 ]
            },
            { 
                id: 9, x: [ 839, 895 ], y: [ 792, 1069 ],
                auto: 8,
                keys: [ 8, 4, 3, -1 ],
                flip: [ 0, 8 ]
            },
            { 
                id: 10, x: [ 839, 808 ], y: [ 792, 608 ],
                auto: 28,
                keys: [ 28, 20, 19, 11 ],
                flip: [ 3, 11 ]
            },
            { 
                id: 11, x: [ 808, 839 ], y: [ 608, 792 ],
                auto: 9,
                keys: [ 10, -1, 15, 9 ],
                flip: [ 0, 10 ]
            },
            { 
                id: 12, x: [ 1248, 1200 ], y: [ 1069, 770 ],
                auto: 48,
                keys: [ 48, 14, -1, 13 ],
                flip: [ 3, 13 ]
            },
            { 
                id: 13, x: [ 1200, 1248 ], y: [ 770, 1069 ],
                auto: 12,
                keys: [ 12, 2, 1, -1 ],
                flip: [ 0, 12 ]
            },
            { 
                id: 14, x: [ 1200, 839 ], y: [ 770, 792 ],
                auto: 15,
                keys: [ 10, -1, 15, 9 ],
                flip: [ 2, 15 ]
            },
            { 
                id: 15, x: [ 839, 1200 ], y: [ 792, 770 ],
                auto: 14,
                keys: [ 48, 14, -1, 13 ],
                flip: [ 1, 14 ]
            },
            {
                id: 16, x: [ 1629, 1115 ], y: [ 595, 586 ],
                auto: 18,
                keys: [ 26, 18, 17, 49 ],
                flip: [ 2, 17 ]
            },
            { 
                id: 17, x: [ 1115, 1629 ], y: [ 586, 595 ],
                auto: 45,
                keys: [ 24, 16, 45, -1 ],
                flip: [ 1, 16 ]
            },
            { 
                id: 18, x: [ 1115, 808 ], y: [ 586, 608 ],
                auto: 20,
                keys: [ 28, 20, 19, 11 ],
                flip: [ 2, 19 ]
            },
            { 
                id: 19, x: [ 808, 1115 ], y: [ 608, 586 ],
                auto: 17,
                keys: [ 26, 18, 17, 49 ],
                flip: [ 1, 18 ]
            },
            { 
                id: 20, x: [ 808, 383 ], y: [ 608, 720 ],
                auto: 21,
                keys: [ 30, -1, 21, 7 ],
                flip: [ 2, 21 ]
            },
            { 
                id: 21, x: [ 383, 808 ], y: [ 720, 608 ],
                auto: 19,
                keys: [ 28, 20, 19, 11 ],
                flip: [ 1, 20 ]
            },
            { 
                id: 22, x: [ 1775, 1752 ], y: [ 1069, 616 ],
                auto: 23,
                keys: [ -1, 44, -1, 23 ],
                flip: [ 3, 23 ]
            },
            { 
                id: 23, x: [ 1752, 1775 ], y: [ 616, 1069 ],
                auto: 22,
                keys: [ 22, 0, -1, -1 ],
                flip: [ 0, 22 ]
            },
            { 
                id: 24, x: [ 1630, 1650 ], y: [ 595, 252 ],
                auto: 46,
                keys: [ -1, -1, -1, -1 ],
                flip: [ 3, 25 ]
            },
            { 
                id: 25, x: [ 1650, 1630 ], y: [ 252, 595 ],
                auto: 24,
                keys: [ 24, 16, 45, -1 ],
                flip: [ 0, 24 ]
            },
            { 
                id: 26, x: [ 1115, 1120 ], y: [ 586, 407 ],
                auto: 27,
                keys: [ -1, 38, 36, 27 ],
                flip: [ 3, 27 ]
            },
            { 
                id: 27, x: [ 1120, 1115 ], y: [ 407, 586 ],
                auto: 49,
                keys: [ 26, 18, 17, 49 ],
                flip: [ 0, 26 ]
            },
            { 
                id: 28, x: [ 808, 779 ], y: [ 608, 379 ],
                auto: 29,
                keys: [ -1, 40, 39, 29 ],
                flip: [ 3, 29 ]
            },
            { 
                id: 29, x: [ 779, 808 ], y: [ 379, 608 ],
                auto: 11,
                keys: [ 28, 20, 19, 11 ],
                flip: [ 0, 28 ]
            },
            { 
                id: 30, x: [ 383, 374 ], y: [ 720, 500 ],
                auto: 31,
                keys: [ -1, 42, 41, 31 ],
                flip: [ 3, 31 ]
            },
            { 
                id: 31, x: [ 374, 383 ], y: [ 500, 720 ],
                auto: 7 ,
                keys: [ 30, -1, 21, 7 ],
                flip: [ 0, 30 ]
            },
            { 
                id: 32, x: [ 1730, 1270 ], y: [ 130, 130 ],
                auto: 35,
                keys: [ -1, -1, 33, 35 ],
                flip: [ 2, 33 ]
            },
            { 
                id: 33, x: [ 1270, 1730 ], y: [ 130, 130 ],
                auto: 47,
                keys: [ -1, 32, -1, 47 ],
                flip: [ 1, 32 ]
            },
            { 
                id: 34, x: [ 1143, 1270 ], y: [ 282, 130 ],
                auto: 33,
                keys: [ -1, -1, 33, 35 ],
                flip: [ 3, 35 ]
            },
            { 
                id: 35, x: [ 1270, 1143 ], y: [ 130, 282 ],
                auto: 37,
                keys: [ -1, -1, -1, -1 ],
                flip: [ 0, 34 ]
            },
            { 
                id: 36, x: [ 1120, 1143 ], y: [ 407, 282 ],
                auto: 34,
                keys: [ -1, -1, -1, -1 ],
                flip: [ 3, 37 ]
            },
            { 
                id: 37, x: [ 1143, 1120 ], y: [ 282, 407 ],
                auto: 36,
                keys: [ 36, 38, -1, 27 ],
                flip: [ 0, 36 ]
            },
            { 
                id: 38, x: [ 1120, 779 ], y: [ 407, 379 ],
                auto: 40,
                keys: [ -1, 40, 39, 29 ],
                flip: [ 2, 39 ]
            },
            { 
                id: 39, x: [ 779, 1120 ], y: [ 379, 407 ],
                auto: 38,
                keys: [ 36, 38, -1, 27 ],
                flip: [ 1, 38 ]
            },
            { 
                id: 40, x: [ 779, 374 ], y: [ 379, 500 ],
                auto: 42,
                keys: [ -1, 42, 41, 31 ],
                flip: [ 2, 41 ]
            },
            { 
                id: 41, x: [ 374, 779 ], y: [ 500, 379 ],
                auto: 39,
                keys: [ -1, 40, 39, 29 ],
                flip: [ 1, 40 ]
            },
            { 
                id: 42, x: [ 374, 90 ], y: [ 500, 355 ],
                auto: 43,
                keys: [ -1, -1, 43, -1 ],
                flip: [ 2, 43 ]
            },
            { 
                id: 43, x: [ 90, 374 ], y: [ 355, 500 ],
                auto: 41,
                keys: [ -1, 42, 41, 31 ],
                flip: [ 1, 42 ]
            },
            { 
                id: 44, x: [ 1752, 1629 ], y: [ 616, 595 ],
                auto: 16,
                keys: [ 24, 16, 45, -1 ],
                flip: [ 2, 45 ]
            },
            { 
                id: 45, x: [ 1629, 1752 ], y: [ 595, 616 ],
                auto: 44,
                keys: [ -1, 44, -1, 23 ],
                flip: [ 1, 44 ]
            },
            { 
                id: 46, x: [ 1650, 1730 ], y: [ 252, 130 ],
                auto: 47,
                keys: [ -1, 32, -1, 47 ],
                flip: [ 3, 47 ]
            },
            { 
                id: 47, x: [ 1730, 1650 ], y: [ 130, 252 ],
                auto: 25,
                keys: [ -1, -1, -1, -1 ],
                flip: [ 0, 46 ]
            },
            { 
                id: 48, x: [ 1200, 1115 ], y: [ 770, 586 ],
                auto: 26,
                keys: [ 26, 18, 17, 49 ],
                flip: [ 3, 49 ]
            },
            { 
                id: 49, x: [ 1115, 1200 ], y: [ 586, 770 ],
                auto: 13,
                keys: [ 48, 14, -1, 13 ],
                flip: [ 0, 48 ]
            },
        ]

        this.disablePlay = true;

        this.input.keyboard.on('keydown_UP', (evt) => {
            this.controlPlayer(0);
        });
        this.input.keyboard.on('keydown_LEFT', (evt) => {
            this.controlPlayer(1);
        });
        this.input.keyboard.on('keydown_RIGHT', (evt) => {
            this.controlPlayer(2);
        });
        this.input.keyboard.on('keydown_DOWN', (evt) => {
            this.controlPlayer(3);
        });

        this.createMap();
        this.createCamera();
        this.createPlayer();
        this.addEnemies();
        this.addIcons();
        this.createHUDCollectionIcons();

        this.createIndicatorArrows();
        this.createHUD();

        if (window.USER_IS_TOUCHING) this.createTouchPad();

        this.touchPadDown = [
            false,
            false,
            false,
            false
        ];
    }

    createMap () {
        this.add.sprite(0, 0, 'bossbg').setOrigin(0);
    }
    createCamera () {
        this.camera = this.cameras.main;
        this.camera.setRoundPixels(true);
        this.camera.setBounds(0, 0, 2000, 1162);
    }
    createPlayer () {

        this.player = new BossVan(this, 1950, 1077, []);
        this.camera.startFollow(this.player.sprite, false, 0.5, 0.5);

        this.playerDetails = {
            type: "player",
            sprite: this.player.sprite,
            path: factoryFindDataByIDProperty(this.paths, 0)
        }

        this.getCurrentPath(this.playerDetails, 0);
        this.disablePlay = false;
    }
    addEnemies () {
        this.enemyArray = [];

        this.enemyDetails = [
            { img : 'bossicon_ronnie.png', path_id: 12, alert_id: 0 },
            { img : 'bossicon_lincoln.png', path_id: 42, alert_id: 1 },
            { img : 'bossicon_clyde.png', path_id: 30, alert_id: 2 },
            { img : 'bossicon_lola.png', path_id: 10, alert_id: 3 },
            { img : 'bossicon_lana.png', path_id: 18, alert_id: 4 }
        ]

        this.enemyDetails.map((enemy) => {
            this.enemyArray.push(this.createEnemy(enemy.img, enemy.path_id, enemy.alert_id))
        })
    }

    createEnemy (_img, _path_id, _alert_id) {

        let obj = {
            type: "enemy", 
            sprite: new BossObstacle(this, 0, 0, [], _img, 0),
            end: false,
            path: factoryFindDataByIDProperty(this.paths, _path_id),
            alert_id: _alert_id

        }

        return obj;
    }

    addIcons () {

        this.iconCounter = 0;

        this.iconArray = []

        this.iconDetails = [
            { img : 'bossicon_card.png', x: 598, y: 668, id: 0 },
            { img : 'bossicon_top.png', x: 1030, y: 778, id: 1 },
            { img : 'bossicon_chocs.png', x: 1474, y: 132, id: 2 },
            { img : 'bossicon_earrings.png', x: 1764, y: 829, id: 3 },
            { img : 'bossicon_roses.png', x: 1136, y: 1070, id: 4 }
        ]

        this.iconDetails.map((icon) => {
            let collectable = new BossIcon(this, icon.x, icon.y, [], icon.img, icon.id);
            this.iconArray.push(collectable)
        });
        this.gateIcon = new BossIcon(this, 113, 342, [], 'bossicon_park_closed.png', 5);
    }

    createHUDCollectionIcons () {

        this.collectionArray = [];
        let counter = 0;
        this.iconDetails.map((d) => {
            let bg = this.add.sprite(530 + (counter * 95), 52, 'gamesprites', 'hud_button_menu.png').setScrollFactor(0).setDepth(22);
            let icon = new HUDCollectionIcon(this, 530 + (counter * 95), 52, [], d.img);
            icon.id = counter;
            this.collectionArray.push(icon);
            counter++;
        })
    }

    createIndicatorArrows () {

        this.arrowContainer = this.add.container(0, 0);
        this.arrowArray = [];

        this.upArrow = this.add.sprite(0, -80, 'gamesprites', 'boss_indicatorarrow_up.png').setOrigin(0.5);
        this.leftArrow = this.add.sprite(-80, 0, 'gamesprites', 'boss_indicatorarrow_up.png').setOrigin(0.5);
        this.rightArrow = this.add.sprite(80, 0, 'gamesprites', 'boss_indicatorarrow_up.png').setOrigin(0.5);
        this.downArrow = this.add.sprite(0, 80, 'gamesprites', 'boss_indicatorarrow_up.png').setOrigin(0.5);

        this.leftArrow.angle = -90;
        this.rightArrow.angle = 90;
        this.downArrow.angle = 180;

        this.tweens.add({
            targets: this.upArrow,
            y: -100,
            duration: 500,
            repeat: -1,
            ease: 'Back.easeOut'
        });
        this.tweens.add({
            targets: this.leftArrow,
            x: -100,
            duration: 500,
            repeat: -1,
            ease: 'Back.easeOut'
        });
        this.tweens.add({
            targets: this.rightArrow,
            x: 100,
            duration: 500,
            repeat: -1,
            ease: 'Back.easeOut'
        });
        this.tweens.add({
            targets: this.downArrow,
            y: 100,
            duration: 500,
            repeat: -1,
            ease: 'Back.easeOut'
        });

        this.arrowContainer.add([ this.upArrow, this.leftArrow, this.rightArrow, this.downArrow ]);
        this.arrowArray = [this.upArrow, this.leftArrow, this.rightArrow, this.downArrow];
    }
    controlPlayer (val) {
        this.keyPress = val;
        let outcome = (this.endZone) ? this.choosePath() : this.flipPlayer();
    }
    choosePath () {
        if (this.playerDetails.path.keys[this.keyPress] === -1) return;
        this.nextId = this.playerDetails.path.keys[this.keyPress];
    }
    flipPlayer () {
        if (this.playerDetails.path.flip[0] === this.keyPress) this.flipCurrentPath(this.playerDetails.path.flip[1]);
    }
    flipCurrentPath (_id) {

        this.playerDetails.path = factoryFindDataByIDProperty(this.paths, _id);

        this.nextId = this.playerDetails.path.auto;

        let gapx = Math.abs(this.playerDetails.path.x[0] - this.playerDetails.path.x[1]);
        let gapy = Math.abs(this.playerDetails.path.y[0] - this.playerDetails.path.y[1]);    

        this.endIndicator = (gapx >= gapy) ? 'x' : 'y'; 

       // window.MANAGERS.audioManager.playAudio("cartyre_sfx");

    }
    getCurrentPath (_character, _id) {

        let character = _character, id = _id;

        character.path = factoryFindDataByIDProperty(this.paths, id);
        character.sprite.x = character.path.x[0];
        character.sprite.y = character.path.y[0];

        if (character.type === "player") {
            this.nextId = character.path.auto;

           // window.MANAGERS.audioManager.playAudio("cartyre_sfx");

            let gapx = Math.abs(character.path.x[0] - character.path.x[1]);
            let gapy = Math.abs(character.path.y[0] - character.path.y[1]);    

            this.endIndicator = (gapx >= gapy) ? 'x' : 'y';
        } 
    }
    movePlayer () {

        let dx = this.playerDetails.path.x[1] - this.playerDetails.path.x[0];
        let dy = this.playerDetails.path.y[1] - this.playerDetails.path.y[0];
        let angle = Math.atan2(dy, dx)

        let velocity = 3.5;

        let xVelocity = velocity * Math.cos(angle);
        let yVelocity = velocity * Math.sin(angle);

        this.player.movePlayer(xVelocity, yVelocity);

        this.endZone = this.playerIsInEndZone(100);

        if (this.endZone) {
            this.arrowContainer.alpha = 1;
            this.arrowContainer.x = this.playerDetails.path.x[1];
            this.arrowContainer.y = this.playerDetails.path.y[1];

            this.playerDetails.path.keys.map((key, index) => {
                this.arrowArray[index].alpha = (key > -1) ?  1 : 0;
            })
        } else {
            this.arrowContainer.alpha = 0;
        }

        if (this.playerIsPastEndPoint(this.playerDetails.sprite, this.playerDetails.path)) {
            this.getCurrentPath(this.playerDetails, this.nextId)
        }
    }

    moveEnemies () {
        this.enemyArray.map((enemy) => {
            let dx = enemy.path.x[1] - enemy.path.x[0];
            let dy = enemy.path.y[1] - enemy.path.y[0];
            let angle = Math.atan2(dy, dx)

            let velocity = 1.8;

            let xVelocity = velocity * Math.cos(angle);
            let yVelocity = velocity * Math.sin(angle);

            enemy.sprite.moveEnemy(xVelocity, yVelocity);

            if (this.playerIsPastEndPoint(enemy.sprite, enemy.path)) {
                this.getCurrentPath(enemy, enemy.path.auto)
            }
        });
    }

    playerIsInEndZone (val) {
        
        let dist = val;
        let past;

        if (this.playerDetails.path[this.endIndicator][0] > this.playerDetails.path[this.endIndicator][1]) {
            past = (
                this.player.sprite[this.endIndicator] < this.playerDetails.path[this.endIndicator][1] + dist) ?
                true : false; 
        } else {
            past = (
                this.player.sprite[this.endIndicator] > this.playerDetails.path[this.endIndicator][1] - dist) ?
                true : false; 
        }

        return past;
    }
    
    playerIsPastEndPoint (_sprite, _path) {

        let sprite = _sprite, path = _path;

        let past = (
            sprite.x < path.x[0] && sprite.x < path.x[1] ||
            sprite.x > path.x[0] && sprite.x > path.x[1] ||
            sprite.y < path.y[0] && sprite.y < path.y[1] ||
            sprite.y > path.y[0] && sprite.y > path.y[1]) ?
            true : false; 

        return past;
    }
    createTouchPad  () {
        this.touchpad = new BossTouchPad(this, 100, 660, []);
    }


    // MRK - UPDATE FUNCTIONS
    update (time, delta) {

        if (this.disablePlay) return;
        this.movePlayer();
        this.moveEnemies();
    }

    collectItem (id) {
        this.collectionArray[id].showTick();
        this.iconCounter++;
        window.MANAGERS.audioManager.playAudio("collect_sfx"); 
        if (this.iconCounter === 5) this.gateIcon.openGate();
    }

    createHUD () {
        this.frame = new Frame(this, 0, 0, []).setDepth(21);
        
        this.pause_button = new GrowButton(this, 202, 52, 'gamesprites', 'pause_btn.png').setDepth(22);
        this.pause_button.on('pointerdown', () => {
           this.openPauseScene();
        });
    }
    // HUD FUNCTIONALITY

    callAlertScene (_id) {
        this.cleanUpScene();
        console.log('STOP!')
        this.scene.stop("BossScene");
        this.scene.start("BossAlertScene", { win: false });
    }
    callCompleteScene () {
        this.cleanUpScene();
        this.scene.stop("BossScene");
        this.scene.start("BossAlertScene", { win: true });
    }


    openPauseScene () {
        this.cleanUpScene();
        this.scene.stop('BossScene');
        this.scene.start('PauseScene');
    }

    // CLEAN UP
    cleanUpScene () {
        this.camera.stopFollow(this.player.sprite); 
        this.disablePlay = true;
        this.enemyArray.map((enemy) => {
            enemy.sprite.destroyMe();
        })

        this.input.keyboard.off('keydown_UP');
        this.input.keyboard.off('keydown_DOWN');
        this.input.keyboard.off('keydown_LEFT');
        this.input.keyboard.off('keydown_RIGHT');

        this.frame.destroy();
    }
}

export default BossScene;
