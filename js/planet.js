var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    background_color: '#607d8b',
    circle_color: '#fefdff',
    planet_color: '#ffe8fe',
    inner_planet_speed: 80,
    outer_planet_speed: 70,
    bigger_particle_color: '#e4eee5',
    bigger_particle_min_size: 3,
    bigger_particle_max_size: 8,
    bigger_particle_speed: 30,
    bigger_particle_spread: 100,
    smaller_particle_color: '#fff1ef',
    smaller_particle_min_size: 1,
    smaller_particle_max_size: 4,
    smaller_particle_speed: 70,
    smaller_particle_spread: 150
};

var radius, aestros1=[], aestros2=[];
function setup() {
    createCanvas(config.width, config.height);
    angleMode(DEGREES);
    for(var i=1;i<362;i++) {
        aestros1.push(new Aestro(config.bigger_particle_min_size, config.bigger_particle_max_size, config.bigger_particle_spread, config.bigger_particle_color));
    }
    for(var i=1;i<362;i++) {
        aestros2.push(new Aestro(config.smaller_particle_min_size, config.smaller_particle_max_size, config.smaller_particle_spread, config.smaller_particle_color));
    }
}

function draw() {
    radius = width/2;
    translate(width/2, height/2);
    noStroke();
    background(config.background_color);
    drawStaticDottedCircle();
    drawAstroLayerOne();
    drawAstroLayerTwo();
}

function drawStaticDottedCircle() {
    var r = radius,
        r2 = r+80;
    push();
    noFill();
    ellipse(0,0,r2,r2);
    for(var i=1;i<=360;i++) {
        push();
        rotate(i);
        fill(config.circle_color);
        translate(0, r2/2);
        ellipse(0, 0, 2, 2);
        pop();
    }
    push();
    rotate(frameCount*(config.outer_planet_speed/100));
    fill(config.planet_color);
    translate(0, r2/2);
    ellipse(0, 0, 10, 10);
    pop();
    // push();
    //     rotate(-frameCount*0.9);
    //     fill(0, 255);
    //     translate(0, r2/2);
    //     ellipse(0, 0, 10, 10);
    // pop();
    pop();

    push();
    noFill();
    ellipse(0,0,r,r);
    for(var i=1;i<=360;i++) {
        push();
        rotate(i);
        fill(config.circle_color);
        translate(0, r/2);
        ellipse(0, 0, 2, 2);
        pop();
    }
    push();
    rotate(-frameCount*(config.inner_planet_speed/100));
    fill(config.planet_color);
    translate(0, r/2);
    ellipse(0, 0, 10, 10);
    pop();
    pop();
}
function drawAstroLayerOne() {
    push();
    rotate(frameCount*(config.bigger_particle_speed/100));
    for(var i=1;i<=360;i++) {
        if(i%2===0 || i%3===0 || i%4===0) continue;
        push();
        rotate(i);
        translate(0, radius/2-10);
        aestros1[i].draw();
        pop();
    }
    pop();
}

function drawAstroLayerTwo() {
    push();
    rotate(frameCount*(config.smaller_particle_speed/100));
    for(var i=1;i<=360;i++) {
        if(i%2===0) continue;
        push();
        rotate(i);
        translate(0, radius/2-60);
        aestros2[i].draw();
        pop();
    }
    pop();
}

function Aestro(min, max, bmax, color) {
    if(!min) min=3;
    if(!max) max=10;
    if(!bmax) bmax = 100;
    this.r = random(min, max);
    this.x = random(0, bmax);
    this.y = random(0, bmax);
    this.color = color;
}
Aestro.prototype.draw = function () {
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.r, this.r);
    pop();
};