/* global Phaser: false */
// import sounds from "../helpers/sounds";

export default class ClickButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
    super(scene, x, y, 'gamesprites', img);
    this.audio = {};

    this.scene.add.existing(this);
    this.setInteractive({ useHandCursor: true  });
    this.setScrollFactor(0);
    this.alpha = 0.1;
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
    this.on("pointerdown", this.onDown.bind(this));
    this.on("pointerup", this.onUp.bind(this));
  }

  onDown() {
    this.alpha = 1;
  }
  onUp() {
    this.alpha = 0.1;
  }

}
