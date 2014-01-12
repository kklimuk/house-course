(function (getDom, getTest) {
	'use strict';

	document.body.onload = function() {
		var iframe = document.createElement('iframe');
		iframe.width = '800px';
		iframe.height = '600px';
		document.body.appendChild(iframe);

		var idocument = iframe.contentWindow.document;
		var dom = getDom(4, idocument);
		idocument.removeChild(idocument.querySelector('html'));
		idocument.appendChild(dom.dom);

		var total = 18;
		var test = getTest(dom, total),
			score = 0,
			header = document.querySelector('h1'),
			input = document.querySelector('input'),
			button = document.querySelector('button');

		function getNextQuestion() {
			function addSelection (element) {
				element.classList.add('selected');
				element.style.backgroundColor = 'green';
			}

			function removeSelection(element) {
				element.classList.remove('selected');
				element.style.backgroundColor = 'white';
			}

			var question = test.shift();
			if (!question) {
				return question;
			}
			Array.prototype.slice.call(idocument.querySelectorAll('.selected')).forEach(function(el) {
				removeSelection(el);
			});

			header.innerHTML = question.question;
			input.value = '';
			if (question.single) {
				addSelection(question.el);
			} else {
				Array.prototype.slice.call(idocument.querySelectorAll(question.query)).forEach(function(el) {
					addSelection(el);
				});
			}

			return question;
		}

		var currentQuestion = getNextQuestion();

		function Query(queryString) {
			this.isDescendant = /^([^>]*?)\s+([^>]*?)$/.test(queryString);
			this.isChild = /^([^>]*?)\s?\>\s?([^>]*?)$/.test(queryString);

			this.components = queryString.split(/\s>\s|\s+/).map(function(component) {
				var tag = component.match(/^(.*?)($|#|\.|\[)/);
				var id = component.match(/#(.*?)($|\.|\[)/);
				var className = component.match(/\.(.*?)($|#|\[)/);
				var attribute = component.match(/\[(.*?)\]/);
				return {
					tag: tag ? tag[1] : null,
					id: id ? id[1] : null,
					className: className ? className[1] : null,
					attribute: attribute ? attribute[1].replace('"', '\'') : null
				};
			});
		}

		Query.prototype.checkDifferences = function(query) {
			var differences = '';

			if (this.isChild || this.isDescendant) {
				if (this.isChild !== query.isChild) {
					differences += (query.isChild ? 'is a child' : 'is not a child') + '\n';
				} else if (this.isDescendant !== query.isDescendant) {
					differences += (query.isChild ? 'is a descendant' : 'is not a descendant') + '\n';
				}
			}

			if (this.components.length !== query.components.length) {
				differences += 'does not have the right number of components \n';
			} else {
				var properties = ['tag', 'id', 'className', 'attribute'];
				for (var i = 0; i < this.components.length; i++) {
					var structure = this.components.length === 1 ? '' : 'in component ' + (i+1) + ', ';
					for (var j in properties) {
						if (this.components[i][properties[j]] !== query.components[i][properties[j]]) {
							differences += structure + 'does not have the right ' + properties[j] + '\n';
						}
					}
				}
			}

			return differences === '' ? false : differences;
		};

		button.addEventListener('click', function() {
			console.log(currentQuestion.query);

			var differences = new Query(currentQuestion.query).checkDifferences(new Query(input.value));
			if (!differences) {
				window.alert('it is correct!');
				score += 1;
			} else {
				window.alert('it is wrong because your query:\n' + differences);
			}

			currentQuestion = getNextQuestion();
			if (!currentQuestion) {
				button.disabled = true;

				var name = window.prompt('Please enter your name: ');
				var code = btoa(Date.now() + ' ' + name + ' ' + score + ' ' + total);

				window.alert('You\'re done! Please submit this code: \n' + code);
				console.warn('Your code is: ' + code);
			}
			return false;
		});
	};

})(window.getDom, window.getTest);