class PlayerInput{
    static instance;
    
    inputLocked = false;

    // keys
    upKey = 87; //W
    downKey = 83; //S
    leftKey = 65; //A
    rightKey = 68; //D

    attackKey = 74; //J
    jumpKey = 75; //K
    timeStopKey = 73; //I
    
    // signals
    mirrorX = 1;
    horizontalAxis;
    verticalAxis;
    jump;
    attack;
    slide;
    crouch;
    
    timeStop = false;
    timeStopStart = false;
    timeStopEnd = false;
    
    static getInstance(){
        if (PlayerInput.instance != null){
            return PlayerInput.instance;
        }
        return PlayerInput.instance = new PlayerInput();
    }
    
    update() {
        this.horizontalAxis = 0;
        
        // 按下时停键后
        if (keyWentDown(this.timeStopKey)){
            // 时停动画阶段锁input 防止快速双击
            if (!this.inputLocked && sakuya.MP > 10){
                this.timeStop = !this.timeStop; // 时停开/关
                this.timeStopStart = this.timeStop; // 如果按下后此帧时停 说明时停开始
                this.timeStopEnd = !this.timeStop; // 如果按下后此帧正常 说明时停结束
            }
        }
        else{
            this.timeStopStart = false;
            this.timeStopEnd = false;
        }

        if (!this.inputLocked){
            
            this.jump = keyIsDown(this.jumpKey);
            this.attack = keyWentDown(this.attackKey);


            this.slide = false;
            if (keyIsDown(this.downKey)){
                if (keyWentDown(this.jumpKey))
                this.slide = true;
            }
            
            this.crouch = keyIsDown(this.downKey);
            
            if (keyIsDown(this.rightKey) && this.horizontalAxis != -1){
                this.horizontalAxis = 1;
                this.verticalAxis = 0;
                this.mirrorX = 1;
            }
            if (keyIsDown(this.leftKey) && this.horizontalAxis != 1){
                this.horizontalAxis = -1;
                this.verticalAxis = 0;
                this.mirrorX = -1;
            }
            if (keyIsDown(this.downKey) && this.verticalAxis != -1){
                this.verticalAxis = 1;
                //this.horizontalAxis = 0;
            }
            if (keyIsDown(this.upKey) && this.verticalAxis != 1){
                this.verticalAxis = -1;
                this. horizontalAxis = 0;
            }
        }
    }
}