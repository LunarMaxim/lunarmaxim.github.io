function drawEffect(effect){
    effect.draw();
}

class TimeStopEffect{
    static instance;

    static getInstance(){
        if (this.instance != null){
            return this.instance;
        }
        return this.instance = new TimeStopEffect();
    }

    timeStopRadius0 = 0;
    timeStopRadius1 = 600;

    draw(){
        this.onTimeStopStart();
        this.onTimeStopEnd();
    }

    onTimeStopStart(){
        if (PlayerInput.instance.timeStopStart){
            this.timeStopRadius0 = 5000;
            this.timeStopRadius1 = 0;
            mySound.setVolume(0.02)
        }
        if (this.timeStopRadius0 > 0){
            this.timeStopRadius0 -= 100;
            noStroke();
            fill(0, 100, 100, 75);
            ellipse(sakuya.sprite.position.x, sakuya.sprite.position.y, this.timeStopRadius0, this.timeStopRadius);
            
        }
        if (this.timeStopRadius1 < 600){
            this.timeStopRadius1 = lerp(this.timeStopRadius1, 625, 0.05);
            stroke(0);
            strokeWeight(3)
            noFill();
            ellipse(sakuya.sprite.position.x, sakuya.sprite.position.y, this.timeStopRadius1, this.timeStopRadius1)
        }
    }

    onTimeStopEnd(){
        if (PlayerInput.instance.timeStopEnd){
            this.timeStopRadius1 = 0;
            mySound.setVolume(0.1)
            
        }
        if (this.timeStopRadius1 < 600){
            this.timeStopRadius1 = lerp(this.timeStopRadius1, 625, 0.05);
            stroke(0,100,100);
            strokeWeight(2)
            noFill();
            ellipse(sakuya.sprite.position.x, sakuya.sprite.position.y, this.timeStopRadius1, this.timeStopRadius1)
        }
    }
}

class ScreenShake
{
    static instance;

    static getInstance(){
        if (this.instance != null){
            return this.instance;
        }
        return this.instance = new ScreenShake();
    }

    shakeTime = 45;
    fps= 50;
    frameTime =0.02;
    shakeDelta = 5;

    static isshakeCamera = false;
    
    draw ()
    {
        if (ScreenShake.isshakeCamera)
        {
            if(this.shakeTime > 0)
            {
                this.shakeTime -= 1;
                if(this.shakeTime <= 0)
                {
                    camera.position.y = 540
                    ScreenShake.isshakeCamera =false;
                    this.shakeTime = 45;
                    this.fps= 50;
                    this.frameTime =0.02;
                    this.shakeDelta = 5;
                }
                else
                {
                    this.frameTime += 0.02;
                    
                    if(this.frameTime > 1.0 / this.fps)
                    {
                        this.frameTime = 0;
                        //camera.position.x = this.shakeDelta * ( -1 + 2 * random()) + averagePos;
                        camera.position.y = this.shakeDelta * ( -1 + 2 * random()) + 540;
                    }
                }
            }
        }
    }
}

class HitNumber{
    static hits = new Array();
    
    text;
    textSize = 36;
    textColorH = 0;
    textColorS = 90;
    textColorB = 70;
    textColorA = 100;

    strokeColorH = 350;
    strokeColorS = 70;
    strokeColorB = 40;
    strokeColorA = 100;
    strokeWeight = 6;

    lifeTime = 90;
    fadeTime = 60;
    moveTime = 30;
    lifeCount = 0;

    damage;
    x;
    y;

    constructor(damage, x, y){
        this.damage = damage;
        this.x = x + 100 * random(-1, 1);
        this.y = y + 100 * random(-1, 1);
        HitNumber.hits.push(this);
    }

    static drawHits(){
        for (var i = 0; i < HitNumber.hits.length; i++){
            HitNumber.hits[i].draw();
        }
    }

    draw(){
        // 上移
        if (this.lifeCount < this.moveTime){
            this.lifeCount++;
            fill(this.textColorH,
                this.textColorS,
                this.textColorB,
                this.textColorA
            );

            stroke(this.strokeColorH,
                this.strokeColorS,
                this.strokeColorB,
                this.strokeColorA
            );

            strokeWeight(this.strokeWeight);
            textSize(this.textSize);
            textFont(myFont);
            text(this.damage, this.x, this.y - this.lifeCount * 1.5);
        }
        // 停滞
        else if (this.lifeCount < this.fadeTime){
            this.lifeCount++;
            fill(this.textColorH,
                this.textColorS,
                this.textColorB,
                this.textColorA
            );

            stroke(this.strokeColorH,
                this.strokeColorS,
                this.strokeColorB,
                this.strokeColorA
            );

            strokeWeight(this.strokeWeight);

            textSize(this.textSize);
            
            textFont(myFont);
            text(this.damage, this.x, this.y - this.moveTime * 1.5);
        }
        // 消失
        else if (this.lifeCount < this.lifeTime){
            this.textColorA = map(this.lifeCount, this.fadeTime, this.lifeTime, 100, 0);
            this.strokeColorA = map(this.lifeCount, this.fadeTime, this.lifeTime, 100, 0);
            this.lifeCount++;

            fill(this.textColorH,
                this.textColorS,
                this.textColorB,
                this.textColorA
            );

            stroke(this.strokeColorH,
                this.strokeColorS,
                this.strokeColorB,
                this.strokeColorA)
            ;

            strokeWeight(this.strokeWeight);
            textSize(this.textSize);
            textFont(myFont);

            text(this.damage, this.x, this.y - this.moveTime * 1.5);
        }
        // 摧毁
        else{
            HitNumber.hits.shift();
        }
    }
}

class EnemyHitNumber extends HitNumber{
    textSize = 28;
    textColorH = 50;
    textColorS = 90;
    textColorB = 70;
    textColorA = 100;

    strokeColorH = 60;
    strokeColorS = 70;
    strokeColorB = 40;
    strokeColorA = 100;
    strokeWeight = 6;

}