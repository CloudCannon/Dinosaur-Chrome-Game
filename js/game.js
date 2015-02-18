(function(window, document, $) {

	var canvas = document.getElementById("game");
	var context = canvas.getContext("2d");


	function drawDinosaur(context, x, y) {
		context.fillRect(x, y, 100, 100);
	}

	drawDinosaur(context, 10, 10);

})(window, document, $);