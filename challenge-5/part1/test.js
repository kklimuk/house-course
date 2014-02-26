(function(animals) {
	'use strict';

	var fox1 = new animals.Fox(),
		fox2 = new animals.Fox(),
		baby = fox1.make_baby(fox2);

	console.log(baby.walk(10, 15).position);
	baby.speak();

})(window.animals);