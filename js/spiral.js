var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    background_color: '#607d8b',
    total: 8
};
var obj = [];
function setup() {
    createCanvas(config.width, config.height);
    for(var i=0;i<config.total;i++) {
        obj.push(new Spiral());
    }
    // noStroke();
}
function draw() {
    background(255);
    obj.forEach(function (o){o.update();o.draw();} );
}

function Spiral() {
    this.point1 = new Point(random(1, 4));
    this.point2 = new Point(random(1, 4));
    this.point3 = new Point(random(1, 4));
    this.point4 = new Point(random(1, 4));
}
Spiral.prototype.update = function () {
    this.point1.update();
    this.point2.update();
    this.point3.update();
    this.point4.update();
};

Spiral.prototype.draw = function () {
    var point1 = this.point1.get();
    var point2 = this.point2.get();
    var point3 = this.point3.get();
    var point4 = this.point4.get();
    fill(0, 0, 0, 0);
    for(var i=0; i<8; i++) {
        bezier(point1.x+point1.e*i, point1.y, point2.x+point2.e*i, point2.y, point3.x+point3.e*i, point3.y, point4.x+point4.e*i, point4.y);
    }
};

function Point(speed) {
    this.x = random(0, width);
    this.xr = random([false, true]);
    this.y = random(0, height);
    this.yr = random([false, true]);
    this.speed = speed;
    this.e = 8;
    this.f = random(20, 80);
    this.i = random(1, 2)*0.1;
}
Point.prototype.update = function () {
    if(this.x>width) this.xr=true; if(this.x<0) this.xr=false;
    if(this.xr) this.x-=this.speed; else this.x+=this.speed;
    if(this.y>height) this.yr=true; if(this.y<0) this.yr=false;
    if(this.yr) this.y-=this.speed; else this.y+=this.speed;
    this.f += this.i;
    this.e = cos(radians(this.f))*20;
};
Point.prototype.get = function () {
    return {x: this.x, y:this.y, e: this.e};
};
