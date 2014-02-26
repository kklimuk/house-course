var animals = (function() {
	'use strict';
	function Animal () {
		this.position = {
			x: 0,
			y: 0
		};
	}
	Animal.change_position = function(x, y) {
		this.position.x = x;
		this.position.y = y;
		return this;
	};
	Animal.make_speech = function(word) {
		return function() {
			console.log(word);
		};
	};
	Animal.prototype.make_baby = function(other) {
		if (other instanceof this.constructor) {
			return new this.constructor();
		}
	};


	function WalkingAnimal () {
		this.constructor.call(this);
		this.constructor = WalkingAnimal;
	}
	WalkingAnimal.prototype = Object.create(Animal.prototype);
	WalkingAnimal.prototype.walk = Animal.change_position;

	function SwimmingAnimal () {
		this.constructor.call(this);
		this.constructor = SwimmingAnimal;
	}
	SwimmingAnimal.prototype = Object.create(Animal.prototype);
	SwimmingAnimal.prototype.swim = Animal.change_position;

	function FlyingAnimal () {
		this.constructor.call(this);
		this.constructor = FlyingAnimal;
	}
	FlyingAnimal.prototype = Object.create(Animal.prototype);
	FlyingAnimal.prototype.fly = Animal.change_position;

	function Cat() {
		this.constructor.call(this);
		this.constructor = Cat;
	}
	Cat.prototype = Object.create(WalkingAnimal.prototype);
	Cat.prototype.speak = Animal.make_speech('Meow');

	function Duck() {
		this.constructor.call(this);
		this.constructor = Duck;
	}
	Duck.prototype = Object.create(FlyingAnimal.prototype);
	Duck.prototype.speak = Animal.make_speech('Quack');

	function Crocodile() {
		this.constructor.call(this);
		this.constructor = Crocodile;
	}
	Crocodile.prototype = Object.create(SwimmingAnimal.prototype);
	Crocodile.prototype.speak = Animal.make_speech('Chomp');

	function Fox() {
		this.constructor.call(this);
		this.constructor = Fox;
	}
	Fox.prototype = Object.create(WalkingAnimal.prototype);
	Fox.prototype.speak = Animal.make_speech('Squee');

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