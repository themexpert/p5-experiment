var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    position: {
        x: 80, //80% from left to right of width
        y: 50 //50% from top to bottom of height
    },
    total: 31,
    distance: 10,
    background_color: '#ffffff',
    stroke_color: '#dd3c30'
};

var obj = [], nF = false, fColor={r:'',g:'',b:''};

function setup() {
    createCanvas(config.width, config.height);
    noStroke();
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(config.stroke_color);
    fColor.r = parseInt(result[1], 16);
    fColor.g = parseInt(result[2], 16);
    fColor.b = parseInt(result[3], 16);
}
function draw() {
    var h=true;
    background(255);
    obj.forEach(function (o) {
        o.update();
        o.draw();
        if(o.r<config.distance) h=false;
    });
    if(h===true) {
        obj.push(new Pentagon(nF));
        if(obj.length>config.total) obj.shift();
        nF=!nF;
    }
}


function Pentagon(nF) {
    this.x = 20;
    this.y = 20;
    this.r = 0;
    this.t = 0;
    this.nF = nF;
    this.o = 1;
}

Pentagon.prototype.update = function () {
    this.t += 0.0005;
    this.r += 0.15;
};
Pentagon.prototype.draw = function () {
    push();
    translate(width*(config.position.x/100), height*(config.position.y/100));
    rotate(this.t);
    this.o -= 0.0005;
    var fl = this.nF===false?config.background_color:'rgba('+fColor.r+', '+fColor.g+', '+fColor.b+', '+this.o+')';
    fill(fl);
    this.Polygon(this.x, this.y, this.r, 5);
    pop();
};
Pentagon.prototype.Polygon = function (x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
};