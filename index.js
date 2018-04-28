let unit = 64;

let imgBackground, imgMenubar, imgBorder, imgIceshelf, imgHelp, imgSign, imgPolarbear, imgFox;

let help = false;

let helpBtn;
let polarbearBtn;
let phoneBtn;
let signpostBtn;
let foxBtn;

let noTint = [255, 255, 255, 255];
let blueTint = [100, 240, 255, 255];

function preload(){
  snowFont = loadFont("fonts/FROSW___.ttf");
  imgBackground = loadImage("images/seaice.jpg");
  imgMenubar = loadImage("images/menubar.png");
  imgBorder = loadImage("images/border.png");
  imgIceshelf = loadImage("images/iceshelf.png");
  imgHelp = loadImage("images/questionmark.png");
  imgSign = loadImage("images/signpost.png");
  imgPolarbear = loadImage("images/polarbear_free2.png");
  imgFox = loadImage("images/fox.png");
}
 
function setup(){
  weblink = createA("#","");
  weblink.position((width/2)-50, 40);
  weblink.parent("sketch-holder");

  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent("sketch-holder");
  
  helpBtn = new ImageButton(imgHelp, width-2*unit, 10, unit, unit);
  signpostBtn = new ImageButton(imgSign, width*0.8, height*0.35, width*0.08, height*0.3);
  polarbearBtn = new ImageButton(imgPolarbear, width*.14, height*.45, width*.25, height*.3);
  foxBtn = new ImageButton(imgFox, width*.5, height*.6, width*.15, height*.2);

  image(imgBackground, 0, unit, width, height);

  
  image(imgBorder, 0, unit, width, height);
  image(imgMenubar, 0, 0, width, unit*1.8);
  
  textSize(34);

  fill(100, 240, 255);
  stroke(0);
  textAlign(CENTER);
  textFont(snowFont);
  text("Arctic Adventures!", width * 0.33, 40);
  textSize(16);
  text("Look around! There is much to discover!", width * 0.66, 40);
}

function draw(){

  if(mouseX > polarbearBtn.x && mouseX < polarbearBtn.x2 && mouseY > polarbearBtn.y && mouseY < polarbearBtn.y2){
    polarbearBtn.tinted();
  } else {
    polarbearBtn.tint = noTint;
  }

  if(mouseX > signpostBtn.x && mouseX < signpostBtn.x2 && mouseY > signpostBtn.y && mouseY < signpostBtn.y2){
    signpostBtn.tinted();
  } else {
    signpostBtn.tint = noTint;
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
  signpostBtn.display();
  foxBtn.display();
  helpBtn.display();

  
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
    fill(0,0,0,0);
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

    } else if(mouseX > signpostBtn.x && mouseX < signpostBtn.x+145 && mouseY > signpostBtn.y && mouseY < signpostBtn.y+357){
      open("map.html", "_self");

    } else if(mouseX > foxBtn.x && mouseX < foxBtn.x2 && mouseY > foxBtn.y && mouseY < foxBtn.y2){
      open("wiki.html", "_self");

    } else if(mouseX > helpBtn.x && mouseX < helpBtn.x2 && mouseY > helpBtn.y && mouseY < helpBtn.y2){
      open("about.html", "_self");
    }
  }

