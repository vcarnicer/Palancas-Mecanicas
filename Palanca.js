function Palanca(x, y, w, h, options) {

    //Cuerpo físico
    var defaultCategory = 0x0001;
    var category2 = 0x0002;
    var category3 = 0x0003;

    this.w = w;
    this.h = h;
    this.w2 = h;
    this.h2 = w;

    this.options = options;

    this.part1 = Bodies.rectangle(x, y, this.w, this.h);
    this.part2 = Bodies.rectangle(x, y, this.w, this.h, {angle:PI/3});
    this.part3 = Bodies.rectangle(x, y, this.w, this.h, {angle:-PI/3});
    this.part4 = Bodies.circle(x, y, this.w/5);
    this.pin = Matter.Vector.create(x, y);
    
    
    
    
    this.body = Matter.Body.create({
        parts: [this.part1,
        this.part2, this.part3, this.part4]        
    });
    
    if(this.options.label == "izq"){
        //this.body.angle = radians(15);
        //Matter.Body.setAngularVelocity(this.body, -0.03);
    } else if (this.options.label == "der"){
        //Matter.Body.setAngularVelocity(this.body, 0.03);
    }

    this.constraint = Matter.Constraint.create({
        pointA: {
            x: this.pin.x,
            y: this.pin.y
        },
        bodyB: this.body,
        pointB: {
            x: 0,
            y: 0
        },
        stiffness: 1
    });

    
    //Color
    this.r = random(5, 90);
    this.g = random(0, 200);
    this.b = random(0, 50);
    this.a = 255;

    //Matter.Body.setAngularVelocity(this.body, 0.2);
    this.body.restitution = 0;
    this.body.friction = 0.3;

    World.add(world, [this.body, this.constraint]);
}


Palanca.prototype.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    var label = this.body.label;
    if(label){
        //console.log(label);
    }
    
    if(this.options.label == "izq"){
        //Matter.Body.setAngularVelocity(this.body, -0.03);
    } else if (this.options.label == "der"){
        //Matter.Body.setAngularVelocity(this.body, 0.03);
    }
    

    push();
        strokeWeight(5);
        stroke(180);
        //translate(this.pin.x, this.pin.y);
        //YA DIBUJA DESDE SU CERO??

        line(this.pin.x, this.pin.y, pos.x + this.constraint.pointB.x, pos.y + this.constraint.pointB.y);
    pop();

    push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        
        if(this.body.label2 == "gira"){
            fill(120, 0, 0);
        } else {
            fill(120);
        }
    
    
        //strokeWeight(0);
        noStroke();
        //stroke(this.r - 20, this.g - 20, this.b - 20, this.a);
        rectMode(CENTER);
    
        push();    
            rotate(this.part1.angle);
            //fill(this.r, this.g, this.b, this.a);        
            rect(0, 0, this.w, this.h);
        pop();
        
        push();
            rotate(this.part2.angle);
            rect(0, 0, this.w, this.h);
        pop();
        push();
            rotate(this.part3.angle);
            rect(0, 0, this.w, this.h);
        pop();
        push();
            rotate(this.part4.angle);
            ellipse(0, 0, (this.w/5)*2);
        pop();
    pop();

}
