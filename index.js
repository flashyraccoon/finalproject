let width = 1024;
let height = 576+64;
let unit = 64;

function setup(){
  imgBackground = loadImage("images/classroom.png");
  var cnv = createCanvas(width,height);
}

function draw(){
  image(imgBackground, 0, unit);
}
