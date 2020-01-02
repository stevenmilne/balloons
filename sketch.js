let balloons = [];
let cannonAngle ;
let cannon;
let cannonAngleMax ;
let cannonAngleMin = 0;
let cannonSpeed = 0.01; // .015 seems a good balance
let backing = 0;
let score= 0;
let cannonActive=1;
let gamelive=1;
let highscore=0;
let yeetmode=0;
let playWidth = 0 ;
let playHeight = 0;
let gameMode = 'norm';
let age = 'past';

let ding, siren, ooft;

function setup() {

    ding = loadSound('Pling.mp3');
    siren = loadSound('Siren.mp3');
    ooft = loadSound('Ooft.mp3');
// ding.preload();
  bg = loadImage("boys3.png");
  cannon = createVector(1,1);
  cannonAngle = PI / 2;
  cannonAngleMax = PI;
  playWidth = 400;
  playHeight = 800;
  playWidthHalf =  playWidth/2;
  playRoof = -playHeight+100;
  // playHeight = playHeight-100;
  createCanvas(playWidth, playHeight);
  this.LorryIsBorn();
}

function draw() {
  translate(playWidthHalf, playHeight-100);
  background(bg);

  if(gamelive==1){
    drawPlayfield();
    drawCannon();
    //balloons.get(0).show();
    //balloons.get(0).update(balloons);
    for (let i = balloons.length - 1; i >= 0; i--) {
      let balloon = balloons[i];
      if(balloon.life<1){
        if(i==0)yeetmode=1;
        // balloons.remove(i);
        balloons.splice(i,1);
        score++;
        if (score>highscore)highscore=score;
      }
      balloon.update(balloons);
      balloon.show();
    }
    noStroke();
    fill(255,255,0);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(42);
    if(yeetmode==1){
      text("YEEEEEET MODE: "+score,0,50);
    } else {
      text("HEELIUM: "+score,0,50);
    }
    textSize(22);
    text("HIGHSCORE: "+highscore,0,80);

  } else { // move this to a game state thing
   this.gameover();
  }
}



function drawCannon(){
  cannonAngle+=cannonSpeed;
  cannon = p5.Vector.fromAngle(cannonAngle);
  cannon.setMag(28);
  if (cannonAngle>cannonAngleMax || cannonAngle < cannonAngleMin)cannonSpeed = cannonSpeed*-1;
  stroke(0);
  noStroke();
  fill(255,255,255);
  circle(0,0,40);
  strokeWeight(8);
  stroke(0);
  line(0,0,-cannon.x,-cannon.y);

  cannon.setMag(int(random(0, 300)));
  stroke(255,0,0);
  strokeWeight(int(random(0, 8)));
  line(0,0,-cannon.x,-cannon.y);
}

 function drawPlayfield(){
  let zoneColor = color(255);
  if(yeetmode==1){
  zoneColor.setAlpha(128 + 28 * sin(millis() / 50));

  }
  stroke(55,55,255);
  strokeWeight(4);
  line((0-(playWidth/2)),13,playWidth/2,13);
  noStroke();
  fill(zoneColor);
  rect(0-(playWidth/2), 0, playWidth, 100);
 }


 function gameover(){
  backing=60;
  stroke(255,255,255);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(int(random(80, 92)));
  text("YOU",0,-500);
  text("LOSE!",0,-450);
  text(score.toString(),0,-400);
  textSize(int(random(64, 72)));
  text("HIGHSCORE" ,0,-300);
  text( highscore.toString(),0,-250);
}



 function keyPressed() {
    if (keyCode == UP_ARROW) {
      balloons = [];
      backing=0;
      score=0;
      cannonActive=1;
      gamelive=1;
      yeetmode=0;
      this.LorryIsBorn();
      siren.play();
  } else {
    if(cannonActive==1 || yeetmode==1){
      // balloons.add(new Balloon(cannonAngle));
         append(balloons, new Balloon(cannonAngle));
      cannonActive=0;
    }
  }
}


 function LorryIsBorn(){
   append(balloons, new Balloon(cannonAngle));
  // balloons.add(new Balloon(cannonAngle));
  balloons[0].size=150;
  balloons[0].position=createVector(int(random(-150, 150)),int(random(-350, -550)));
  balloons[0].r=155;
  balloons[0].g=255;
  balloons[0].b=255;
  balloons[0].speed=0;
  balloons[0].velocity.setMag(0);
  balloons[0].inmotion=0;
}
