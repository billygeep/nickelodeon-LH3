/* global Phaser: false */
// import sounds from "../helpers/sounds";

export default class AlphaButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img, fadeIn) {
    super(scene, x, y, 'gamesprites', img);
    this.audio = {};

    this.scene.add.existing(this);
    this.setInteractive({ useHandCursor: true  });
    this.setScrollFactor(0);
    // this.createAudio();
    this.setActive();

    if (fadeIn) {
      this.alpha = 0;
      this.scaleX = 0.7;
      this.scaleY = 0.7;
      this.angle = -45;

      this.showButton();
    }
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

  showButton () {
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      angle: 0,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }

  setActive() {
    this.on("pointerover", this.onOver.bind(this));
    this.on("pointerout", this.onOut.bind(this));
    this.on("pointerdown", this.onDown.bind(this));
  }

  onDown() {
    // this.playSound("click");
  }

  onOver() {
    this.setAlpha(0.7);
  }

  onOut() {
    this.setAlpha(1);
  }
}
