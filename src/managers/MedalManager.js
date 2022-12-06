
class MedalManager {
  constructor(scene) {

    this.scene = scene;

    this.dash_id = 0;
    this.mile_id = 1;
    this.fullhouse_id = 2;
    this.toiletbreak_id = 3;
    this.ronnieanne_id = 4;
    this.home1_id = 5;
    this.home2_id = 6;
    this.topclass_id = 7;
    this.chatterer_id = 8;
    this.phoneaddict_id = 9;
    this.jailbird_id = 15;

    this.timer;
    this.timeron = false;
  }

  checkRonniTime () {

      if (window.CONFIG.data.playervars.currentCharacter === 2) window.CONFIG.data.medal_data.ronnie_seconds++;

      if (window.CONFIG.data.medal_data.ronnie_seconds > window.CONFIG.data.medal_data.ronnie_total && window.CONFIG.data.medal_data.medals[this.ronnieanne_id].status === 0) {
        window.CONFIG.data.medal_data.medals[this.ronnieanne_id].status = 1;
        window.MANAGERS.alertManager.addAlert('medal', this.ronnieanne_id);
      }
  }

  clickPhone () {

    window.CONFIG.data.medal_data.phoneClicked++;

    if (window.CONFIG.data.medal_data.phoneClicked >= window.CONFIG.data.medal_data.phoneMax && window.CONFIG.data.medal_data.medals[this.phoneaddict_id].status === 0) {
      window.CONFIG.data.medal_data.medals[this.phoneaddict_id].status = 1;
      window.MANAGERS.alertManager.addAlert('medal', this.phoneaddict_id);
      window.CONFIG.data.medals_collected++;
    }
  }

  talkToSister (id) {
    if (window.CONFIG.data.medal_data.medals[this.chatterer_id].status === 1) return;

    window.CONFIG.data.medal_data.sisterChat.map((sis, i) => {
        if (sis === id) {
          window.CONFIG.data.medal_data.sisterChat.splice(i, 1);
          return;
        }
    });
    if (window.CONFIG.data.medal_data.sisterChat.length === 0) {
      window.CONFIG.data.medal_data.medals[this.chatterer_id].status = 1;
      window.MANAGERS.alertManager.addAlert('medal', this.chatterer_id);
      window.CONFIG.data.medals_collected++;
    }
  }

  checkLocation () {
    if (window.CONFIG.data.playervars.currentScene === 503 && window.CONFIG.data.medal_data.medals[this.jailbird_id].status === 0) {
      window.CONFIG.data.medal_data.medals[this.jailbird_id].status = 1;
      window.MANAGERS.alertManager.addAlert('medal', this.jailbird_id);
      window.CONFIG.data.medals_collected++;
      return;
    }
    if (window.CONFIG.data.playervars.previousScene === 101 && window.CONFIG.data.playervars.currentScene === 102 && window.CONFIG.data.playervars.currentCharacter === 0 && !window.CONFIG.data.medal_data.lincolnHome) {
      window.CONFIG.data.medal_data.lincolnHome = true;
      window.CONFIG.data.medal_data.medals[this.home1_id].status = 1;
      window.MANAGERS.alertManager.addAlert('medal', this.home1_id);
      window.CONFIG.data.medals_collected++;
      return;
    }
    if (window.CONFIG.data.playervars.previousScene === 400 && window.CONFIG.data.playervars.currentScene === 401 && window.CONFIG.data.playervars.currentCharacter === 1 && !window.CONFIG.data.medal_data.clydeHome) {
      window.CONFIG.data.medal_data.clydeHome = true;
      window.CONFIG.data.medal_data.medals[this.home2_id].status = 1;
      window.MANAGERS.alertManager.addAlert('medal', this.home2_id);
      window.CONFIG.data.medals_collected++;
      return;
    }
    if (window.CONFIG.data.playervars.previousScene === 300 && window.CONFIG.data.playervars.currentScene === 301) {
      window.CONFIG.data.medal_data.enterSchool++;
      if (window.CONFIG.data.medal_data.enterSchool === window.CONFIG.data.medal_data.schoolMax) {
        window.CONFIG.data.medal_data.medals[this.topclass_id].status = 1;
        window.MANAGERS.alertManager.addAlert('medal', this.topclass_id);
        window.CONFIG.data.medals_collected++;
        return;
      }
    }
  }

  checkMovement () {
    if (window.CONFIG.data.medal_data.medals[this.toiletbreak_id].status === 1) return;
    if (this.timeron) this.timer.remove();

    this.timeron = true;

    this.timer = window.GAME.time.delayedCall(60000, () => { this.getToiletBreakMedal(); }); 
  }

  getToiletBreakMedal() {
    this.timer.remove();
    window.CONFIG.data.medal_data.medals[this.toiletbreak_id].status = 1;
    window.MANAGERS.alertManager.addAlert('medal', this.toiletbreak_id);
    window.CONFIG.data.medals_collected++;

  } 

  checkDistance () {
  	if (window.CONFIG.data.medal_data.distanceCounter === 2) return;
  	// 100 METRE DASH
  	if (window.CONFIG.data.playervars.distance > 10000 && window.CONFIG.data.medal_data.medals[this.dash_id].status === 0) {
  		window.CONFIG.data.medal_data.medals[this.dash_id].status = 1;

  		window.MANAGERS.alertManager.addAlert('medal', this.dash_id);
      window.CONFIG.data.medals_collected++;
  		window.CONFIG.data.medal_data.distanceCounter++;
  	}
  	// MILE MARKER
  	if (window.CONFIG.data.playervars.distance > 160000 && window.CONFIG.data.medal_data.medals[this.mile_id].status === 0) {
  		window.CONFIG.data.medal_data.medals[this.mile_id].status = 1;
  		window.MANAGERS.alertManager.addAlert('medal', this.mile_id);
      window.CONFIG.data.medals_collected++;
  		window.CONFIG.data.medal_data.distanceCounter++;
  	}
  }

  checkCharacterUsage (id) {
  	if (window.CONFIG.data.medal_data.medals[this.fullhouse_id].status === 1) return;
  	window.CONFIG.data.medal_data.characterArray = window.CONFIG.data.medal_data.characterArray.filter(item => item !== id);

  	if (window.CONFIG.data.medal_data.characterArray.length === 0) {
  		window.CONFIG.data.medal_data.medals[this.fullhouse_id].status = 1;
  		window.MANAGERS.alertManager.addAlert('medal', this.fullhouse_id);
      window.CONFIG.data.medals_collected++;
  	}
  }
}

export default MedalManager;