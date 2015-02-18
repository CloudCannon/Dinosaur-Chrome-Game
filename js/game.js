(function(window, document, $) {
	var canvas = document.getElementById("game"),
		context = canvas.getContext("2d"),
		defaultColour = "#444",
		backgroundColour = "#eee";

	function rand(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
	}

	function drawDinosaur(options) {
		var context = options.context,
			x = options.left,
			y = options.bottom;

		// background spacer
		context.fillStyle = backgroundColour;
		context.fillRect(x + 7, y - 14, 22, 18);

		// Dino!
		context.fillStyle = defaultColour;
		
		// tail
		context.fillRect(x, y - 36, 2, 16);
		context.fillRect(x + 2, y - 32, 2, 16);
		context.fillRect(x + 4, y - 30, 2, 16);
		context.fillRect(x + 6, y - 28, 2, 16);
		context.fillRect(x + 8, y - 28, 2, 18);
		context.fillRect(x + 10, y - 30, 2, 22);
		context.fillRect(x + 12, y - 32, 4, 26);
		context.fillRect(x + 16, y - 34, 4, 26);
		context.fillRect(x + 20, y - 36, 4, 30);
		context.fillRect(x + 24, y - 38, 2, 30);
		context.fillRect(x + 26, y - 38, 2, 28);
		context.fillRect(x + 28, y - 52, 2, 40);

		if (options.wideEyed) {
			context.fillRect(x + 30, y - 54, 6, 2);
			context.fillRect(x + 32, y - 50, 2, 2);
			context.fillRect(x + 30, y - 46, 2, 32);
			context.fillRect(x + 32, y - 46, 2, 30);
			context.fillRect(x + 34, y - 46, 2, 28);
			// context.fillRect(x + 32, y - 54, 2, 4);
			// context.fillRect(x + 32, y - 48, 2, 32);
			// context.fillRect(x + 34, y - 54, 2, 36);
		} else {
			context.fillRect(x + 30, y - 54, 2, 40);
			context.fillRect(x + 32, y - 54, 2, 4);
			context.fillRect(x + 32, y - 48, 2, 32);
			context.fillRect(x + 34, y - 54, 2, 36);
		}

		context.fillRect(x + 36, y - 54, 2, 34);
		context.fillRect(x + 38, y - 54, 2, 20);
		context.fillRect(x + 40, y - 54, 12, 16);
		context.fillRect(x + 52, y - 52, 2, 14);

		if (options.wideEyed) {
			context.fillRect(x + 38, y - 34, 8, 2);
		} else {
			context.fillRect(x + 40, y - 36, 8, 2);
		}

		// arm (singular)
		context.fillRect(x + 36, y - 26, 4, 2);
		context.fillRect(x + 40, y - 26, 2, 4);

		y = options.bottom;
		if (options.backLegUp) {
			y -= 4;
		}
		// back leg
		context.fillRect(x + 12, y, 4, 2);
		context.fillRect(x + 12, y - 6, 2, 8);
		context.fillRect(x + 14, y - 6, 2, 3);
		context.fillRect(x + 16, y - 8, 2, 3);

		y = options.bottom;
		if (options.frontLegUp) {
			y -= 6;
		}

		// front leg
		context.fillRect(x + 22, y, 4, 2);
		context.fillRect(x + 22, y - 6, 2, 8);
	}

	function drawBackground(options) {
		var context = options.context,
			x = options.left,
			y = options.bottom;

		context.fillStyle = defaultColour;
		
		context.fillRect(x, y - 20, canvas.width, 1);

		for (y = options.bottom - 10; y <= canvas.height; y += 8) {
			for (x = options.left + rand(0, 100); x <= canvas.width; x += rand(100, 200)) {
				context.fillRect(x, y, 4, 1);
			}
		}
	}

	function drawCactus(options) {
		var context = options.context,
			x = options.left,
			y = options.bottom,
			scale = options.scale;

		context.fillStyle = defaultColour;
		
		// center
		context.fillRect(x + 6 * scale, y - 40 * scale, 6 * scale, 40 * scale);
		context.fillRect(x + 7 * scale, y - 41 * scale, 4 * scale, 1 * scale);
		
		// left
		context.fillRect(x, y - 30 * scale, 4 * scale, 15 * scale);
		context.fillRect(x + 1 * scale, y - 31 * scale, 2 * scale, 1 * scale);
		context.fillRect(x + 4 * scale, y - 19 * scale, 4 * scale, 4 * scale);

		// right
		context.fillRect(x + 14 * scale, y - 30 * scale, 4 * scale, 15 * scale);
		context.fillRect(x + 15 * scale, y - 31 * scale, 2 * scale, 1 * scale);
		context.fillRect(x + 12 * scale, y - 19 * scale, 4 * scale, 4 * scale);
	}

	drawBackground({
		context: context, 
		left: 0, 
		bottom: canvas.height,
		frontLegUp: true
	});

	drawCactus({
		context: context, 
		left: 410, 
		bottom: canvas.height - 10,
		scale: 1
	});

	drawCactus({
		context: context, 
		left: 430, 
		bottom: canvas.height - 10,
		scale: 1
	});

	drawCactus({
		context: context, 
		left: 560, 
		bottom: canvas.height - 10,
		scale: 1.2
	});

	var lastTick = null,
		jumping = false,
		score = 0,
		ground = canvas.height - 10,
		speed = 0.01; // 10 score per second

	function step(timestamp) {
		if (lastTick) {
			score += (timestamp - lastTick) * speed;

			drawDinosaur({
				context: context, 
				left: 10, 
				bottom: ground,
				backLegUp: Math.floor(score) % 3 === 0,
				frontLegUp: Math.floor(score) % 3 === 1
			});
		}
		lastTick = timestamp;
		window.requestAnimationFrame(step);
	}

	window.requestAnimationFrame(step);

})(window, document, $);