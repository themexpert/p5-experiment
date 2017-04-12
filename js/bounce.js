var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    background_color: '#fff0eb',
    bouncer_colors: ['rgb(128, 128, 255)', 'rgb(128, 0, 128)', 'rgb(0, 0, 128)', 'rgb(128, 128, 0)', 'rgb(128, 64, 64)', 'rgb(255, 128, 128)'],
    max_size: 150,
    min_size: 25,
    total: 8,
    speed: 100
};
var obj = [];
function setup() {
    createCanvas(config.width, config.height);
    for(var i=0;i<config.total;i++) {
        obj.push(new Bouncer(random(config.min_size, config.max_size)));
    }
    // noStroke();
}
function draw() {
    background(config.background_color);
    obj.forEach(function (o){o.update();o.draw();} );
}


function Bouncer(size) {
    this.x = random(0, width);
    this.xr = random([false, true]);
    this.y = random(0, height);
    this.yr = random([false, true]);
    this.size = size;
    this.angle = 0;
    this.speed = (config.speed/size)*3;
    this.color = random(config.bouncer_colors);
}
Bouncer.prototype.update = function () {
    if(this.x>width) this.xr=true; if(this.x<0) this.xr=false;
    if(this.xr) this.x-=this.speed; else this.x+=this.speed;
    if(this.y>height) this.yr=true; if(this.y<0) this.yr=false;
    if(this.yr) this.y-=this.speed; else this.y+=this.speed;
};
Bouncer.prototype.draw = function () {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
};