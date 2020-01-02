
function setup() {


  playWidth = 600;
  playHeight = 800;

  // playHeight = playHeight-100;
  createCanvas(playWidth, playHeight);

}


function draw() {

  background(240);
  let obstacle = createVector(50, 50);

  let projectile = createVector(50, 0);
  drawArrow(obstacle, projectile, 'red');

  let velocity = createVector(mouseX - 50, mouseY - 50);


  drawArrow(obstacle, velocity, 'blue');


  let angleBetween = projectile.angleBetween(velocity);

  let rebound = p5.Vector.fromAngle( PI-angleBetween ,velocity.mag());

    drawBounce(obstacle,rebound,'green');

  noStroke();
  text(
    'angle between: ' +
      angleBetween.toFixed(2) +
      ' radians or ' +
      degrees(angleBetween).toFixed(2) +
      ' degrees',
    10,
    50,
    90,
    50
  );
}

function drawBounce(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(2);
  fill(myColor);
  translate(base.x+100, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}


// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
