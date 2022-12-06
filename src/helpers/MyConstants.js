
// SCENES

export const STYLE_titlescenetext = {
	fontSize: 14,
	color: '#FFFFFF',
	stroke: '#000000',
    strokeThickness: 5,
}

export const STYLE_loaderscenetext = {
	fontSize: 60,
	color: '#FFFFFF',
	stroke: '#000000',
    strokeThickness: 6,
}

// CONTAINERS

export const STYLE_h1text = {
	fontSize: 40,
	color: '#ffffff',
	align: 'center',
	stroke: '#000000',
    strokeThickness: 6,
}


export const STYLE_completetitle_text = {
	fontSize: 60,
	color: '#ffffff',
	align: 'center',
	stroke: '#000000',
    strokeThickness: 6
}
export const STYLE_completepara_text = {
	fontSize: 36,
	color: '#ffffff',
	align: 'center',
	stroke: '#000000',
    strokeThickness: 6,
	wordwrap: 650
}

export const STYLE_loribubbletext = {
	fontSize: 40,
	color: '#000000',
	align: 'left',
	wordwrap: 360
}

export const STYLE_taskcomplete = {
	fontSize: 60,
	color: '#ffffff',
	align: 'center',
	stroke: '#000000',
    strokeThickness: 6,
}

export const STYLE_charchangetext = {
	fontSize: 72,
	color: '#ffffff',
	align: 'center',
	stroke: '#000000',
    strokeThickness: 6,
}

export const STYLE_inputtext = {
	fontSize: 28,
	color: '#000000',
	align: 'center'
}

export const STYLE_buttontext = {
	fontSize: 24,
	color: '#000000',
	align: 'center'
}

export const STYLE_tooltiptext = {
	fontSize: 16,
	color: '#000000'
}

export const STYLE_dialoguetext = {
	fontSize: 18,
	color: '#000000',
	wordwrap: 300
}

export const STYLE_alertcountertext = {
	fontSize: 14,
	color: '#ffffff',
	fontFamily: 'roboto_medium',
	align: 'center'
}
export const STYLE_alertmaintext = {
	fontSize: 18,
	color: '#ffffff',
	fontFamily: 'roboto_medium',
	align: 'center'
}

export const STYLE_taskbubbletext_overview = {
	fontSize: 16,
	color: '#000000',
	wordwrap: 420
}
export const STYLE_taskbubbletext_objective = {
	fontSize: 16,
	color: '#000000',
	wordwrap: 370
}

export const STYLE_taskbubbletext_task = {
	fontSize: 16,
	color: '#000000',
	wordwrap: 345
}

export const STYLE_hinttext = {
	fontSize: 24,
	color: '#000000',
	wordwrap: 500
}

export const STYLE_tutorialtitletext = {
	fontSize: 30,
	color: '#000000',
	wordwrap: 480,
	align: 'center'
}

export const STYLE_tutorialdesctext = {
	fontSize: 18,
	color: '#000000',
	wordwrap: 540
}

export const STYLE_timertext = {
	fontSize: 48,
	color: '#FFFFFF',
	fontFamily: 'roboto_black',
	stroke: '#000000',
    strokeThickness: 6,
}

export const STYLE_iteminfotitle = {
	fontSize: 24,
	color: '#ffffff',
	wordwrap: 270,
	align: "center",
}

export const STYLE_iteminfodesc = {
	fontSize: 18,
	color: '#000000',
	wordwrap: 270,
	align: "center"
}

export const STYLE_itemcount = {
	fontSize: 48,
	color: '#FFFFFF',
	fontFamily: 'roboto_black',
	stroke: '#000000',
    strokeThickness: 6,
}

export const STYLE_padlock = {
	fontSize: 48,
	color: '#FFFFFF',
	fontFamily: 'roboto_black',
	stroke: '#000000',
    strokeThickness: 6,
}

export const STYLE_bosscounter = {
	fontSize: 60,
	color: '#FFFFFF',
	fontFamily: 'roboto_black',
	stroke: '#000000',
    strokeThickness: 6,
}

// PLAYER CONSTANTS

export const playervars = {
	showTutorial: true,
	codeUnlocked: false,
	muteSound: false,
	currentLocation: 0,
	currentScene: 0,
	previousScene:-1,
	currentCharacter: 0,
	taskScreen: 0,
	currentAlert: -1,
	playerScale: 1,
	crawl: false,
	velocity: 28,
	distance: 0,
	level: 'main',
	x: 0,
	y: 0,
	inventoryPosition: 0
}

export const charactervars = [
	{ id: 0, ext: "_lincoln", color: "0x829fc9" },
    { id: 1, ext: "_clyde", color: "0xa3a1cf"  },
    { id: 2, ext: "_ronnie", color: "0xf0b7e0" },
    { id: 3, ext: "_bobby", color: "0xd4e0b0" }
]

export const sistervars = [
	{ id: 0, icon: "lisa" },
	{ id: 1, icon: "lucy" },
	{ id: 2, icon: "lola" },
	{ id: 3, icon: "lana" },
	{ id: 4, icon: "lynn" },
	{ id: 5, icon: "luan" },
	{ id: 6, icon: "luna" },
	{ id: 7, icon: "leni" }
]
