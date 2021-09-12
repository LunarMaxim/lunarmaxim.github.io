class HongMeiling extends IActor{

  constructor(x,y){
    super(x,y);
    this.HPMax = 1000;
    this.HP = this.HPMax;
    this.loadAnimation();
    //this.sprite.setCollider('rectangle', 0, 32 ,32 , 48);
    this.sprite.changeAnimation('stand');
  }
  
  loadAnimation(){//加载美玲的动画
    this.sprite.addAnimation('stand','Materials/Hong Meiling/honmeirin_stand_0.png','Materials/Hong Meiling/honmeirin_stand_1.png',
    'Materials/Hong Meiling/honmeirin_stand_2.png','Materials/Hong Meiling/honmeirin_stand_3.png','Materials/Hong Meiling/honmeirin_stand_4.png',
    'Materials/Hong Meiling/honmeirin_stand_5.png','Materials/Hong Meiling/honmeirin_stand_6.png','Materials/Hong Meiling/honmeirin_stand_7.png',
    'Materials/Hong Meiling/honmeirin_stand_8.png','Materials/Hong Meiling/honmeirin_stand_9.png','Materials/Hong Meiling/honmeirin_stand_10.png',
    'Materials/Hong Meiling/honmeirin_stand_11.png','Materials/Hong Meiling/honmeirin_stand_12.png','Materials/Hong Meiling/honmeirin_stand_13.png',
    'Materials/Hong Meiling/honmeirin_stand_14.png','Materials/Hong Meiling/honmeirin_stand_15.png');
    this.sprite.changeAnimation('stand');//站立
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('attack','Materials/Hong Meiling/honmeirin_attack_0.png','Materials/Hong Meiling/honmeirin_attack_1.png',
    'Materials/Hong Meiling/honmeirin_attack_2.png','Materials/Hong Meiling/honmeirin_attack_3.png',
    'Materials/Hong Meiling/honmeirin_attack_4.png','Materials/Hong Meiling/honmeirin_attack_5.png');
    this.sprite.changeAnimation('attack');//攻击
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('attack_tame','Materials/Hong Meiling/honmeirin_attack_tame_0.png',
    'Materials/Hong Meiling/honmeirin_attack_tame_1.png','Materials/Hong Meiling/honmeirin_attack_tame_2.png');
    this.sprite.changeAnimation('attack_tame');//攻击蓄力
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('dash','Materials/Hong Meiling/honmeirin_dash_0.png','Materials/Hong Meiling/honmeirin_dash_1.png');
    this.sprite.changeAnimation('dash');//猛冲

    this.sprite.addAnimation('tenma','Materials/Hong Meiling/honmeirin_tenma_0.png','Materials/Hong Meiling/honmeirin_tenma_1.png',
    'Materials/Hong Meiling/honmeirin_tenma_2.png','Materials/Hong Meiling/honmeirin_tenma_3.png','Materials/Hong Meiling/honmeirin_tenma_4.png',
    'Materials/Hong Meiling/honmeirin_tenma_5.png','Materials/Hong Meiling/honmeirin_tenma_6.png','Materials/Hong Meiling/honmeirin_tenma_7.png');
    this.sprite.changeAnimation('tenma');//tenma

    this.sprite.addAnimation('hadou','Materials/Hong Meiling/honmeirin_hadou_0.png','Materials/Hong Meiling/honmeirin_hadou_1.png',
    'Materials/Hong Meiling/honmeirin_hadou_2.png','Materials/Hong Meiling/honmeirin_hadou_3.png','Materials/Hong Meiling/honmeirin_hadou_4.png',
    'Materials/Hong Meiling/honmeirin_hadou_5.png','Materials/Hong Meiling/honmeirin_hadou_6.png');
    this.sprite.changeAnimation('hadou');//hadou
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('hadou_tame','Materials/Hong Meiling/honmeirin_hadou_tame_0.png','Materials/Hong Meiling/honmeirin_hadou_tame_1.png',
    'Materials/Hong Meiling/honmeirin_hadou_tame_2.png','Materials/Hong Meiling/honmeirin_hadou_tame_3.png','Materials/Hong Meiling/honmeirin_hadou_tame_4.png',
    'Materials/Hong Meiling/honmeirin_hadou_tame_5.png');
    this.sprite.changeAnimation('hadou_tame');//hadou_tame

    this.sprite.addAnimation('run','Materials/Hong Meiling/honmeirin_run_0.png','Materials/Hong Meiling/honmeirin_run_1.png',
    'Materials/Hong Meiling/honmeirin_run_2.png','Materials/Hong Meiling/honmeirin_run_3.png','Materials/Hong Meiling/honmeirin_run_4.png',
    'Materials/Hong Meiling/honmeirin_run_5.png','Materials/Hong Meiling/honmeirin_run_6.png','Materials/Hong Meiling/honmeirin_run_7.png',
    'Materials/Hong Meiling/honmeirin_run_8.png','Materials/Hong Meiling/honmeirin_run_9.png','Materials/Hong Meiling/honmeirin_run_10.png',
    'Materials/Hong Meiling/honmeirin_run_11.png');
    this.sprite.changeAnimation('run');//跑步
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('des','Materials/Hong Meiling/honmeirin_des_0.png','Materials/Hong Meiling/honmeirin_des2_0.png',
    'Materials/Hong Meiling/honmeirin_des3_0.png','Materials/Hong Meiling/honmeirin_des3_1.png','Materials/Hong Meiling/honmeirin_des3_2.png',
    'Materials/Hong Meiling/honmeirin_des3_3.png','Materials/Hong Meiling/honmeirin_des4_0.png','Materials/Hong Meiling/honmeirin_des4_1.png',
    'Materials/Hong Meiling/honmeirin_des4_2.png','Materials/Hong Meiling/honmeirin_des4_3.png','Materials/Hong Meiling/honmeirin_des4_4.png');
    this.sprite.changeAnimation('des');
    this.sprite.animation.looping = false;

    this.sprite.addAnimation('dying','Materials/Hong Meiling/honmeirin_dying_0.png','Materials/Hong Meiling/honmeirin_dying_1.png','Materials/Hong Meiling/honmeirin_dying_2.png',
    'Materials/Hong Meiling/honmeirin_dying_3.png');
    this.sprite.changeAnimation('dying');
    this.sprite.animation.frameDelay = 12;

    this.sprite.addAnimation('falling','Materials/Hong Meiling/honmeirin_falling_0.png','Materials/Hong Meiling/honmeirin_falling_1.png');
    this.sprite.changeAnimation('falling');
    this.sprite.animation.frameDelay = 6;

    this.sprite.addAnimation('gurd','Materials/Hong Meiling/honmeirin_gurd_0.png','Materials/Hong Meiling/honmeirin_gurd_1.png',
    'Materials/Hong Meiling/honmeirin_gurd_2.png','Materials/Hong Meiling/honmeirin_gurd_3.png');
    this.sprite.changeAnimation('gurd');

    this.sprite.addAnimation('jump','Materials/Hong Meiling/honmeirin_jump_0.png','Materials/Hong Meiling/honmeirin_jump_1.png');
    this.sprite.changeAnimation('jump');

    this.sprite.addAnimation('landing','Materials/Hong Meiling/honmeirin_landing_0.png','Materials/Hong Meiling/honmeirin_landing_1.png',
    'Materials/Hong Meiling/honmeirin_landing_2.png','Materials/Hong Meiling/honmeirin_landing_3.png','Materials/Hong Meiling/honmeirin_landing_4.png',
    'Materials/Hong Meiling/honmeirin_landing_5.png','Materials/Hong Meiling/honmeirin_landing_6.png','Materials/Hong Meiling/honmeirin_landing_7.png',
    'Materials/Hong Meiling/honmeirin_landing_8.png');
    this.sprite.changeAnimation('landing');

    this.sprite.addAnimation('rising_first','Materials/Hong Meiling/honmeirin_rising_first_0.png','Materials/Hong Meiling/honmeirin_rising_first_1.png');
    this.sprite.changeAnimation('rising_first');

    this.sprite.addAnimation('rising','Materials/Hong Meiling/honmeirin_rising_0.png','Materials/Hong Meiling/honmeirin_rising_1.png',
    'Materials/Hong Meiling/honmeirin_rising_2.png','Materials/Hong Meiling/honmeirin_rising_3.png',
    'Materials/Hong Meiling/honmeirin_rising_4.png','Materials/Hong Meiling/honmeirin_rising_5.png');
    this.sprite.changeAnimation('rising');
    this.sprite.animation.looping = false;
    this.sprite.animation.frameDelay = 6;
  }

  hit(damage){
    this.HP -= damage;
    new EnemyHitNumber(damage, meilin.sprite.position.x, meilin.sprite.position.y);
    if(this.HP <= 0){
      this.HP = 0;
      this.sprite.animation.rewind();
      this.sprite.changeAnimation('des');
      this.sprite.setSpeed(0);
    }
  }
}
