
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,i,survivalTime;
var PLAY=1,END=0;
var gameState=PLAY;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);  
  ground=createSprite(200,360,800,10);
  ground.velocityX=-2;
  //Monkey Sprites.
  monkey=createSprite(50,330,5,5);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  //monkey.debug=true;
  //Monkey Sprites.
  FoodGroup=new Group();
  obstacleGroup=new Group();
  survivalTime=0;
}

function draw() {
  background(255);
  //Moving the Ground.
  fill("cyan");
    textAlign(CENTER);
    textSize(20);
    text("Survival Time: "+survivalTime,200,80);
    textAlign(RIGHT);
    text("Score: "+score,350,20);
  if(gameState===PLAY)
    {
      i=0;
        //Invoking Food and Obstacle's Functions.
      bananaSpawn();
      stoneSpawn();
      if(ground.x<0)
      {
        ground.x=ground.width/2;
      }
    //Moving the Ground.

    //Jumping.
    if(keyDown("space") && monkey.y>=320)
      {
        monkey.velocityY=-13;
      }
    monkey.velocityY+=0.5;
    monkey.collide(ground);
    //Jumping.

    //Monkey Collided?
    if(monkey.isTouching(obstacleGroup))
      {
        gameState=END;
      }
      //Monkey Collided?
      
      //Eating Food.
      if(i<FoodGroup.length)
        {
          i=eatFood();
        }
      
    survivalTime=(round(ceil(frameCount/frameRate())));
    }
  else if(gameState===END)
    {
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      ground.velocityX=0;
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      monkey.velocityY=0;
    }
  drawSprites();
  
}

function bananaSpawn()
{
  if(frameCount%80==0)
    {
      banana=createSprite(400,round(random(180,250)),5,5);
      banana.lifetime=200;
      banana.velocityX=-(4+survivalTime/10);
      banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.depth=monkey.depth;
      monkey.depth++;
      FoodGroup.add(banana);
    }
}

function stoneSpawn()
{
  if(frameCount%100==0)
    {
      obstacle=createSprite(400,340,5,5);
      obstacle.lifetime=300;
      obstacle.velocityX=-(6+survivalTime/8);
      obstacle.setCollider("circle",0,0,150);
      //obstacle.debug=true;
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.1;
      obstacleGroup.add(obstacle);
    }
}


function eatFood()
{
  i=0;
  if(monkey.isTouching(FoodGroup.get(i)))
    {
      FoodGroup.get(i).lifetime=1;
      FoodGroup.get(i).destroy();
      score=score+1;
    }
  return i;
}





