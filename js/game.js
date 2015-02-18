(function(window, document, $) {

	var canvas = document.getElementById("game");
	var context = canvas.getContext("2d");
	
	context.fillStyle = "#444";

	function drawDinosaur(options) {
		var context = options.context,
			x = options.left,
			y = options.bottom;

		context.fillStyle = "#444";
		
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
		context.fillRect(x + 30, y - 54, 2, 40);
		context.fillRect(x + 32, y - 54, 2, 4);
		context.fillRect(x + 32, y - 48, 2, 32);
		context.fillRect(x + 34, y - 54, 2, 36);
		context.fillRect(x + 36, y - 54, 2, 34);
		context.fillRect(x + 38, y - 54, 2, 20);
		context.fillRect(x + 40, y - 54, 12, 16);
		context.fillRect(x + 52, y - 52, 2, 14);
		context.fillRect(x + 40, y - 36, 8, 2);

		// arm (singular)
		context.fillRect(x + 38, y - 26, 4, 2);
		context.fillRect(x + 42, y - 26, 2, 4);

		if (options.backLegUp) {
			y -= 4;
		} else {
			y = options.bottom
		}
		// back leg
		context.fillRect(x + 12, y, 4, 2);
		context.fillRect(x + 12, y - 6, 2, 8);
		context.fillRect(x + 14, y - 6, 2, 3);
		context.fillRect(x + 16, y - 8, 2, 3);

		if (options.frontLegUp) {
			y -= 6;
		} else {
			y = options.bottom
		}

		// front leg
		context.fillRect(x + 22, y, 4, 2);
		context.fillRect(x + 22, y - 6, 2, 8);
	}

	drawDinosaur({
		context: context, 
		left: 10, 
		bottom: canvas.height - 10
	});

	drawDinosaur({
		context: context, 
		left: 110, 
		bottom: canvas.height - 10,
		backLegUp: true
	});

	drawDinosaur({
		context: context, 
		left: 210, 
		bottom: canvas.height - 10,
		frontLegUp: true
	});

})(window, document, $);