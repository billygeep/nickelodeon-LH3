
export default class Confetti {
  constructor(scene, x, y) {
    this.scene = scene;

    this.resetconfetti = true;
    this.particlegroup = this.scene.add.group();

    let count = 100, imgtotal = 3, imgfile = 'spark';
        
    this.obj = { 
      scalerange: 1,
      xspeed: 0.05,
      xspeedrange: 0.5,
      yspeed: -0.05,
      yspeedrange: 0.1,
      startx: 1200,
      xstartrange: 960,
      endx: 0,
      xposrange: 1200,
      starty: 0,
      ystartrange: 560,
      endy: 560,
      yposrange: 560,
      myrotation: null,
      rotationspeed: 0.01 
    }

    for (var i = 0; i < count; i++) {

      let thisimg =  imgfile + '_' + Math.ceil(Math.random() * imgtotal) + '.png';

      let img = this.scene.add.sprite(Math.random()*960, 900 + Math.random()*600, 'furniture2', thisimg).setOrigin(0.5, 0.5); //.setScale(this.getScale());
      img.scale = this.getScale(this.obj.scalerange)
      img.setScale(img.scale);
      img.xspeed = -2 + Math.random()*4;
      img.yspeed = 1 + Math.random()*2;
      img.rotation = Math.random()*90;
      img.heightspeed = Math.random()*0.02;
      img.heightswitch = false;
      img.totalheight = img.height;
      img.rotationspeed = -this.obj.rotationspeed + 2 * (Math.random()* this.obj.rotationspeed)
      this.particlegroup.add(img)
    }

    this.scene.events.on("update", this.update, this);
  }
  
  getScale (val) {
    let i = 1 - val;
    return i + Math.random() * val;
  }

  switchOffConfetti () {
    this.resetconfetti = false;
  }

  update() {
    let gameObjects = this.particlegroup.getChildren(); 

    let obj = this.obj

    gameObjects.forEach(particle => {

      particle.x -= (particle.xspeed);
      particle.y += particle.yspeed;
      particle.rotation += particle.rotationspeed
      particle.scaleY -= particle.heightspeed;

      if (particle.x < -100 || particle.x > 1000 || particle.y > 1600) {
        if (!this.resetconfetti) return;
        particle.y = 900;
        particle.x = Math.random()*960;
      }

      if (particle.scaleY < -1) particle.heightspeed = -Math.random()*0.02;
      if (particle.scaleY > 1) particle.heightspeed = Math.random()*0.02;
    })
  }

  destroy() {
    this.scene.events.off("update", this.update, this);
    gameObjects.forEach(particle => {
      particle.destroy();
    });
  }

}