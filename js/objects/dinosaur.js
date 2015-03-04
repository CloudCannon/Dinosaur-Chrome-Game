(function(namespace) {
	var STEP_SPEED = 0.02;
	var JUMP_DISTANCE = 350;
	var JUMP_HEIGHT = 100;

	function Dinosaur(options) {
		this.scale = options.scale;
		this.x = options.left;
		this.y = options.bottom;
		this.colour = options.colour;
		this.jumpStart = null;
	}

	Dinosaur.prototype = Object.create(GameObject.prototype);
	Dinosaur.prototype.constructor = Dinosaur;

	Dinosaur.prototype.isJumping = function(offset) {
		return this.jumpStart !== null && this.jumpDistanceRemaining(offset) > 0;
	};

	Dinosaur.prototype.jumpDistanceRemaining = function(offset) {
		if (this.jumpStart === null) return 0;
		return this.jumpStart + JUMP_DISTANCE - offset;
	};

	Dinosaur.prototype.startJump = function(offset) {
		this.jumpStart = offset;
	};

	Dinosaur.prototype.jumpHeight = function (offset) {
		var distanceRemaining = this.jumpDistanceRemaining(offset);
		if (distanceRemaining > 0) {
			var maxPoint = JUMP_DISTANCE / 2;

			if (distanceRemaining >= maxPoint) {
				distanceRemaining -= JUMP_DISTANCE
			}

			// get a number between 0 and 1 (-x^2)
			// var arcPos = Math.abs(Math.pow(distanceRemaining / maxPoint, 2) * -1);

			// linear
			var arcPos = Math.abs(distanceRemaining / maxPoint);

			return JUMP_HEIGHT * arcPos;
		}
		return 0;
	};

	Dinosaur.prototype.hasBackLegUp = function(offset) {
		return offset > 0 && Math.floor(offset * STEP_SPEED) % 2 === 0;
	};

	Dinosaur.prototype.hasFrontLegUp = function(offset) {
		return offset > 0 && Math.floor(offset * STEP_SPEED) % 2 === 1;
	};

	Dinosaur.prototype.draw = function(context, offset) {
		var x = this.x,
			offsetY = this.y - this.jumpHeight(offset),
			y = offsetY;

		// background spacer
		// context.fillStyle = backgroundColour;
		// context.fillRect(x + 7, y - 14, 22, 18);

		// Dino!
		context.fillStyle = this.colour;
		
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

		if (this.wideEyed) {
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

		if (this.wideEyed) {
			context.fillRect(x + 38, y - 34, 8, 2);
		} else {
			context.fillRect(x + 40, y - 36, 8, 2);
		}

		// arm (singular)
		context.fillRect(x + 36, y - 26, 4, 2);
		context.fillRect(x + 40, y - 26, 2, 4);

		y = offsetY;
		if (this.hasBackLegUp(offset)) {
			y -= 4;
		}
		// back leg
		context.fillRect(x + 12, y, 4, 2);
		context.fillRect(x + 12, y - 6, 2, 8);
		context.fillRect(x + 14, y - 6, 2, 3);
		context.fillRect(x + 16, y - 8, 2, 3);

		y = offsetY;
		if (this.hasFrontLegUp(offset)) {
			y -= 6;
		}

		// front leg
		context.fillRect(x + 22, y, 4, 2);
		context.fillRect(x + 22, y - 6, 2, 8);
	};

	Dinosaur.prototype.colliders = function(offset) {
		var y = this.y - this.jumpHeight(offset);
		return [{
			x: this.x + offset,
			y: y - 20,
			width: 30,
			height: 16
		}, {
			x: this.x + offset + 12,
			y: y + 2,
			width: 15,
			height: 20
		}, {
			x: this.x + offset + 30,
			y: y - 34,
			width: 25,
			height: 20
		}];
	};


	namespace.Dinosaur = Dinosaur;
})(window);