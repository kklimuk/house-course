(function() {
	'use strict';

	var data = {
		students: document.querySelectorAll('td.student'),
		states: document.querySelectorAll('td.state > .text'),
	};

	var statuses = Array.prototype.map.call(data.students, function(student, i) {
		return {
			name: student.innerText,
			submission: data.states[i].innerText.toLowerCase()
		};
	});

	var a = document.createElement('a');
	a.href = window.URL.createObjectURL(new window.Blob([ JSON.stringify(statuses, null, '  ') ], {
		type: 'application/json'
	}));
	a.download = window.prompt('Assignment Name:') + '.json';
	a.click();

})();