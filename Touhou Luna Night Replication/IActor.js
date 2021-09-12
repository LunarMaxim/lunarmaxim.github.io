class IActor {

  sprite;
  HP;
  HPMax;

  constructor(x, y) {
    this.sprite = createSprite(x, y);
    this.sprite.setCollider('rectangle', 0, 0, 32, 64);
    this.sprite.scale = 3;
  }


  drawActor() {
    drawSprite(this.sprite);
    this.debug();
  }
  
  debug(){
    this.sprite.debug = drawDebugUI;
  }
}