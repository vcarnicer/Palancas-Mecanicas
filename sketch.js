// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Common = Matter.Common;

var engine;
var world;

var bolas = [];
var palancas = [];
var limites = [];

let fps;
var fpsP;

var filas = 5;
var columnas = 7;



function setup() {
    createCanvas(1000, 800);

    //Creacion de engine y mundo
    engine = Engine.create();
    world = engine.world;

    //Colisiones
    function collision(event){
        var pairs = event.pairs;
        //console.log(pairs);
    }
    
    //Suscripcion de eventos
    Events.on(engine, 'collisionStart', collision);

    //Gravedad
    world.gravity.y = 1;
    world.gravity.x = 0;

    //Limite
    //limites.push(new limRect(width / 2, height, width, 20));

    //Crea Palancas
    creaPalancas(175, 18);

    //FPS
    fpsP = createP();
    //background(200, 233, 234);
    echaBolas();

}

function draw() {
    //background(200, 233, 234);
    background(0);
    Engine.update(engine, 1000 / 30);

    //Muestra FPS
    fps = frameRate();
    fill(255);
    stroke(0);
    fpsP.html("FPS: " + fps.toFixed(2));

    //Muestra Bolas
    for (var i = 0; i < bolas.length; i++) {
        bolas[i].show();
        if (bolas[i].isOffScreen()) {
            World.remove(world, bolas[i].body);
            bolas.splice(i, 1);
            i--;
        }
    }

    //Muestra Palancas
    for (var i = 0; i < palancas.length; i++) {
        palancas[i].show();
        if (palancas[i].body.position.x < 100) {
            Body.setAngularVelocity(palancas[i].body, 0.04);
            palancas[i].body.label2 = "gira";
        }


        if (frameCount % 200 < 10) {


            /*var body = palancas[i].body;
            var forceMagnitude = 0.001 * body.mass;

            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
            */
        }
    }

    echaBolas();



}

function mouseDragged() {
    shakeScene(engine);

}

var shakeScene = function () {
    var bodies = palancas;

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i].body;

        if (!body.isStatic && body.position.y >= 0) {
            var forceMagnitude = 0.005 * body.mass;

            Body.applyForce(body, body.position, {
                x: 0,
                //x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                y: forceMagnitude + Common.random() * forceMagnitude
            });
        }
    }
};

function echaBolas() {
    var cant = 50;
    var interv = 3;
    var radio = 5;
    if (frameCount % (interv * 60) == 0) {
        for (var i = 0; i < cant; i++) {
            bolas.push(new Bola(random(width), random(-150, -100), radio));
        }
    }

}

function creaPalancas(w, h) {
    var spacing = width / columnas;
    for (var j = 1; j < filas; j++) {
        for (var i = 0; i < columnas + 1; i++) {

            var x = i * spacing;
            var options = {
                label: "izq"
            };
            if (j % 2 == 0) {
                x += spacing / 2;
                options = {
                    label: "der"
                };
            }
            var y = j * (spacing + 20);

            var p = new Palanca(x, y, w, h, options);
            palancas.push(p);
        }
    }

}
