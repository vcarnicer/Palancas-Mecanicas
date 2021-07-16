function Palanca(x, y, w, h) {

    //Cuerpo físico
    var defaultCategory = 0x0001;
    var category2 = 0x0002;
    var category3 = 0x0003;

    this.w = w;
    this.h = h;
    this.w2 = h;
    this.h2 = w;


    this.part1 = Bodies.rectangle(x, y, this.w, this.h);
    //this.part2 = Bodies.rectangle(x, y, this.w2, this.h2);
    this.part2 = Bodies.circle(x, y, this.w*0.3);
    this.pin = Matter.Vector.create(x, y);
    
    this.body = Matter.Body.create({
        parts: [this.part1,
        this.part2]
    })

    this.constraint = Matter.Constraint.create({
        pointA: {
            x: this.pin.x,
            y: this.pin.y
        },
        bodyB: this.body,
        pointB: {
            x: 0,
            y: 0
        }
        //damping: 0
    });

    
    //Color
    this.r = random(150, 255);
    this.g = random(0, 200);
    this.b = random(200, 250);
    this.a = 255;

    //Matter.Body.setAngularVelocity(this.body, 0.2);
    this.body.restitution = 0;
    this.body.friction = 0.3;

    World.add(world, [this.body, this.constraint]);
}

Palanca.prototype.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;


    //Matter.Body.setAngularVelocity(this.body, 0.1);

    push();
    strokeWeight(5);
    stroke(50);
    //translate(this.pin.x, this.pin.y);
    //YA DIBUJA DESDE SU CERO??
    line(this.pin.x, this.pin.y, pos.x + this.constraint.pointB.x, pos.y + this.constraint.pointB.y);
    pop();

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(this.r, this.g, this.b, this.a);
    strokeWeight(2);
    stroke(this.r - 20, this.g - 20, this.b - 20, this.a);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    circle(0, 0, this.w*0.3*2);
    //rect(0, 0, this.w2, this.h2);
    pop();

}
