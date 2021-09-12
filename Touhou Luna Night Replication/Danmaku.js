class Danmaku{

  // input required
  sprite;
  direction;
  
  mirrorX = 1;
  // self property
  speed;

  life = 1;

  constructor(x,y,directionX, directionY){
    this.sprite = createSprite(x,y);
    this.sprite.rotateToDirection = true;
    this.sprite.scale = 3;
    this.direction = new p5.Vector(directionX, directionY);
  }

  drawDanmaku(){
    this.sprite.setSpeed(this.speed, this.direction.heading() * 180 / Math.PI); //move
    this.collisionCheck();
    drawSprite(this.sprite);
  }


  // need to override
  collisionCheck(){
  }
  loadAnimation(){}

  
  debug(){
    this.sprite.debug = drawDebugUI;
  }
}


class Knife extends Danmaku{
  static fatal = false;
  fatalTimer = 0;

  constructor(x, y,directionX, directionY){
    super(x, y,directionX, directionY);
    this.speed = 25;
    this.target = meilin.sprite;
    this.loadAnimation();
  }

  drawDanmaku(){
    this.debug();

    this.mirrorX = ((this.direction.heading() * 180 / Math.PI) > 90 && (this.direction.heading() * 180 / Math.PI) < 270) ? -1 : 1;
    this.sprite.rotateToDirection = false;

    if (PlayerInput.instance.timeStop){
      this.sprite.setSpeed(0);
      this.sprite.animation.stop();
    }
    else{
      this.sprite.setSpeed(this.speed, this.direction.heading() * 180 / Math.PI); //move
      this.sprite.animation.play();
      this.collisionCheck();
      this.updateAnimation();
    }
    this.sprite.mirrorX(this.mirrorX);
    this.updateTimer();
    drawSprite(this.sprite);
  }

  collisionCheck(){
    if (!EnemyController.getInstance().immortal){ 
      this.sprite.collide(this.target, this.tryDoDamage);
    }
    this.sprite.collide(ground);
    this.sprite.collide(barrierLeft, function(self, target){
      self.remove();
    });
    this.sprite.collide(barrierRight, function(self, target){
      self.remove();
    });
  }

  tryDoDamage(self, target){
    // 如果在可防守状态，且正面受到攻击，则不造成伤害，除非该弹幕必中
    // 如果已经进入防守状态，且正面受到攻击，则不造成伤害
    if (EnemyController.instance.guard && !Knife.fatal && self.mirrorX() == meilin.sprite.mirrorX() || meilin.sprite.getAnimationLabel() == 'gurd' && self.mirrorX() == meilin.sprite.mirrorX()) {

      meilin.sprite.changeAnimation('gurd');
      EnemyController.instance.guardCount = 0;

    }
    else{
      meilin.hit(6);
    }
    self.remove();
  }
  
  updateTimer(){
    if (pi.timeStopEnd){
      Knife.fatal = true;
      this.fatalTimer = 0;
    }
    if (Knife.fatal){
      this.fatalTimer += 1;
    }
    if (this.fatalTimer > 20){
      Knife.fatal = false;
      this.fatalTimer = 0;
    }
  }

  loadAnimation(){
    this.sprite.addAnimation('default', 'Materials/Sakuya Izayoi/knife.png');
    this.sprite.changeAnimation('default');
  }
  updateAnimation(){
  }
}

class magicBall extends Danmaku{
  

  target = sakuya.sprite;
  speed = 12;
  constructor(x, y,directionX, directionY){
    super(x, y,directionX, directionY);
    this.sprite.mirrorX(-1);
    this.sprite.mirrorY(-1);
    this.loadAnimation();
    this.sprite.setCollider('rectangle', 0, 0, 56, 32)
  }

  drawDanmaku(){
    this.debug();
    if (PlayerInput.instance.timeStop){
      this.sprite.setSpeed(0);
      this.sprite.animation.stop();
    }
    else{
      this.sprite.setSpeed(this.speed, this.direction.heading() * 180 / Math.PI); //move
      this.sprite.animation.play();
    }
    this.collisionCheck();// 必须放在updateAnim之前 否则报错
    this.updateAnimation();
    drawSprite(this.sprite);
  }

  collisionCheck(){
    // damage
    if (this.sprite.overlapPoint(this.target.position.x, this.target.position.y)){
      this.doDamage();
    }
    // ground
    if (ground.overlapPoint(this.sprite.position.x, this.sprite.position.y + this.sprite.animation.getHeight() / 2)){
      this.sprite.changeAnimation('des');
    }
    // edge
    if (this.sprite.position.x < camera.position.x - width / 2 - 200 || this.sprite.position.x > camera.position.x + width / 2 + 200){
      this.sprite.changeAnimation('des');
    }
  }

  doDamage(){
    if (!pc.immortal && !pc.miss){
      sakuya.hit(25);
      if (!pi.timeStop){
        this.sprite.changeAnimation('des');
      }
    }
  }

  updateAnimation(){
    var label = this.sprite.getAnimationLabel()
    var currentAnimation = this.sprite.animation;
    switch (label) {
      case 'des':
        this.sprite.setSpeed(0);
        if (currentAnimation.getFrame() == currentAnimation.getLastFrame()){
          this.sprite = null;
        }
        break;
    }
  }

  loadAnimation(){
    this.sprite.addAnimation('fly', 'Materials/Hong Meiling/honmeirin_bullet_0.png', 'Materials/Hong Meiling/honmeirin_bullet_1.png',
    'Materials/Hong Meiling/honmeirin_bullet_2.png', 'Materials/Hong Meiling/honmeirin_bullet_3.png',
    'Materials/Hong Meiling/honmeirin_bullet_4.png', 'Materials/Hong Meiling/honmeirin_bullet_5.png',
    'Materials/Hong Meiling/honmeirin_bullet_6.png', 'Materials/Hong Meiling/honmeirin_bullet_7.png');
    this.sprite.changeAnimation('fly');

    this.sprite.addAnimation('des', 'Materials/Hong Meiling/honmeirin_bullet_ring_b_0.png', 'Materials/Hong Meiling/honmeirin_bullet_ring_b_1.png',
    'Materials/Hong Meiling/honmeirin_bullet_ring_b_2.png', 'Materials/Hong Meiling/honmeirin_bullet_ring_b_3.png',
    'Materials/Hong Meiling/honmeirin_bullet_ring_b_4.png', 'Materials/Hong Meiling/honmeirin_bullet_ring_b_5.png',
    'Materials/Hong Meiling/honmeirin_bullet_ring_b_6.png', 'Materials/Hong Meiling/honmeirin_bullet_ring_b_7.png')
    this.sprite.changeAnimation('des');
    this.sprite.animation.looping = false;
    this.sprite.animation.frameDelay = 2;
    
    this.sprite.changeAnimation('fly');
  }
}

class bigMagicBall extends Danmaku{
  
  
  constructor(x, y,directionX, directionY){
    super(x, y,directionX, directionY);
    this.speed = 35;
    this.sprite.mirrorX(-1);
    this.target = sakuya.sprite;
    this.loadAnimation();
  }

  drawDanmaku(){
    this.debug();
    if (PlayerInput.instance.timeStop){
      this.sprite.setSpeed(0);
      this.sprite.animation.stop();
    }
    else{
      this.sprite.setSpeed(this.speed, this.direction.heading() * 180 / Math.PI); //move
      this.sprite.animation.play();
    }
    this.collisionCheck();
    this.updateAnimation();
    drawSprite(this.sprite);
  }

  collisionCheck(){
    // damage
    if (this.sprite.overlapPoint(this.target.position.x, this.target.position.y)){
      this.doDamage();
    }
    // edge
    if (this.sprite.position.x < camera.position.x - width / 2 - 600 || this.sprite.position.x > camera.position.x + width / 2 + 600){
      this.sprite.changeAnimation('des');
    }
  }

  doDamage(self, target){
    if (!pc.immortal && !pc.miss){
      sakuya.hit(50);
      if (!pi.timeStop){
        this.sprite.changeAnimation('des');
      }
    }
  }

  loadAnimation(){
    this.sprite.addAnimation('big', 'Materials/Hong Meiling/honmeirin_bullet_big_0.png', 'Materials/Hong Meiling/honmeirin_bullet_big_1.png',
    'Materials/Hong Meiling/honmeirin_bullet_big_2.png', 'Materials/Hong Meiling/honmeirin_bullet_big_3.png',
    'Materials/Hong Meiling/honmeirin_bullet_big_4.png', 'Materials/Hong Meiling/honmeirin_bullet_big_5.png',
    'Materials/Hong Meiling/honmeirin_bullet_big_6.png', 'Materials/Hong Meiling/honmeirin_bullet_big_7.png');
    this.sprite.changeAnimation('big');

    this.sprite.addAnimation('des', 'Materials/Hong Meiling/honmeirin_bullet_des_0.png', 'Materials/Hong Meiling/honmeirin_bullet_des_1.png',
    'Materials/Hong Meiling/honmeirin_bullet_des_2.png', 'Materials/Hong Meiling/honmeirin_bullet_des_3.png',
    'Materials/Hong Meiling/honmeirin_bullet_des_4.png');
    this.sprite.changeAnimation('des');
    this.sprite.animation.looping = false;
    
    this.sprite.changeAnimation('big');
  }

  updateAnimation(){
    var label = this.sprite.getAnimationLabel()
    var currentAnimation = this.sprite.animation;
    switch (label) {
      case 'des':
        this.sprite.setSpeed(0);
        if (currentAnimation.getFrame() == currentAnimation.getLastFrame()){
          this.sprite = null;
        }
        break;
    }
  }
}
