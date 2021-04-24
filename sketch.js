var gameState = "Start";
var gameLevel = 0;
var level1S = "stop";
var gameTitle, playButton;
var button1, button2, button3, button4, button5, button6;
var rocks, distance;

function preload()
{
  bg = loadImage("images/bg.jpg");
  rocketImg = loadImage("images/spaceShip.png");
  rockImg1 = loadImage("images/meteor.png");
  rockImg2 = loadImage("images/asteroids.png");
  bg2 = loadImage("images/stars.png");

  landingF0 = loadImage("landing_frame/Landing0.png");
  landingF1 = loadImage("landing_frame/Landing1.png");
  landingF2 = loadImage("landing_frame/Landing2.png");
  landingF3 = loadImage("landing_frame/Landing3.png");
  landingF4 = loadImage("landing_frame/Landing4.png");
  landingF5 = loadImage("landing_frame/Landing5.png");
  landingF6 = loadImage("landing_frame/Landing6.png");
  landingF7 = loadImage("landing_frame/Landing7.png");
}
function setup() {
  canvas = createCanvas(800,400);
  gameTitle = createElement('h1');
  gameTitle.position(200, 20);
  gameTitle.html("A Look Into Another World");

  playButton = createButton("PLAY");
  playButton.position(400, 300);

  starBg = createSprite(400, -600, 800, 2000);
  starBg.addImage(bg2);
  starBg.visible = false;

  rocket = createSprite(400, 350, 40, 80);
  rocket.addImage("flying", rocketImg);
  rocket.scale = 0.2;
  rocket.visible =false;
  rocket.debug=true;

  rocksG = createGroup();

  gameOver = createSprite(400, 100, 100, 50);
  gameOver.visible = false;

  reset = createSprite(400, 200, 50, 50);
  reset.visible = false;

  button1 = createButton("1");
  button1.position(200, 100);

  button2 = createButton("2");
  button2.position(400, 100);

  button3 = createButton("3");
  button3.position(600, 100);

  button4 = createButton("4");
  button4.position(200, 300);

  button5 = createButton("5");
  button5.position(400, 300);

  button6 = createButton("6");
  button6.position(600, 300);

  back = createButton("Back");
  back.position(20, 20);
  back.hide();

  button1.hide();
  button2.hide();
  button3.hide();
  button4.hide();
  button5.hide();
  button6.hide();
  
  distance = 0;
  landingFrameC = 0;
}

function draw() {
  background(bg);

  playButton.mousePressed(() => {
    gameState = "levels";
  })
  
  if (gameState === "levels" && gameLevel === 0)
  {
    gameTitle.hide();
    playButton.hide();

    button1.show();
    button2.show();
    button3.show();
    button4.show();
    button5.show();
    button6.show();
  }

  button1.mousePressed(() => 
  {
    gameState = "level1";
    gameLevel = 1;
    level1S = "start";
  });

  if (gameState === "level1")
  {
    level1start();
  }

  drawSprites();

  if (gameState === "level1")
  {
    textSize(20);
    fill("white");
    text("Distance: " + distance, 680, 30);
  }
}

function level1start()
{
  if (level1S === "start")
  {
    if (frameCount % 100 === 0)
    {
      distance++
    }

    starBg.visible = true;
    starBg.velocityY = 5;

    if(starBg.y > 580)
    {
      starBg.y = -600;
    }

    button1.hide();
    button2.hide();
    button3.hide();
    button4.hide();
    button5.hide();
    button6.hide();

    rocket.visible = true;

    if (keyIsDown(RIGHT_ARROW))
    {
      rocket.x += 10;
    }

    if (keyIsDown(LEFT_ARROW))
    {
      rocket.x -= 10;
    }

    spawnRocks();

    if (distance === 10)
    {
      level1S = "ending";
    }

    if (rocksG.isTouching(rocket))
    {
      level1S = "gameOver";
    }
  }
  else if(level1S === "ending")
  {
    rocket.visible= false;
    starBg.visible = false;

    landingAni = createSprite(400, 200);

    if (frameCount % 20=== 0)
    {
      landingFrameC++;
    }

    switch(landingFrameC)
    {
      case 0: landingAni.addImage(landingF0);
      break;
      case 1: landingAni.addImage(landingF1);
      break;
      case 2: landingAni.addImage(landingF2);
      break;
      case 3: landingAni.addImage(landingF3);
      break;
      case 4: landingAni.addImage(landingF4);
      break;
      case 5: landingAni.addImage(landingF5);
      break;
      case 6: landingAni.addImage(landingF6);
      break;
      case 7: landingAni.addImage(landingF7);
      break;
      default: landingAni.addImage(landingF7);
      break;
    }

    if (landingFrameC > 8)
    {
      level1S = "passed";
    }    
  }
  else if (level1S === "gameOver")
  {
    starBg.velocityY = 0;
    gameOver.visible = true;
    reset.visible = true;
    rocksG.setVelocityYEach = 0;

    if(mousePressedOver(reset))
    {
      distance = 0;
      reset.visible = false;
      gameOver.visible = false;
      rocket.x = 400;
      level1S = "start";
    }
  }
  else if (level1S === "passed")
  {
    landingAni.visible = false;
    textSize(30);
    fill("black");
    text("YOU HAVE REACHED KEPLER 452 B", 200, 185);

    back.show();

    back.mousePressed(() => 
    {
      gameState = "levels";
      gameLevel = 0;
      back.hide();
    });
  }
}


function spawnRocks()
{
  if (frameCount % 50 === 0)
    {
      //for (r = 0; r < 4; r++)
      //{
        rocks = createSprite(random(0, 800), -10, 50, 50);
      //  rocksA = [rockImg1, rockImg2]
       // rocks.addImage(rocksA[Math.round(random(0,1))]);
       var rand = Math.round(random(1,2))
       switch(rand)
       {
         case 1: rocks.addImage(rockImg1);
         break;
         case 2: rocks.addImage(rockImg2);
         break;
       }
      
        rocks.scale = random(0.1, 0.3);
        rocks.velocityY = random(5, 10);
       
        
    //  }
      rocks.setCollider("circle", 0, 0, rocks.scale * 500);
      rocks.lifeTime = 100;
        rocks.debug = true;
        rocks.depth  = rocket.depth - 1;
      rocksG.add(rocks);
    }
}