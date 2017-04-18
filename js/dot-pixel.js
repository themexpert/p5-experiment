var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    background_color: '#fff0eb',
    bubble_colors: ['rgb(128, 128, 255)', 'rgb(128, 0, 128)', 'rgb(0, 0, 128)', 'rgb(128, 128, 0)', 'rgb(128, 64, 64)', 'rgb(255, 128, 128)'],
    max_size: 7,
    min_size: 5,
    total: 100,
    speed: 100
};
var dots = [];
function setup() {
    createCanvas(config.width, config.height);
    for(var i=0;i<config.total;i++) {
        dots.push(new Dot(random(config.min_size, config.max_size)));
    }
    noStroke();
}
function draw() {
    background(config.background_color);
    dots.forEach(function (dot) {
        dot.update();
        dot.draw();
    });
}

function Dot(radius) {
    this.radius = radius;
    var color = /(\d+).*(\d+).*(\d+)/i.exec(random(config.bubble_colors))[0].split(',');
    this.r = parseInt(color[0]);
    this.g = parseInt(color[1]);
    this.b = parseInt(color[2]);

    this.mx = width;
    this.my = height;

    this.x = random(0, this.mx);
    this.y = random(0, this.my);

    this.sx = random(1, 4)*random(0.03, 0.07);
    this.sy = random(1, 4)*random(0.03, 0.07);
    this.f = random([true, false]);
    this.u = random([true, false]);

    this.rh = random(0, 25);
    this.sh = this.rh;
    this.a = random(-50, 50);
    this.ma = 50;
    this.da = random(0.5, 1.5);
    this.ah = (this.a<0)?'hidden':'shown';
}
Dot.prototype.update = function () {
    if(this.f) {
        this.x += this.sx;
        if(this.x > this.mx)
        {
            this.f = false;
        }
    } else {
        this.x -= this.sx;
        if(this.x < 0)
        {
            this.f = true;
        }
    }
    if(this.u) {
        this.y += this.sy;
        if(this.y > this.my)
        {
            this.u = false;
        }
    } else {
        this.y -= this.sy;
        if(this.y < 0)
        {
            this.u = true;
        }
    }

    if(this.ah==='hidden') {
        this.a += this.da;
        if(this.a>this.ma)
            this.ah = 'wait';
    } else if(this.ah==='wait') {
        this.sh -= this.a<0?0.3:0.1;
        if(this.sh<0) {
            if(this.a<0)
                this.ah = 'hidden';
            if(this.a>this.ma)
                this.ah = 'shown';
            this.sh = 25;
        }
    } else if(this.ah==='shown'){
        this.a -= this.da;
        if (this.a < 0) {
            this.ah = 'wait';
        }
    }
};
Dot.prototype.draw = function () {
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.radius, this.radius);
};