let gameState = 0;
let score = 0;
let icebergs = [];
let polarbears = [];

let width = 1024;
let height = 576+64;

let unit = 64;

let imgBackground;
let imgPolarbear;

let menuHeight = unit;
let menuWidth = width;

let slider;
let sliderValue;

let time;
let timePassed;
let intervals = [210, 300, 600];
let lives = 3;

let overlapping = true;

let xSpawns = [0, width];
let ySpawns = [2*unit, 3*unit, 4*unit, 5*unit, 6*unit, 7*unit, 8*unit];
let xSpeedRight = [0.5, 1, 1.5];
let xSpeedLeft = [-0.5, -1, -1.5];

let y;

function setup(){

  frameRate(60);
  time = frameCount;
  rectMode(CORNER);
  ellipseMode(CORNER);

  slider = createSlider(1, 2, 1, 1);
  slider.position(width/2-50, 20);
  slider.style('width', '100px');
  slider.parent("sketch-holder");

  imgBackground = loadImage("images/polarbear-game.png");
  imgPolarbear = loadImage("images/bear.png");

  var cnv = createCanvas(width,height, 0, 0);
  cnv.parent("sketch-holder");

  polarbear = new Polarbear();
  polarbears.push (polarbear);
}

function draw(){

  sliderValue = slider.value();
  background(121, 210, 121);
  print(sliderValue);

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


    if (polarbear.y == 2*unit){ //checks if the bear got to the top
      gameState = 3;
    }

    image(imgBackground, 0, unit);

    for (i of icebergs) {
      i.move();
      i.display();
      for (p of polarbears) {
        if (i.overlaps(p)){
          p.x=i.x; // makes the polarbear move along with the iceberg as long as they are overlapping
          print(overlapping);
        } else if(overlapping == false) {
          print(overlapping);
        } // else if (polarbear is not overlapping with an iceberg){
            //polarbear is "in the water";
            //polarbear.flashing(); -> image flashes a couple of times
            //lives --;
            //polarbear.teleport(); -> polarbear is teleported back to the start platform
        //}
      }
    }

    timePassed1 = frameCount % random(intervals);
    if (timePassed1 == 0) {
      let iceberg = new Iceberg(0, 128, random(xSpeedRight)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed2 = frameCount % random(intervals);
    if (timePassed2 == 0) {
      let iceberg = new Iceberg(width, 192, random(xSpeedLeft)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed3 = frameCount % random(intervals);
    if (timePassed3 == 0) {
      let iceberg = new Iceberg(0, 256, random(xSpeedRight)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed4 = frameCount % random(intervals);
    if (timePassed4 == 0) {
      let iceberg = new Iceberg(width, 320, random(xSpeedLeft)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed5 = frameCount % random(intervals);
    if (timePassed5 == 0) {
      let iceberg = new Iceberg(0, 384, random(xSpeedRight)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed6 = frameCount % random(intervals);
    if (timePassed6 == 0) {
      let iceberg = new Iceberg(width, 448, random(xSpeedLeft)*sliderValue);
      icebergs.push (iceberg);
    }

    timePassed7 = frameCount % random(intervals);
    if (timePassed7 == 0) {
      let iceberg = new Iceberg(0, 512, random(xSpeedRight)*sliderValue);
      icebergs.push (iceberg);
    }
    polarbear.display();

    noStroke();
    fill(255);
    rect(0, 0, width, unit);

    stroke(0);
    line(0, unit, width, unit);

    textAlign(LEFT);
    textSize(14);

    fill(0);
    text("Play!", 40, 40);
    text("Time: " + round(time/60), 940, 40);
    text("Lives: " + lives, 230, 40);
    text("past", width/2-100, 40);
    text("present", width/2+70, 40);

  } else if (gameState == 2){
    gameOver();
  } else if (gameState == 3){
    winScreen();
  }
}

function mouseClicked(){
   if (gameState == 0){
     gameState = 1;
   } else if (gameState == 2){
     gameState = 0;
   } else if (gameState == 1){
     //no function during the game yet; maybe something later;
   } else if (gameState == 3){
     polarbear.x = 7*unit;
     polarbear.y = 9*unit;

     lives = 3;
     score = 0;
     time = time*0;

     gameState = 0;
   }
}

function startScreen() {
  background(100, 200, 250);
  fill(255);

  textAlign(CENTER);
  textSize(60);
  stroke(255);
  text("Polar Jump!", width/2, 100);

  noStroke();
  fill(0);
  textSize(34);
  text("Make it across the melting ice shelf!", width/2, 180);

  textSize(20);
  text("Controls:", width/2, 220);
  text("W: up/forward", width/2, 245);
  text("A: left", width/2, 270);
  text("S: down/backward", width/2, 295);
  text("D: right", width/2, 320);

  textAlign(CENTER);
  textSize(28);
  text("click to begin", width/2, 450);
}

function winScreen(){ //pulled up when gameState changes to 3; not functional yet;
  background(121, 210, 121);

  fill(0);
  textAlign(CENTER);
  textSize(34);
  text("CONGRATULATIONS!", width/2, 100);

  textSize(28);
  text("You made it!", width/2, 180);

  textSize(20);
  text("Your time:" + round(time/60), width/2, 220);

  textAlign(CENTER);
  textSize(28);
  text("click to play again", width/2, 450);
}

function update() {
  time++;
  background(121, 210, 121);
  //image(imgBackground, 0, 0);
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
      beginShape();
      // ellipse(0, 0, this.diameter, this.diameter);
      endShape();
      image(imgPolarbear, -(this.radius), -(this.radius), 2*unit, 2*unit);
      //imgPolarbear(this.x, this.y, unit, unit);
    pop();
  }
}

function keyPressed(){
  if(keyCode === "w" || key == "W") {
    if(polarbear.y > unit) {
      polarbear.y-=unit/2;
    } else {
      polarbearPos = unit;
    }
  } else if (keyCode === "s" || key == "S") {
      if(polarbear.y < height-unit) {
        polarbear.y+=unit/2;
      }
  } else if(keyCode === "a" || key == "A"){
      if(polarbear.x > 0) {
        if(polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
          polarbear.x-=unit/2;
        } else if (polarbear.y == height-unit && polarbear.x > 4*unit){ //checks to see if the bear is on the start panel
          polarbear.x-=unit/2;
        } else if (polarbear.y == unit && polarbear.x > 5*unit){ //checks to see if the bear is on the finish panel
          polarbear.x-=unit/2;
        }
      }
  } else if(keyCode === "d" || key == "D") {
      if(polarbear.x < width-unit) {
        if (polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
          polarbear.x+=unit/2;
        } else if (polarbear.y == height-unit && polarbear.x < 11*unit){ //checks to see if the bear is on the start panel
          polarbear.x+=unit/2;
        } else if (polarbear.y == unit && polarbear.x < 10*unit){ //checks to see if the bear is on the finish panel
          polarbear.x+=unit/2;
        } // else if(...) if polarbear.y == on the finish platform, the player wins!
      }
    }
  }

class Iceberg {

  constructor(_xSpawn, _ySpawn, _xSpeed){

    this.width = unit;
    this.height = unit;
    this.speed = _xSpeed;
    this.xSpawn = _xSpawn;
    this.ySpawn = _ySpawn;

    this.x = this.xSpawn;
    this.y = this.ySpawn;
  }

  display(){
    stroke(0);
    fill(255, 255, 255, 200);
    rect(this.x, this.y, this.width, this.height);
  }

  move(){
      this.x += this.speed;
    }

  overlaps(other){
    let d = dist(other.x, other.y, this.x, this.y); //sets d as the distance between other and iceberg
    return (d < (this.width/2 + other.radius)/2); // checks if the polarbear and iceberg are less than half that distance away from each other
    if(d == true){
      overlapping = true;
    }
    if (lives == 0) {
      gameState = 0;
    }
  }
}
