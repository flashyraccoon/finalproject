let width = 1024;
let height = 576+64;

let unit = 64;

let imgBackground;
let imgMenubar;
let imgPolarbear;
let imgIceshelf;
let imgBorder;
let help = false;

let imageButtons = [];

let helpBtn;
let polarbearBtn;
let phoneBtn;
let signpostBtn;
let foxBtn;

let noTint = [255, 255, 255, 255];
let blueTint = [100, 240, 255, 255];
 
function setup(){

  snowFont = loadFont("fonts/FROSW___.ttf");

  weblink = createA("#","");
  weblink.position(width/2-50, 40);
  weblink.parent("sketch-holder");

  var cnv = createCanvas(width, height);
  cnv.parent("sketch-holder");

  imgBackground = loadImage("images/researchstat.jpg");
  imgMenubar = loadImage("images/menubar.png");
  imgBorder = loadImage("images/border.png");

  imgIceshelf = loadImage("images/iceshelf.png");
  imgIceshelf = new ImageButton(imgIceshelf, width/2, height/2, 600, 300);
  imageButtons.push(imgIceshelf);

  helpBtn = loadImage("images/questionmark.png");
  helpBtn = new ImageButton(helpBtn, width-unit, 0, unit, unit);
  imageButtons.push(helpBtn);

  phoneBtn = loadImage("images/signpost.png");
  phoneBtn = new ImageButton(phoneBtn, 150, 300, 145, 357);
  imageButtons.push(phoneBtn);

  polarbearBtn = loadImage("images/polarbear_free.png");
  polarbearBtn = new ImageButton(polarbearBtn, 720, 440, 200, 200);
  imageButtons.push(polarbearBtn);

  foxBtn = loadImage("images/fox.png");
  foxBtn = new ImageButton(foxBtn, 300, 550, 50, 50);
  imageButtons.push(foxBtn);

}

function draw(){


  image(imgBackground, 0, unit, width, height);

  noFill();
  noStroke();

  helpBtn.display();

  if(mouseX > polarbearBtn.x && mouseX < polarbearBtn.x2 && mouseY > polarbearBtn.y && mouseY < polarbearBtn.y2){
    polarbearBtn.tinted();
  } else {
    polarbearBtn.tint = noTint;
  }

  if(mouseX > phoneBtn.x && mouseX < phoneBtn.x2 && mouseY > phoneBtn.y && mouseY < phoneBtn.y2){
    phoneBtn.tinted();
  } else {
    phoneBtn.tint = noTint;
  }

  if(mouseX > foxBtn.x && mouseX < foxBtn.x2 && mouseY > foxBtn.y && mouseY < foxBtn.y2){
    foxBtn.tinted();
  } else {
    foxBtn.tint = noTint;
  }

  if(mouseX > helpBtn.x && mouseX < helpBtn.x2 && mouseY > helpBtn.y && mouseY < helpBtn.y2){
    helpBtn.tinted();
  } else {
    helpBtn.tint = noTint;
  }

  polarbearBtn.display()
  phoneBtn.display();
  foxBtn.display();
  helpBtn.display();

  image(imgBorder, 0, unit);
  image(imgMenubar, 0, 0);
  
  textSize(34);

  fill(100, 240, 255);
  stroke(0);
  textAlign(CENTER);
  textFont(snowFont);
  text("Look around! There is much to discover!", width/2, 40);
}

class ImageButton {
  constructor(_name, _x, _y, _width, _height){
    this.name = _name;
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.x2 = this.x+this.width;
    this.y2 = this.y+this.height;
    this.tint = noTint;
  }

  display(){
    push();
    tint(this.tint);
    image(this.name, this.x, this.y, this.width, this.height);
    pop();
  }

  tinted(){
    if(this.tint = noTint){
      this.tint = blueTint;
    } else {
      this.tint = noTint;
    }
  }
}

function mouseClicked(){
    if(mouseX > polarbearBtn.x && mouseX < polarbearBtn.x2 && mouseY > polarbearBtn.y && mouseY < polarbearBtn.y2){
      print("clicked");
      open("polar_jump.html", "_self");

    } else if(mouseX > phoneBtn.x && mouseX < phoneBtn.x+145 && mouseY > phoneBtn.y && mouseY < phoneBtn.y+357){
      open("map.html", "_self");

    } else if(mouseX > foxBtn.x && mouseX < foxBtn.x+50 && mouseY > foxBtn.y && mouseY < foxBtn.y+50){
      open("wiki.html", "_self");

    } else if(mouseX > helpBtn.x && mouseX < helpBtn.x2 && mouseY > helpBtn.y && mouseY < helpBtn.y2){
      open("about.html", "_self");
    }
  }

function mouseMoved(){
  if(mouseX > polarbearBtn.x && mouseX < polarbearBtn.x2 && mouseY > polarbearBtn.y && mouseY < polarbearBtn.y2){
    polarbearBtn.tint = blueTint;

  } else if(mouseX > 475 && mouseX < 645 && mouseY > 97 && mouseY < 269){
    helpBtn.tint = blueTint;

  } else if(mouseX > phoneBtn.x && mouseX < phoneBtn.x+145 && mouseY > phoneBtn.y && mouseY < phoneBtn.y+357){
    phoneBtn.tint = blueTint;

  } else if(mouseX > foxBtn.x && mouseX < foxBtn.x+50 && mouseY > foxBtn.y && mouseY < foxBtn.y+50){
    foxBtn.tint = blueTint;
  }
}
