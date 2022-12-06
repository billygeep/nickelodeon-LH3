
import MyText from "../sprites/MyText";
import GrowButton from "../sprites/GrowButton";

import { STYLE_timertext } from "../helpers/MyConstants";

export default class StopWatchTimer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, _time, _task) {
        
        super(scene, x, y, []);

        this.time = _time;
        this.task = _task;
        this.scene = scene;
        this.cancelled = false;
        this.scene.add.existing(this);

        this.setScrollFactor(0);
        this.setDepth(23);
        
        let stopwatch = this.scene.add.sprite(0, 0, 'gamesprites', 'stop_watch.png').setOrigin(0.5);
        this.timer_txt = this.scene.add.text(0, 30, this.time, STYLE_timertext).setOrigin(0.5);

        this.add([
            stopwatch,
            this.timer_txt
        ]);

        this.timeout = false;

        this.scene.tweens.add({
            targets: this,
            x: 100,
            ease: 'Back.easeOut',
            duration: 300
        });
    }

    startTimer () {

        this.scene.tweens.add({
            targets: this.timer_txt,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 100,
            onComplete: () => {
                this.timer_txt.setText(this.time)
            }
        });

        this.scene.tweens.add({
            targets: this.timer_txt,
            scaleX: 1,
            scaleY: 1,
            duration: 800,
            delay: 200,
            onComplete: () => {
                this.time--;
                if (this.cancelled) {
                    this.destroyMe();
                    return;
                }
                let outcome = (this.time === 0) ? this.endTimer() : this.startTimer();
            }
        });
    }

    cancelTimer () {
        this.cancelled = true;
    }

    endTimer () {

        this.timer_txt.setText(this.time)

        this.scene.tweens.add({
            targets: this,
            angle: 20,
            ease: 'Back.easeIn',
            duration: 50,
            repeat: 10,
            yoyo: true
        });

        this.scene.tweens.add({
            targets: this,
            delay: 1000,
            duration: 300,
            onComplete: () => {
                window.MANAGERS.taskManager.setCurrentTask(this.task);
                window.MANAGERS.taskManager.currenttask.endTimer();
                this.destroyMe();
            }
        });
    }

    destroyMe () {
        this.scene.tweens.add({
            targets: this,
            x: -200,
            ease: 'Back.easeIn',
            duration: 300,
            onComplete: () => {
                this.scene.endTimerUse();
                this.removeAll(true)
                this.destroy();
            }
        });
    }
}
