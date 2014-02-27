(function() {
	document.querySelector('.foo').addEventListener('click', function(event) {
		if (event.target.webkitMatchesSelector('#bar')) {
			console.log('yay!');
		} else {
			console.error('wrong mutant!');
		}
	});
})()