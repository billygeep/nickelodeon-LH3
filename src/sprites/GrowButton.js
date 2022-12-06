/* global Phaser: false */
// import sounds from "../helpers/sounds";

export default class GrowButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sheet, img) {
    super(scene, x, y, sheet, img);
    this.audio = {};

    this.rooty = y;

    this.scene.add.existing(this);
    this.setInteractive({ useHandCursor: true  });
    this.setScrollFactor(0);
    // this.createAudio();
    this.setActive();
  }

  createAudio() {
    const { audio } = this.options;
    if (audio) {
      const validAudioKeys = ["click", "over", "out"];
      for (var key in audio) {
        if (validAudioKeys.indexOf(key) > -1) {
          // this.audio[key] = sounds[btoa(audio[key].url)];
        }
      }
    }
  }

  // playSound(key) {
  //   if (
  //     typeof this.audio[key] === "object" &&
  //     typeof this.audio[key].play === "function"
  //   ) {
  //     this.audio[key].play();
  //   }
  // }

  setActive() {

    this.dw = this.displayWidth;
    this.dh = this.displayHeight;

    this.on("pointerover", this.onOver.bind(this));
    this.on("pointerout", this.onOut.bind(this));
    // this.on("pointerdown", this.onDown.bind(this));
    // this.on("pointerup", this.onUp.bind(this));
  }

  onOver() {
    this.scene.tweens.add({
      targets: this,
      displayWidth: this.dw * 1.15,
      displayHeight: this.dh * 1.15,
      duration: 200,
      ease: 'Back.easeOut'
    });
  }

  onOut() {
    this.scene.tweens.add({
      targets: this,
      displayWidth: this.dw,
      displayHeight: this.dh,
      duration: 200,
      ease: 'Back.easeOut'
    });
  }

  hideMe () {
    this.scene.tweens.add({
      targets: [this],
      y: -250,
      duration: 300,
      ease: 'Back.easeIn'
    });
  }

  showMe () {
    this.scene.tweens.add({
      targets: [this],
      y: this.rooty,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }
}
