var PLAY = 1;
var END = 0;
var gameState = PLAY;

var p1, p1_running, p1_collided;
var ground, invisibleGround, groundImage;

var backgroundImg
var score = 0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload() {
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")

  wall1_img = loadImage("assets/wall1.png")

  backgroundImg = loadImage("bg1.png")
  sunAnimation = loadImage("assets/sun.png");

  p1_running = loadAnimation("assets/jinn_animation/Idle1.png", "assets/jinn_animation/Idle2.png", "assets/jinn_animation/Idle3.png");
  p1_collided = loadAnimation("assets/jinn_animation/Idle1.png");

  p2_running = loadAnimation("assets/medusa/Idle1.png", "assets/medusa/Idle2.png", "assets/medusa/Idle3.png");
  p2_collided = loadAnimation("assets/medusa/Idle1.png");

  groundImage = loadImage("assets/ground.png");

  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1 = createSprite(50, 50, 20, 50);
  p1.addAnimation("running", p1_running);
  p1.addAnimation("collided", p1_collided);
  p1.setCollider('circle', -25, 0, 50)
  //p1.scale = 0.08
  //p1.debug=true

  p2 = createSprite(150, 50, 20, 50);
  p2.addAnimation("running", p2_running);
  p2.addAnimation("collided", p2_collided);
  p2.setCollider('circle', -25, 0, 50)
  //p2.scale = 0.08
  //p2.debug=true
  //for (var i = 70; i < 400; i = i + 100) {
    wall1 = createSprite(255, 245)
    wall1.addImage("wall1", wall1_img)
    wall1.scale=1.5
    wall1.debug=true
  //}
  invisibleGround = createSprite(width / 2, height - 10, width, 125);
  invisibleGround.shapeColor = "#f4cbaa";

  ground = createSprite(width / 2, height, width, 2);
  ground.addImage("ground", groundImage);
  ground.x = width / 2
  //ground.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(width / 2, height / 2 - 50);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width / 2, height / 2);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;


  // invisibleGround.visible =false



  score = 0;
}

function draw() {
  //p1.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: " + score, 30, 50);


  if (gameState === PLAY) {
    //score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);

    if (touches.length > 0 || keyDown("up")) {
      jumpSound.play()
      p1.velocityY = -10;
      touches = [];
    }
    if (touches.length > 0 || keyDown("w")) {
      jumpSound.play()
      p2.velocityY = -10;
      touches = [];
    }

    p1.velocityY = p1.velocityY + 0.8
    p2.velocityY = p2.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    p1.collide(wall1);
    p2.collide(wall1);
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    p1.velocityY = 0;


    //change the p1 animation
    p1.changeAnimation("collided", p1_collided);

    //set lifetime of the game objects so that they are never destroyed


    if (touches.length > 0) {
      reset();
      touches = []
    }
  }


  drawSprites();
}



function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;



  p1.changeAnimation("running", p1_running);

  score = 0;

}
