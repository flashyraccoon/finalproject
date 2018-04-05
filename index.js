let width = 1024;
let height = 576+64;

let unit = 64;
let imgBackground;
let imgDrawing;

let imageButtons = [];

let pspBtn;
let phoneBtn;
let psp = false;
 
function setup(){

  weblink = createA("#","");
  weblink.position(width/2-50, 40);
  weblink.parent("sketch-holder");

  var cnv = createCanvas(width, height);
  cnv.parent("sketch-holder");

  imgBackground = loadImage("images/classroom.png");
  imgDrawing = loadImage("images/drawing_distorted.png");
  phoneBtn = loadImage("images.phone.png");
  phoneBtn = new ImageButton(phoneBtn, 300, 460, 200, 200);
  pspBtn = loadImage("images/psp.png");
  pspBtn = new ImageButton(pspBtn, 720, 460, 200, 120);
  imageButtons.push(pspBtn);

  pspBtn.mouseOver();
}

function draw(){

  image(imgBackground, 0, unit);
  //image(imgDrawing, 200, 500, 200, 80);
  pspBtn.display();
  pspBtn.display();
  //pspBtn.mouseOver(psp);
  //return (false);
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

  noFill();
  rect(475, 97, 170, 172);


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
  }

  display(){
    image(this.name, this.x, this.y, this.width, this.height);
  }

  mouseOver(){
    psp = true;

  }
}

//function mouseOver(){

//}

function mouseClicked(){
    if(mouseX > pspBtn.x && mouseX < pspBtn.x2 && mouseY > pspBtn.y && mouseY < pspBtn.y2){
      print("clicked");
      open("polar_jump.html");

    } else if(mouseX > 475 && mouseX < 645 && mouseY > 97 && mouseY < 269){
      open("about.html");
    }
  }
