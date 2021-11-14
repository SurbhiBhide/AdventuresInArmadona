//defining variables
var score1,score2;
var health1, health2;
var gameState;
var star, starImage;
var resetImage, resetG;
var B1g, B1I;
var bg, bgI, bg2, bg2I;
var rocket, rocketImage;
var ast1, asteroid1, ast2, asteroid2;
var plant1Image, plant, plant2Image;
var dedge, redge, ledge, medge, ground;
var zombie1, zombie1Image, zombie2Image, zombie2;
var laser, LG, zombie1G, plant1G, zombie2G, plant2G;
var bird, birdImage, birdgroup;
var spaceship, spaceshipI, spaceshipG;

//highscores
localStorage["HighScore1"] = 0;
localStorage["HighScore2"] = 0;

//image loading
function preload() {
  bgI = loadImage("space.png");
  bg2I = loadImage("ground.png");

  rocketImage = loadImage("rocket.png");

boy_running = loadAnimation("boy_1.png" , "boy_2.png" , "boy_3.png" , "boy_4.png" , "boy_5.png" , "boy_6.png" , "boy_7.png" , "boy_8.png" , "boy_9.png" , "boy_10.png");

  asteroid1 = loadImage("asteroid-icon.png");
  asteroid2 = loadImage("asteroid.png");

  plant1Image = loadImage("DeadlyPlant.png");
  plant2Image = loadImage("deadlyPlant2.png");
  zombie1Image = loadImage("Zombie.png");
  zombie2Image = loadImage("zombie2.png");

  starImage = loadImage("Star.png");

  B1I = loadImage("cyanB.png");

  resetImage = loadImage("reset.png");

  laserI = loadImage("lasers.png");

  birdImage = loadImage("dinobird.png");

  spaceshipI = loadImage("spaceship.png");
}

//game setup
function setup() {
  //creating canvas
  createCanvas(1450, 675);

  //backgroung for space game
  bg = createSprite(225, 225, 450, 450);
  bg.addImage(bgI);
  bg.scale = 8.9;

  //background for zombie game
  bg2 = createSprite(725, 250, 1450, 675);
  bg2.addImage(bg2I);
  bg2.scale = 6;
  bg2.visible = false;
  //bg2.velocityX = -4;

  //rocket in space game
  rocket = createSprite(725, 337.5, 20, 20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.37;
  rocket.debug = false;

  //edges
  dedge = createSprite(225, 800, 10095, 10);
  redge = createSprite(0, 225, 10, 1250);
  ledge = createSprite(1450, 225, 10, 1250);
  medge = createSprite(225, displayHeight/2, 10095, 10);

  //dedge.y = rocket.x +675;

  //ground
  ground = createSprite(225, 600, 10095, 10);
  ground.visible = false;

  
  //boy in zombie game
  boy = createSprite(150, 500, 10, 10);
  boy.addAnimation("running", boy_running);
  boy.scale = 4.5;
  boy.visible = false;
  boy.debug = true;
  boy.setCollider("rectangle", 0, 0, 30, 40);

  //groups
  B1g = new Group();
  AST = new Group();
  AST2 = new Group();
  STARS = new Group();
  resetG = new Group();
  zombie1G = new Group();
  zombie2G = new Group();
  plant1G = new Group();
  plant2G = new Group();
  LG = new Group();
  birdgroup = new Group();
  spaceshipG = new Group();

  //scores, healths and gamestate
  score1 = 0;
  score2 = 0;
  health1 = 5;
  health2 = 5;
  gameState = "menu";
}

function draw() {

  //background
  background("white");

  //Menu
  if (gameState === "menu") {
    MENU();
  }

  //Intro for space game
  if (gameState === "intro1") {
    INTRO1();
  }

  //intro for zombie game
  if (gameState === "intro2") {
    INTRO2();
  }

  //rocket game
  if (gameState === "game1") {
    G1();
  }

  //zombie game
  if (gameState === "game2") {
    G2();
  }

  //zombie game
  if (gameState === "win") {
    WIN();
  }

  //health becomes 5 every 15 score in rocket game
  if (score1 === 15 ||
    score1 === 30 ||
    score1 === 45 ||
    score1 === 60) {
    health1 = 5;
  }

  //health becomes 5 every 15 score in zombie game
  if (score2 === 15 ||
    score2 === 30 ||
    score2 === 45 ||
    score2 === 60) {
    health2 = 5;
  }

  //score increase in rocket game
  if (rocket.isTouching(STARS)) {
    score1 = score1 + 1;
    STARS.destroyEach();
  }

  //health decrease in rocket game
  if (rocket.isTouching(spaceshipG)) {
    health1 = health1 - 1;
    spaceshipG.destroyEach();
  }

  //health decrease in rocket game
  if (rocket.isTouching(AST)) {
    health1 = health1 - 1;
    AST.destroyEach();
  }

  //health decrease in rocket game
  if (rocket.isTouching(AST2)) {
    health1 = health1 - 1;
    AST2.destroyEach();
  }

  //health decrease in zombie game
  if (boy.isTouching(plant1G)) {
    health2 = health2 - 1;
    plant1G.destroyEach();
  }

  //health decrease in zombie game
  if (boy.isTouching(plant2G)) {
    health2 = health2 - 1;
    plant2G.destroyEach();
  }

  //health decrease in zombie game
  if (boy.isTouching(zombie1G)) {
    health2 = health2 - 1;
    zombie1G.destroyEach();
  }

  //health decrease in zombie game
  if (boy.isTouching(zombie2G)) {
    health2 = health2 - 1;
    zombie2G.destroyEach();
  }

  ////health decrease in zombie game
  if (boy.isTouching(birdgroup)) {
    health2 = health2 - 1;
    birdgroup.destroyEach();
  }

  //score increase in zombie game
  if (LG.isTouching(zombie1G)) {
    score2 = score2 + 1;
    zombie1G.destroyEach();
    LG.destroyEach();
  }

  //score increase in zombie game
  if (LG.isTouching(zombie2G)) {
    score2 = score2 + 1;
    zombie2G.destroyEach();
    LG.destroyEach();
  }

  //score increase in zombie game
  if (LG.isTouching(birdgroup)) {
    score2 = score2 + 1;
    birdgroup.destroyEach();
    LG.destroyEach();
  }

  //game end in rocket game
  if (rocket.isTouching(dedge) ||
    health1 === 0) {
    gameState = "reset";
  }

  //game end in zombie game
  if (health2 === 0) {
    gameState = "reset";
  }

  //reset
  if (gameState === "reset") {
    RESET();
  }

  //invisible edges
  dedge.visible = false;
  redge.visible = false;
  ledge.visible = false;
  medge.visible = false;

  //collision
  rocket.collide(redge);
  rocket.collide(ledge);

  //console.log(boy.y);

  //draw all sprites
  drawSprites();
  //text("Health : " + health, 350, 30);

  if(gameState === "game1"){
    fill("rgb(243, 216, 255)");
    stroke("white");
    textSize(25);
    text("Score : " + score1, 30, rocket.y-100);
    text("Health : " + health1,30, rocket.y+100);
  }

  //displaying health and score in zombie game
  if(gameState === "game2"){
    fill("rgb(106, 3, 112)");
    stroke("white");
    textSize(25);
    text("Score : " + score2, boy.x-100, 30);
    text("Health : " + health2, boy.x+100, 30);
  }

}

//the menu
function MENU() {
  //setting up the menu
  boy.x = 150;
  rocket.x = 725;
  rocket.y = 337.5;
  rocket.visible = false;
  bg.visible = false;

  rocket.collide(medge);
  rocket.velocityY = 0;
  rocket.velocityX = 0;

  score1 = 0;
  score2 = 0;
  health1 = 5;
  health2 = 5;

  resetG.destroyEach();

  //text
  fill("blue");
  stroke("blue");
  textSize(50);
  text("Menu",displayWidth/2.18, 100);

  fill("black");
  noStroke();
  textSize(25);
  text("There Are 2 Different Games.", displayWidth/2.5, 170);
  text("Press The Button To Go To A Game.", displayWidth/2.7, 220);
  text("The Games Are Randomly Chosen.", displayWidth/2.65, 270);

  //game button
  var B1 = createSprite(displayWidth/2, 400);
  B1.addImage(B1I);
  B1.scale = 1.5;
  B1g.add(B1);

  camera.position.x = B1.x;
  //camera.position.y = B1.y;

  //random game
  if (mousePressedOver(B1)) {
    randomGState();
    //gameState = "intro1";
  }

}

//random game
function randomGState() {

  var rand = Math.round(random(1, 4));

  //choosing game
  if (rand === 1) {
    gameState = "intro1";
  } else if (rand === 2) {
    gameState = "intro2";
  } else if (rand === 3) {
    gameState = "intro1";
  } else if (rand === 4) {
    gameState = "intro2";
  }

}

//rocket game intro
function INTRO1() {
  background("black");

  rocket.collide(medge);
  B1g.destroyEach();

  fill("lightpink");
  stroke("lightpink");
  textSize(50);
  text("Rules :", displayWidth/2.5, 70);

  fill("lightpink");
  noStroke();
  textSize(25);
  text("Help the rocket reach Galaxy 'Armadona'", displayWidth/4, 120);
  text("and take help from allies.", displayWidth/4, 150);

  fill("lightblue");
  text("Dodge the asteroids and collect stars to increase the score.", displayWidth/4, 190);
  text("Avoid crashing into other spaceships.", displayWidth/4, 220);
  text("If you go out of the designated space, then the game will end.", displayWidth/4, 250);

  fill("lightgreen");
  text("Your health will be replenished every 15 points.", displayWidth/4, 290);
  text("If your health is 0, you will die.", displayWidth/4, 320);
  text("The speed of the asteroids will increase as you ", displayWidth/4, 350);

  fill("lightyellow");
  text("leave the current galaxy.", displayWidth/4, 390);
  text("Keep pressing space to fly the ship.", displayWidth/4, 420);
  text("Use 'Left' and 'Right' arrowkeys to move.", displayWidth/4, 450);

  fill("white");
  textSize(25);
  text("GOOD LUCK!!!", displayWidth/4, 490);
  text("Press 'N' to go to the game", displayWidth/4, 520);

  if (keyDown("n")) {
    gameState = "game1";
  }
}

//zombie game intro
function INTRO2() {
  background("black");

  rocket.collide(medge);
  B1g.destroyEach();

  //text
  fill("lightpink");
  stroke("lightpink");
  textSize(50);
  text("Rules :", displayWidth/2.5, 70);

  fill("lightpink");
  noStroke();
  textSize(25);
  text("You have reached a planet in the galaxy,'Armadona'.", displayWidth/4, 120);
  text("The planet's atmosphere is Earth-like but the creatures", displayWidth/4, 150);
  text("are not.", displayWidth/4, 180);

  fill("lightblue");
  text("The planet is being dominated by zombies,", displayWidth/4, 220);
  text("deadly plants and dino-birds.", displayWidth/4, 250);
  text("Kill the zombies and dinos to earn points.", displayWidth/4, 280);

  fill("lightgreen");
  text("The plants cannot be killed.", displayWidth/4, 320);
  text("Press 'Up arrow' to jump and 'Space' to shoot.", displayWidth/4, 350);
  text("Press 'Right Arrow Key' to go forward and 'Left Arrow Key' to go backward.", displayWidth/4, 380);

  fill("lightyellow");
  text("Your health will be restored every 15 points.", displayWidth/4, 420);
  text("If you run out of health you will die.", displayWidth/4, 450);

  fill("white");
  textSize(25);
  text("GOOD LUCK!!!", displayWidth/4, 490);
  text("Press 'N' to go to the game", displayWidth/4, 520);

  //going to game
  if (keyDown("n")) {
    gameState = "game2";
  }
}

//rocket game
function G1() {
  bg.visible = true;
  rocket.visible = true;

  if (keyDown("left_arrow")) {
    rocket.x = rocket.x - 10;
  }

  if (keyDown("right_arrow")) {
    rocket.x = rocket.x + 10;
  }

  if (keyDown("space")) {
    rocket.velocityY = -10;
    camera.position.y = camera.position.y -10;
  }

  camera.y = rocket.y;
  ledge.y = camera.position.y;
  redge.y = camera.position.y;

  rocket.velocityY = rocket.velocityY + 0.3;

  if (rocket.y <= -30000){
    gameState = "win";
  }

  //bg.velocityY = 4;

  /*if (bg.y > 355) {
    bg.y = 90;
  }*/

  spawnAsteroids();
  spawnStar();
  spawnspaceship();

  fill("white");
  stroke("white");
  textSize(20);
  text("Score : " + score1, 20, 30);
  text("Health : " + health1, 350, 30);
}

function spawnspaceship() {
  if (frameCount % 100 === 0) {
    var spaceship = createSprite(-20, camera.position.y-500, 10, 10);
    //spaceship.y = Math.round(random(100, 400));
    spaceship.velocityX = (4 + score1 * 5 / 10);
    spaceship.addImage(spaceshipI);
    spaceship.scale = 0.4;
    //spaceship.debug = true;
    spaceship.setCollider("rectangle", 0, 0, 450, 90);
    spaceshipG.add(spaceship);
  }
}

function spawnAsteroids() {

  if (frameCount % 80 === 0) {

    var rand = Math.round(random(1, 2));

    if (rand === 1) {
      A1();
    } else if (rand === 2) {
      A2();
    }
  }
}

function A1() {
  var ast1 = createSprite(225, camera.position.y-400, 20, 20);
  ast1.x = Math.round(random(30, 1420));
  ast1.velocityY = 5 + score1 * 5 / 10;
  ast1.addImage(asteroid1);
  ast1.scale = 0.5;
  //ast1.debug = true;
  ast1.setCollider("circle", 0, 0, 80);
  ast1.lifetime = 200;
  AST.add(ast1);
}

function A2() {
  var ast2 = createSprite(225, camera.position.y-400, 20, 20);
  ast2.x = Math.round(random(30, 420));
  ast2.velocityY = 5 + score1 * 5 / 10;
  ast2.addImage(asteroid2);
  ast2.scale = 0.2;
  //ast2.debug = true;
  ast2.setCollider("circle", -30, 20, 200);
  ast2.lifetime = 200;
  AST2.add(ast2);
}

function spawnStar() {
  if (frameCount % 70 === 0) {

    var star = createSprite(225, camera.position.y, 20, 20);
    star.x = Math.round(random(50, 1430));
    //star.y = Math.round(random(50, 250));
    //star.velocityY = 3;
    star.addImage(starImage);
    star.scale = 0.015;
    //star.debug = true;
    star.setCollider("circle", -30, 20, 200);
    star.lifetime = 250;
    STARS.add(star);
  }
}

//zombie game
function G2() {

  //setiing up the game
  rocket.x = 725;
  rocket.y = 337.5;
  rocket.collide(medge);

  bg2.visible = true;
  boy.visible = true;

  /*if (bg2.x >= 100) {
    bg2.x = 10;
  }*/

  //jumping of boy
  if (keyDown("up_arrow") && boy.y > 200) {
    boy.velocityY = -10;
  }

  //boy movement left
  if (keyDown("left_arrow")) {
    boy.x = boy.x -10;
    camera.position.x = camera.position.x -10;
  }

  //boy movement right
  if (keyDown("right_arrow")) {
    boy.x = boy.x +10;
    camera.position.x = camera.position.x +10;
  }
  //making ground and camera position same
  ground.x = camera.position.x;

  //giving boy gravity
  boy.velocityY = boy.velocityY + 0.4;

  if (boy.x >= 30000){
    gameState = "win";
  }

  //make boy stand on ground
  boy.collide(ground);

  //spawning plants
  spawnPlants();
  //spawning zombies
  spawnZombies();
  //spawning birds
  spawnbird();

  //laser
  if (keyWentDown("space")) {
    createlaser();
  }

  //displaying score and health
  fill("white");
  stroke("white");
  textSize(20);
  text("Score : " + score2, boy.x-50, 30);
  text("Health : " + health2, boy.x+100, 30);
}

//lasers
function createlaser() {
  var laser = createSprite(110, 380, 60, 10);
  laser.velocityX = 20;
  laser.addImage(laserI);
  laser.scale = 0.5;
  laser.x = boy.x;
  laser.y = boy.y;
  LG.add(laser);
}

//spawning birds
function spawnbird() {
  if (frameCount % 210 === 0) {
	    var bird = createSprite(boy.x +1400, 100, 60, 10);
	    bird.y = Math.round(random(100, 200));
	    bird.velocityX = -(4 + score2 * 5 / 10);
	    bird.addImage(birdImage);
	    bird.scale = 0.16;
      bird.lifetime = 250;
	    //bird.debug = true;
	    bird.setCollider("rectangle", 0, 0, 1500, 600);
	    birdgroup.add(bird);
    }
}

//zombies random
function spawnZombies() {
  if (frameCount % 220 === 0) {
    var rand = Math.round(random(1, 2));

    if (rand === 1) {
      Z1();
    } else if (rand === 2) {
      Z2();
    }
  }
}

//zombie 1
function Z1() {
  var zombie1 = createSprite(boy.x +1300, 500, 10, 10);
  zombie1.velocityX = -(1 + score2 * 5 / 5);
  zombie1.lifetime = 400;
  zombie1.addImage(zombie1Image);
  zombie1.scale = 0.4;
  //zombie1.debug = true;
  zombie1.setCollider("rectangle", 0, 0, 250, 500);
  zombie1G.add(zombie1);
}

//zombie 2
function Z2() {
  var zombie2 = createSprite(boy.x +1500, 500, 10, 10);
  zombie2.velocityX = -(1 + score2 * 5 / 5);
  zombie2.lifetime = 800;
  zombie2.addImage(zombie2Image);
  zombie2.scale = 0.305;
  //zombie2.debug = true;
  zombie2G.add(zombie2);
}

//plants random
function spawnPlants() {
  if (frameCount % 190 === 0) {
    var rand = Math.round(random(1, 2));

    if (rand === 1) {
      P1();
    } else if (rand === 2) {
      P2();
    }
  }
}

//plant 1
function P1() {
  var plant1 = createSprite(boy.x +1350, 500, 10, 10);
  plant1.velocityX = -(4 + score2 * 5 / 10);
  plant1.lifetime = 400;
  plant1.addImage(plant1Image);
  plant1.scale = 0.25;
  plant1.debug = false;
  plant1.setCollider("circle", 0, -10, 400);
  plant1G.add(plant1);
}

//plant 2
function P2() {
  var plant2 = createSprite(boy.x +1420, 500, 10, 10);
  plant2.velocityX = -(5 + score2 * 5 / 10);
  plant2.lifetime = 400;
  plant2.addImage(plant2Image);
  plant2.scale = 0.5;
  //plant2.debug = true;
  plant2.setCollider("rectangle", 0, 0, 300, 300);
  plant2G.add(plant2);
}

//reseting the game
function RESET() {
  //setting reset screen
  rocket.x = 725;
  rocket.y = 337.5;
  boy.x = 150;
  rocket.velocityY = 0;
  rocket.velocityX = 0;
  boy.velocityY = 0;

  boy.visible = false;
  rocket.visible = false;
  bg.visible = false;
  bg2.visible = false;

  birdgroup.destroyEach();
  zombie1G.destroyEach();
  zombie2G.destroyEach();
  plant1G.destroyEach();
  plant2G.destroyEach();
  LG.destroyEach();
  AST.destroyEach();
  AST2.destroyEach();
  STARS.destroyEach();
  spaceshipG.destroyEach();

  background("black");

  //reset button
  var reset = createSprite(725, 300, 20, 20);
  reset.addImage(resetImage);
  reset.scale = 0.7;
  resetG.add(reset);

  camera.position.x = reset.x;
  camera.position.y = reset.y;

  //reseting game
  if (mousePressedOver(reset)) {
    gameState = "menu";
  }

  //highscore 1
  if (localStorage["HighScore1"] < score1) {
    localStorage["HighScore1"] = score1;
  }

  //highscore 2
  if (localStorage["HighScore2"] < score2) {
    localStorage["HighScore2"] = score2;
  }

  //text
  fill("red");
  stroke("red");
  textSize(50);
  text("You Lost 😭", displayWidth/2.5, 110);

  fill("white");
  noStroke();
  textSize(30);
  text("Click on 'Reset' to go to Menu", displayWidth/3, 450);

  text("Planet Jump HI Score : " + localStorage["HighScore2"], displayWidth/2.7, 200);
  text("Space Shooter HI Score : " + localStorage["HighScore1"], displayWidth/2.8, 250);
}

function WIN(){
  rocket.x = 725;
  rocket.y = 337.5;
  boy.x = 150;
  rocket.velocityY = 0;
  rocket.velocityX = 0;
  boy.velocityY = 0;

  boy.visible = false;
  rocket.visible = false;
  bg.visible = false;
  bg2.visible = false;

  birdgroup.destroyEach();
  zombie1G.destroyEach();
  zombie2G.destroyEach();
  plant1G.destroyEach();
  plant2G.destroyEach();
  LG.destroyEach();
  AST.destroyEach();
  AST2.destroyEach();
  STARS.destroyEach();
  spaceshipG.destroyEach();

  background("black");

  //highscore 1
  if (localStorage["HighScore1"] < score1) {
    localStorage["HighScore1"] = score1;
  }

  //highscore 2
  if (localStorage["HighScore2"] < score2) {
    localStorage["HighScore2"] = score2;
  }

  //reset button
  var reset = createSprite(725, 300, 20, 20);
  reset.addImage(resetImage);
  reset.scale = 0.7;
  resetG.add(reset);

  camera.position.x = reset.x;
  camera.position.y = reset.y;

  //reseting game
  if (mousePressedOver(reset)) {
    gameState = "menu";
  }

  textSize(50);
  fill("white");
  stroke("blue");
  strokeWeight(5);
  text("You Win!!🤩", displayWidth/2.5, 110);

  fill("white");
  noStroke();
  textSize(30);
  text("You reached the end!!", displayWidth/3, 450);
  text("Click on 'Reset' to go to Menu", displayWidth/3, 550);
  
  text("Planet Jump HI Score : " + localStorage["HighScore2"], displayWidth/2.7, 200);
  text("Space Shooter HI Score : " + localStorage["HighScore1"], displayWidth/2.8, 250);
}