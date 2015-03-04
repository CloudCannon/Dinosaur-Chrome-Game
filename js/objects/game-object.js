(function(namespace) {
	function collidesWith(first, second) {
		return first.x < second.x + second.width &&
		   first.x + first.width > second.x &&
		   first.y > second.y - second.height &&
		   first.y - first.height  < second.y;
	}

	function GameObject(options) {}

	GameObject.prototype.draw = function(context, offset) {
		throw new Error("Draw not yet implemented");
	};

	GameObject.prototype.colliders = function(offset) {
		throw new Error("Colliders not yet implemented");
	};

	GameObject.prototype.drawColliders = function(context, offset) {
		var colliders = [];

		context.fillStyle = "#fff";
		try { colliders = this.colliders(offset); } catch(e) {}
		for (var i = 0; i < colliders.length; i++) {
			context.fillRect(colliders[i].x - offset, colliders[i].y - colliders[i].height, colliders[i].width, colliders[i].height);
			
		}
	};

	GameObject.prototype.collidesWith = function(that, offset) {
		var firstList = this.colliders(offset),
			secondList = that.colliders(offset),
			i, j;

		for (i = 0; i < firstList.length; i++) {
			for (j = 0; j < secondList.length; j++) {
				if (collidesWith(firstList[i], secondList[j])) {
					return true;
				}
			}
		}

		return false;
	};

	namespace.GameObject = GameObject;
})(window);