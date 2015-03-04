(function(namespace) {
	var SCORE_FACTOR = 0.1;

	function formatOffset(offset) {
		// TODO pad with zeroes
		return Math.floor(offset * SCORE_FACTOR);
	}

	function ScoreBoard(options) {
		this.scale = options.scale;
		this.x = options.left;
		this.y = options.bottom;
		this.colour = options.colour;
	}

	ScoreBoard.prototype = Object.create(GameObject.prototype);
	ScoreBoard.prototype.constructor = ScoreBoard;

	ScoreBoard.prototype.draw = function(context, offset) {
		context.fillStyle = this.colour;
		context.font = "16px Courier";
		context.textAlign = "right"; 
		context.fillText(formatOffset(offset), this.x, this.y);
	};

	namespace.ScoreBoard = ScoreBoard;
})(window);