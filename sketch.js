var PLAY=1;
var END=0;
var gameState=PLAY;
var boyRun,ground,invisible,cloudgroup,obstaclesgroup,reset,gameover,coinsgroup,score,cloud
var boyRunImg,groundImg,cloudImg,obstaclesImg1, obstaclesImg2,obstaclesImg3,resetImg,gameoverImg,
coinsImg,collidedImg


function preload(){
boyRunImg=loadAnimation("run1.png","run2.png","run3.png")
groundImg=loadImage("gr.png")
//cloudImg=loadImage("")
obstaclesImg1=loadImage("ob.png");
obstaclesImg2=loadImage("ob1.png");
obstaclesImg3=loadImage("ob2.png");
resetImg=loadImage("reset.png");
gameoverImg=loadImage("gameover.png");
coinsImg=loadAnimation("coin.png","coin1.png","coin2.png","coin3.png","coin4.png","coin5.png")
cloudImg=loadImage("cloud.png");
collidedImg=loadImage("run2.png");
}




function setup() {
  createCanvas(windowWidth,windowHeight)

boyRun = createSprite(100, height-100);
boyRun.debug=false;
boyRun.setCollider("rectangle",0,0,55,70);
boyRun.addAnimation("run",boyRunImg);
boyRun.addAnimation("run2",collidedImg);
ground = createSprite(width/2, height-180);
ground.addImage("ground",groundImg);
ground.scale=6;
 invisible = createSprite(width/2, height-100,width,10);
invisible.visible=false;
cloudgroup = createGroup();
 obstaclesgroup = createGroup();
reset = createSprite(width/2, height/2);
reset.addImage("image",resetImg);
 gameover = createSprite(width/2, height/2+100);
gameover.addImage("gameover",gameoverImg);
reset.scale=0.2;
gameover.scale=0.5;
 coinsgroup = createGroup();
score=0;

}


function draw() {
if (gameState==PLAY) {
     if (keyDown("up")||touches.length>0) {
   boyRun.velocityY=-8;
   touches=[]
  }
    boyRun.velocityY=boyRun.velocityY+0.8;
ground.velocityX=-4;
    if (ground.x<0) {
    ground.x=ground.width/2;
  }
  if(boyRun.isTouching(coinsgroup)){
    coinsgroup[0].destroy();
    score=score+1;
  }
  reset.visible=false;
  gameover.visible=false;
  spawnclouds();
  spawnobstacles();
  spawncoins();
  if (boyRun.isTouching(obstaclesgroup)) {
    gameState=END;
  }
  } else if(gameState==END)
  {
ground.velocityX=0;
cloudgroup.setVelocityXEach(0);
obstaclesgroup.setVelocityXEach(0);
boyRun.changeAnimation("run2",collidedImg);
obstaclesgroup.setLifetimeEach(-1);
cloudgroup.setLifetimeEach(-1);
reset.visible=true;
gameover.visible=true;
boyRun.velocityY=0;
coinsgroup.setVelocityXEach(0);
coinsgroup.setLifetimeEach(-1);
    
  }
 if(mousePressedOver(reset)||touches.length>0){
  gameState=PLAY;
 obstaclesgroup.destroyEach();
 cloudgroup.destroyEach();
 boyRun.changeAnimation("run",collidedImg);
 coinsgroup.destroyEach();
 score=0;
 touches=[]
 }   
  background("white");
 
  boyRun.collide(invisible);
textSize(25);
text("score:"+score, 20, 30);


  drawSprites();
}

function spawnobstacles(){
 
  if (World.frameCount%240==0) {
     var obstacles = createSprite(width, height-150);
 obstacles.velocityX=-4;
 var rand=Math.round(random(1,3))
switch(rand){
case 1:obstacles.addImage("ob",obstaclesImg1);
break;
case 2:obstacles.addImage("ob1",obstaclesImg2);
break;
case 3:obstacles.addImage("ob2",obstaclesImg3);
break;
default:break;
}



obstacles.lifetime=width/4;
obstaclesgroup.add(obstacles);
obstacles.debug=false;
obstacles.setCollider("rectangle",0,0,55,70);


 }
  
}

function spawnclouds(){

 if (World.frameCount%120==0) {
          var cloud = createSprite(width,height-100);
cloud.y=
random(height/2, height/2-100);
cloud.addImage("cloud",cloudImg);
cloud.velocityX=-2;
cloud.scale=0.2;
cloud.depth=boyRun.depth;
cloud.depth=cloud.depth-1;
cloud.lifetime=width/2;
cloudgroup.add(cloud);     
 }
               
}
function spawncoins(){
  if(World.frameCount%60==0){
var coins = createSprite(width, 50);
coins.y=
random(height/2, height/2+100);
coins.addAnimation("coin",coinsImg);
coins.scale=0.5;
coins.velocityX=-2;
coins.lifetime=width/2;
coinsgroup.add(coins);


  }
}