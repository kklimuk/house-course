var word = (function() {

	var charset = 'abcdefghijklmnopqrstuvwxyz01234567890'.split(''),
		word = [];

	for (var i = 0; i < 255; i++) {
		var letter = charset[Math.round(Math.random() * 36)];
		if (letter !== 'a' && letter !== 'b') {
			word.push(letter);
		}
	}

	return word.join('');

})();