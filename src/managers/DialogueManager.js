
import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

class DialogueManager {
    constructor() {
        this.dialogueList = [];
        this.counter = 0;
        this.currentCharacter = null;
        this.next_id = null;
    }

    startDialogueSequence (_id) {
    	this.currentCharacter = factoryFindDataByIDProperty(window.CONFIG.data.item_data, _id);

    	let thisDialogue = factoryFindDataByIDProperty(window.CONFIG.dialogue, this.currentCharacter.dialogue);
    	// call the scene to create the visual dialogue bubble
    	window.GAME.createDialogueBubble(thisDialogue['chat']);
    	this.next_id = thisDialogue.next_id;
    }

    endDialogueSequence () {
        if (this.next_id !== null) this.currentCharacter.dialogue = this.next_id;
        this.next_id = null;
    }

    updateDialogueID (_character_id, _dialogue_id) {
        let char = factoryFindDataByIDProperty(window.CONFIG.data.item_data, _character_id);
        char.dialogue = _dialogue_id;
    }

 //    addBubble (_dialogue_id) {

 //    	this.closeBubble();

 //    	let dialogue_id = _dialogue_id
 //    	let thisDialogue = factoryFindDataByIDProperty(window.CONFIG.dialogue, dialogue_id)

	//     this.dialogueList.push(thisDialogue);

	//     window.GAME.createDialogueBubble(thisDialogue['chat_lincoln']);
	// }
	

	// closeBubble () {
    
	//     if (this.dialogueList.length === 0) return;

	//     window.GAME.dialogueBubble.updateBubble();

	//     gameview.dialogueopen = false;

	//     this.dialoguelist.shift();
	// }
}

export default DialogueManager;
