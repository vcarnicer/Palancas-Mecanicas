function Bola(x, y, rad) {

    var defaultCategory = 0x0001;
    var category2 = 0x0002;
    var category3 = 0x0003;
    
    var options = {
        category: defaultCategory,
        collisionFilter: {
            mask: defaultCategory | category2 | category3
        }
        
    }
    this.body = Bodies.circle(x, y, rad);
    this.rad = rad;

    World.add(world, this.body);
    this.body.restitution = 0.3;
    this.body.friction = 0.2;
}
Bola.prototype.show = function () {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    noStroke();
    
    fill(30, 10, 200, 170);
    ellipse(0, 0, this.rad * 4);
    fill(30, 10, 200);
    ellipse(0, 0, this.rad * 2);
    stroke(255);
    strokeWeight(2);
    line(this.rad/2, 0, 2*this.rad/3, 0);

    pop();
}

Bola.prototype.isOffScreen = function () {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height);
}
