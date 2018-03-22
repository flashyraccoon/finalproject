let gameState = 0;
let score = 0;
let icebergs = [];
let polarbears = [];

let width = 1024;
let height = 576+64;

let a = 0;
let timePassed;
let intervals = [210, 300, 600];
let lives = 3;

let overlapping = true;

let unit = 64;

let xSpawns = [0, width];
let ySpawns = [2*unit, 3*unit, 4*unit, 5*unit, 6*unit, 7*unit, 8*unit];
let xSpeedRight = [0.5, 1, 1.5];
let xSpeedLeft = [-0.5, -1, -1.5];
let time;
let imgBackground;
let imgPolarbear;
//let imgUnicorn;
let font3DTitle;
let font2DTitle;


let menuHeight = unit;
let menuWidth = width;






/*function preload() {

}
*/
function setup(){
  //font3DTitle = loadFont("fonts/3Dumb-webfont.ttf");
  //font2DTitle = loadFont("fonts/2Dumb.ttf");

// this will be the image of the polar bear
// imgPolarBear = loadImage("images/assets/poacher.png");
  frameRate(60);
  time = frameCount;
  rectMode(CORNER);
  ellipseMode(CORNER);
  imgBackground = loadImage("images/polarbear-game.png");
  var cnv = createCanvas(width,height);
  //cnv.parent('sketch-holder');

  polarbear = new Polarbear();
  polarbears.push (polarbear);


}

function draw(){
  background(121, 210, 121);
  print(overlapping);
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
    image(imgBackground, 0, unit);

    //polarbear.move();
    for (i of icebergs) {
      i.move();
      i.display();
      for (p of polarbears) {
        if (i.overlaps(p)){
          overlapping = true;
          p.x=i.x; // makes the polarbear move along with the iceberg as long as they are overlapping
          print(overlapping);
        } else if (i.overlaps(p) == false) {
          overlapping = false;
          print(overlapping);
        }
      }
    }

    timePassed1 = frameCount % random(intervals);
    if (timePassed1 == 0) {
      let iceberg = new Iceberg(0, 128, random(xSpeedRight));
      icebergs.push (iceberg);
    }

    timePassed2 = frameCount % random(intervals);
    if (timePassed2 == 0) {
      let iceberg = new Iceberg(width, 192, random(xSpeedLeft));
      icebergs.push (iceberg);
    }

    timePassed3 = frameCount % random(intervals);
    if (timePassed3 == 0) {
      let iceberg = new Iceberg(0, 256, random(xSpeedRight));
      icebergs.push (iceberg);
    }

    timePassed4 = frameCount % random(intervals);
    if (timePassed4 == 0) {
      let iceberg = new Iceberg(width, 320, random(xSpeedLeft));
      icebergs.push (iceberg);
    }

    timePassed5 = frameCount % random(intervals);
    if (timePassed5 == 0) {
      let iceberg = new Iceberg(0, 384, random(xSpeedRight));
      icebergs.push (iceberg);
    }

    timePassed6 = frameCount % random(intervals);
    if (timePassed6 == 0) {
      let iceberg = new Iceberg(width, 448, random(xSpeedLeft));
      icebergs.push (iceberg);
    }

    timePassed7 = frameCount % random(intervals);
    if (timePassed7 == 0) {
      let iceberg = new Iceberg(0, 512, random(xSpeedRight));
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
  //  textFont(font2DTitle);
    fill(0);
    text("Play!", 10, 30);
  //  textFont(font2DTitle);
    fill(0);
    text("Time: " + round(time/60), 400, 30);
  //  textFont(font2DTitle);
    fill(0);
    text("Unicorns: " + score, 300, 30)
  //  textFont(font2DTitle);
    fill(0);
    text("Lives: " + lives, 200, 30);
  } else if (gameState == 2){
    gameOver();
  }


}

function mouseClicked(){
   if (gameState == 0 ){
     gameState = 1;
   } else if (gameState == 2){
     gameState = 0;
   } else if (gameState == 1){
     //polarbear.jump();
   }
  }

function startScreen() {
  background(121, 210, 121);
  //image(imgBackground, 0, 0);
  fill(0);


  textAlign(CENTER);
  textSize(34);
  //textFont(font3DTitle);
  text("Unicorn Poacher", width/2, 100);

  fill(0);
  //textFont(font2DTitle);
  textSize(24);
  text("Poach the Unicorns!", width/2, 150);
  text("But don't let them get you!", width/2, 180);
  textSize(20);
  text("Controls:", width/2, 220);
  textSize(20);
  text("W: up", width/2, 245);
  text("A: left", width/2, 270);
  text("S: down", width/2, 295);
  text("D: right", width/2, 320);
  text("Mouse: aim", width/2, 345);
  text("Left MB: shoot", width/2, 370);

  textAlign(CENTER);
  textSize(28);
  text("click to begin", width/2, 450);
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

    this.colorR = 255;
    this.colorG = 0;
    this.colorB = 0;
    this.outline = 0;

    this.alpha = 0;


  }

  display(){
 // put a conditional for a -> only in game state 1
    push();

    fill(this.colorR, this.colorG, this.colorB, this.alpha);
    stroke(this.outline);
    translate(this.x, this.y);

    beginShape();
    ellipse(0, 0, this.diameter, this.diameter);

    endShape();
    //image(imgPolarbear, -(this.radius+15), -(this.radius+35), this.diameter+40, this.diameter+40);

    pop();

  }

    jump(){
      //let bullet = new Bullet(this.a, this.x, this.y);
      //bullets.push (bullet);
    }
  }

function keyPressed(){
  if(keyCode === "w" || key == "W") {
    if(polarbear.y > unit) {
      polarbear.y-=unit;
    }
  } else if (keyCode === "s" || key == "S") {
      if(polarbear.y < height-unit) {
        polarbear.y+=unit;
      }
  } else if(keyCode === "a" || key == "A"){
      if(polarbear.x > 0) {
        if(polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
          polarbear.x-=unit;
        } else if (polarbear.y == height-unit && polarbear.x > 4*unit){ //checks to see if the bear is on the start panel
          polarbear.x-=unit;
        } else if (polarbear.y == unit && polarbear.x > 5*unit){ //checks to see if the bear is on the finish panel
          polarbear.x-=unit;
        }
      }

  } else if(keyCode === "d" || key == "D") {
      if(polarbear.x < width-unit) {
        if (polarbear.y > unit && polarbear.y < height-unit){ //checks to see if the bear is inbetween start and finish
          polarbear.x+=unit;
        } else if (polarbear.y == height-unit && polarbear.x < 11*unit){ //checks to see if the bear is on the start panel
          polarbear.x+=unit;
        } else if (polarbear.y == unit && polarbear.x < 10*unit){ //checks to see if the bear is on the finish panel
          polarbear.x+=unit;
        }
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

    //this.color = (random(20,240), random(20,240), random(20,240));
  }

  display(){
    stroke(0);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }

  move(){
      this.x += this.speed;
    }

  overlaps(other){
    let d = dist(other.x, other.y, this.x, this.y);
    return (d < (this.width/2 + other.radius));
    if (lives == 0) {
      gameState = 0;
    }
  }
}
