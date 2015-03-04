(function(namespace) {
	function generateBits(width, height) {
		var bits = [], x, y;
		for (y = height - 10; y <= height; y += 8) {
			for (x = 0 + rand(0, 100); x <= width; x += rand(100, 200)) {
				bits.push({
					x: x, 
					y: y, 
					width: rand(2, 4)
				});
			}
		}
		return bits;
	}

	function Background(options) {
		this.width = options.width;
		this.height = options.height;
		this.colour = options.colour;
		this.bits = generateBits(this.width, this.height);
	}

	Background.prototype = Object.create(GameObject.prototype);
	Background.prototype.constructor = Background;

	Background.prototype.draw = function(context, offset) {
		context.fillStyle = this.colour;
		context.fillRect(0, this.height - 20, this.width, 1);

		for (var i = this.bits.length - 1; i >= 0; i--) {
			context.fillRect(this.width - ((this.bits[i].x + offset) % this.width), this.bits[i].y, this.bits[i].width, 1);
		}
	};

	namespace.Background = Background;
})(window);