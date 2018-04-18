// 1) checking whether moving would put the polarbear in "overlapping" range of an iceberg, and if so, intercepting the regular grid movement and sending the polarbear straight to the location of the iceberg that is in overlapping range ( ---> ~ line 305)

// 2) after moving the polarbear, checking whether it's overlapping with an iceberg, and not "in the water". If it's in the water, it should toggle some kinf of response like sending the polarbear back to the start ( ---> ~ line 143-150)


let width = 1024;
let height = 576+64;
let unit = 64;

let gameState = 0;
let score = 0;
let lives = 3;

let time;
let timePassed;
let intervals = [15, 30, 45];
let timeSinceClick = 0;
let currentTime, previousTime;

let slider;
let sliderValue;

let imgBackground;
let imgStartscreen;
let imgMenubar;
let imgPolarbear;

let icebergImages = [];
let imgIceberg_01;
let imgIceberg_02;

let menuHeight = unit;
let menuWidth = width;

let icebergs = [];
let iceberg;
let polarbears = [];

let ySpeeds = [-1, 1];
let ySpawns = [unit, 2.5*unit, 4*unit, 5.5*unit, 7*unit, 8.5*unit];

let x;
let y;
let xSpeed;
let ySpeed;
let radius;

let i;
let j;

let overlapping = false;

function setup(){

  snowFont = loadFont("fonts/FROSW___.ttf");

  frameRate(15);
  time = frameCount;
  rectMode(CORNER);
  ellipseMode(CORNER);

  slider = createSlider(1, 2, 1, 1);
  slider.position(width/2-50, 20);
  slider.style('width', '100px');
  slider.parent("sketch-holder");

  imgBackground = loadImage("images/polarbear-game.png");
  imgMenubar = loadImage("images/menubar.png");
  imgStartscreen = loadImage("images/polarbear-startscreen.png");
  imgMenubar = loadImage("images/menubar.png");
  imgPolarbear = loadImage("images/bear.png");
  imgIceshelf = loadImage("images/iceshelf.png");
  imgIceberg_01 = loadImage("images/ice1.png");
  icebergImages.push(imgIceberg_01);
  imgIceberg_02 = loadImage("images/ice2.png");
  icebergImages.push(imgIceberg_02);

  var cnv = createCanvas(width,height, 0, 0);
  cnv.parent("sketch-holder");

  polarbear = new Polarbear();
  polarbears.push (polarbear);
}

function draw(){

  sliderValue = slider.value();

  if (gameState == 0 ){
    startScreen();
    lives = 3;
    score = 0;
    time = time*0;
  } else if (gameState == 1){
    update();
    if (lives == 0) {
      gameState = 2;
    }

    if (polarbear.y < 1.2*unit && polarbear.x > 4.5*unit && polarbear.x < 12*unit){ //checks if the bear got to the top;
      gameState = 3;
    }

    image(imgBackground, 0, unit);

    for (i of icebergs) {
      i.move();
      i.display();

      if (i.y == height-unit){
        i.ySpeed *= -1;
      }

      if (i.y == unit){
        i.ySpeed *= -1;
      }

      for (j of icebergs){
        if (i.bounce(j)){ // makes the icebergs bounce off the top and bottom edge of the game
          if (j.x-i.x < i.radius){
            i.ySpeed *= -1;
            j.ySpeed *= -1;
          }
        }
      }

      for (p of polarbears) {
        if (i.overlaps(p)){
          p.x=i.x; // makes the polarbear move along with the iceberg as long as they are overlapping
          p.y=i.y;

          if(i.x > width){ //makes the iceberg that is carrying the polarbear along respawn on the left side after it has moved off the right edge of the game;
            i.x = -unit;
            p.x = i.x;
            p.y = i.y;
          }

          if(sliderValue == 2) {
            i.width -= 0.5;
            i.height -= 0.5;
          }
        } else if(overlapping == false) {
          // else if (polarbear is not overlapping with an iceberg){
              //polarbear is "in the water";
              //polarbear.flashing(); -> image flashes a couple of times
              //lives --;
              //polarbear.teleport(); -> polarbear is teleported back to the start platform
          //}
        }
      }
    }

    timePassed1 = frameCount % random(intervals);
    if (timePassed1 == 0) {
      let iceberg = new Iceberg(random(ySpawns), random(2, 3), random(ySpeeds)*sliderValue); // spawns the icebergs ar somewhat random intervals;
      icebergs.push(iceberg);
    }

    polarbear.display();

    image(imgMenubar, 0, 0);

    textAlign(LEFT);
    textSize(14);
    noStroke();
    textFont("arial");
    fill(0);
    text("Play!", 40, 40);
    text("Time: " + round(time/15), 940, 40);
    text("Lives: " + lives, 230, 40);
    text("past", width/2-100, 40);
    text("present", width/2+70, 40);

  } else if (gameState == 2){
    gameOver();
  } else if (gameState == 3){
    winScreen();
  }
}

function mouseClicked(){ // starting and restarting the game from the start screen or win screen;
   if (gameState == 0){
     gameState = 1;
   } else if (gameState == 2){
     gameState = 0;
   } else if (gameState == 1){
     //no function during the game yet; maybe something later;
   } else if (gameState == 3){
     polarbear.x = 7*unit; //puts the polarbear at his start position
     polarbear.y = 9*unit;

     lives = 3;
     score = 0;
     time = time*0;

     gameState = 0;
   }
}

function startScreen() {

  image(imgStartscreen, 0, unit);
  image(imgMenubar, 0, 0);
  image(imgIceshelf, 250, unit+20, 500, 250);


  textAlign(CENTER);
  textSize(60);
  fill(100, 240, 255);
  stroke(0);
  textFont(snowFont);
  text("Polar Jump!", width/2, 200);


  noStroke();
  fill(0);
  textSize(34);
  text("Make it across the melting ice shelf!", width/2, 360);

  textFont("arial");
  textSize(20);
  text("Controls:", width/2, 400);
  text("W: up/forward", width/2, 450);
  text("A: left", width/2, 475);
  text("S: down/backward", width/2, 500);
  text("D: right", width/2, 525);

  textAlign(CENTER);
  textSize(28);
  textFont(snowFont);
  fill(0);
  stroke(255);
  text("click to begin", width/2, 570);
}

function winScreen(){
  image(imgStartscreen, 0, unit);
  image(imgIceshelf, 250, unit+20, 500, 250);

  noStroke();
  fill(0);
  textFont("arial");

  fill(0);
  stroke(0);
  textFont(snowFont);
  textAlign(CENTER);
  textSize(34);
  text("CONGRATULATIONS!", width/2, 170);

  noStroke();
  fill(0);
  textFont("arial");
  textSize(28);
  text("You made it!", width/2, 220);

  textSize(20);
  text("Your time:" + round(time/60), width/2, 420);

  textAlign(CENTER);
  textSize(28);
  textFont(snowFont);
  fill(0);
  stroke(255);
  text("click to play again", width/2, 570);
}

function update() {
  time++;
  background(121, 210, 121);
}

function gameOver(){
  if (gameState == 0){
    gameState = 1;
  } else if (gameState == 2){
    gameState = 0;
  }
}

class Polarbear {
  constructor(){
    this.diameter = unit;
    this.radius = this.diameter/2;
    this.x = 7*unit;
    this.y = 9*unit;

    this.color = 255;
    this.outline = 0;
  }

  display(){
    push();
      fill(this.color);
      stroke(this.outline);
      translate(this.x, this.y);
      image(imgPolarbear, -(this.radius), -(this.radius), 2*unit, 2*unit);
    pop();
  }
}

function keyTyped(){ // navigates the polarbear across the playing field on a grid;
  print(key);

  //when pressing one of the keys for moving the polarbear, I want it to first check whether moving the bear in the indicated direction by unit/2 would put it within "ovelapping" range (see overlapping function, line 383) of an iceberg.
  //if moving the polarbear would put it in overlapping-range of an iceberg, then instead of moving by unit/2 in the indicated direction, it should move the polabear straight to the location of the iceberg it would be overlapping (as happening on lines 123-131)
  if(key === "w" || key == "W") {
    if(polarbear.y > unit) {
      polarbear.y-=unit/2;
      print(overlapping);
    }
  } else if (key === "s" || key == "S") {
    if(polarbear.y < height-unit) {
      polarbear.y+=unit/2;
      print(overlapping);
      }
  } else if(key === "a" || key == "A"){
    if(polarbear.x > 0) {
      if(polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
        polarbear.x-=unit/2;
        print(overlapping);
      } else if (polarbear.y == height-unit && polarbear.x > 4*unit){ //checks to see if the bear is on the start panel
        polarbear.x-=unit/2;
        print(overlapping);
      } else if (polarbear.y == unit && polarbear.x > 5*unit){ //checks to see if the bear is on the finish panel
        polarbear.x-=unit/2;
        print(overlapping);
      }
    }
  } else if(key === "d" || key == "D") {
    if(polarbear.x < width-unit) {
      if (polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
        polarbear.x+=unit/2;
        print(overlapping);
      } else if (polarbear.y == height-unit && polarbear.x < 11*unit){ //checks to see if the bear is on the start panel
        polarbear.x+=unit/2;
        print(overlapping);
      } else if (polarbear.y == unit && polarbear.x < 10*unit){ //checks to see if the bear is on the finish panel
        polarbear.x+=unit/2;
        print(overlapping);
      }
    }
  }
}

class Iceberg {

  constructor(_ySpawn, _xSpeed, _ySpeed){
    this.xSpawn = -64;
    this.ySpawn = _ySpawn
    this.x = -64;
    this.y = _ySpawn;
    this.width = unit;
    this.height = unit;
    this.xSpeed = _xSpeed;
    this.ySpeed = _ySpeed;
    this.radius = unit/2;
    this.image = random(icebergImages);
  }

  display(){
    push();
    imageMode(CENTER);
    // stroke(0);
    // fill(255, 255, 255, 200);
    // ellipse(this.x, this.y, this.width, this.height);
    image(this.image, this.x+this.radius, this.y+this.radius, this.width, this.height);
    pop();
  }

  move(){
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }

  bounce(other) {
    let t = dist(other.x, other.y, this.x, this.y); //sets t as the distance between other and iceberg
    return (t <= (this.radius + other.radius));
  	}

  overlaps(other){
    let d = dist(other.x, other.y, this.x, this.y); //sets d as the distance between other and iceberg
    return (d < (this.width/2 + other.radius)/2); // checks if the polarbear and iceberg are less than half that distance away from each other
    if(d == true){
      overlapping = true;
    } else {
      overlapping = false;
    }
    if (lives == 0) {
      gameState = 0;
    }
  }
}
