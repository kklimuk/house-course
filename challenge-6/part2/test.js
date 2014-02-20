(function(animals) {
	'use strict';

	var duck1 = new animals.Duck(),
		duck2 = new animals.Duck(),
		baby = duck1.make_baby(duck2);

	console.log(baby.walk(10, 15).position);
	console.log(baby.fly(25, 30).position);
	console.log(baby.fly(45, 30).position);
	baby.speak();

})(window.animals);