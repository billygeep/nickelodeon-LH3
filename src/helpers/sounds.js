import { Howler, Howl } from "howler";
import forEach from "lodash/forEach";

const sounds = {};

export default sounds;

export function loadSound(item) {
  sounds[btoa(item.url)] = new Howl({
    src: item.url
  });
}

export function stopAll() {
  forEach(sounds, sound => {
    sound.stop();
  });
}

export function pauseAll() {
  forEach(sounds, sound => {
    sound.wasPaused = sound.playing();
    sound.pause();
  });
}

export function resumeAll() {
  forEach(sounds, sound => {
    if (sound.wasPaused) {
      sound.wasPaused = false;
      sound.play();
    }
  });
}

export function muteAll(bool) {
  Howler.mute(bool);
}
