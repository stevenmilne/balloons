class Balloon {

  constructor(cannonAngle) {
     this.speed = 16;
    this.drag = 0.985;
    this.life = 3;
    this.inmotion =1;
    this.direction = cannonAngle;
    this.immunity = 0;
    // this.velocity =  Vector.fromAngle(cannonAngle).setMag(speed);
    this.velocity =   p5.Vector.fromAngle(cannonAngle, 30).setMag(this.speed);
    this.position = createVector(0,0);
    this.size = 25;
    if(age=='past'){
      this.r=255;
      this.g=255;
      this.b=255;
    } else {
      this.r =int(random(50,200));
      this.g =int(random(50,200));
      this.b =int(random(50,200));
    }

  }



   update( balloons){
     if(this.immunity>0)this.immunity-=1;
    this.position = this.position.sub(this.velocity);
    this.velocity.mult(this.drag);

    this.walls();

    // if still moving, check collisions with other balloons
    if(balloons.length>1 && this.velocity.mag()>0){
      // this.bounce();
      this.collide();
    }

    // if inmotion and speed =0
    if(this.inmotion>0 && this.velocity.mag()==0){
      this.size=this.size*1.008;
      this.block();
      if(this.inmotion==0)cannonActive=1;
      //println('stopped');
    }

    if(this.velocity.mag()<0.1){
     this.velocity.setMag(0);
     //this.size=80;
    }
  }


   walls(){
    if(this.position.x>((playWidth/2)-(this.size/2))  ) this.velocity.x = this.velocity.x*-1;
    if(this.position.x<-((playWidth/2)-(this.size/2))  ) this.velocity.x = this.velocity.x*-1;
    if(this.position.y<((playRoof)+(this.size/2))  ) this.velocity.y = this.velocity.y*-1;
    if(this.position.y>13-(this.size/2) ){
      backing = 220;
      gamelive=0;
      ooft.play();
    }
  }



  collide(){

    for (let i = balloons.length-1; i > -1; i--) {
      // console.log(others[i]);
      let dx = balloons[i].position.x - this.position.x;
      let dy = balloons[i].position.y - this.position.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = balloons[i].size / 2 + this.size / 2;
      let p5dist = this.position.dist(balloons[i].position);
      let oldMag = this.velocity.mag();
      // console.log(distance + " DIST");
      // console.log(p5dist + " .dist DIST");
      //  console.log(minDist + " min dist");

      if (  distance != 0 && distance < minDist) {
        console.log("INRANGE APPARENTLY");
        console.log("immunity = " + this.immunity);


              console.log("NOT EVEN A LITTLE BIT IMMUNE");


        // this.g=0;
        let angle = atan2(dy, dx);

                                  // console.log("ANGLE " + angle);
        let targetX = this.position.x + cos(angle) * (minDist*1.05);
        let targetY = this.position.y + sin(angle) * (minDist*1.05);

        // console.log("SET XY " + targetX + " " + targetY);

        let ax = (targetX - balloons[i].position.x);// * spring;
        let ay = (targetY - balloons[i].position.y);// * spring;

        this.velocity.x += ax;
        this.velocity.y += ay;

        this.velocity.setMag(oldMag);
// NEED TO FIX THIS - IT's DOUBLE COUNTING...

        if (  this.immunity>0   ){
            console.log(" IMMUNE");
        } else {
            ding.play();
            balloons[i].life -=1;
            this.immunity=10;
          // console.log("SET XY " + ax + " " + ay);

            }
      }
    }


  }

  //
  //  bounce(){
  //    // this finds other balloons and bounces off them
  //   for (let i = balloons.length-1; i > -1; i--) {
  //     let other = balloons[i];
  //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
  //     let rads = (this.size+other.size)/2;
  //
  //     // if they are overlapping at all
  //     if (other != this && d < rads) {
  //       // this.velocity = bounce;
  //       // push();
  //       // move to the centre of the current balloon for easier (??) sums
  //       // translate(this.position.x, this.position.y);
  //
  //       // now rotate so that we are pointing directly at the target?
  //
  //       // rotate(this.position.angleBetween(other.position));
  //
  //       //
  //       // let bounce = other.position.copy();
  //       // bounce.sub(this.position);
  //       // bounce.setMag(this.velocity.mag()); //keep the same speed as previously
  //
  //       let angleBetween = other.position.angleBetween(this.velocity);
  //
  //       // this is where we need to do the maths properly
  //       // we have a projectile, a barrier, and need to calculate the rebound Vector
  //       // let angleBetween = this.position.angleBetween(other.position);
  //       let rebound = p5.Vector.fromAngle( PI-angleBetween ,this.velocity.mag());
  //
  //
  //       this.velocity = rebound;
  //
  //     //  this.velocity.add(bounce);// = bounce;
  //       other.life -=1;
  //       // console.log(this.velocity.mag());
  //
  //       // let angle = this.position.angleBetween(other.position);
  //       // console.log(angle);
  //       // pop();
  //     }
  //   }
  // }


   block(){
    for (let i = balloons.length-1; i > -1; i--) {
      let other = balloons[i];
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      let rads = (this.size+other.size)/2;
      let bounce = other.position.copy();
      bounce.sub(this.position);
      bounce.setMag(this.velocity.mag());
      if (other != this && d < rads) {
        this.inmotion = 0;
      }
    }

    if(this.position.x>(playWidthHalf-(this.size/2))  ) this.inmotion = 0;
    if(this.position.x < 0-(playWidthHalf-(this.size/2))  ) this.inmotion = 0;
    if(this.position.y<((playRoof)+(this.size/2))  ) this.inmotion = 0;
    if(this.position.y>-2-(this.size/2) ) this.inmotion = 0;

  }


   show(){
    fill(this.r,this.g,this.b);
    // stroke(this.r/2,this.g/2,this.b/2);
    // strokeWeight(1);
    noStroke();
    circle(this.position.x, this.position.y, this.size);
    fill(0);
    textAlign(CENTER, CENTER);
    // textSize((int)this.size/2);
    text(this.life,this.position.x, this.position.y);
  }

}
