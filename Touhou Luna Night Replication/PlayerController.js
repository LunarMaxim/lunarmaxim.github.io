class PlayerController {
    static instance;

    readyToJump;
    readyToSlide;

    miss = false;
    immortal = false;
    immortalTimer = 0;

    timeStopCount = 0;
    timeStopAnimEnd = false;

    grounded;
    sliding;

    jumpSpeed = 20;
    highJumpGravity = 0.8;
    gravity = 1;
    glidingSpeed = 5;

    runSpeed = 10;

    slideSpeed = 25;
    slideFrac = 0.8;

    currentHorizontalSpeed;
    currentVerticalSpeed = 0;


    pi = PlayerInput.getInstance();

    static getInstance() {
        if (PlayerController.instance != null) {
            return PlayerController.instance;
        }
        return PlayerController.instance = new PlayerController();
    }

    update() {
        this.collisionCheck();
        this.calculatgeLR();
        this.calculateHorizontalSpeed();
        this.calculateVerticalSpeed();
        this.updateAnimation();
        this.timeStopCheck()
        this.updateTimer();
    }

    collisionCheck() {
        this.grounded = sakuya.sprite.collide(ground);
        sakuya.sprite.collide(barrierLeft);
        sakuya.sprite.collide(barrierRight);

        // 如果玩家正在滑铲
        if (PlayerController.getInstance().sliding) {
            // 开始overlap检测
            sakuya.sprite.overlap(meilin.sprite, function () {

                // 如果敌人非无敌状态 且overlap成功 则切换为collide
                if (!EnemyController.instance.immortal && meilin.sprite.getAnimationLabel() != 'rising' && meilin.sprite.getAnimationLabel() != 'landing') {
                    sakuya.sprite.collide(meilin.sprite);
                    if (sakuya.sprite.getAnimationLabel() == 'sliding_loop') {
                        PlayerController.getInstance().currentHorizontalSpeed = 0;
                        meilin.hit(6);
                    }
                }

            });
        }
        else {
            if (sakuya.sprite.overlapPoint(meilin.sprite.position.x, meilin.sprite.position.y + 25)) {

                if (!this.immortal && !this.miss && !EnemyController.instance.immortal) {
                    if (meilin.sprite.getAnimationLabel() != 'rising') {
                        //sakuya.sprite.collide(meilin.sprite);
                        sakuya.hit(11);
                    }
                    else {
                        sakuya.hit(25);
                    }
                }
            }
        }
    }

    calculatgeLR() {
        let lastLR = sakuya.sprite.mirrorX();// 缓存当前朝向
        sakuya.sprite.mirrorX(pi.mirrorX);
        if (lastLR != pi.mirrorX) {// 如果转向 播放转向动画
            if (this.grounded) {
                sakuya.sprite.changeAnimation('run_back');
            }

            sakuya.sprite.animation.rewind();
        }
    }

    updateAnimation() {
        let label = sakuya.sprite.getAnimationLabel();
        let currentAnimation = sakuya.sprite.animation;
        switch (label) {
            case 'jump':
                if (pi.attack) {
                    sakuya.sprite.changeAnimation('jump_attack');
                }
                else if (this.currentVerticalSpeed > 0) {
                    sakuya.sprite.changeAnimation('falling');
                }
                break;

            case 'falling':
                if (pi.attack) {
                    sakuya.sprite.changeAnimation('jump_attack');
                }
                this.transitionOnEndFrame(currentAnimation, 'gliding');
                break;

            case 'gliding':
                //落地
                if (this.grounded) {
                    if (pi.horizontalAxis == 0) {
                        sakuya.sprite.changeAnimation('stop');
                    }
                    else {
                        sakuya.sprite.changeAnimation('run_start');
                    }
                }
                else {
                    if (pi.attack) {
                        sakuya.sprite.changeAnimation('jump_attack');
                    }
                }
                break;
            case 'jump_attack':
                if (pi.attack) {
                    currentAnimation.rewind();
                    sakuya.sprite.changeAnimation('jump_attack');
                }
                else if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                    currentAnimation.rewind();
                    sakuya.sprite.changeAnimation('gliding');
                }

            case 'stop':
                if (this.grounded) {
                    if (pi.attack) {
                        sakuya.sprite.changeAnimation('action');
                    }
                    //下蹲
                    else if (pi.crouch) {
                        sakuya.sprite.changeAnimation('down');
                    }
                    //按下a或d时
                    else if (pi.horizontalAxis != 0) {
                        sakuya.sprite.changeAnimation('run_start');
                    }
                }
                break;

            case 'action':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'action2');
                }
                break;
            case 'action2':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'action3');
                }
                break;
            case 'action3':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'action4');
                }
                break;
            case 'action4':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'action');
                }
                break;

            case 'run_attack1':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'run_attack2');
                }
                break;
            case 'run_attack2':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'run_attack3');
                }
                break;
            case 'run_attack3':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'run_attack4');
                }
                break;
            case 'run_attack4':
                if (this.grounded) {
                    this.tryCombo(currentAnimation, 'run_attack1');
                }
                break;


            case 'run_start':
                //下蹲
                if (pi.crouch) {
                    sakuya.sprite.changeAnimation('down');
                }
                else if (pi.attack && this.grounded) {
                    sakuya.sprite.changeAnimation('run_attack1');
                }
                else if (pi.horizontalAxis == 0) {
                    sakuya.sprite.changeAnimation('run_stop');
                }
                else {
                    this.transitionOnEndFrame(currentAnimation, 'run');
                }
                break;

            case 'run_back':
                //下蹲
                if (pi.crouch) {
                    sakuya.sprite.changeAnimation('down');
                }
                else if (pi.attack && this.grounded) {
                    sakuya.sprite.changeAnimation('run_attack1');
                }
                else if (pi.horizontalAxis == 0) {
                    currentAnimation.rewind();
                    sakuya.sprite.changeAnimation('run_stop')
                }
                else {
                    this.transitionOnEndFrame(currentAnimation, 'run');
                }
                break;

            case 'run':
                //下蹲
                if (pi.crouch) {
                    sakuya.sprite.changeAnimation('down');
                }
                else if (pi.attack && this.grounded) {
                    sakuya.sprite.changeAnimation('run_attack1');
                }
                //停止移动
                else if (pi.horizontalAxis == 0) {
                    sakuya.sprite.changeAnimation('run_stop')
                }
                break;

            case 'run_stop':
                //下蹲
                if (pi.crouch) {
                    sakuya.sprite.changeAnimation('down');
                }
                else if (pi.attack && this.grounded) {
                    sakuya.sprite.changeAnimation('run_attack1');
                }
                //过渡中途又开始跑步
                else if (pi.horizontalAxis != 0) {
                    sakuya.sprite.changeAnimation('run_start');
                }
                else {
                    this.transitionOnEndFrame(currentAnimation, 'stop');
                }
                break;

            case 'down':
                if (pi.attack) {
                    sakuya.sprite.changeAnimation('action');
                }
                //下蹲
                else if (!pi.crouch) {
                    sakuya.sprite.changeAnimation('stop');
                }
                //滑铲
                else if (pi.slide) {
                    sakuya.sprite.changeAnimation('sliding');
                }
                break;

            case 'sliding':
                this.transitionOnEndFrame(currentAnimation, 'sliding_loop');
                break;

            case 'sliding_loop':
                if (!this.sliding) {
                    sakuya.sprite.changeAnimation('down');
                }
                break

            case 'time_stop':
                if (this.timeStopCount < 3) {
                    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                        currentAnimation.rewind();
                        sakuya.sprite.changeAnimation('time_stop');
                        this.timeStopCount++;
                    }
                }
                else {
                    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                        this.timeStopAnimEnd = true;
                        this.pi.inputLocked = false;
                        currentAnimation.rewind();
                        sakuya.sprite.changeAnimation('stop');
                        this.timeStopCount = 0
                    }
                }
                break;

            case 'time_stop_air':
                if (this.timeStopCount < 3) {
                    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                        currentAnimation.rewind();
                        sakuya.sprite.changeAnimation('time_stop_air');
                        this.timeStopCount++;
                    }
                }
                else {
                    if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                        this.timeStopAnimEnd = true;
                        currentAnimation.rewind();
                        this.pi.inputLocked = false;
                        sakuya.sprite.changeAnimation('gliding');
                        this.timeStopCount = 0
                    }
                }
                break;


            case 'damage':
                this.immortal = true;
                pi.inputLocked = true;
                sakuya.sprite.setDefaultCollider();
                sakuya.sprite.addSpeed(15, pi.mirrorX == 1 ? 220 : 320);
                if (this.grounded && currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                    currentAnimation.rewind();
                    sakuya.sprite.changeAnimation('fall_down');
                }
                break;
            case 'fall_down':
                sakuya.sprite.addSpeed(8, pi.mirrorX == 1 ? 180 : 0);
                if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
                    currentAnimation.rewind();
                    sakuya.sprite.changeAnimation('stop');
                    sakuya.sprite.setCollider('rectangle', 0, 0, 32, 64);
                    this.immortal = true;
                    this.immortalTimer = 0;
                    pi.inputLocked = false;
                }
                break;
            case 'die':
                sakuya.sprite.setDefaultCollider();
                pi.inputLocked = true;
                this.immortal = true;
                // if (currentAnimation.getFrame() < 10){
                //     sakuya.sprite.addSpeed(3, pi.mirrorX?180:0);
                // }
                break;
        }

    }

    updateTimer() {
        this.ImmortalTimer();
    }

    ImmortalTimer() {
        var flashTime = 4;
        // 开始计时条件
        if (this.immortal && sakuya.sprite.getAnimationLabel() != 'die') {
            this.immortalTimer += 1;
            if (this.immortalTimer == 40 || this.immortalTimer == 80 || this.immortalTimer == 120 || this.immortalTimer == 160) {
                sakuya.sprite.visible = false;
            }
            if (this.immortalTimer == 40 + flashTime || this.immortalTimer == 80 + flashTime || this.immortalTimer == 120 + flashTime || this.immortalTimer == 160 + flashTime) {
                sakuya.sprite.visible = true;
            }
            if (this.immortalTimer >= 180) {
                this.immortal = false;
                this.immortalTimer = 0;
            }
        }
        else if (!this.immortal && sakuya.sprite.getAnimationLabel() != 'die') {
            this.immortalTimer = 0;
        }
    }


    timeStopCheck() {
        // 切换动画
        if (this.pi.timeStopStart) {
            this.pi.inputLocked = true;
            this.currentHorizontalSpeed = 0;
            this.currentVerticalSpeed = 0;
            if (this.grounded) {
                sakuya.sprite.changeAnimation('time_stop');
            }
            else {
                sakuya.sprite.changeAnimation('time_stop_air');
            }
        }

        // MP消耗计算
        if (!this.pi.timeStop){
            sakuya.skill(-0.2);
            this.timeStopAnimEnd = false;
        }
        else if (this.timeStopAnimEnd && this.pi.timeStop){
            sakuya.skill(0.3)
            if (this.pi.attack){
                sakuya.skill(12)
            }
            if (this.sliding){
                sakuya.skill(0.3)
            }
        }
    }

    transitionOnEndFrame(currentAnimation, nextAnimation) {
        if (currentAnimation.getFrame() == currentAnimation.getLastFrame()) {
            currentAnimation.rewind();
            sakuya.sprite.changeAnimation(nextAnimation);
        }
    }

    tryCombo(currentAnimation, nextAnimation) {
        let currentFrame = currentAnimation.getFrame();
        let lastFrame = currentAnimation.getLastFrame();



        if (pi.attack) {
            currentAnimation.rewind();
            sakuya.sprite.changeAnimation(nextAnimation);
        }
        // 过渡到stop
        else if (currentFrame == lastFrame) {
            currentAnimation.rewind();
            sakuya.sprite.changeAnimation('stop');
        }
    }

    calculateHorizontalSpeed() {
        if (!this.sliding) {
            this.currentHorizontalSpeed = 0;
        }


        //移动
        if (pi.horizontalAxis != 0) {
            this.currentHorizontalSpeed = this.runSpeed * pi.horizontalAxis;
        }

        if (this.grounded && !this.sliding) {
            this.readyToSlide = true;
        }


        //OnSlideEnter
        if (pi.slide && this.readyToSlide && this.grounded) {
            this.sliding = true;
            this.miss = true;
            this.readyToSlide = false;
            pi.inputLocked = true;
            this.currentHorizontalSpeed = this.slideSpeed * pi.mirrorX;
            sakuya.sprite.setCollider('rectangle', 0, 48, 80, 32)
        }

        //OnSlideUpdate
        if (this.sliding) {
            this.currentHorizontalSpeed -= this.slideFrac * pi.mirrorX;
            if (Math.abs(this.currentHorizontalSpeed) < 1) {  // exit sliding
                this.sliding = false;
                this.miss = false;
                pi.inputLocked = false;
                sakuya.sprite.setCollider('rectangle', 0, 0, 32, 64);
            }
        }

        if (this.pi.crouch && this.grounded && !this.sliding) {
            this.currentHorizontalSpeed = 0;
        }

        sakuya.sprite.velocity.x = this.currentHorizontalSpeed;
    }

    calculateVerticalSpeed() {
        if (!this.pi.jump && this.grounded) {
            this.readyToJump = true;
        }

        if (this.grounded) {
            this.currentVerticalSpeed = this.highJumpGravity;
            if (!pi.crouch) {
                if (this.pi.jump && this.readyToJump) {
                    this.readyToJump = false;
                    sakuya.sprite.changeAnimation('jump');
                    this.currentVerticalSpeed = -this.jumpSpeed;
                }
            }
        }
        else {
            if (sakuya.sprite.getAnimationLabel() == 'damage') {
                this.currentVerticalSpeed += this.gravity;
            }
            if (!this.pi.jump && this.currentVerticalSpeed < 0 && sakuya.sprite.getAnimationLabel() != 'damage') { // 上升阶段中的松开按键阶段，如果不长按跳跃就会加一段额外重力
                this.currentVerticalSpeed += this.gravity;
            }

            //滑翔
            if (this.pi.jump && this.currentVerticalSpeed > 0 && sakuya.sprite.getAnimationLabel() != 'damage') { // 滑翔阶段
                this.currentVerticalSpeed = this.glidingSpeed;
            }
            else {
                this.currentVerticalSpeed += this.highJumpGravity;
                //整个上升阶段+非滑翔落体阶段 标准重力
            }
        }


        if (sakuya.sprite.getAnimationLabel() == 'time_stop_air') {
            this.currentVerticalSpeed = 0;
        }

        sakuya.sprite.velocity.y = this.currentVerticalSpeed;
    }


}