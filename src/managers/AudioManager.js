
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = [];
    this.playing = "";
  }

  playAudio (key) {
    if (this.scene.registry.get("mute")) return;
    this.scene.sound.playAudioSprite('sfx', key);
  }

  addMusic (key) {
    this.music.push(this.scene.sound.add(key, { volume: 0.5, loop: true }));
  }

  checkMusic (key) {
    if (this.playing === key) return true;
    return false;
  }

  clickMute () {
    this.scene.sound.setMute(this.scene.registry.get("mute"))
  }

  playMusic (key) {
    let music = this.music.find(m => m.key === key)
    music.play();
    this.playing = key;
    this.clickMute();
  }

  stopMusic () {
    let music = this.music.map(m => {
      m.stop();
    })
  }
}

export default AudioManager;
