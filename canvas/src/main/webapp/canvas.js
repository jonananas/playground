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
		sprite.render(this.ctx);
	};
}

function Circle() {
	this.x = 0;
	this.y = 0;
	this.radius = 100;
	this.color = "red";

	this.render = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.moveRight = function(pixels) {
		this.x += pixels;
	};

	this.moveDown = function(pixels) {
		this.y += pixels;
	};
}

frame = new Frame();
circle = new Circle();
frame.render(circle);
frame.clear();

$("body").keydown(function(event) {
	switch (event.keyCode) {
	case 39:
		circle.moveRight(10);
		break;
	case 37:
		circle.moveRight(-10);
		break;
	case 38:
		circle.moveDown(-10);
		break;
	case 40:
		circle.moveDown(10);
		break;
	default:
		console.log("pressed " + event.keyCode);
	}
	frame.clear();
	frame.render(circle);
});