let width = 1024;
let height = 576+64;

let unit = 64;

let imgBackground;
let imgMenubar;
let imgPolarbear;
let imgIceshelf;
let help = false;

let imageButtons = [];

let helpBtn;
let polarbearBtn;
let phoneBtn;
 
function setup(){

  snowFont = loadFont("fonts/FROSW___.ttf");

  weblink = createA("#","");
  weblink.position(width/2-50, 40);
  weblink.parent("sketch-holder");

  var cnv = createCanvas(width, height);
  cnv.parent("sketch-holder");

  imgBackground = loadImage("images/researchstat.jpg");
  imgMenubar = loadImage("images/menubar.png");

  imgIceshelf = loadImage("images/iceshelf.png");
  imgIceshelf = new ImageButton(imgIceshelf, width/2, height/2, 600, 300);
  imageButtons.push(imgIceshelf);

  helpBtn = loadImage("images/questionmark.png");
  helpBtn = new ImageButton(helpBtn, width-unit, 0, unit, unit);
  imageButtons.push(helpBtn);

  phoneBtn = loadImage("images/phone.png");
  phoneBtn = new ImageButton(phoneBtn, 200, 460, 100, 100);
  imageButtons.push(phoneBtn);

  polarbearBtn = loadImage("images/polarbear_free.png");
  polarbearBtn = new ImageButton(polarbearBtn, 720, 440, 200, 200);
  imageButtons.push(polarbearBtn);

}

function draw(){

  image(imgBackground, 0, unit, width, height);
  image(imgMenubar, 0, 0);
  //pspBtn.mouseOver(psp);
  //return (false);
  textSize(34);
//  textFont(font2DTitle);
  fill(100, 240, 255);
  stroke(0);
  textAlign(CENTER);
  textFont(snowFont);
  text("Look around! There is much to discover!", width/2, 40);
//  textFont(font2DTitle);

  noFill();
  noStroke();
  rect(475, 97, 170, 172); //polarbear poster -> about page
  rect(180, 80, 275, 195); //chalc board -> wiki game

  helpBtn.display();
  polarbearBtn.display();
  phoneBtn.display();

  if(help==true){
    imgIceshelf.display();
    print("help");
  }
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
}

function mouseClicked(){
    if(mouseX > polarbearBtn.x && mouseX < polarbearBtn.x2 && mouseY > polarbearBtn.y && mouseY < polarbearBtn.y2){
      print("clicked");
      open("polar_jump.html", "_self");

    } else if(mouseX > 475 && mouseX < 645 && mouseY > 97 && mouseY < 269){
      open("about.html", "_self");

    } else if(mouseX > 200 && mouseX < 300 && mouseY > 460 && mouseY < 560){
      open("map.html", "_self");

    } else if(mouseX > 180 && mouseX < 455 && mouseY > 80 && mouseY < 275){
      open("wiki.html", "_self");

    } else if(mouseX > helpBtn.x && mouseX < helpBtn.x2 && mouseY > helpBtn.y && mouseY < helpBtn.y2){
      if(help==false){
        help=true;
        print(help);

        imgIceshelf.display(); // WHY NO DISPLAY?!?


      } else if(help==true){
        help=false;
      }
    }
  }
