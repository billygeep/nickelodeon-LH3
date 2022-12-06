
import TaskLisa from '../tasks/TaskLisa';
import TaskLucy from '../tasks/TaskLucy';
import TaskLola from '../tasks/TaskLola';
import TaskLana from '../tasks/TaskLana';
import TaskLynn from '../tasks/TaskLynn';
import TaskLuan from '../tasks/TaskLuan';
import TaskLuna from '../tasks/TaskLuna';
import TaskLeni from '../tasks/TaskLeni';
import TaskMedals from '../tasks/TaskMedals';

import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

//task manager adds all the tasks to the tasklist

class TaskManager {
    constructor() {
        this.tasklist = []
        
        this.currenttask = -1;
    }

    setupTaskList () {
        this.tasklist = [
            new TaskLisa(0),
            new TaskLucy(1),
            new TaskLola(2),
            new TaskLana(3),
            new TaskLynn(4),
            new TaskLuan(5),
            new TaskLuna(6),
            new TaskLeni(7),
            new TaskMedals(8)
        ]
    }

    //set the current task to the task id given
    setCurrentTask (_id) {
        this.currenttask = this.tasklist[_id] // assign this quest as current3
    }

    taskComplete (_id) {
        window.CONFIG.data.taskscomplete++;
        if (window.CONFIG.data.taskscomplete === 16) window.MANAGERS.alertManager.addAlert('maincomplete', 0);
        // get task and call complete function;   
    }

    // add new task alerts to the data array.
    addTaskAlert (_task_id, _alert_type, _alert_id) {
        window.CONFIG.data.taskalert_data.push({ 
            task_id: _task_id, 
            alert_type: _alert_type,
            alert_id: _alert_id,
            unique_id: Math.round(Math.random()* 1000000)
        })
        window.GAME.addNewTaskAlert();
    }
    // remove the current task
    removeTaskAlert(_unique_id) {
        window.CONFIG.data.taskalert_data.map((d, i) => {
            if (d.unique_id === _unique_id) {
                window.CONFIG.data.taskalert_data.splice(i, 1);
                return;
            }
        });
        window.GAME.removeNewTaskAlert();
    }
}

export default TaskManager;
// function TaskManager () {
//     this.tasklist = [];
//     this.currenttask = -1;
//     this.tasks = globalvars.gamedata.tasks;

//     this.dialogue = globalvars.gamedata.dialogue;

//     for (var i = 0; i < this.tasks.length; i++) {
//         var newtask = "new " + this.tasks[i].func + "("+i+")";
//         this.tasklist.push(eval(newtask))   
//     }
// }
// //set the current task to the task id given
// TaskManager.prototype.setCurrentTask = function(_id) {
//     this.currenttask = this.tasks[_id] // assign this quest as current3
// }

// //set access for the supplied scene
// TaskManager.prototype.setExitAccess = function(_scene, _exit, _active) {
//     var scene = _scene, exit = _exit, active = _active;

//     for (var i = 0; i < globalvars.gamedata.scenes.length; i++) {
//         if (globalvars.gamedata.scenes[i].id === _scene) {
//             globalvars.gamedata.scenes[i].exits[exit].active = active;
//             return;
//         }
//     }
// }

// //get the current task dialogue for the character
// TaskManager.prototype.talkToCharacter = function(_bespokechat) {
//     if (_bespokechat) {
//         var d = this.getDialogue(_bespokechat) // if bespoke passed from char then use, else use game dialogue
//     } else {
//         var d = this.getDialogue(this.currenttask.dialogue)
//     }
//     globalvars.dialogue_manager.addBubble('dialogue',d);
// }
// // set task dialogue as nextdialogue
// TaskManager.prototype.updateTaskDialogue = function (_nextdialogue) {
//     this.currenttask.dialogue = _nextdialogue;
// }
// //check if items are in inventory and if so update the quest
// TaskManager.prototype.checkIfGotNextItem = function (_id) {
//     //if the following phase requires an item check if we already have it
//     if (globalvars.item_manager.isItemInInventory(_id)) return true
// }
// //update lincolns list with task complete
// TaskManager.prototype.taskCompleted = function(_id) {

//     var id = _id
//     this.tasks[id].complete = true;
//     this.tasks[id].grade_start = this.tasks[id].grade_complete;   
//     this.tasks[id].comment_start = this.tasks[id].comment_complete;   
// }
// //update lincolns list with task complete
// TaskManager.prototype.getDialogue = function(_id) {
//     for (var i = 0; i < this.dialogue.length; i++) {
//         if (this.dialogue[i].id === _id) return this.dialogue[i];
//     }
// }