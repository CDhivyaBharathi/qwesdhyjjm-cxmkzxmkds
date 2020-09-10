//Name spacing
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//creating game objects
var canvas,ground,vGround;
var bgImg,backImage;
var bhoviyaImg,bhoviya;
var jImg,jButton;
var rImg,rButton;
var bhoviya_running;
var k1,k2,k3,k4,k5,k6;
var virus_Img, coin_Img, vaccine_Img;
var keysGroup, coinsGroup, virusGroup, virus1Group, vaccineGroup,coins1Group,coins2Group;
var keyCount = 0;
var lifeCount = 3;
var coinCount = 0;
//var life = [];
//var scoreCount = 0;
var fLifeImg;
var lifeCount_Img,fLife;
var coincount_Img,coincount_Obj;
var keycount_Img,keycount_obj;
var bhoviya_Img;
var winner_Img;

//Gamestates
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

//restart images and objects
var restart_Img, restart;
var gameover_IMg, gameOver;

//variables for preloading sound
var winSound, loseSound, jumpSound;


function preload(){
  //preloading images for game objects
    bgImg = loadImage("b1.png");
    jImg = loadImage("jumpButton.png");
    rImg = loadImage("runButton.png");
    bhoviya_running = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png");
    k1 = loadImage("1.png");
    k2 = loadImage("2.png");
    k3 = loadImage("3.png");
    k4 = loadImage("4.png");
    k5 = loadImage("5.png");
    k6 = loadImage("6.png");
    k7 = loadImage("7.png");
    virus_Img = loadImage("Corona.png");
    coin_Img = loadImage("coins.png");
    vaccine_Img = loadImage("vaccine.png");
    lifeCount_Img = loadImage("lifeCount.png");
    fLifeImg = loadImage("lifeWined.png");
    coincount_Img = loadImage("coinCount.png")
    keycount_Img = loadImage("keyCount.png");
    gameover_Img = loadImage("gameOver.png");
    restart_Img = loadImage("restart.png");
    winner_Img = loadImage("winText.png")

    //loading sounds for game actions
    winSound = loadSound("winner.mp3");
    jumpSound = loadSound("jump.mp3");
    loseSound = loadSound("lossing.mp3");


 }

function setup(){
    //creating the canvas
    canvas = createCanvas(windowWidth, windowHeight);

    //creating a moving background
    backImage = createSprite(width/3, height/3);
    backImage.addImage(bgImg);
    backImage.scale = 1.5;
  
    //creating bhoviya and adding image to her and setting the collider
    bhoviya = createSprite(width /8,height - 50,50,50);
    bhoviya.addAnimation("bhoviya",bhoviya_running);
    bhoviya.scale = 0.8;
    bhoviya.setCollider("rectangle",0,0,80,175);
    
    //creating gameover object and adding image to it
    gameOver = createSprite((width - 50)/2, (height - 200)/2);
    gameOver.addImage("gameOver",gameover_Img);
    
    //creating restart object and adding image to it
    restart = createSprite((width - 50)/2, (height - 100)/2);
    restart.addImage("restart",restart_Img);

    //Creating the life symbol on the top left corner
    fLife = createSprite((width - 50)/12,height - 655);
    fLife.addImage("freeLife",lifeCount_Img);
    fLife.scale = 0.1;
   
    //creating the coin symbol on the top lept corner
    coincount_Obj = createSprite((width - 50)/12,height - 680 );
    coincount_Obj.addImage("coinscount",coincount_Img);
    coincount_Obj.scale = 0.5;
    
    //creating the piano symbol on the top left corner
    keycount_obj = createSprite((width - 50)/12,height - 710 );
    keycount_obj.addImage("keycount",keycount_Img);
    keycount_obj.scale = 0.1;
    
    //creating the winner text and making it invisible
    winnerText = createSprite((width - 50)/2, (height - 200)/4);
    winnerText.addImage("winnerText",winner_Img);
    winnerText.visible = false;

   //Creating a visible ground
    ground = createSprite((width - 50)/2,(height - 20),(width - 50)+(width - 50),20);
    ground.visible = false;
    
    //Creating a invisible ground to prevent bhoviya from falling
    vGround = createSprite((width-50)/2,(height - 200),(width - 50),20);
    vGround.visible = false;
    
    //Creating the jump button on the bottom right
    jButton = createSprite(width/1.5 +300,(height - 50),50,50);
    jButton.addImage("jumpButton",jImg);
    jButton.scale = 0.8;

    //rButton = createSprite((width - 50)/1.5+275,(height - 250));
    //rButton.addImage("runButton",rImg);
    //rButton.scale = 0.8;
    
    //Creating groups for game objects
    keysGroup = new Group();
    coinsGroup = new Group();
    eLifeGroup = new Group();
    virusGroup = new Group();
    virus1Group = new Group();
    coins1Group = new Group();
    coins2Group = new Group();

    

    
 }

function draw(){
    background(0);
    fill ("White")
    textSize(25);


    // Condition stating all things that should happen when the gamestate is play
    if(gameState === PLAY){
        //moving the ground and background
        ground.velocityX = -2;
        backImage.velocityX = -3;
        winnerText.visible = false;

      //Increasing the keycount and destroying the key after bhoviya touches it.
      if(keysGroup.isTouching(bhoviya)){
        keysGroup.destroyEach();
        keyCount = keyCount+1;

      }
      
      //Decreasing the lifecount and destroying the virus after bhoviya touches it
      if(virusGroup.isTouching(bhoviya)){
        virusGroup.destroyEach();
        lifeCount = lifeCount-1;
      }
      
      //Decreasing the lifecount and destroying the virus after bhoviya touches it 
      //There are two virus groups cause to avoid all the virus in the frame from getting destroyed.
      //Without two groups, all the virus in the frame will get destroyed if bhoviya touches one virus.
      if(virus1Group.isTouching(bhoviya)){
        virus1Group.destroyEach();
        lifeCount = lifeCount-1;
      }
      
      //Increasing the coincount and destroying the coin after bhoviya touches it
      if(coinsGroup.isTouching(bhoviya)){
        coinsGroup.destroyEach();
        coinCount = coinCount+1;
      }
      
      //Increasing the coincount and destroying the coin after bhoviya touches it
      //There are two coin groups cause to avoid all the coins in the frame from getting destroyed.
      //Without two groups, all the coins in the frame will get destroyed if bhoviya touches one coins.
      if(coins1Group.isTouching(bhoviya)){
        coins1Group.destroyEach();
        coinCount = coinCount+1;
      }
      
      ////Increasing the lifecount and destroying the heart after bhoviya touches it
      if(eLifeGroup.isTouching(bhoviya)){
        eLifeGroup.destroyEach();
        lifeCount++
      }
      
      //hiding the gameover and restart button when the player is playing
      gameOver.visible = false;
      restart.visible = false;
    
      
      //Making bhoviya jump when the jump button is pressed and only when it is toching the ground.
      //This avoids the player to cheat by jumping in midair.
      if(mousePressedOver(jButton) && bhoviya.collide(ground) || touches.length>0) {
        jumpSound.play();
        bhoviya.velocityY = -25;
        touches = [];
      }

      //Giving bhoviya gravity.
      bhoviya.velocityY = bhoviya.velocityY + 0.8;

      //making bhoviya to collide with the invisible ground.
      //This shows as if bhoviya is walking on the visible ground.
      bhoviya.collide(ground);
      
      //Making the player lose and changing the gamestate to end when the player losses all the three lives.
      if(lifeCount === 0 ){
        loseSound.play();
        gameState = END;

      }
      
      //Making the player win and the changing the gamestate to win when the player collects all the seven keys
      if(keyCount === 7){
        winSound.play();
        gameState = WIN;

      }
        

      //if(mousePressedOver(rButton)) {
        // bhoviya.velocityX = +5;
          //bhoviya.velocityY = 0;
      //}
      
      //Scrolling the ground to prevent the player from falling
      if(ground.x<0){
        ground.x = ground.width/2;
      }

      //Scrolling the background to show the infinite screen
      if(backImage.x<0){
        backImage.x = backImage.width/2;
      }
      
      //Calling the functions made to spawn the gameobjects.
      spawnKeys();
      spawnVirus();
      spawnLife();
      spawnCoins();
       
    }
    
    // Condition stating all things that should happen when the gamestate is Win
    if(gameState === WIN){

      //Making the winner image and restart button visible.
      winnerText.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      vGround.velocityX = 0;
      bhoviya.velocityY = 0;
      backImage.velocityX = 0;
      keysGroup.setVelocityXEach(0);
      eLifeGroup.setVelocityXEach(0);
      coins1Group.setVelocityXEach(0);
      coins2Group.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);
      virusGroup.setVelocityXEach(0);
      virus1Group.setVelocityXEach(0);
      
      
     
      //bhoviya.changeAnimation("collided",bhoviya_Img);
      //bhoviya.y = (height - 400);
      //bhoviya.collide(vGround);
      
      
      //set lifetime of the game objects so that they are never destroyed
      keysGroup.setLifetimeEach(-1);
      eLifeGroup.setLifetimeEach(-1);
      coins1Group.setLifetimeEach(-1);
      coins2Group.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);
      virusGroup.setLifetimeEach(-1);
      virus1Group.setLifetimeEach(-1);
      
      //Calling the reset fuction when the restart button is pressed.
      if(mousePressedOver(restart) || touches.length>0) {
        reset();
        touches = [];
      }
      
  
  
    }


    // Condition stating all things that should happen when the gamestate is End.
    if(gameState === END){
      //Setting the gameover image and the restart button visible
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      vGround.velocityX = 0;
      bhoviya.velocityY = 0;
      backImage.velocityX = 0;
      keysGroup.setVelocityXEach(0);
      eLifeGroup.setVelocityXEach(0);
      coins1Group.setVelocityXEach(0);
      coins2Group.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);
      virusGroup.setVelocityXEach(0);
      virus1Group.setVelocityXEach(0);
      
      
    
      //bhoviya.changeAnimation("collided",bhoviya_Img);
      //bhoviya.y = (height - 400);
      //bhoviya.collide(vGround);
      
      
      //set lifetime of the game objects so that they are never destroyed
      keysGroup.setLifetimeEach(-1);
      eLifeGroup.setLifetimeEach(-1);
      coins1Group.setLifetimeEach(-1);
      coins2Group.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);
      virusGroup.setLifetimeEach(-1);
      virus1Group.setLifetimeEach(-1);
      
      //Calling the reset fuction when the restart button is pressed.
      if(mousePressedOver(restart)) {
        reset();
      }
      


    }
    

    
    drawSprites();
    //Displaying the text and scores using string concatination
    //The text is displayed after drawsprites cause the background will hide it.
    text(" : "+ keyCount, width /10,height - 700);
    text(" : "+ coinCount, width/10,height - 675);
    text(" : "+ lifeCount, width/10,height - 645);
    text("Press jump to make bhoviya jump and catch, beware of the virus as it will reduce your life",width/6,height - 700)
    text("catch 7 keys to win a heart for a life",width/3,height - 25)
    
    
 }   

function reset(){
  //Condition stating what should happen when the restart function is called

    //Changing the gamestate to play to start the game
   gameState = PLAY;
  
    //Setting the gameover text and restart button invisible, the winner image is done in the play game state
    gameOver.visible = false;
    restart.visible = false;
    
    //Destroying all the old gameobjects
    keysGroup.destroyEach();;
    eLifeGroup.destroyEach();
    coins1Group.destroyEach();
    coins2Group.destroyEach();
    coinsGroup.destroyEach();
    virusGroup.destroyEach();
    virus1Group.destroyEach();
    
  
   
    //Setting the integer variables back to their original values.
    keyCount = 0;
    coinCount = 0;
    lifeCount = 3;
    
}

//Function to spawn the keys
function spawnKeys() {
    //Condition stating what should happen when the frame count is divisible by 700
    if(frameCount % 700 === 0) {
    //Creating a variable for keys and setting velocity for it.
    var keys = createSprite(width/1,height/4,10,40);
    keys.velocityX = -4;
    keys.y = Math.round(random(height - 400,height - 600));

    //Creating a random variable
    var rand = Math.round(random(1,7));

    //using switch case to spawn random keys with random images
    switch(rand) {
      case 1: keys.addImage(k1);
              break;
       case 2: keys.addImage(k2);
               break;
       case 3: keys.addImage(k3);
               break;
       case 4: keys.addImage(k4);
               break;
       case 5: keys.addImage(k5);
               break;
       case 6: keys.addImage(k6);
               break;
       case 7: keys.addImage(k7);
               break;
       default: break;
      }          

    //Setting the size and lifetime for the key to avoid a memory leak
    keys.scale = 0.5;
    keys.lifetime = 600;

    //Adding keys to a group.
    keysGroup.add(keys);
    }
  }

  //Function to spawn the virus
  function spawnVirus() {
    //Condition stating what should happen when the frame count is divisible by 593
    if (frameCount % 593 === 0) {

      //Creating a variable for virus and setting velocity for it.
      var virus = createSprite(width/1,height/4,10,40);
      virus.y = Math.round(random(height - 350,height - 550));

      //Adding image to it
      virus.addImage(virus_Img);

      //Setting the velocity, size and lifetime for the virus to avoid a memory leak
      virus.scale = 0.3;
      virus.velocityX = -3;
      virus.lifetime = 600;

      //Adding the depth for bhoviya to avoid the virus to overlap bhoviya
      virus.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;

      //Adding the virus to a group
      virusGroup.add(virus);
    }
    //Condition stating what should happen when the frame count is divisible by 459
    if (frameCount % 459  === 0) {

      //Creating a variable for virus and setting velocity for it.
      var virus1 = createSprite(width/1,height/4,10,40);
      virus1.y = Math.round(random(height - 350,height - 550));

      //Adding image to it
      virus1.addImage(virus_Img);

      //Setting the velocity,size and lifetime for the virus to avoid a memory leak
      virus1.scale = 0.3;
      virus1.velocityX = -3;
      virus1.lifetime = 600;

      //Adding the depth for bhoviya to avoid the virus to overlap bhoviya
      virus1.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;

      //Adding the virus to a group
      virus1Group.add(virus1);
    }
    
  }
 
  //Function to spawn the virus
  function spawnLife() {
      //Condition stating what should happen when the frame count is divisible by 1500
      if (frameCount % 2000 === 0) {

      //Creating a variable for life and setting velocity for it.
      var eLife = createSprite(width/1,height/4,10,40);
      eLife.y = height/2;

      //Adding a image to it
      eLife.addImage(fLifeImg);

      //Setting the velocity,size and lifetime for the life to avoid a memory leak
      eLife.scale = 0.3;
      eLife.velocityX =-3;
      eLife.lifetime = 600;

      //Adding the depth for bhoviya to avoid the life to overlap bhoviya
      eLife.depth = bhoviya.depth;
      eLife.depth = bhoviya.depth + 1;

      //Adding the life to a group
      eLifeGroup.add(eLife);
     }
        
  }


  //Function to spawn the coins
  function spawnCoins() {
    //Condition stating what should happen when the frame count is divisible by 1500
    if (frameCount % 409 === 0) {

      //Creating a variable for coin and setting velocity for it.
      var coins = createSprite(width/1,height/4,10,40);
      coins.y = Math.round(random(height - 500,height - 600));

      //Adding a image to it
      coins.addImage(coin_Img);

      //Setting the velocity,size and lifetime for the coin to avoid a memory leak
      coins.scale = 1;
      coins.velocityX = -3;
      coins.lifetime = 600;

      //Adding the depth for bhoviya to avoid the coin to overlap bhoviya
      coins.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;

      //Adding the coin to a group
      coinsGroup.add(coins);
    }
        
    //Condition stating what should happen when the frame count is divisible by 1500
    if (frameCount % 623 === 0){

      //Creating a variable for coin and setting velocity for it.
      var coins1 = createSprite(width/1,height/4,10,40);
      coins1.y = Math.round(random(height - 500,height - 600));

      //Adding a image to it
      coins1.addImage(coin_Img);

      //Setting the velocity,size and lifetime for the coin to avoid a memory leak
      coins1.scale = 1;
      coins1.velocityX = -3;
      coins1.lifetime = 600;

      //Adding the depth for bhoviya to avoid the coin to overlap bhoviya
      coins1.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;

      //Adding the coin to a group
      coins1Group.add(coins1);
    }
        
  }

      //**This is the code for the game called "Bhoviya the Pianist" by C Dhivya Bharathi in the date: 9th September 2020**//