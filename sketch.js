var ghost,ghostImage,tower,towerImage,door,doorImage,climber,climberImage;
var doorGroup,climberGroup;
var invisibleBlock,invisibleBgr;
var sound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  ghostImage = loadImage("ghost-standing.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  sound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBgr = new Group();
  
  ghost=createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
}
function draw(){
  sound.loop();
  if(gameState === PLAY){
  tower.velocityY = 1;
  if((tower.y>400)){
    tower.y=300;
  }
   spawnDoor();
  
  if((keyDown("space"))){
    ghost.velocityY = -2;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("right")){
    ghost.x=ghost.x+2;
  }
  if(keyDown("left")){
    ghost.x=ghost.x-2;
  }
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY =0;
    
  }
  if(invisibleBgr.isTouching(ghost)||ghost.y>600){
    gameState = END;
  }
     drawSprites();
  }
  if(gameState === END){
    background("black");
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    invisibleBgr.destroyEach();
    stroke("white");
    fill("yellow");
    textSize(30);
    text("GAME OVER",300,250);
  }
   
}
function spawnDoor(){
  if((World.frameCount % 240 === 0)){
    door=createSprite(Math.round(random(120,400)),-50);
    door.addImage(doorImage);
    door.velocityY =1;
    door.lifetime=800;
    doorGroup.add(door);
    
    door.depth=ghost.depth;
    ghost.depth+=1;
    
    climber=createSprite(door.x,10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climberGroup.add(climber);
    climber.lifetime=800;
    
    invisibleBlock = createSprite(door.x,15,climber.width,2);
    invisibleBlock.velocityY = 1;
    invisibleBgr.add(invisibleBlock);
    invisibleBlock.lifetime=800;
    invisibleBlock.debug=true;
  }
}