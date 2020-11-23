var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkeyRunning
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground;
var survivalTime;
var score;
var jungle,jungleImg;


function preload(){
  
  jungleImg=loadImage("jungle.jpg");
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  obstacleImage=loadImage("obstacle.png");
  bananaImage=loadImage("banana.png");

}



function setup() {
  createCanvas(600,600);
  
  jungle=createSprite(300,300,1200,600);
  jungle.addImage(jungleImg);
  jungle.velocityX=-4;
  jungle.x = jungle.width/2;
  
  monkey=createSprite(80,415,20,20);
  monkey.addAnimation("moving" ,monkeyRunning);
  monkey.scale=0.1;

  ground=createSprite(400,490,1800,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  
 survivalTime=0;
  score=0;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
 
}


function draw() {
background(color(10, 650, 295));
  
 
  
if(gameState===PLAY){
   ground.velocityX = -(4+survivalTime/100*3);
    //scoring
    survivalTime = survivalTime + Math.round(frameCount/60);
    
  
  if (ground.x <0){
      ground.x = ground.width/4;
    }
   if (jungle.x <125){
      jungle.x = jungle.width/4;
    }
  
  if(keyDown("space") && monkey.y >= 100 ){
    monkey.velocityY= -12 ;
  
  }

  //add gravity
  monkey.velocityY= monkey.velocityY + 0.8 ;
  monkey.collide(ground);
 
 
    stroke("white");
    textSize(20);
    fill("white");
    text("score: "+score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black")
    score=Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivalTime,100,50);
  
 if(monkey.isTouching(bananaGroup)){
   score=score+1;
 }
  spwanObstacles();
  spwanFood();
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  
}
  
 else if(gameState===END){
  ground.velocityX = 0;
  monkey.visible=false;
   stroke("purple")
   textSize(50);
   fill("purple")
   text("Game Over!" ,150,300);
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
  }
drawSprites();
}

function spwanObstacles(){
  
  if(frameCount % 300===0){
    var obstacle= createSprite(600,390,10,40);
     obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}

function spwanFood(){
  if (frameCount % 80===0){
  var banana=createSprite(300,250,20,20);
   banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.scale=0.09;
  banana.velocityX=-3;
  banana.lifetime = 150;
  banana.setCollider("circle",0 ,0,40);
  //banana.debug=true;
    bananaGroup.add(banana);
  }
}






