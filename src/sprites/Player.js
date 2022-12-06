import { getSceneContent } from '../helpers/DataFactory';
// import { window.CONFIG.data.playervars } from "../helpers/MyConstants";

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.matter.add.sprite(x, y, 'gamesprites', 'bub_c.png');
    this.character = this.scene.add.sprite(x, y, 'lincoln_sprites', 'lincolnstop/0001.png').setOrigin(0.5, 1).setDepth(10);
    this.sprite.visible = false;
    const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
    const { width: w, height: h } = this.sprite;
    const bodyFront = Bodies.circle(x, y, 20);

    this.oldPhase = -1;
    this.newPhase = 0;

    this.oldx = this.sprite.x;
    this.oldy = this.sprite.y;
    
    this.lincolnArray = [
      'lincoln_stop',
      'lincoln_left',
      'lincoln_right',
      'lincoln_exit',
      'lincoln_back',
      'lincoln_stair_left',
      'lincoln_stair_right',
      'lincoln_crawl',
      'lincoln_crawl_front'
    ]
    this.clydeArray = [
      'clyde_stop',
      'clyde_left',
      'clyde_right',
      'clyde_exit',
      'clyde_back',
      'clyde_stair_left',
      'clyde_stair_right',
      'clyde_crawl'
    ]
    this.ronnieArray = [
      'ronnie_stop',
      'ronnie_left',
      'ronnie_right',
      'ronnie_exit',
      'ronnie_back',
      'ronnie_stair_left',
      'ronnie_stair_right',
      'clyde_crawl'
    ]
    this.bobbyArray = [
      'bobby_stop',
      'bobby_left',
      'bobby_right',
      'bobby_stop',
      'bobby_back',
      'bobby_stair_left',
      'bobby_stair_right',
      'lincoln_crawl'
    ]

    this.animationArray = [
      this.lincolnArray,
      this.clydeArray,
      this.ronnieArray,
      this.bobbyArray
    ]

    this.sensors = {
      main: Bodies.circle(x, y , 20, { isSensor: true, label: "PLAYER" })
    };

    this.compoundBody = Body.create({
      parts: [bodyFront, this.sensors.main],
      frictionStatic: 1,
      frictionAir: 0.7,
      friction: 0.7,
      density: 1
    });

    this.sprite
      .setScale(1)
      .setOrigin(0.5, 1)
      .setPosition(x, y)
      .setExistingBody(this.compoundBody)
      .setBounce(0)
      .setFriction(0)
      .setFixedRotation(0);

    this.scene.events.on("update", this.update, this);
  }

  checkInput (_left, _right, _up, _down, _space) {

      let left = _left, right = _right, up = _up, down = _down, space = _space;

      if (space) return;

      if (!left && !right && !up && !down && !this.scene.touchPadDown[0] && !this.scene.touchPadDown[1] && !this.scene.touchPadDown[2] && !this.scene.touchPadDown[3]) this.newPhase = 0;

      if (this.scene.isInteracting === 1) this.newPhase = this.getExitStance();
      if (this.scene.isInteracting === 2) this.newPhase = 3;

      if (left || this.scene.touchPadDown[1]) {
          this.moveLeft();
          this.newPhase = 1;
      } else if (right || this.scene.touchPadDown[2]) {
          this.moveRight();
          this.newPhase = 2;
      }

      if (up || this.scene.touchPadDown[0]) {
          this.moveUp();
          this.newPhase = 1;
          if (right) this.newPhase = 2;
            
      } else if (down || this.scene.touchPadDown[3]) {
          this.moveDown();
          this.newPhase = 2;
          if (left || this.scene.touchPadDown[1]) this.newPhase = 1;
      }

      this.character.scaleX = this.character.scaleY = (this.sprite.y / 560) * window.CONFIG.data.playervars.playerScale;
      if (window.CONFIG.data.playervars.crawl && this.newPhase === 2) this.newPhase = 7;
      if (window.CONFIG.data.playervars.crawl && this.newPhase === 1) { this.character.scaleX *= -1; this.newPhase = 7; }
      if (window.CONFIG.data.playervars.crawl && this.newPhase === 0) { this.newPhase = 8; }
      if (window.CONFIG.data.playervars.crawl && this.newPhase === 3) { this.newPhase = 8; }

      if (this.oldPhase !== this.newPhase) {
        this.oldPhase = this.newPhase;
        this.character.play(this.animationArray[window.CONFIG.data.playervars.currentCharacter][this.newPhase]);
      }

      this.character.x = this.sprite.x;
      this.character.y = this.sprite.y;

      this.calculateDistance();
  }

  changePlayerStance (_val) {
    this.newPhase = _val;
    this.oldPhase = -1;
  }

  getExitStance () {
      let exit_id = this.scene.registry.get("current_exit_id");
      let exit = getSceneContent(this.scene.currentScene, 'exits', exit_id);

      return exit.stance;
  }

  moveLeft () {
    this.sprite.setVelocityX(-window.CONFIG.data.playervars.velocity);
    window.MANAGERS.medalManager.checkMovement();
  }
  moveRight () {
    this.sprite.setVelocityX(window.CONFIG.data.playervars.velocity);
    window.MANAGERS.medalManager.checkMovement();
  }
  moveUp () {
    this.sprite.setVelocityY(-window.CONFIG.data.playervars.velocity);
    window.MANAGERS.medalManager.checkMovement();
  }
  moveDown () {
    this.sprite.setVelocityY(window.CONFIG.data.playervars.velocity);
    window.MANAGERS.medalManager.checkMovement();
    //console.log(this.sprite.x, this.sprite.y)
  }

  calculateDistance () {

    let distx = Math.abs(this.sprite.x - this.oldx);
    let disty = Math.abs(this.sprite.y - this.oldy);

    window.CONFIG.data.playervars.distance += (2 - window.CONFIG.data.playervars.playerScale) * distx;
    window.CONFIG.data.playervars.distance += (2 - window.CONFIG.data.playervars.playerScale) * disty;

    this.oldx = this.sprite.x;
    this.oldy = this.sprite.y;

    window.MANAGERS.medalManager.checkDistance();
  }

  update () {

  }

  onSensorCollide({ bodyA, bodyB, pair }) {
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.top) {
      this.isTouching.crashed = true;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    }
  }
 
  destroyMe() {
    // Event listeners
    this.sprite.destroy();
    this.character.destroy();
  }
}