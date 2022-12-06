

export function callTaskInitiator(_scene_id, _location) {

	let scene = _scene_id;
	let location = _location

	//. ADDING IZZY LIZARD
	// if in lisa room and lucy t1 complete try adding izzy lizard
	if (window.CONFIG.data.task_data[1].t1_open && scene === 114) {
		window.MANAGERS.taskManager.setCurrentTask(1);
		window.MANAGERS.taskManager.currenttask.addIzzy();
	}


	// LISA TASK 1
	if (!window.CONFIG.data.task_data[0].t1_open) {
		window.MANAGERS.taskManager.setCurrentTask(0);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	// lUCY TASK 1
	if (!window.CONFIG.data.task_data[1].t1_open) {
		window.MANAGERS.taskManager.setCurrentTask(1);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	//LOLA TASK 1
	if (!window.CONFIG.data.task_data[2].t1_open && window.CONFIG.data.task_data[1].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(2);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	// LANA TASK 1
	if (!window.CONFIG.data.task_data[3].t1_open && window.CONFIG.data.task_data[0].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(3);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	//LYNN TASK 1
	if (!window.CONFIG.data.task_data[4].t1_open && window.CONFIG.data.task_data[3].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(4);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	// LUAN TASK 1
	if (!window.CONFIG.data.task_data[5].t1_open && window.CONFIG.data.task_data[2].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(5);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	// LUNA TASK 1
	if (!window.CONFIG.data.task_data[6].t1_open && window.CONFIG.data.task_data[4].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(6);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}

	//LENI TASK 1
	if (!window.CONFIG.data.task_data[7].t1_open && window.CONFIG.data.task_data[6].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(7);
		window.MANAGERS.taskManager.currenttask.setupTaskOne();
		return;
	}




	// LISA TASK 2
	if (window.CONFIG.data.task_data[0].t1_complete && !window.CONFIG.data.task_data[0].t2_open && window.CONFIG.data.task_data[7].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(0);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LUCY TASK 2
	if (!window.CONFIG.data.task_data[1].t2_open && window.CONFIG.data.task_data[1].t1_complete && window.CONFIG.data.task_data[5].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(1);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LOLA TASK 2 
	if (!window.CONFIG.data.task_data[2].t2_open && window.CONFIG.data.task_data[2].t1_complete && window.CONFIG.data.task_data[0].t2_open && location === 0) {
		window.MANAGERS.taskManager.setCurrentTask(2);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LANA TASK 2
	if (!window.CONFIG.data.task_data[3].t2_open && window.CONFIG.data.task_data[3].t1_complete && window.CONFIG.data.task_data[6].t1_complete) {
		window.MANAGERS.taskManager.setCurrentTask(3);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LYNN TASK 2
	if (window.CONFIG.data.task_data[4].t1_complete && !window.CONFIG.data.task_data[4].t2_open) {
		window.MANAGERS.taskManager.setCurrentTask(4);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LUAN TASK 2
	if (window.CONFIG.data.task_data[5].t1_complete && !window.CONFIG.data.task_data[5].t2_open && window.CONFIG.data.task_data[2].t2_complete) {
		window.MANAGERS.taskManager.setCurrentTask(5);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	//LUNA TASK 2
	if (!window.CONFIG.data.task_data[6].t2_open && window.CONFIG.data.task_data[6].t1_complete && window.CONFIG.data.task_data[4].t2_complete) {
		window.MANAGERS.taskManager.setCurrentTask(6);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}

	// LENI TASK 2 
	if (!window.CONFIG.data.task_data[7].t2_open && window.CONFIG.data.task_data[7].t1_complete && window.CONFIG.data.task_data[5].t2_complete) {
		window.MANAGERS.taskManager.setCurrentTask(7);
		window.MANAGERS.taskManager.currenttask.setupTaskTwo();
		return;
	}
}


// export function callTaskInitiator(_scene_id) {
// 	switch (_scene_id) {
// 		// LISA TASK 1
// 		//open lisa task 1 when entering park
// 		case 0 :
// 			if (!window.CONFIG.data.task_data[0].t1_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(0);
// 				window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 			}
// 			// LYNN TASK 2
// 			if (window.CONFIG.data.task_data[4].t1_complete && !window.CONFIG.data.task_data[4].t2_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(4);
// 				window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 			}
// 		break;
		
// 		case 3 :
// 			// LANA TASK 2
// 			// open lana t2 if entering park picnic area and t1 complete
// 			if (!window.CONFIG.data.task_data[3].t2_open && window.CONFIG.data.task_data[3].t1_complete) {
// 				window.MANAGERS.taskManager.setCurrentTask(3);
// 				window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 			}
// 		break;
// 		// LISA TASK 2
// 		// open lisa t2 if at clydes and lola task open and lisa t1 complete
// 		case 401 :
// 			if (window.CONFIG.data.task_data[2].t2_open && window.CONFIG.data.task_data[0].t1_complete && !window.CONFIG.data.task_data[0].t2_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(0);
// 				window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 			}
// 		break;
// 		// LUCY TASK 1 & 2
// 		// open lucy task 1 when entering loud house
// 		// open lucy task 2 if t1 complete and Luan task 1 complete
// 		case 100 :
// 			if (!window.CONFIG.data.task_data[1].t1_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(1);
// 				window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 			}
// 			if (!window.CONFIG.data.task_data[1].t2_open && window.CONFIG.data.task_data[5].t1_complete && window.CONFIG.data.task_data[1].t1_complete) {
// 				window.MANAGERS.taskManager.setCurrentTask(1);
// 				window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 			}
// 		break;
// 		//LYNN TASK 1
// 		// open lola task 1 when leaving lucy room and lucy t1 complete
// 		case 105 :
// 		if (!window.CONFIG.data.task_data[4].t1_open) {
// 			window.MANAGERS.taskManager.setCurrentTask(4);
// 			window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 		}
// 		break;
// 		//LOLA TASK 1
// 		// open lola task 1 when leaving lucy room and lucy t1 complete
// 		case 111 :
// 		if (!window.CONFIG.data.task_data[2].t1_open && window.CONFIG.data.task_data[1].t1_complete) {
// 			window.MANAGERS.taskManager.setCurrentTask(2);
// 			window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 		}
// 		break;
// 		// LENI TASK 2 
// 		//when entering flips interior
// 		case 203 :
// 		if (!window.CONFIG.data.task_data[7].t2_open && window.CONFIG.data.task_data[7].t1_complete && window.CONFIG.data.task_data[4].t1_complete) {
// 			window.MANAGERS.taskManager.setCurrentTask(7);
// 			window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 		}
// 		break;
// 		// LOLA TASK 2 
// 		//when entering flips Lola t1 complete, t2 closed and lisa t1 complete
// 		case 200 :
// 		if (!window.CONFIG.data.task_data[2].t2_open && window.CONFIG.data.task_data[2].t1_complete && window.CONFIG.data.task_data[0].t1_complete) {
// 			window.MANAGERS.taskManager.setCurrentTask(2);
// 			window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 		}
// 		break;
// 		case 500 :
// 			// LANA TASK 1
// 			// open lana t1 if entering park and lisa t1 complete
// 			if (!window.CONFIG.data.task_data[3].t1_open && window.CONFIG.data.task_data[0].t1_complete) {
// 				window.MANAGERS.taskManager.setCurrentTask(3);
// 				window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 			}
// 		break;
// 		//. ADDING IZZY LIZARD
// 		// if in lisa room and lucy t1 complete try adding izzy lizard
// 		case 114 :
// 			if (window.CONFIG.data.task_data[1].t1_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(1);
// 				window.MANAGERS.taskManager.currenttask.addIzzy();
// 			}
// 		break;
// 		// LUAN TASK 1
// 		// if entering School and lola t1 complete
// 		case 300 :
// 			if (window.CONFIG.data.task_data[2].t1_complete && !window.CONFIG.data.task_data[5].t1_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(5);
// 				window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 			}
// 		break;
// 		//LUNA TASK 2
// 		// open lola task 1 when leaving lucy room and lucy t1 complete
// 		case 400 :
// 		if (!window.CONFIG.data.task_data[6].t2_open && window.CONFIG.data.task_data[6].t1_complete && window.CONFIG.data.task_data[1].t2_complete) {
// 			window.MANAGERS.taskManager.setCurrentTask(6);
// 			window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 		}
// 		// LUAN TASK 2
// 		// if entering lynns and lola t2 complete
// 		case 600 :
// 			if (window.CONFIG.data.task_data[2].t2_complete && window.CONFIG.data.task_data[5].t1_complete && !window.CONFIG.data.task_data[5].t2_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(5);
// 				window.MANAGERS.taskManager.currenttask.setupTaskTwo();
// 			}
// 		break;
// 		// LUNA TASK 1
// 		// if entering burpin and lola task 1 open
// 		case 700 :
// 			if (window.CONFIG.data.task_data[2].t1_open && !window.CONFIG.data.task_data[6].t1_open) {
// 				window.MANAGERS.taskManager.setCurrentTask(6);
// 				window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 			}
// 		break;
// 		//LENI TASK 1
// 		// CALL WHEN ENTERING school corridor
// 		case 302 :
// 		if (!window.CONFIG.data.task_data[7].t1_open) {
// 			window.MANAGERS.taskManager.setCurrentTask(7);
// 			window.MANAGERS.taskManager.currenttask.setupTaskOne();
// 		}
// 		break;
// 	}
// }


