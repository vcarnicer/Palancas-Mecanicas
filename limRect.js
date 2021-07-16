function limRect(x, y, w, h) {

    //Cuerpo físico
    var options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);

    this.w = w;
    this.h = h;

    //Color
    this.r = 230;
    this.g = 130;
    this.b = 130;
    this.a = 255;
    this.pos = this.body.position;

    World.add(world, this.body);
}

limRect.prototype.show = function(){
    fill(this.r, this.g, this.b, this.a);
    strokeWeight(0);
    push();     
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
}