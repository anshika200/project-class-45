gameState="serve";
score1=0;
lives=5;
var bgServe,bgServeImg;
var mouthRules,mouthRulesImg;
var mouthbg,toothpasteGroup;
var next ,nextArrow;
var mgerm1Img,mgerm2Img,mgerm3Img,mgerm4Img;
var germGroup;
var toothbrush,pasteImg,toothbrushImg;
var monstergerm,monstergermImg;


function preload(){
  //loading images
  bgServeImg=loadImage("images/bg.jpg");
  mouthRulesImg=loadImage("images/mouthStartBg.jpg")
  nextArrow=loadImage("images/nextArrow1.png")
  mouthbg=loadImage("images/mouthbg.jpg")
toothbrushImg=loadImage("images/toothbrush.png")
pasteImg=loadImage("images/toothpaste.png")
monstergermImg=loadImage("images/monstergerm.png")

  //loading animations
  mgerm1Img=loadAnimation('images/mg1a.png','images/mg1b.png','images/mg1a.png')
  mgerm2Img=loadAnimation('images/mg2a.png','images/mg2b.png','images/mg2a.png')
  mgerm3Img=loadAnimation('images/mg3a.png','images/mg3b.png','images/mg3a.png')
  mgerm4Img=loadAnimation('images/mg4b.png','images/mg4a.png','images/mg4c.png')



}

function setup() {
  createCanvas(1200, 800);
  // background of starting displaying game's name 
  bgServe=createSprite(600,400)
  bgServe.addImage(bgServeImg)
  bgServe.visible=false

  // mouthrules sprites
  mouthRules=createSprite(600,400)
  mouthRules.addImage(mouthRulesImg)
  mouthRules.scale=1.5
  mouthRules.visible=false

  next =createSprite(850,727) 
  next.addImage(nextArrow)
  next.scale=0.35
  next.visible=false

  // mouth bacteria fight game Stage 1 sprites and characters 
  germGroup = new Group();
  toothpasteGroup= new Group();

  toothbrush =createSprite(1100,427) 
  toothbrush.addImage(toothbrushImg)
  toothbrush.scale=2.55
  toothbrush.visible=false
  toothbrush.debug=true
  toothbrush.setCollider("rectangle",0,0,15,toothbrush.height)

  monstergerm=createSprite(0,400,10,10)
  monstergerm.addImage(monstergermImg)
  monstergerm.visible=false
  germGroup.add( monstergerm);
  
}

function draw() {
   background(0);
   serve();
   stage1mouth();
   stage1();
   end();
   if (gameState==="stage1" && lives <= 0 ){
    gameState="end"
  }
 
  drawSprites();
  textSize(40);
  fill("lightBlue")
text("Lives :  " + lives, 40, 80);
}

function serve(){
if (gameState==="serve"){
  bgServe.visible=true
  lives=5
  score1=0
  if (keyDown("space") && gameState==="serve"){
    gameState="start"
    console.log("start")
  } 
 }
}
function stage1mouth(){
  if (gameState==="start"){
      bgServe.visible=false
      mouthRules.visible=true
      next.visible=true
    if (mousePressedOver(next)&& gameState==="start"){
      gameState="stage1"
      console.log("stage1")
    }
   }
}
function stage1(){
if (gameState==="stage1"){
  background(mouthbg)
   next.visible=false
   mouthRules.visible=false
   toothbrush.y = World.mouseY
   toothbrush.visible=true

   if (keyDown("space")) {
    toothpaste();
  }

  if (toothpasteGroup.isTouching(germGroup)) {
    score1= score1 + 1;
    console.log(score1)
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
   // blastSound.play();

  }

  if (germGroup.isTouching(toothbrush)){
    lives=lives-1
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
  }

  if (score1===4){
    console.log("monster's here")
    monstergerm.visible=true
monstergerm.velocityX=15
  }

  if (World.frameCount % 80 == 0) {  
    var germ = createSprite(0, Math.round(random(30, 770)), 10, 10);
    //germ.debug=true
    germ.velocityX = (6 + score1/2);
    germ.lifetime = 1250;
    germGroup.add( germ);
    var randStone = Math.round(random(1, 4))
    switch (randStone) {
      case 1:germ.addAnimation("kill",mgerm1Img)
      germ.scale=0.3;
        break;
        case 2:germ.addAnimation("run",mgerm2Img)
        germ.scale=0.25;
        break;
      case 3: germ.addAnimation("hit",mgerm3Img)
      germ.scale=0.27;
        break;
        case 4: germ.addAnimation("play",mgerm4Img)
      germ.scale=0.32;
        break;
        default:
        break;
    }}

    
}
}
function toothpaste() {
  var toothpaste= createSprite(1100, 1100, 60, 10);
  toothpaste.addImage(pasteImg);
  toothpaste.y = toothbrush.y-100;
  toothpaste.velocityX = -(9+score1/3);
  toothpaste.lifetime = 550;
  toothpaste.scale =0.21;
  toothpasteGroup.add(toothpaste);

}
function end(){
  if (gameState==="end"){
console.log("end")
  }
}



