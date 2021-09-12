var drawDebugUI = false;
var gameStart = false;
var loadCompleted = false;

// images
var bg;
var bg_1;
var fg;
var fg_1;
var tree
var tree_1;
var sakuyaProfile;
var meilingProfile;


var bgPos;
var treePos;


// sprites
var sakuya;
var meilin;
var ground;
var barrierLeft;
var barrierRight;

var averagePos; // 玩家和敌人之间的中心点

var HPTransitionLength0 = 700;
var HPTransitionLength1 = 987;
var MPTransitionLength0 = 200;

var knives = new DanmakuLauncher();
var balls = new DanmakuLauncher();

let myFont;
let mySound;

function preload() {
  bg = loadImage('Materials/background.png');
  bg_1 = loadImage('Materials/background_1.png');
  fg = loadImage('Materials/foreground.png');
  fg_1 = loadImage('Materials/foreground_1.png');
  tree = loadImage('Materials/tree.png');
  tree_1 = loadImage('Materials/tree_1.png');
  sakuyaProfile = loadImage('Materials/sakuya_head.png');
  meilingProfile = loadImage('Materials/meirin_head.png');

  myFont = loadFont('Materials/IPix.ttf');
  mySound = loadSound('Materials/boss00.ogg');

  colorMode(HSB, 100);

  pi = PlayerInput.getInstance();
  pc = PlayerController.getInstance();
  ec = EnemyController.getInstance();
}

function setup() {
  createCanvas(1920, 1080);
  treePos = 0;
  bgPos = 0;
  ground = createSprite(960, 540);
  ground.addAnimation('fg', fg);
  ground.addAnimation('fg_1', fg_1);
  ground.setCollider("rectangle", 0, 420, 3840, 382);


  sakuya = new SakuyaIzayoi(660, 670);
  meilin = new HongMeiling(1260, 670);

  barrierLeft = createSprite(-960, 0, 100, 2080);
  barrierRight = createSprite(2880, 0, 100, 2080);
  mySound.loop();
  mySound.setVolume(0.1)

  loadCompleted = true;
}

function draw() {
  if (!gameStart) {
    DrawStartMenu();
  }
  else {

    drawScene();
    updateComponents();
    meilin.drawActor();
    balls.launch();
    drawEffects();
    sakuya.drawActor();
    drawKnife();
    drawUI(camera.position.x);

    debug();
  }
}

function updateComponents() {
  pi.update();
  pc.update();
  ec.update();
}

function drawEffects() {
  drawEffect(TimeStopEffect.getInstance());
  drawEffect(ScreenShake.getInstance());
  HitNumber.drawHits();
}

function drawScene() {
  var leftDeadZone = 50;
  var rightDeadZone = 1870;

  averagePos = sakuya.sprite.position.x * 0.5 + meilin.sprite.position.x * 0.5;
  barrierLeft.position.x = camera.position.x - 1000;
  barrierRight.position.x = camera.position.x + 1000;

  if (pi.timeStop) {
    image(bg_1, bgPos, 0);
    image(tree_1, treePos, 0);
    ground.changeAnimation('fg_1');
  }
  else {
    image(bg, bgPos, 0);
    image(tree, treePos, 0);
    ground.changeAnimation('fg');
  }
  drawSprite(ground);
  drawSprite(barrierLeft);
  drawSprite(barrierRight);

  if (averagePos > leftDeadZone && averagePos < rightDeadZone) {

    // 防止boss被边缘推动
    if (meilin.sprite.position.x > camera.position.x - 900 && meilin.sprite.position.x < camera.position.x + 900) {
      moveScreen();
    }
    else if (meilin.sprite.position.x < camera.position.x - 900) {//boss贴左边
      if (camera.position.x > averagePos) {//仅允许左移
        moveScreen();
      }
    }
    else if (meilin.sprite.position.x > camera.position.x + 900) {//boss贴右边
      if (camera.position.x < averagePos) {//仅允许右移
        moveScreen();
      }
    }
  }
  function moveScreen() {
    camera.position.x = lerp(camera.position.x, averagePos, 0.1);
    bgPos = camera.position.x - 960;
    treePos = (camera.position.x - 1920) / 2;
  }
}

function drawKnife() {
  if (pi.attack) {
    this.knives.loadDanmaku(new Knife(sakuya.sprite.position.x + 30 * random(-1, 1) + 10 * pi.mirrorX, sakuya.sprite.position.y + 30 * random(-1, 1) + 30, pi.mirrorX, 0));
    this.knives.loadDanmaku(new Knife(sakuya.sprite.position.x + 30 * random(-1, 1) + 120 * pi.mirrorX, sakuya.sprite.position.y + 30 * random(-1, 1), pi.mirrorX, 0));
    this.knives.loadDanmaku(new Knife(sakuya.sprite.position.x + 30 * random(-1, 1) + 60 * pi.mirrorX, sakuya.sprite.position.y + 30 * random(-1, 1) + - 30, pi.mirrorX, 0));

  }
  knives.launch()
}

function drawUI(x) {
  var HPMaxLength = sakuya.HPMax * 7;
  var HPLength = sakuya.HP * 7;
  var MPMaxLength = sakuya.MPMax * 2.5;
  var MPLength = sakuya.MP * 2.5;
  var offset = x - 960; // 跟随摄像机移动
  var HPPosX = 234;
  var HPPosY = 70;
  var textPosX = 236;

  // profile
  noStroke();
  fill(12, 50, 0)
  rect(95 + offset, 65, 138, 138)
  image(sakuyaProfile, 100 + offset, HPPosY);

  // HP bar
  stroke(0);
  strokeWeight(4);
  fill(0, 80, 15);
  rect(HPPosX + offset + 1, HPPosY - 3, HPMaxLength, 36);//黑矩形

  HPTransitionLength0 = lerp(HPTransitionLength0, HPLength, 0.04)
  fill(0, 5, 80);
  noStroke();
  rect(HPPosX + offset, HPPosY, HPTransitionLength0, 30);//白矩形

  if (sakuya.HP >= sakuya.HPMax / 2) {
    fill(33, 50, 70)//绿色血比较多
    strokeWeight(12);
    rect(HPPosX + offset, HPPosY, HPLength, 30);

    // text
    noStroke();
    fill(0)
    textSize(28);
    textFont(myFont);
    text(sakuya.HP, textPosX + offset, 94);
  }
  else if (sakuya.HP >= sakuya.HPMax / 3) {
    fill(12, 50, 70)//黄血
    strokeWeight(12);
    rect(HPPosX + offset, HPPosY, HPLength, 30);

    // text
    noStroke();
    fill(0)
    textSize(28);
    textFont(myFont);
    text(sakuya.HP, textPosX + offset, 94);
  }
  else {
    fill(0, 70, 90)//红色血比较少
    strokeWeight(12);
    rect(HPPosX + offset, HPPosY, HPLength, 30);
    // text
    noStroke();
    fill(100)
    textSize(28);
    textFont(myFont);
    text(sakuya.HP, textPosX + offset, 94);
    
  }

  // MP bar
  stroke(0);
  strokeWeight(5);
  fill(50, 80, 10);
  rect(HPPosX + offset - 2, HPPosY + 50, MPMaxLength, 20);//黑矩形

  MPTransitionLength0 = lerp(MPTransitionLength0, MPLength, 0.08)
  fill(50, 10, 80);
  strokeWeight(4);
  rect(HPPosX + offset - 2, HPPosY + 50, MPTransitionLength0, 20);//白矩形

  strokeWeight(4);
  fill(60, 60, 90)
  rect(HPPosX + offset - 2, HPPosY + 50, MPLength, 20);// 蓝条
  
  
  

  var HPMaxLength = meilin.HPMax * 0.7;
  var HPLength = meilin.HP * 0.7;
  var offset = x - 960; // 跟随摄像机移动
  var HPPosX = 987;
  var HPPosY = 70;
  var textPosX = 1614;
  var mirrorOffset = (meilin.HPMax - meilin.HP) * 0.7;
  var lerpOffset = HPPosX + mirrorOffset - HPTransitionLength1;

  // profile
  noStroke();
  fill(12, 50, 0)
  rect(1687 + offset, 65, 138, 138)
  image(meilingProfile, 1692 + offset, HPPosY);

  // HP bar
  stroke(0);
  strokeWeight(4);
  fill(0, 80, 15);
  rect(HPPosX + offset - 2, HPPosY - 3, HPMaxLength, 36);//黑矩形

  HPTransitionLength1 = lerp(HPTransitionLength1, HPPosX + mirrorOffset, 0.04)
  fill(0, 5, 80);
  noStroke();
  rect(HPTransitionLength1 + offset, HPPosY, HPMaxLength - mirrorOffset + lerpOffset, 30);//白矩形

  if (meilin.HP >= meilin.HPMax / 2) {
    fill(33, 50, HPPosY)//绿色血比较多
    strokeWeight(12);
    rect(HPPosX + offset + mirrorOffset, HPPosY, HPMaxLength - mirrorOffset, 30);

    // text
    noStroke();
    fill(0)
    textSize(28);
    textFont(myFont);
    text(meilin.HP, textPosX + offset, 94);
  }
  else if (meilin.HP >= meilin.HPMax / 4) {
    fill(12, 70, 90)//黄血二阶段
    strokeWeight(12);
    rect(HPPosX + offset + mirrorOffset, HPPosY, HPMaxLength - mirrorOffset, 30);
    // text
    noStroke();
    fill(0)
    textSize(28);
    textFont(myFont);
    text(meilin.HP, textPosX + offset, 94);
  }
  else {
    fill(0, 70, 90)//红色血比较少
    strokeWeight(12);
    rect(HPPosX + offset + mirrorOffset, HPPosY, HPMaxLength - mirrorOffset, 30);
    // text
    noStroke();
    fill(100)
    textSize(28);
    textFont(myFont);
    text(meilin.HP, textPosX + offset, 94);
  }

  
  barrierLeft.visible = drawDebugUI;
  barrierRight.visible = drawDebugUI;
}

function debug() {

  if (drawDebugUI) {

    // 显示摄像机焦点
    noFill();
    strokeWeight(1);
    stroke(0, 100, 100);
    ellipse(averagePos, 700, 30, 30);
    stroke(50, 100, 100);
    ellipse(camera.position.x, 700, 30, 30);
  }

  // 按下数字键0显示debugUI
  if (keyWentDown(96)) {
    drawDebugUI = !drawDebugUI;
  }
  // 按下数字键1切换回run动画（进入下一个技能）
  if (keyWentDown(97)) {
    meilin.sprite.changeAnimation('run');
  }
  // 按下数字键2切换到guard动画
  if (keyWentDown(98)) {
    meilin.sprite.changeAnimation('gurd');
    if (meilin.sprite.animation.getFrame() == meilin.sprite.animation.getLastFrame()) {
      meilin.sprite.changeAnimation('stand')
    }
  }
  // 按下数字键3复活
  if (keyWentDown(99)) {
    PlayerController.getInstance().immortal = true;
    PlayerInput.getInstance().inputLocked = false;
    sakuya.HP = sakuya.HPMax;
    sakuya.MP = sakuya.MPMax;
    sakuya.sprite.changeAnimation('stop');
  }
  // 按下数字键4让boss进入二阶段
  if (keyWentDown(100)) {
    meilin.HP = meilin.HPMax / 2;
  }
  // 按下数字键5让boss残血
  if (keyWentDown(101)) {
    meilin.HP = 1;
  }
  // 按下数字键6复活boss
  if (keyWentDown(102)) {
    if (meilin.sprite.getAnimationLabel() == 'dying'){
      EnemyController.getInstance().immortal = false;
      meilin.HP = 1000;
      meilin.sprite.changeAnimation('run');
    }
  }
 
}


function mousePressed() {
  if (!gameStart && loadCompleted) {
    userStartAudio()
    gameStart = true;
    meilin.sprite.changeAnimation('run');
  }
}

function DrawStartMenu(){
  drawScene();
  meilin.drawActor();
  sakuya.drawActor();
  drawUI(camera.position.x);
  fill(0, 0, 0, 50)
  rect(0, 0, width, height);
  
  
  textFont(myFont);
  
  
  textSize(28);
  fill(100)
  strokeWeight(8);
  stroke(255,0,0);
  var x = 720;
  text('-', x, 940);
  text('PRESS', x + 30, 940);
  text('MOUSE', x + 160, 940);
  text('TO', x + 290, 940);
  text('START', x + 350, 940);
  text('-', x + 470, 940);

  strokeWeight(8);
  stroke(255,0,0);
  textSize(48);
  textFont(myFont);
  text('KeyTips',camera.position.x/2,camera.position.y/2+200);

  textSize(28)

  text('LEFT',camera.position.x/2,camera.position.y/2+275);
  text(':',camera.position.x/2+100,camera.position.y/2+275);
  text('A',camera.position.x/2+125,camera.position.y/2+275);

  text('RIGHT',camera.position.x/2,camera.position.y/2+325);
  text(':',camera.position.x/2+100,camera.position.y/2+325);
  text('D',camera.position.x/2+125,camera.position.y/2+325);

  text('DOWN',camera.position.x/2,camera.position.y/2+375);
  text(':',camera.position.x/2+100,camera.position.y/2+375);
  text('S',camera.position.x/2+125,camera.position.y/2+375);

  text('SLIDE',camera.position.x/2,camera.position.y/2+425);
  text(':',camera.position.x/2+100,camera.position.y/2+425);
  text('S',camera.position.x/2+125,camera.position.y/2+425);
  text('+',camera.position.x/2+150,camera.position.y/2+425);
  text('K',camera.position.x/2+175,camera.position.y/2+425);

  text('ATTACK',camera.position.x/2+300,camera.position.y/2+275);
  text(':',camera.position.x/2+475,camera.position.y/2+275);
  text('J',camera.position.x/2+500,camera.position.y/2+275);

  text('JUMP',camera.position.x/2+300,camera.position.y/2+325);
  text(':',camera.position.x/2+475,camera.position.y/2+325);
  text('K',camera.position.x/2+500,camera.position.y/2+325);

  text('TIMESTOP',camera.position.x/2+300,camera.position.y/2+375);
  text(':',camera.position.x/2+475,camera.position.y/2+375);
  text('I',camera.position.x/2+500,camera.position.y/2+375);

  text('GLIDE',camera.position.x/2+300,camera.position.y/2+425);
  text(':',camera.position.x/2+475,camera.position.y/2+425);
  text('HOLD',camera.position.x/2+500,camera.position.y/2+425);
  text('K',camera.position.x/2+605,camera.position.y/2+425);
  

  textSize(64);
  text('东', camera.position.x / 2 ,camera.position.y / 2)
  text('方', camera.position.x / 2 + 72,camera.position.y / 2)
  text('月', camera.position.x / 2 + 144 ,camera.position.y / 2)
  text('神', camera.position.x / 2 + 216 ,camera.position.y / 2)
  text('夜', camera.position.x / 2 + 288 ,camera.position.y / 2)
  textSize(36);
  text('Touhou', camera.position.x / 2 ,camera.position.y / 2 + 64)
  text('Luna', camera.position.x / 2 + 148 ,camera.position.y / 2 + 64)
  text('Night', camera.position.x / 2 + 256 ,camera.position.y / 2 + 64)
  text('-', camera.position.x / 2 + 369 ,camera.position.y / 2 + 68)
  text('Replication', camera.position.x / 2 + 400 ,camera.position.y / 2 + 64)
}