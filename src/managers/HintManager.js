
import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

class HintManager {
    constructor() {
        this.activeHints = [];
        this.counter = 0;

        this.getActiveHints();
    }

    getActiveHints () {

        this.activeHints = [];

        window.CONFIG.hints.map((hint) => {
            if (hint.active) this.activeHints.push(hint);
        })
    }

    updateHintActiveStatus (_id, _active) {
        let hint = factoryFindDataByIDProperty(window.CONFIG.hints, _id)
        hint.active = _active;
    }

    grabNextHint () {
        let hintText = factoryFindDataByIDProperty(window.GAMECOPY.hints, this.activeHints[this.counter].id);

        this.counter++;
        if (this.counter >= this.activeHints.length) this.counter = 0;

        return hintText;
    }
}

export default HintManager;


//add hints to current hint array
// HintManager.prototype.addHintsToArray = function () {

//     this.currenthints = []

//     for (var i = 0; i < this.hints.length; i++) {
//         if (this.hints[i].task === globalvars.gamedata.currentlocation && this.hints[i].active === 1) {
//             this.currenthints.push(this.hints[i])
//         }
//     }

//     this.counter = 0;
// }
