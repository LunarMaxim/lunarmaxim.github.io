class EnemyController{
  static instance;

  grounded;
  jumpSpeed = 10;
  gravity = 0.5;
  runSpeed = 4;
  risingSpeed = 30;
  landingSpeed = 45;
  
  mirrorX = 1;
  skillCount = 0;
  tenmaCount = 0;
  hadouCount = 0;
  guardCount = 0;
  
  gravityEnabled = false;
  moveFinished = false;
  immortal = false;
  guard = false;
  

  targetPosX;

  static getInstance(){
    if (EnemyController.instance != null){
        return EnemyController.instance;
    }
    return EnemyController.instance = new EnemyController();
  }

  update(){
    if (PlayerInput.instance.timeStop){
      meilin.sprite.setSpeed(0);
      meilin.sprite.animation.stop();
    }
    else{
      this.collisionCheck();
      this.updateGravity();
      this.updateAnimation();
      meilin.sprite.animation.play();
    }



    //meilin.sprite.setDefaultCollider();
  }

  
  collisionCheck(){
    this.grounded = meilin.sprite.collide(ground);
    meilin.sprite.collide(barrierLeft);
    meilin.sprite.collide(barrierRight);
}

  calculateLR(){//转向
    this.mirrorX = (meilin.sprite.position.x > sakuya.sprite.position.x)?1:-1;// 面朝sakuya
    meilin.sprite.mirrorX(this.mirrorX);
  }

  updateGravity(){
    if (this.gravityEnabled){
      if(!this.grounded){
        meilin.sprite.addSpeed(this.gravity, 90);
      }
    }
  }

  run(){
    this.guard = true;
    this.gravityEnabled = true;
    let targetPos = sakuya.sprite.position.x + this.mirrorX * 800;
    let targetDist = targetPos - meilin.sprite.position.x;
      
      // 调整距离 过进拉开 过远拉近
      if (Math.abs(targetDist) > 10 && meilin.sprite.getAnimationLabel() == 'run' && !this.moveFinished){
        meilin.sprite.setSpeed(this.runSpeed, createVector(targetDist, 0).heading() * 180 / Math.PI);
      }
      // 到达平衡点后仍继续走
      else if (meilin.sprite.getAnimationLabel() != 'gurd'){
        this.moveFinished = true;
        meilin.sprite.setSpeed(this.runSpeed, meilin.sprite.getDirection());
      }
      if (drawDebugUI){
        drawArrow(createVector(meilin.sprite.position.x, meilin.sprite.position.y), createVector(targetPos - meilin.sprite.position.x, 0), 'red');
      }
  }

  updateAnimation(){
    var label = meilin.sprite.getAnimationLabel();
    var currentAnimation = meilin.sprite.animation;
    switch (label){
      case 'attack_tame':
        // 蓄力完成后
        this.transitionOnEndFrame(currentAnimation, 'attack');
        break;
      case 'attack':
        // 发射一个球
        this.transitionOnEndFrame(currentAnimation, 'run');
        break;


      case 'jump':
        // 向上冲刺
        meilin.sprite.position.y -= this.jumpSpeed;
        if (meilin.sprite.position.y < 400){
          meilin.sprite.changeAnimation('dash');
        }
        break;
      case 'dash':
        // 空中冲刺
        meilin.sprite.setCollider('rectangle', 0, 0, 70, 40);
        meilin.sprite.setSpeed(this.runSpeed * 3, this.mirrorX == 1? 178: 2);
        if (this.mirrorX == 1){
          if (meilin.sprite.position.x < sakuya.sprite.position.x - 400 || meilin.sprite.position.y > 440){
            meilin.sprite.setSpeed(0);
            this.calculateLR()
            meilin.sprite.changeAnimation('tenma');
          }
        }
        else{
          if (meilin.sprite.position.x > sakuya.sprite.position.x + 400 || meilin.sprite.position.y > 440){
            meilin.sprite.setSpeed(0);
            this.calculateLR()
            meilin.sprite.changeAnimation('tenma');}
        }
        break;

      case 'tenma':
        meilin.sprite.setCollider('rectangle', 0, 0 ,32 , 64);
        // 发射法球 一次循环发射两个
        if (this.tenmaCount < 3){
          meilin.sprite.setSpeed(2, 270);
          if (currentAnimation.getFrame() == 3 && currentAnimation.frameChanged){
            var ball = new magicBall(meilin.sprite.position.x - 120 * this.mirrorX, meilin.sprite.position.y + 30, -this.mirrorX, 0.4);
            balls.loadDanmaku(ball);
            balls.launch();
          }
          
          if (currentAnimation.getFrame() == 7 && currentAnimation.frameChanged){
            
            var ball = new magicBall(meilin.sprite.position.x - 120 * this.mirrorX, meilin.sprite.position.y + 30, -this.mirrorX, 0.8);
            balls.loadDanmaku(ball);
            balls.launch();
          }
          if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
            currentAnimation.rewind();
            meilin.sprite.changeAnimation('tenma');
            this.tenmaCount++;
          }
        }
        // 发射结束 给一个作用力
        else{
          this.tenmaCount = 0;
          meilin.sprite.setSpeed(0);
          meilin.sprite.addSpeed(this.jumpSpeed, this.mirrorX == 1? 325: 235)
          meilin.sprite.changeAnimation('falling');
        }
        break;

      case 'falling':
        // 启用重力 自由落体
        this.gravityEnabled = true;
        if (this.grounded){
          if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
            currentAnimation.rewind();
            meilin.sprite.changeAnimation('run');
            ScreenShake.isshakeCamera = true;
            this.gravityEnabled = false;
            this.moveFinished = false;
            this.calculateLR();
          }
        }
        break;
      
      case 'rising_first':
        meilin.sprite.setCollider('rectangle', 0, 0, 70, 64);
        // 获取冲刺终点
        let leftDashTarget = sakuya.sprite.position.x - 800;
        let rightDashTarget = sakuya.sprite.position.x + 800;
        let dashTarget;
        if (leftDashTarget < barrierLeft.position.x + 200){ // 超出左边屏幕
          dashTarget = rightDashTarget;
        }
        else if (rightDashTarget > barrierRight.position.x - 200){ // 超出右边屏幕
          dashTarget = leftDashTarget;
        }
        else{
          if (sakuya.sprite.position < meilin.sprite.position){ // 向左上方
            dashTarget = leftDashTarget;
          }
          else{
            dashTarget = rightDashTarget;
          }
        }

        if (drawDebugUI){
          fill(0,100,100);
          ellipse(leftDashTarget, 200, 60, 60);
          fill(50,100,100);
          ellipse(rightDashTarget, 200, 60, 60);
        }

        // 冲刺
        meilin.sprite.setSpeed(this.risingSpeed, createVector(dashTarget - meilin.sprite.position.x, 200 - meilin.sprite.position.y).heading() * 180 / Math.PI)
        if (meilin.sprite.position.y < 200){
          meilin.sprite.setSpeed(0);
          meilin.sprite.changeAnimation('rising');
          this.calculateLR();
        }
        break;
      case 'rising':
        var targetPosY = 680; //地面高度
        
        // 记录落地动画开始瞬间玩家所在的位置，进行冲刺
        if (currentAnimation.getFrame() <= 4){
          this.targetPosX = sakuya.sprite.position.x + 200 * (sakuya.sprite.position.x > meilin.sprite.position.x? 1: -1);
        }
        
        if (currentAnimation.getFrame() > 3){
          // 开始向targetPos冲刺
          if (!this.grounded){

            let v0 = createVector(meilin.sprite.position.x, meilin.sprite.position.y)
            let v1 = createVector(this.targetPosX, targetPosY);
            meilin.sprite.setSpeed(this.landingSpeed, v1.sub(v0).heading() * 180 / Math.PI)
          }
          // 着地后
          else if (this.grounded){
            meilin.sprite.setSpeed(0);
            meilin.sprite.animation.rewind()
            meilin.sprite.changeAnimation('landing');
            ScreenShake.isshakeCamera = true;
          }
        }
        
        break;
      case 'landing':
        meilin.sprite.setCollider('rectangle', 0, 0, 32, 64);
        this.transitionOnEndFrame(currentAnimation, 'run');
        break;

      case 'hadou_tame':
        // 蓄力完成后
        if (this.hadouCount < 8){
          if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
            currentAnimation.rewind();
            meilin.sprite.changeAnimation('hadou_tame');
            this.hadouCount++;
          }
        }
        else{
          this.hadouCount = 0;
          meilin.sprite.changeAnimation('hadou');
          ScreenShake.isshakeCamera = true;
        }
        break;
      case 'hadou':
        if (currentAnimation.getFrame() == 0){

          var ball = new bigMagicBall(meilin.sprite.position.x + 120 * this.mirrorX, meilin.sprite.position.y, -this.mirrorX, 0);
          balls.loadDanmaku(ball);
          currentAnimation.nextFrame();
          currentAnimation.play();
        }
        this.transitionOnEndFrame(currentAnimation, 'run');
        break;

      case 'des':
        this.immortal = true;
        this.gravityEnabled = true;
        meilin.sprite.setDefaultCollider();
        this.transitionOnEndFrame(currentAnimation, 'dying');
        break;

      case 'gurd':
        meilin.sprite.setSpeed(0);

        if (this.guardCount < 2){
          if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
            currentAnimation.rewind();
            meilin.sprite.changeAnimation('gurd');
            this.guardCount++;
          }
        }
        if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
          currentAnimation.rewind();
          meilin.sprite.changeAnimation('run');
          this.guardCount = 0;
        }

      case 'run':
        this.gravityEnabled = true;
        this.run();
        switch (this.skillCount){
          case 0:
            this.changeSkill(currentAnimation, 'attack_tame');
            break;
          case 1:
            this.changeSkill(currentAnimation, 'jump');
            break;
          case 2:
            this.changeSkill(currentAnimation, 'rising_first');
            break;
          case 3:
            this.changeSkill(currentAnimation, 'rising_first');
            break;
          case 4:
            this.changeSkill(currentAnimation, 'jump');
            break;
          case 5:
            if (meilin.HP < meilin.HPMax * 0.5){
              this.changeSkill(currentAnimation, 'hadou_tame')
            }
            else{
              this.changeSkill(currentAnimation, 'attack_tame');
            }
            break;
        }

    }
  }

// 有时候要移动场景其他对象 比如捡东西 击退敌人（？）
// moveSpriteTo(sprite, targetX, targetY, speed, accelerate = 0, deadZone = 10){
//   let p0 = createVector(sprite.position.x, sprite.position.y);
//   let p1 = createVector(targetX, targetY);
//   let dir = p1.sub(p0);

//   sprite.setSpeed(speed, dir.heading() * 180 / Math.PI);
//   sprite.addSpeed(accelerate, dir.heading() * 180 / Math.PI);

//   let dist = p1.dist(p2);
//   if (dist < deadZone){
//       sprite.setSpeed(0);
//       print('moveSpriteTo: reached');
//   }
// }
  
  transitionOnEndFrame(currentAnimation, nextAnimation) {
    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
      currentAnimation.rewind();
      meilin.sprite.changeAnimation(nextAnimation);
      if (nextAnimation == 'run'){
        this.moveFinished = false;
        this.calculateLR();
      }
      else if (nextAnimation == 'attack'){
        balls.loadDanmaku(new magicBall(meilin.sprite.position.x + 120 * this.mirrorX, meilin.sprite.position.y, -this.mirrorX, 0));
        balls.launch();
      }
    }
  }

  changeSkill(currentAnimation, nextAnimation) {
    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
      this.guard = false;
      currentAnimation.rewind();
      meilin.sprite.changeAnimation(nextAnimation);
      if (nextAnimation != 'rising_first'){
        this.calculateLR();
      }
      else{
        this.mirrorX = (meilin.sprite.position.x > sakuya.sprite.position.x)?-1:1;
        meilin.sprite.mirrorX(this.mirrorX);
      }
      meilin.sprite.setSpeed(0);
      this.skillCount++;
      if (this.skillCount == 6){
        this.skillCount = 0;
      }
      this.gravityEnabled = false;
    }
  }

  guard(){
    if(meilin.sprite.getAnimationLabel() == 'run'){
      meilin.sprite.animation.rewind();//过渡到盾防的动画
      meilin.sprite.changeAnimation('gurd');
    }
  }

  
}
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}