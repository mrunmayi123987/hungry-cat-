const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const Body = Matter.Body;

var START=0;
var PLAY=1;
var END=2;
var world,bodies,engine
var mouse , mouseImg;
var cat, catImg;
var bg1,bg2;
var box1;
var invisibleGround;
var bg , eatSound;
var jumpsound;
var pos=10;
var bricks , coin , coinImg ;
var BrickImg;
var BrickImg_light;
var startImg , startButton;
var GameState=START;
var score=0;
var  island;
var fish1Img, fish2Img , fish3Img;
var fish1 , fish2 , fish3;
function preload(){

catImg=loadImage("images/cat3_image.gif");
bg1=loadImage("images/background_image.jpg");
BrickImg = loadImage("images/brickimage_3.png");
BrickImg_light = loadImage("images/brickimage_10.png");
startImg = loadImage("images/startButton_image.gif");
coinImg = loadImage("images/coin_image.gif");
bg2 = loadImage("images/island_image.jpg");
mouseImg = loadImage("images/mouse_image.gif");
fish1Img=loadImage("images/fish1.png");
fish2Img = loadImage("images/fish2.png");
fish3Img =  loadImage("images/fish3.png");

jumpsound = loadSound("jumping_sound.mp3");
//eatSound = loadSound("eating_sound.mp3");
}

function setup() {


  createCanvas(1000,600);
  bg= createSprite(500,300,20,20);
 bg.addImage(bg1);

  engine= Engine.create();
 world = engine.world;

// box1 = new Box(400,500);
 //Matter.Body.scale(box1,2,2);
//for(var i=0;i<MaxBoxes;i=i+2){
//box1 = new Box(random(400,1000),random(400,500));

//}
island = createSprite(500,300,20,20);
 island.addImage(bg2);
 island.visible=false;
bricks=createSprite(1000,500,20,20);
coin = createSprite(100,500,20,20);
 cat = createSprite(200,200,20,20);
 cat.addImage(catImg);
 cat.scale=0.2;

 fish1 = createSprite(100,500,20,20);
 fish1.addImage(fish1Img);
 fish1.scale=0.2;

 fish2 = createSprite(300,500,20,20);
 fish2.addImage(fish3Img);
 fish2.scale=0.1;

 fish3 = createSprite(900,500,20,20);
 fish3.addImage(fish2Img);
 fish3.scale=0.1;

 invisibleGround = createSprite(500,580,1000,20);
 startButton = createSprite(500,300);
 startButton.addImage(startImg);
 startButton.scale=0.2;
 invisibleGround.visible=false;
 mouse = createSprite(1000,600,20,20);
 mouse.addImage(mouseImg);
 mouse.scale=0.5;
 
 mouse.visible = false;
fill("red");
textSize(20);

 
}

function draw() {
 // background(bg1);  
  Engine.update(engine);
   
 


 

   // box1.speed();
    if(GameState===PLAY){
cat.velocityY=cat.velocityY+0.8;

cat.collide(invisibleGround);
fish1.velocityX=-5;
if(fish1.x<0 ){
  fish1.x=1000;
  
}
fish2.velocityX=2;

if(fish2.x>1000 ){
  fish2.x=0;
  
}
fish3.velocityX=-3;
if(fish3.x<0 ){
  fish3.x=1000;
  
}

bg.velocityX=-4;

if(bg.x<0){
bg.x=500;
}
if(invisibleGround.x<0){
  invisibleGround.x=500;
  }

  spawnBricks();
   
  spawnCoin();

  if(cat.collide(bricks)){
bricks.addImage(BrickImg_light);
score=score+1;

//console.log("score"+score);


  }

 
 if(cat.collide(coin)){
score=score+2;

 }

 if(cat.collide(fish1) || cat.collide(fish2)|| cat.collide(fish3)){


score = score-1;
 }

 if(score===10){
   mouse.x=200;
   mouse.y=400;
 mouse.visible=true;
//island.visible=true;
 }
if(cat.collide(mouse)){
  //eatSound.play();
mouse.visible=false;
GameState=END;
console.log("game end");
}



}

if(GameState===END){
endGame();
textSize(30);
fill("blue");


}

if(GameState===START){
  startButton.visible=true;
  bg.velocityX=0;
invisibleGround.velocityX=0;
bricks.velocityX=0;
bricks.velocityY=0;

text("press start to start the game",550,350);
if(mousePressedOver(startButton)){
//console.log("restart");
start();

}


}
 // box1.display();

 // boxVelocity();
 drawSprites();

 if(GameState===START){
  text("press start to start the game",550,350);
  
 }
 text("score:"+score,500,200);
}

if(GameState===END){
 
  text("game end",70,350);

}

function keyPressed(){

  if(keyCode===38){

  cat.velocityY=-12;
  jumpsound.play();
  }
 else  if(keyCode===37){
   cat.velocityX=-5;

  }

  else if(keyCode===39){
  cat.velocityX=5;

  }else{

    cat.velocityX=0;
    cat.velocityY=0;
  }
}

function boxVelocity(){
  box1.body.velocity.x=15;
  //Matter.Body.applyForce(this.body,this.body.position,3);
  pos=pos+15;
  console.log("velocity is "+pos);
  Body.setVelocity( box1.body, {x: pos, y:500});
  


}
function spawnBricks(){
 if(frameCount%100===0){
   bricks=createSprite(1000,500,20,20);
  bricks.addImage(BrickImg);
 bricks.y=(random(400,500));
  bricks.x=(random(800,1000));
  bricks.velocityX=-3;
  bricks.scale=0.3;
  }
  }

  function spawnCoin(){
    if(frameCount%300===0){
      coin=createSprite(1000,500,20,20);
     coin.addImage(coinImg);
    coin.y=(random(400,500));
     coin.x=(random(800,1000));
     coin.velocityX=-3;
     coin.scale=0.3;
     }
     }

  function start(){

GameState=PLAY;
startButton.visible=false;


  }
  function endGame(){

bg.velocityX = 0;
bricks.velocityX=0;
bricks.velocityY=0;
fish1.velocityX=0;
fish2.velocityX=0;
fish3.velocityX=0;
coin.velocityX=0;
cat.velocityX=0;
cat.velocityY=0;
//bg.visible = false;


  }