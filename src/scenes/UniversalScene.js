/* global Phaser: false */
import StopWatchTimer from "../containers/StopWatchTimer";
import AlphaButton from "../sprites/AlphaButton";
import { muteAll } from "../helpers/sounds";

// Create a Scene class for the preloader
export default class UniversalScene extends Phaser.Scene {
  constructor() {
    super("Universal");
  }

  create() {
    // const { mute } = this.config;
    this.registry.events.on("changedata", this.onRegistryChange, this);

    this.logo = this.add.sprite(0, 0, 'logo_small').setOrigin(0);

    this.scene.bringToTop();
    
    this.timerInUse = false;

    this.btnMute = new AlphaButton(this, 910, 50, 'sound_on_inactive.png');

    this.btnMute.muted = false;

    this.add.existing(this.btnMute);
    this.btnMute.on("pointerdown", this.toggleMute.bind(this));

    this.updateButtonDisplay(this.registry.get("mute"))
  }

  toggleLogo (_val) {
    this.logo.visible = _val;
  }

  onRegistryChange(parent, key) {
    if (key === "mute") {
      const muteValue = this.registry.get("mute");
      this.updateButtonDisplay(muteValue);
      muteAll(muteValue);
    }
  }

  bringTop () {
    this.scene.bringToTop();
  }

  showButton (val) {
    this.btnMute.visible = val;
  }

  updateButtonDisplay(mute) {
    this.btnMute.toggled = mute;

    let img = mute ? 'sound_off_inactive.png' : 'sound_on_inactive.png';
    this.btnMute.setTexture('gamesprites', img);
  }

  toggleMute() {
    this.registry.set("mute", !this.registry.get("mute"));
    this.updateButtonDisplay(this.registry.get("mute"))
    window.MANAGERS.audioManager.clickMute();
    window.MANAGERS.audioManager.playAudio('airpop_sfx')
  }

  isTimerInUse () {
    return this.timerInUse;
  }

  createTimer (_time, _task) {
    this.timer = new StopWatchTimer(this, -200, 180, _time, _task);
    this.timer.startTimer();
    this.timerInUse = true;
  }

  cancelTimer () {
    this.timer.cancelTimer();
  }

  endTimerUse () {
    this.timerInUse = false;
  }
}
