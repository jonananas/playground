window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Frame() {
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = 512;
	this.canvas.height = 480;
	document.body.appendChild(this.canvas);

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	this.render = function(sprite) {
		sprite.render(this.ctx, this);
	};
}

function Circle() {
	this.x = 100;
	this.y = 100;
	this.radius = 100;
	this.color = "red";
	this.xMovement = 0;
	this.yMovement = 0;

	this.render = function(ctx, frame) {
		this.x += this.xMovement;
		this.y += this.yMovement;
		if (this.y > frame.canvas.height + this.radius)
			this.y = 0 - this.radius;
		if (this.y < 0 - this.radius)
			this.y = frame.canvas.height + this.radius;
		if (this.x > frame.canvas.width + this.radius)
			this.x = 0 - this.radius;
		if (this.x < 0 - this.radius)
			this.x = frame.canvas.width + this.radius;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.moveRight = function(pixels) {
		this.xMovement += pixels;
	};

	this.moveDown = function(pixels) {
		this.yMovement += pixels;
	};
}

frame = new Frame();
circle = new Circle();

(function animloop(time) {
	requestAnimFrame(animloop);
	frame.clear();
	frame.render(circle);
})();

$("body").on('keydown', function(event) {
	var arrow = {up: 38, down: 40, left: 37, right: 39};
	switch (event.which) {
	case arrow.right:
		circle.moveRight(1);
		break;
	case arrow.left:
		circle.moveRight(-1);
		break;
	case arrow.up:
		circle.moveDown(-1);
		break;
	case arrow.down:
		circle.moveDown(1);
		break;
	default:
		console.log("pressed " + event.keyCode);
	}
});