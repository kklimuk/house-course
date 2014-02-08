(function(getConnections) {
	'use strict';

	var button = document.querySelector('button'),
	code = document.querySelector('code');

	document.addEventListener("DOMContentLoaded", function(event) {
		var input = window.input,
		output = window.output;

		button.addEventListener('click', function onclick() {
			var new_output = getConnections(input),
			length = new_output.length;

			if (length !== output.length) {
				throw "Output error: number of friends in correct output does not match number in your output.";
			}

			code.innerText = JSON.stringify(new_output, null, '  ');

			for (var i = 0; i < length; i++) {
				if (new_output[i].first_name !== output[i].first_name ||
					new_output[i].last_name !== output[i].last_name) {
					throw "Output error: wrong friend. Supposed to be " + output[i].first_name + ' ' + output[i].last_name +
						" but got " + new_output[i].first_name + ' ' + new_output[i].last_name + '.';
				} else if (!output[i].one_in_common && new_output[i].one_in_common) {
					throw "Output error: no one in common expected for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].one_in_common && !new_output[i].one_in_common) {
					throw "Output error: expected some one in common for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].one_in_common && new_output[i].one_in_common.length !== output[i].one_in_common.length) {
					throw "Output error: expected " + JSON.stringify(output[i].one_in_common, null, '  ') +  " for one in common but got " +
						JSON.stringify(new_output[i].one_in_common, null, '  ') + " for friend " +
						output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (!output[i].two_in_common && new_output[i].two_in_common) {
					throw "Output error: no two in common expected for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].two_in_common && !new_output[i].two_in_common) {
					throw "Output error: expected some two in common for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].two_in_common && new_output[i].two_in_common.length !== output[i].two_in_common.length) {
					throw "Output error: expected " + JSON.stringify(output[i].two_in_common, null, '  ') +  " for two in common but got " +
						JSON.stringify(new_output[i].two_in_common, null, '  ') + " for friend " +
						output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (!output[i].more_in_common && new_output[i].more_in_common) {
					throw "Output error: no more than two in common expected for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].more_in_common && !new_output[i].more_in_common) {
					throw "Output error: expected some more than two in common for friend " + output[i].first_name + ' ' + output[i].last_name + '.';
				} else if (output[i].more_in_common &&  new_output[i].more_in_common.length !== output[i].more_in_common.length) {
					throw "Output error: expected " + JSON.stringify(output[i].more_in_common, null, '  ') +  " for more than two in common but got " +
						JSON.stringify(new_output[i].more_in_common, null, '  ') + " for friend " +
						output[i].first_name + ' ' + output[i].last_name + '.';
				}
			}

		}, false);
	});

})(window.getConnections);