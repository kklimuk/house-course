var animals = (function() {
	'use strict';
	function Animal () {
		this.position = {
			x: 0,
			y: 0
		};
	}
	Animal.prototype.make_baby = function(other) {
		if (other instanceof this.constructor) {
			return new this.constructor();
		}
	};
	Animal.make_speech = function(word) {
		return function() {
			console.log(word);
		};
	};

	var change_position = function(x, y) {
		this.position.x = x;
		this.position.y = y;
		return this;
	};
	var apply_mixin = function() {
		return Array.prototype.reduce.call(arguments, function(self, mixin) {
			mixin.call(self);
			return self;
		}, this);
	};
	function WalkingAnimal() {
		this.walk = change_position;
	}
	function SwimmingAnimal() {
		this.swim = change_position;
	}
	function FlyingAnimal() {
		this.fly = change_position;
	}

	function Cat() {
		apply_mixin.call(this, this.constructor, WalkingAnimal);
		this.constructor = Cat;
	}
	Cat.prototype = Object.create(Animal.prototype);
	Cat.prototype.speak = Animal.make_speech('Meow');

	function Duck() {
		apply_mixin.call(this, this.constructor, WalkingAnimal, FlyingAnimal, SwimmingAnimal);
		this.constructor = Duck;
	}
	Duck.prototype = Object.create(Animal.prototype);
	Duck.prototype.speak = Animal.make_speech('Quack');

	function Crocodile() {
		apply_mixin.call(this, this.constructor, WalkingAnimal, SwimmingAnimal);
		this.constructor = Crocodile;
	}
	Crocodile.prototype = Object.create(Animal.prototype);
	Crocodile.prototype.speak = Animal.make_speech('Chomp');

	function Fox() {
		apply_mixin.call(this, this.constructor, WalkingAnimal);
		this.constructor = Fox;
	}
	Fox.prototype = Object.create(Animal.prototype);
	Fox.prototype.speak = Animal.make_speech('Squeeee');

	return {
		Animal: Animal,
		WalkingAnimal: WalkingAnimal,
		SwimmingAnimal: SwimmingAnimal,
		FlyingAnimal: FlyingAnimal,
		Cat: Cat,
		Duck: Duck,
		Crocodile: Crocodile,
		Fox: Fox
	};

})();