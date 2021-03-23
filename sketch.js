var wii,wi;
var gii,gi;
var epki,epk,epkgrp;
var gpki,gpk,gpkgrp;
var bki;
var grdi,grd;
var shi,sh;
var tri,tr;
var scl = 1;
var hi,h;

var gmst = "play";
var gmori,gmor;
var resti,rest;

var laserSound;
var laughSound;
var bkgrdSound;

var shots,chk = 0;
var score = 0,hit = 0;

function preload() {
  
 gii = loadAnimation("rf1.png","rf2.png","rf3.png","rf4.png","rf5.png","rf6.png","rf7.png","rf8.png","rf9.png","rf10.png");
  
  wii = loadAnimation("w1.png","w2.png","w3.png","w4.png","w5.png","w6.png","w7.png","w8.png","w9.png","w10.png","w11.png","w12.png");
  
  bki = loadImage("bkgrd.jpg");
  grdi = loadImage("grass2.PNG");
  gpki = loadImage("good pmk.png");
  epki = loadImage("evil pmk.png");
  shi = loadImage("LA.png");
  tri = loadImage("tree1.png");
  hi = loadImage("house.png");
  gmori = loadImage("gameover.png");
  resti = loadImage("reset-button-png.png");
  laserSound = loadSound("Comet-SoundBible.com-1256431940.wav");
  laughSound = loadSound("cackle3.wav");
  bkgrdSound = loadSound("evil_and_horror.mp3");
 }

function setup() {
  createCanvas(600, 300);
 
  background = createSprite(width/2,height/2,600,300);
  background.addImage(bki);
  
  h = createSprite(400,200,20,20);
  h.addImage(hi);
  h.velocityX = -5;
  h.lifetime = 100;
    
  cgrd=createSprite(300,300,600,10);
  cgrd.visible = false;
  
  wi=createSprite(70,220,20,20);
  wi.addAnimation("witch",wii);
  wi.scale = 0.5;
  
  gi=createSprite(250,240,20,20);
  gi.addAnimation("girl",gii);
  gi.scale = 0.28;
  gi.debug = false;
  gi.setCollider("rectangle",0,0,70,350)
  
  grd=createSprite(0,295,20,20);
  grd.addImage(grdi);
  grd.scale = 0.4;
  
  gmor = createSprite(width/2,height/2-50,20,20);
  gmor.addImage(gmori);
  gmor.visible = false;
  
  rest = createSprite(width/2,height/2+50,20,20);
  rest.addImage(resti);
  rest.scale = 0.2;
  rest.visible = false;
  
  bkgrdSound.loop();
  
  shots = new Group();
  gpkgrp = new Group();
  epkgrp = new Group();
  fill(255); 
}

function draw() {
   
  if(gmst==="play"){
  grd.velocityX = -4;
  if(grd.x<0){
    grd.x = 300;
  }
  if(frameCount%20===0){
    trees();
  }
  gi.collide(cgrd);
  if(keyDown("up")&& gi.y>200){
    gi.velocityY = -8;
  }
  wi.y = gi.y -30;
  gi.velocityY = gi.velocityY +0.3;
  
  chk = Math.round(random(120,180));
  if(frameCount%chk===0){
    shot();
    laserSound.play();
  }
  
  if(frameCount%150===0){
    gpumpkin();
  }
  if(frameCount%Math.round(random(220,250))===0){
    epumpkin();
  }
  if(frameCount%300===0){
    laughSound.play();
  }  
  hits();
    if(hit===5){
      gmst = "end";
      wi.y = 400;
      gi.y = 400;
      epkgrp.destroyEach();
      gpkgrp.destroyEach();
      shots.destroyEach();
      gmor.visible = true;
      bkgrdSound.pause();
      rest.visible = true;
    }
    drawSprites();
    text("Score : "+score,500,50);
    text("Hits : "+hit,50,50);
   }
   if(gmst==="end"){
      Reset();
   } 
}

function trees() {
  tr = createSprite(610,250,20,20);
  tr.addImage(tri);
  scl = Math.round(random(1,3));
  if(scl===1){
    tr.scale = 0.2;
    tr.y = 235;
  }
  else if(scl===2){
    tr.scale = 0.3;
    tr.y = 210;
  }
  else if(scl===3){
    tr.scale = 0.4;
     tr.y = 180;
  }
  tr.depth = background.depth +1;
  tr.velocityX = -5;
  tr.lifetime = 130;
}
function shot() {
  sh = createSprite(100,wi.y+30,20,20);
  sh.addImage(shi);
  sh.scale = 0.1;
  sh.depth = wi.depth -1;
  sh.depth = tr.depth +1;
  sh.velocityX = 3;
  sh.lifetime = 170;
  shots.add(sh);
}
function hits(){
  for(i = 0;i < shots.length;i++){
    if(shots[i].isTouching(gi)){
      shots[i].destroy();
      hit = hit +1;
    }
  }
  for (j = 0; j <gpkgrp.length; j++){ 
  if(gpkgrp[j].isTouching(gi)){
    score = score +5;
    gpkgrp[j].destroy();
  }
 }
  for (k = 0; k <epkgrp.length; k++){
    if(epkgrp[k].isTouching(gi)){
      score = score -2;
      epkgrp[k].destroy();
    }
  }
}
function gpumpkin(){
  gpk = createSprite(610,260,20,20);
  gpk.addImage(gpki);
  gpk.scale = 0.06;
  gpk.velocityX = -4;
  gpk.depth = grd.depth -1;
  gpk.lifetime = 160;
  gpkgrp.add(gpk);
  }
function epumpkin(){
  epk = createSprite(610,260,20,20);
  epk.addImage(epki);
  epk.scale = 0.3;
  epk.velocityX = -4;
  epk.depth = grd.depth -1;
  epkgrp.add(epk);
}
function Reset(){
  if(mousePressedOver(rest)){
     if(mouseDown("leftButton")){
       gmst = "play";
       wi.y = 220;
       gi.y = 240;
       epk.visible = true;
       gpk.visible = true;
       gmor.visible = false;
       rest.visible = false;
       score = 0;
       hit = 0;
       bkgrdSound.loop();
     }    
   }
}
