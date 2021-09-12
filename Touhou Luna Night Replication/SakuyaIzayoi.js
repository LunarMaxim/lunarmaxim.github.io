class SakuyaIzayoi extends IActor{
    MPMax = 100;
    MP;

    constructor(x,y){
      super(x,y);
      this.HPMax = 100;
      this.HP = this.HPMax;
      this.MP = this.MPMax;
      this.loadAnimation();
      this.sprite.changeAnimation('stop');
    }
  
    loadAnimation(){//加载咲夜的动画
      this.sprite.addAnimation('stop','Materials/Sakuya Izayoi/player_stop_5.png','Materials/Sakuya Izayoi/player_stop_6.png','Materials/Sakuya Izayoi/player_stop_7.png',
      'Materials/Sakuya Izayoi/player_stop_8.png','Materials/Sakuya Izayoi/player_stop_9.png','Materials/Sakuya Izayoi/player_stop_10.png',
      'Materials/Sakuya Izayoi/player_stop_11.png','Materials/Sakuya Izayoi/player_stop_12.png','Materials/Sakuya Izayoi/player_stop_13.png',
      'Materials/Sakuya Izayoi/player_stop_14.png','Materials/Sakuya Izayoi/player_stop_15.png','Materials/Sakuya Izayoi/player_stop_16.png',
      'Materials/Sakuya Izayoi/player_stop_17.png','Materials/Sakuya Izayoi/player_stop_18.png','Materials/Sakuya Izayoi/player_stop_19.png',
      'Materials/Sakuya Izayoi/player_stop_20.png');
      this.sprite.changeAnimation('stop');//闲置
  
      this.sprite.addAnimation('action','Materials/Sakuya Izayoi/player_action_0.png','Materials/Sakuya Izayoi/player_action_1.png',
      'Materials/Sakuya Izayoi/player_action_2.png','Materials/Sakuya Izayoi/player_action_3.png',
      'Materials/Sakuya Izayoi/player_action_4.png','Materials/Sakuya Izayoi/player_action_5.png');
      this.sprite.changeAnimation('action');//一段攻击
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('action2','Materials/Sakuya Izayoi/player_action2_0.png','Materials/Sakuya Izayoi/player_action2_1.png',
      'Materials/Sakuya Izayoi/player_action2_2.png','Materials/Sakuya Izayoi/player_action2_3.png',
      'Materials/Sakuya Izayoi/player_action2_4.png','Materials/Sakuya Izayoi/player_action2_5.png');
      this.sprite.changeAnimation('action2');//二段攻击
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('action3','Materials/Sakuya Izayoi/player_action3_0.png','Materials/Sakuya Izayoi/player_action3_1.png',
      'Materials/Sakuya Izayoi/player_action3_2.png','Materials/Sakuya Izayoi/player_action3_3.png',
      'Materials/Sakuya Izayoi/player_action3_4.png','Materials/Sakuya Izayoi/player_action3_5.png');
      this.sprite.changeAnimation('action3');//三段攻击
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('action4','Materials/Sakuya Izayoi/player_action4_0.png','Materials/Sakuya Izayoi/player_action4_1.png',
      'Materials/Sakuya Izayoi/player_action4_2.png','Materials/Sakuya Izayoi/player_action4_3.png',
      'Materials/Sakuya Izayoi/player_action4_4.png','Materials/Sakuya Izayoi/player_action4_5.png');
      this.sprite.changeAnimation('action4');//四段攻击
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('time_stop','Materials/Sakuya Izayoi/player_time_stop_0.png','Materials/Sakuya Izayoi/player_time_stop_1.png',
      'Materials/Sakuya Izayoi/player_time_stop_2.png','Materials/Sakuya Izayoi/player_time_stop_3.png');
      this.sprite.changeAnimation('time_stop');//时停
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('time_stop_air','Materials/Sakuya Izayoi/player_time_stop_air_0.png','Materials/Sakuya Izayoi/player_time_stop_air_1.png',
      'Materials/Sakuya Izayoi/player_time_stop_air_2.png','Materials/Sakuya Izayoi/player_time_stop_air_3.png',);
      this.sprite.changeAnimation('time_stop_air')//空中时停
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run','Materials/Sakuya Izayoi/player_run_0.png','Materials/Sakuya Izayoi/player_run_1.png',
      'Materials/Sakuya Izayoi/player_run_2.png','Materials/Sakuya Izayoi/player_run_3.png','Materials/Sakuya Izayoi/player_run_4.png',
      'Materials/Sakuya Izayoi/player_run_5.png','Materials/Sakuya Izayoi/player_run_6.png','Materials/Sakuya Izayoi/player_run_7.png',
      'Materials/Sakuya Izayoi/player_run_8.png','Materials/Sakuya Izayoi/player_run_9.png','Materials/Sakuya Izayoi/player_run_10.png',
      'Materials/Sakuya Izayoi/player_run_11.png','Materials/Sakuya Izayoi/player_run_12.png','Materials/Sakuya Izayoi/player_run_13.png',
      'Materials/Sakuya Izayoi/player_run_14.png','Materials/Sakuya Izayoi/player_run_15.png');
      this.sprite.changeAnimation('run');//跑步循环
      this.sprite.animation.frameDelay = 3;
  
      this.sprite.addAnimation('run_back','Materials/Sakuya Izayoi/player_run_back_0.png','Materials/Sakuya Izayoi/player_run_back_1.png','Materials/Sakuya Izayoi/player_run_back_2.png',
      'Materials/Sakuya Izayoi/player_run_back_3.png','Materials/Sakuya Izayoi/player_run_back_4.png','Materials/Sakuya Izayoi/player_run_back_5.png','Materials/Sakuya Izayoi/player_run_back_6.png',
      'Materials/Sakuya Izayoi/player_run_back_7.png','Materials/Sakuya Izayoi/player_run_back_8.png');
      this.sprite.changeAnimation('run_back');//跑步转身
      this.sprite.animation.looping = false;

      this.sprite.addAnimation('run_attack1','Materials/Sakuya Izayoi/player_run_attack_0.png','Materials/Sakuya Izayoi/player_run_attack_1.png',
      'Materials/Sakuya Izayoi/player_run_attack_2.png','Materials/Sakuya Izayoi/player_run_attack_3.png','Materials/Sakuya Izayoi/player_run_attack_4.png',
      'Materials/Sakuya Izayoi/player_run_attack_5.png','Materials/Sakuya Izayoi/player_run_attack_6.png','Materials/Sakuya Izayoi/player_run_attack_7.png',
      'Materials/Sakuya Izayoi/player_run_attack_8.png','Materials/Sakuya Izayoi/player_run_attack_9.png');
      this.sprite.changeAnimation('run_attack1');//跑步攻击1段
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run_attack2','Materials/Sakuya Izayoi/player_run_attack2_0.png','Materials/Sakuya Izayoi/player_run_attack2_1.png',
      'Materials/Sakuya Izayoi/player_run_attack2_2.png','Materials/Sakuya Izayoi/player_run_attack2_3.png','Materials/Sakuya Izayoi/player_run_attack2_4.png',
      'Materials/Sakuya Izayoi/player_run_attack2_5.png');
      this.sprite.changeAnimation('run_attack2');//跑步攻击2段
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run_attack3','Materials/Sakuya Izayoi/player_run_attack3_0.png','Materials/Sakuya Izayoi/player_run_attack3_1.png',
      'Materials/Sakuya Izayoi/player_run_attack3_2.png','Materials/Sakuya Izayoi/player_run_attack3_3.png','Materials/Sakuya Izayoi/player_run_attack3_4.png',
      'Materials/Sakuya Izayoi/player_run_attack3_5.png');
      this.sprite.changeAnimation('run_attack3');//跑步攻击3段
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run_attack4','Materials/Sakuya Izayoi/player_run_attack4_0.png','Materials/Sakuya Izayoi/player_run_attack4_1.png',
      'Materials/Sakuya Izayoi/player_run_attack4_2.png','Materials/Sakuya Izayoi/player_run_attack4_3.png',
      'Materials/Sakuya Izayoi/player_run_attack4_4.png','Materials/Sakuya Izayoi/player_run_attack4_5.png');
      this.sprite.changeAnimation('run_attack4');//跑步攻击4段
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run_start','Materials/Sakuya Izayoi/player_run_start_0.png','Materials/Sakuya Izayoi/player_run_start_1.png',
      'Materials/Sakuya Izayoi/player_run_start_2.png','Materials/Sakuya Izayoi/player_run_start_3.png','Materials/Sakuya Izayoi/player_run_start_4.png',
      'Materials/Sakuya Izayoi/player_run_start_5.png','Materials/Sakuya Izayoi/player_run_start_6.png','Materials/Sakuya Izayoi/player_run_start_7.png',
      'Materials/Sakuya Izayoi/player_run_start_8.png');
      this.sprite.changeAnimation('run_start');//跑步起步
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('run_stop','Materials/Sakuya Izayoi/player_run_stop_0.png','Materials/Sakuya Izayoi/player_run_stop_1.png',
      'Materials/Sakuya Izayoi/player_run_stop_2.png','Materials/Sakuya Izayoi/player_run_stop_3.png','Materials/Sakuya Izayoi/player_run_stop_4.png');
      this.sprite.changeAnimation('run_stop');//跑步停止
      this.sprite.animation.looping = false;
  
      this.sprite.addAnimation('jump','Materials/Sakuya Izayoi/player_jump_0.png','Materials/Sakuya Izayoi/player_jump_1.png');
      this.sprite.changeAnimation('jump');//跳跃
  
      this.sprite.addAnimation('jump_attack','Materials/Sakuya Izayoi/player_jump_attack_0.png','Materials/Sakuya Izayoi/player_jump_attack_1.png',
      'Materials/Sakuya Izayoi/player_jump_attack_2.png','Materials/Sakuya Izayoi/player_jump_attack_3.png',
      'Materials/Sakuya Izayoi/player_jump_attack_4.png','Materials/Sakuya Izayoi/player_jump_attack_5.png');
      this.sprite.changeAnimation('jump_attack');//跳跃攻击
      
      this.sprite.addAnimation('falling','Materials/Sakuya Izayoi/player_falling_0.png','Materials/Sakuya Izayoi/player_falling_1.png',
      'Materials/Sakuya Izayoi/player_gliding_0.png','Materials/Sakuya Izayoi/player_gliding_1.png',
      'Materials/Sakuya Izayoi/player_gliding_2.png','Materials/Sakuya Izayoi/player_gliding_3.png',
      'Materials/Sakuya Izayoi/player_gliding_4.png','Materials/Sakuya Izayoi/player_gliding_5.png');
      this.sprite.changeAnimation('falling');//跳跃转下落
      this.sprite.animation.looping = false;

      this.sprite.addAnimation('gliding','Materials/Sakuya Izayoi/player_gliding_4.png','Materials/Sakuya Izayoi/player_gliding_5.png');
      this.sprite.changeAnimation('gliding');//下落循环
  
      this.sprite.addAnimation('down','Materials/Sakuya Izayoi/player_down_0.png','Materials/Sakuya Izayoi/player_down_1.png',
      'Materials/Sakuya Izayoi/player_down_2.png','Materials/Sakuya Izayoi/player_down_3.png');
      this.sprite.changeAnimation('down');//下蹲
  
      this.sprite.addAnimation('sliding','Materials/Sakuya Izayoi/player_sliding_0.png','Materials/Sakuya Izayoi/player_sliding_1.png',
      'Materials/Sakuya Izayoi/player_sliding_2.png','Materials/Sakuya Izayoi/player_sliding_3.png');
      this.sprite.changeAnimation('sliding');//滑铲
      this.sprite.animation.looping = false;

      this.sprite.addAnimation('sliding_loop','Materials/Sakuya Izayoi/player_sliding_2.png','Materials/Sakuya Izayoi/player_sliding_3.png');
      this.sprite.changeAnimation('sliding_loop');//滑铲循环

      this.sprite.addAnimation('damage','Materials/Sakuya Izayoi/player_damage_0.png','Materials/Sakuya Izayoi/player_damage_1.png',
      'Materials/Sakuya Izayoi/player_damage_2.png');
      this.sprite.changeAnimation('damage');//受击腾空
      this.sprite.animation.looping = false;
      this.sprite.animation.frameDelay = 5;

      this.sprite.addAnimation('fall_down', 'Materials/Sakuya Izayoi/player_fall_down_0.png', 'Materials/Sakuya Izayoi/player_fall_down_1.png',
      'Materials/Sakuya Izayoi/player_fall_down_2.png', 'Materials/Sakuya Izayoi/player_fall_down_3.png', 'Materials/Sakuya Izayoi/player_fall_down_4.png',
      'Materials/Sakuya Izayoi/player_fall_down_5.png', 'Materials/Sakuya Izayoi/player_fall_down_6.png', 'Materials/Sakuya Izayoi/player_fall_down_7.png');
      this.sprite.changeAnimation('fall_down');//受击翻滚
      this.sprite.animation.looping = false;
      this.sprite.animation.frameDelay = 5;

      this.sprite.addAnimation('die','Materials/Sakuya Izayoi/player_des_0.png','Materials/Sakuya Izayoi/player_des_1.png',
      'Materials/Sakuya Izayoi/player_des_2.png','Materials/Sakuya Izayoi/player_des_3.png','Materials/Sakuya Izayoi/player_des_4.png',
      'Materials/Sakuya Izayoi/player_des_5.png','Materials/Sakuya Izayoi/player_des_6.png','Materials/Sakuya Izayoi/player_des_7.png',
      'Materials/Sakuya Izayoi/player_des_8.png','Materials/Sakuya Izayoi/player_des_9.png','Materials/Sakuya Izayoi/player_des_10.png',
      'Materials/Sakuya Izayoi/player_des_11.png','Materials/Sakuya Izayoi/player_des_12.png','Materials/Sakuya Izayoi/player_des_13.png',
      'Materials/Sakuya Izayoi/player_des_14.png','Materials/Sakuya Izayoi/player_des_15.png','Materials/Sakuya Izayoi/player_des_16.png',
      'Materials/Sakuya Izayoi/player_des_17.png','Materials/Sakuya Izayoi/player_des_18.png','Materials/Sakuya Izayoi/player_des_19.png',
      'Materials/Sakuya Izayoi/player_des_20.png','Materials/Sakuya Izayoi/player_des_21.png');
      this.sprite.changeAnimation('die');//死亡动画
      this.sprite.animation.looping = false;
      this.sprite.animation.frameDelay = 6;
    }

    hit(damage){
      this.HP -= damage;
      this.sprite.animation.rewind();
      this.sprite.changeAnimation('damage');
      ScreenShake.isshakeCamera = true;
      new HitNumber(damage, sakuya.sprite.position.x, sakuya.sprite.position.y);
      if(this.HP <= 0){
        this.sprite.changeAnimation('die');
        this.HP = 0
      }
    }

    skill(cost){
      this.MP -= cost;

      if (this.MP < 0){
        this.MP = 0;
        PlayerInput.getInstance().timeStop = false;
        PlayerInput.getInstance().timeStopEnd = true;
      }
      else if (this.MP > this.MPMax){
        this.MP = this.MPMax;
      }
    }
  }