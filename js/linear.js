var config = {
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    background_color: '#fff0eb',
    ball_colors: ['rgb(128, 128, 255)', 'rgb(128, 0, 128)', 'rgb(0, 0, 128)', 'rgb(128, 128, 0)', 'rgb(128, 64, 64)', 'rgb(255, 128, 128)'],
    max_size: 150,
    min_size: 25,
    total: 4,
    speed: 100,
    max_move_way: 500,
    min_move_way: 100
};

var obj = [];
function setup() {
    createCanvas(config.width, config.height);
    for(var i=0;i<8;i++) {
        obj.push(new Ball(random(config.min_move_way, config.max_move_way), random(config.min_size, config.max_size)));
    }
    // noStroke();
}
function draw() {
    background(config.background_color);
    line(0, height*0.5, width, height*0.5);
    obj.forEach(function (o){o.update();o.draw();} );
}


function Ball(scalar, size) {
    this.offset = random(100, 500);
    this.x = 0;
    this.y = height * 0.5;
    this.size = size;
    this.angle = 0;
    this.scalar = scalar;
    this.speed = random(1, 2)-0.5;
    this.color = random(config.ball_colors);
}
Ball.prototype.update = function () {
    var ang = radians(this.angle);
    this.x = (width/2-this.scalar) + (this.scalar * cos(ang));
    this.angle += this.speed;
};
Ball.prototype.draw = function () {
    fill(this.color);
    ellipse(this.x+this.offset, this.y, this.size, this.size);
};