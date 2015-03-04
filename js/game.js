(function(namespace) {
	var DEFAULT_COLOUR = "#444";
	var BACKGROUND_COLOUR = "#EEE";
	var OFFSET_SPEED = 0.4;
	var MAX_TIME_TICK = 1000 / 60;
	var SCREEN_BUFFER = 50;
	var GROUND_BUFFER = 10;
	var SPACE_BAR_CODE = 32;
	var MIN_CACTUS_DISTANCE = 400;

	var spacePressed = false;
	function keydown(e) {
        if (e.keyCode === SPACE_BAR_CODE) {
			spacePressed = true;
        }
    }

    function keyup(e) {
        if (e.keyCode === SPACE_BAR_CODE) {
			spacePressed = false;
        }
    }

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);

	function Game(options) {
		this.canvas = options.el;
		this.context = this.canvas.getContext("2d");

		this.cacti = [];
		this.nextCactus = 0;
		this.offset = 0;
		this.lastTick = null;
		this.running = false;
		this.finished = false;

		this.initObjects();
		this.draw();
		requestAnimationFrame(this.step.bind(this));
	}

	Game.prototype.initObjects = function() {
		this.player = new Dinosaur({
			context: this.context, 
			left: 10, 
			bottom: this.canvas.height - GROUND_BUFFER,
			colour: DEFAULT_COLOUR
		});

		this.background = new Background({
			context: this.context, 
			width: this.canvas.width, 
			height: this.canvas.height,
			colour: DEFAULT_COLOUR
		});

		this.score = new ScoreBoard({
			context: this.context, 
			left: this.canvas.width - 10, 
			bottom: 26,
			colour: DEFAULT_COLOUR
		});
	};

	Game.prototype.updateCacti = function() {
		while (this.offset > this.nextCactus) {
			var count = Math.floor(rand(1, 3.9)),
				scale = rand(0.8, 1.5),
				x = this.canvas.width + this.offset + SCREEN_BUFFER;

			while (count--) {
				this.cacti.push(new Cactus({
					left: x + (count * 20 * scale), 
					bottom: this.canvas.height - GROUND_BUFFER,
					scale: scale, 
					leftSize: rand(0.5, 1.5), 
					rightSize: rand(0.5, 1.5), 
					centerSize: rand(0.5, 1.5),
					colour: DEFAULT_COLOUR
				}));
			}

			this.nextCactus = this.offset + rand(MIN_CACTUS_DISTANCE, this.canvas.width);
		}
	};

	Game.prototype.removeOldCacti = function() {
		var count = 0; // used to force cacti off the screen

		while (this.cacti.length > count && this.cacti[count].x < this.offset - SCREEN_BUFFER) { 
			count++; 
		}

		this.cacti.splice(0, count);
	};

	Game.prototype.draw = function() {
		this.clear();

		this.background.draw(this.context, this.offset);

		for (var i = 0; i < this.cacti.length; i++) {
			this.cacti[i].drawColliders(this.context, this.offset);
			this.cacti[i].draw(this.context, this.offset);
		}

		this.player.drawColliders(this.context, this.offset);
		this.player.draw(this.context, this.offset);
		this.score.draw(this.context, this.offset);
	};

	Game.prototype.checkCactusHit = function() {
		for (var i = 0; i < this.cacti.length; i++) {
			if (this.player.collidesWith(this.cacti[i], this.offset)) {
				this.running = false;
				this.finished = true;
				this.player.wideEyed = true;
				return;
			}
		}
	};

	Game.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	Game.prototype.step = function(timestamp) {
		if (this.running && this.lastTick) {
			this.offset += Math.min((timestamp - this.lastTick), MAX_TIME_TICK) * OFFSET_SPEED;

			this.removeOldCacti();
			this.updateCacti();

			if (!this.player.isJumping(this.offset) && spacePressed) {
				this.player.startJump(this.offset);
			}

			this.checkCactusHit();
			this.draw();
		} else if (spacePressed) {
			this.running = true;
		}

		if (!this.finished) {
			this.lastTick = timestamp;
			requestAnimationFrame(this.step.bind(this));
		}
	};

	namespace.Game = Game;
})(window);