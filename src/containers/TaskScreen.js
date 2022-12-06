
import BackgroundSprite from "../sprites/BackgroundSprite"
import MyText from "../sprites/MyText";
import TextButton from "../sprites/TextButton";
import AlphaButton from "../sprites/AlphaButton";

import PhoneBg from "../containers/PhoneBg";

import { STYLE_taskbubbletext_overview, STYLE_alertmaintext, STYLE_taskbubbletext_task, STYLE_taskbubbletext_objective, STYLE_alertcountertext, sistervars } from "../helpers/MyConstants";
import { factoryFindDataByIDProperty } from '../helpers/DataFactory';

export default class TaskScreen {

    constructor(scene, _id) {
        
        window.MANAGERS.audioManager.playAudio("inventoryexpand_sfx"); 

        this.isOpen = true;

        this.scene = scene;
        this.copy = window.CONFIG.taskscreen;
        
        this.bg = new BackgroundSprite(this.scene, 480, 280, 'bg_standard').setDepth(19);

        this.phonebg = new PhoneBg(this.scene, 480, 280);
        this.taskcontrol_container = this.scene.add.container().setScrollFactor(0).setDepth(24);
        
        this.mapcontent_container = this.scene.add.container(0, 560).setScrollFactor(0).setDepth(23);
        this.taskcontent_container = this.scene.add.container().setScrollFactor(0).setDepth(23);
        this.furniture_container = this.scene.add.container().setScrollFactor(0).setDepth(24);

        this.taskcontrol_container.alpha = 0;
        this.taskcontent_container.alpha = 0;
        this.mapcontent_container.alpha = 0;

        // check if any alerts at top of list, if not then task complete
        if (window.CONFIG.data.taskalert_data.length > 0) {
            let alert = window.CONFIG.data.taskalert_data[window.CONFIG.data.taskalert_data.length - 1];
            this.taskcounter = alert.task_id;
            let outcome = (alert.alert_type === 'task') ? this.createTasksAndLocations() : this.createAlert(alert);
        } else {
            this.taskcounter = (_id === null) ? 0 : _id;
            this.createTasksAndLocations();
        }

        this.scene.tweens.add({
            targets: this.taskcontrol_container,
            alpha: 1,
            duration: 300,
            delay: 300,
            ease: 'Linear'
        });

        this.scene.tweens.add({
            targets: this.taskcontent_container,
            alpha: 1,
            duration: 300,
            delay: 300,
            ease: 'Linear'
        });

        this.scene.tweens.add({
            targets: this.mapcontent_container,
            alpha: 1,
            duration: 300,
            delay: 300,
            ease: 'Linear'
        });

        this.resumebtn = new TextButton(this.scene, 840, 495, "gamesprites", 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.resume_button);
        this.resumebtn.button.on('pointerdown', () => {
           window.MANAGERS.alertManager.closeAlert();
        });

        this.furniture_container.add(this.resumebtn); 

        if (window.CONFIG.data.taskscomplete === 16) {
            this.bossbtn = new TextButton(this.scene, 640, 495, "gamesprites", 'button_template_medium.png', 0xcccd4d, 0xeabd37, this.copy.boss_button);
            this.bossbtn.button.on('pointerdown', () => {
               window.MANAGERS.alertManager.closeAlert();
               window.MANAGERS.alertManager.addAlert('maincomplete', 0);
            }); 

            this.furniture_container.add(this.bossbtn); 
        }
    }

    createAlert (_alert) {

        let a = _alert;
        let alert = factoryFindDataByIDProperty(window.CONFIG.taskscreen.alerts, a.alert_id);

        let avatar = this.scene.add.sprite(240, 180, "gamesprites", sistervars[a.task_id].icon  + "_115x115.png");
        let chatContainer = this.scene.add.container(0, 0)
        this.createOverView(alert.alert, 330, 150, chatContainer);

        this.taskcontent_container.add([
            avatar,
            chatContainer
        ]);

        window.MANAGERS.taskManager.removeTaskAlert(a.unique_id);
    }

    createTasksAndLocations () {

        let tasks = window.CONFIG.data.task_data;

        this.leftbtn = new AlphaButton(this.scene, 30, 280, 'furniture_reports_arrowleft.png');
        this.leftbtn.on('pointerdown', () => {
            if (this.taskcounter === 0) return;

            this.taskcounter--;
            this.swipeTasks();
        });

        this.rightbtn = new AlphaButton(this.scene, 930, 280 , 'furniture_reports_arrowright.png');
        this.rightbtn.on('pointerdown', () => {
            if (this.taskcounter === tasks.length - 1) return;

            this.taskcounter++;
            this.swipeTasks();
        });

        this.tickArray = [];
        this.taskcontrol_container.add([ this.leftbtn, this.rightbtn ]);

        this.pip_group = this.scene.add.group();
        this.alert_group = this.scene.add.group();
        this.chats_group = this.scene.add.group();

        this.chatArray = [];

        tasks.map((task, index) => {  
            if(index > 7) return;    
            let copy = factoryFindDataByIDProperty(this.copy.tasks, task.id);
            this.createPagination(copy, index)
            this.createIndividualTask(task, copy, index);
        });

        let shape = this.scene.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(170, 112, 622, 262);
        shape.setScrollFactor(0);
        let mask = shape.createGeometryMask();
        this.taskcontent_container.setMask(mask);

        let shape2 = this.scene.make.graphics();
        shape2.fillStyle(0xffffff);
        shape2.beginPath();
        shape2.fillRect(170, 112, 622, 334);
        shape2.setScrollFactor(0);
        let mask2 = shape2.createGeometryMask();
        this.mapcontent_container.setMask(mask2);

        let map = this.scene.add.sprite(480, 280, "gamesprites", 'phone_map.jpg');
        this.mapcontent_container.add(map);
        let locations = window.CONFIG.locations;
        locations.map((location, index) => {      
            let icon = new AlphaButton(this.scene, 177 + location.x, 120 + location.y, location.icon).setOrigin(0.5);
            this.mapcontent_container.add(icon);
            icon.on('pointerdown', () => {
               this.scene.changeLocation(location.id);
               window.MANAGERS.alertManager.closeAlert();
               window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
            });
        });

        this.taskbtn = new AlphaButton(this.scene, 90, 390, 'messages_button_off.png').setScrollFactor(0).setDepth(24);
        this.taskbtn.on('pointerdown', () => {
           this.showTasks();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });

        this.alert_container = this.scene.add.container(120, 370);
        let alertbg = this.scene.add.circle(0, 0, 16, 0xff0000).setOrigin(0.5);
        alertbg.setStrokeStyle(2, 0x000000);
        let alertnumber = this.scene.add.text(-7, -9, window.CONFIG.data.taskalert_data.length, STYLE_alertmaintext).setOrigin(0.5);

        this.alert_container.add([
            alertbg,
            alertnumber
        ]);
        if (window.CONFIG.data.taskalert_data.length === 0) this.alert_container.alpha = 0;


        this.mapbtn = new AlphaButton(this.scene, 90, 485, 'maps_button.png').setScrollFactor(0).setDepth(24);
        this.mapbtn.on('pointerdown', () => {
           this.showMap();
           window.MANAGERS.audioManager.playAudio("clickbutton_sfx");
        });
        this.furniture_container.add([
           this.taskbtn,
           this.mapbtn,
           this.alert_container
        ])

        this.mapbtn.tint = 0x333333; 

        this.taskcontent_container.x = this.taskcounter * -960
        this.manageSwipeButtons();
        this.managePipButtons();

        if (window.CONFIG.data.playervars.taskScreen === 1) {
            this.taskbtn.tint = 0x333333; 
            this.mapbtn.clearTint(); 
            this.taskcontent_container.y = -560;
            this.mapcontent_container.y = 0;
            this.taskcontrol_container.y = 560;
        }

    }

    showMap() {

        window.CONFIG.data.playervars.taskScreen = 1;

        this.taskbtn.tint = 0x333333; 
        this.mapbtn.clearTint(); 

        this.scene.tweens.add({
            targets: this.taskcontent_container,
            y: -560,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.mapcontent_container,
            y: 0,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.taskcontrol_container,
            y: 560,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });
    }

    showTasks() {

        window.CONFIG.data.playervars.taskScreen = 0;

        this.mapbtn.tint = 0x333333; 
        this.taskbtn.clearTint(); 

        this.scene.tweens.add({
            targets: this.taskcontent_container,
            y: 0,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.mapcontent_container,
            y: 560,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.taskcontrol_container,
            y: 0,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });
    }

    swipeTasks () {
        this.scene.tweens.add({
            targets: this.taskcontent_container,
            x: this.taskcounter * -960,
            duration: 300,
            ease: 'Cubic.easeInOut'
        });

        window.MANAGERS.audioManager.playAudio("wind_sfx"); 

        this.manageAlertCounter();
        this.manageSwipeButtons();
        this.managePipButtons();
        this.managePipAlerts();
    }

    manageAlertCounter() {
        let alertincrement = (window.CONFIG.data.taskalert_data.length > 0) ? this.alert_container.list[1].setText(window.CONFIG.data.taskalert_data.length) : this.alert_container.alpha = 0;
    }

    managePipButtons () {
        this.pip_group.children.iterate((pip, index) => {
            window.CONFIG.data.taskalert_data.map((alert) => {
                if (alert.task_id === this.taskcounter) window.MANAGERS.taskManager.removeTaskAlert(alert.unique_id);
            })
            let s = (index === this.taskcounter) ? 0.9 : 0.6;
            
            this.scene.tweens.add({
                targets: pip,
                scaleX: s,
                scaleY: s,
                duration: 300,
                ease: 'Back.easeInOut'
            });
        });
    }

    managePipAlerts () {
        this.pip_group.children.iterate((pip, index) => {
            let count = this.getAlertCounter(index);
            pip.list[1].alpha = (count > 0) ? 1 : 0;
            pip.list[2].alpha = (count > 0) ? 1 : 0;
        })
    }

    manageSwipeButtons () {
        let tasks = window.CONFIG.data.task_data;
        this.leftbtn.visible = (this.taskcounter === 0) ? false : true;
        this.rightbtn.visible = (this.taskcounter === tasks.length - 1) ? false : true;
    }

    createPagination (_copy, _index) {

        let xpos = 218 + (_index * 75)

        let singlepip = this.scene.add.container(xpos, -152);

        let pip = new AlphaButton(this.scene, 0, 0, _copy.character + "_70x70.png");
        pip.on('pointerdown', () => {
            this.taskcounter = _index;
            this.swipeTasks();
        });

        singlepip.add(pip);
        singlepip.scaleX = singlepip.scaleY = 0.7;
        
        let count = this.getAlertCounter(_index); 
        let message_counter_bg = this.scene.add.circle(26, -14, 11, 0xff0000).setOrigin(0.5);
        message_counter_bg.setStrokeStyle(1, 0x000000);
        let message_counter_number = this.scene.add.text(20, -20, count, STYLE_alertcountertext).setOrigin(0.5);

        message_counter_bg.visible = message_counter_number.visible = (count > 0) ? true : false;
        message_counter_bg.id = message_counter_number.id = _index;

        singlepip.add([message_counter_bg, message_counter_number]);

        this.mapcontent_container.add([
            singlepip
        ]);

        let taskdata = factoryFindDataByIDProperty(window.CONFIG.data.task_data, _index)

        if (taskdata['t1_open'] && taskdata['t1_complete']) {
            let tick = this.scene.add.sprite(-10,0,'gamesprites','task_tick.png');
            tick.scaleX = tick.scaleY = 0.7;
            singlepip.add(tick)
        } else if (taskdata['t1_open'] && !taskdata['t1_complete']) {
            let prompt = this.scene.add.sprite(-10,0,'gamesprites','task_prompt.png');
            prompt.scaleX = prompt.scaleY = 0.7;
            singlepip.add(prompt)
        }

        if (taskdata['t2_open'] && taskdata['t2_complete']) {
            let tick2 = this.scene.add.sprite(10,0,'gamesprites','task_tick.png');
            tick2.scaleX = tick2.scaleY = 0.7;
            singlepip.add(tick2)
        } else if (taskdata['t2_open'] && !taskdata['t2_complete']) {
            let prompt2 = this.scene.add.sprite(10,0,'gamesprites','task_prompt.png');
            prompt2.scaleX = prompt2.scaleY = 0.7;
            singlepip.add(prompt2)
        }

        this.pip_group.add(singlepip);
    }

    getAlertCounter (_index) {

        let counter = 0, i = _index;
        window.CONFIG.data.taskalert_data.map((alerts) => {
            if (alerts.task_id === i) counter++;
        });

        return counter;
    }

    createIndividualTask (_taskdata, _copy, _index) {

        let taskdata = _taskdata, copy = _copy, index = _index;
        let gap = index * 960;
        let avatar = this.scene.add.sprite(240 + gap, 180, "gamesprites", copy.character + "_115x115.png");

        let btn1, btn2, y1, y2;
        let btnx = 240, btny = 270;

        let chatContainer = this.scene.add.container(gap, 0)

        this.taskcontent_container.add(chatContainer)

        if (taskdata.t2_open) {
            chatContainer.y = -350;
            btn1 = new AlphaButton(this.scene, 240 + gap, btny, "task1_complete.png");
            btn2 = (taskdata.t2_complete) ? 
                new AlphaButton(this.scene, 240 + gap, btny + 68, "task2_complete.png") :
                new AlphaButton(this.scene, 240 + gap, btny + 68, "task2_incomplete.png");

            btn1.tint = 0x777777;

            btn1.on("pointerdown", () => {
                let container = this.chatArray[index];

                this.scene.tweens.add({
                    targets: container,
                    y: 0,
                    duration: 300,
                    ease: 'Quad.easeInOut'
                }); 

                btn1.clearTint();
                btn2.tint = 0x777777;
            })
            btn2.on("pointerdown", () => {

                let container = this.chatArray[index];

                this.scene.tweens.add({
                    targets: container,
                    y: -350,
                    duration: 300,
                    ease: 'Quad.easeInOut'
                });

                btn2.clearTint();
                btn1.tint = 0x777777;
            })

            y1 = this.createOverView(copy.task_one_overview, 330, 150, chatContainer);
            this.createObjective(this.copy.task_one, copy.task_one_objective, 350, y1, chatContainer);

            y2 = this.createOverView(copy.task_two_overview, 330, 500, chatContainer);
            this.createObjective(this.copy.task_two, copy.task_two_objective, 350, y2, chatContainer);
        }

        if (!taskdata.t2_open && taskdata.t1_open) {
            btn1 = (taskdata.t1_complete) ? 
                this.scene.add.sprite(240 + gap, btny, "gamesprites", "task1_complete.png") :
                this.scene.add.sprite(240 + gap, btny, "gamesprites", "task1_incomplete.png");

            btn2 = this.scene.add.sprite(240 + gap, btny + 68, "gamesprites", "task2_incomplete.png");

            btn2.alpha = 0;

            y1 = this.createOverView(copy.task_one_overview, 330, 150, chatContainer);
            this.createObjective(this.copy.task_one, copy.task_one_objective, 350, y1, chatContainer);
        }

        if (!taskdata.t1_open) {
            btn1 = this.scene.add.sprite(240 + gap, btny, "gamesprites", "task1_incomplete.png");
            btn2 = this.scene.add.sprite(240 + gap, btny + 68, "gamesprites", "task2_incomplete.png");

            btn1.alpha = btn2.alpha = 0;
        }

        this.taskcontent_container.add([
            avatar,
            btn1,
            btn2
        ]);

        this.chatArray.push(chatContainer)
    }

    createObjective (_title, _copy, _x, _y, container) {
        if (!this.isOpen) return;

        let title = new MyText(this.scene, _x + 10, _y, _title, STYLE_taskbubbletext_overview).setOrigin(0);
        let obj = new MyText(this.scene, _x + 20, title.y + title.height + 10, _copy, STYLE_taskbubbletext_objective).setOrigin(0);
        let pin = this.scene.add.sprite(obj.x - 5, obj.y + 15, "gamesprites", "task_pin.png").setOrigin(1);
        let bg = this.scene.add.rectangle(title.x - 24, title.y - 24, obj.width + 58, title.height + obj.height + 58, 0xffffff).setOrigin(0);
        bg.setStrokeStyle(4, 0x000000);
        container.add([bg, title, obj, pin]);
    }

    createOverView (_copy, _x, _y, container) {

        if (!this.isOpen) return;

        let speech = new MyText(this.scene, _x, _y, _copy, STYLE_taskbubbletext_overview).setOrigin(0);
        let x = speech.x - 24;
        
        let width = speech.width + 24
        let height = speech.height + 24;
        let y = speech.y - 24

        this.borders = [
            this.scene.add.image(x, y, "gamesprites", 'bub_tl.png').setOrigin(0),
            this.scene.add.image(x + width, y, "gamesprites", 'bub_tr.png').setOrigin(0),
            this.scene.add.image(x + width, y + height, "gamesprites", 'bub_br.png').setOrigin(0),
            this.scene.add.image(x, y + height, "gamesprites", 'bub_bl.png').setOrigin(0),
            this.scene.add.tileSprite(x + 24, y, width - 24, 24, "gamesprites", 'bub_t.png').setOrigin(0),
            this.scene.add.tileSprite(x + 24, y + height, width - 24, 24, "gamesprites", 'bub_b.png').setOrigin(0),
            this.scene.add.tileSprite(x, y + 24, 24, height - 24, "gamesprites", 'bub_l.png').setOrigin(0),
            this.scene.add.tileSprite(x + width, y + 24, 24, height - 24, "gamesprites", 'bub_r.png').setOrigin(0),
            this.scene.add.tileSprite(x + 22, y + 22, width - 20, height - 20, "gamesprites", 'bub_c.png').setOrigin(0)
        ];

        // Add all of the above to this sprite
        this.borders.map((item) => {
            item.tint = 0xd1ffc8;
           // item.id = _index;
            container.add(item);
        });

      //  let tail = this.scene.add.sprite(x, y + height, "gamesprites", "speech_tail.png").setOrigin(0.5,0);

        container.add([
            speech
        ])
        return y + height + 60;
    }

    closeScreen () {
            
        this.isOpen = false;

        this.bg.destroyMe();
        
        this.phonebg.destroyPhoneBg();

        this.furniture_container.destroy();
        this.taskcontrol_container.destroy();
        this.taskcontent_container.destroy();
        this.mapcontent_container.destroy();
    }
}