(function(helpers, getDom) {
	'use strict';

	function complicateElement(el) {
		var result = {
			question: '',
			query: ''
		};

		if (el.getAttribute('class') && helpers.isCoinTossHeads()) {
			result.question += ' with the class <code>' + el.getAttribute('class') + '</code>';
			result.query += '.' + el.getAttribute('class');
		}
		if (el.getAttribute('id') && helpers.isCoinTossHeads()) {
			result.question += ' with the id <code>' + el.getAttribute('id') + '</code>';
			result.query += '#' + el.getAttribute('id');
		}
		if (el.getAttribute('data-item') && helpers.isCoinTossHeads()) {
			result.question += ' with the attribute <code>data-item</code> (which has the value <code>' +
				el.getAttribute('data-item') + '</code>)';
			result.query += '[data-item="' + el.getAttribute('data-item') + '"]';
		}
		if (el.hasAttribute('data-flipped') && helpers.isCoinTossHeads()) {
			result.question += ' that has the attribute <code>data-flipped</code>';
			result.query += '[data-flipped]';
		}

		if (result.query === '' || helpers.random(0, 5) % 5 > 1) {
			result.question = ' with the tag name <code>' + el.tagName.toLowerCase() + '</code>' + result.question;
			result.query = el.tagName.toLowerCase() + result.query;
		}

		return result;
	}

	function QuestionList(dom) {
		this.length = 0;
		this.dom = dom;
	}

	QuestionList.prototype.hasQuestion = function(question) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (this[i].query === question.query) {
				return true;
			}
		}
		return false;
	};

	QuestionList.prototype.getUniqueQuestion = function(questionGenerator) {
		var question = questionGenerator.call(this);
		while (this.hasQuestion(question)) {
			question = questionGenerator.call(this);
		}
		return question;
	};

	QuestionList.prototype.shuffle = function() {
		var o = this;
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	QuestionList.prototype.append = function(question) {
		Array.prototype.push.call(this, question);
		return this;
	};

	QuestionList.prototype.extend = function(questionSet) {
		for (var i = 0; i < questionSet.length; i++) {
			this.append(questionSet[i]);
		}
		return this;
	};

	QuestionList.prototype.toArray = function() {
		var array = [];
		for (var i = 0; i < this.length; i++) {
			array.push(this[i]);
		}
		return array;
	};

	var questionGenerators = {

		idSearch: function() {
			var nodes = Array.prototype.slice.call(this.dom.body.querySelectorAll('[id]'));
			var el = nodes[helpers.random(0, nodes.length - 1)];

			return {
				'el': el,
				'query': '#' + el.getAttribute('id'),
				'single': true,
				'question': 'Please find the element with the id <code>' + el.getAttribute('id') + '</code>.'
			};
		},

		classSearch: function() {
			var nodes = Array.prototype.slice.call(this.dom.body.querySelectorAll('[class]'));
			var el = nodes[helpers.random(0, nodes.length - 1)];

			return {
				'el': el,
				'query': '.' + el.getAttribute('class'),
				'single': false,
				'question': 'Please find the element with the class <code>' + el.getAttribute('class') + '</code>.'
			};
		},

		attribute: function() {
			var nodes = Array.prototype.slice.call(this.dom.body.querySelectorAll('[data-item]'));
			Array.prototype.slice.call(this.dom.body.querySelectorAll('[data-flipped]'))
			.forEach(function(node) {
				nodes.push(node);
			});
			var el = nodes[helpers.random(0, nodes.length - 1)];

			return {
				'el': el,
				'query': el.hasAttribute('data-flipped') ? '[data-flipped]' : '[data-item="' + el.getAttribute('data-item') + '"]',
				'question': el.hasAttribute('data-flipped') ? 'Please find the element that has the attribute <code>data-flipped</code>' :
					'Please find the element with the attribute <code>data-item</code> that has the value <code>' +
					el.getAttribute('data-item') + '</code>.'
			};
		},

		random: function() {
			var el = helpers.getRandomItem(this.dom.body, helpers.random(1, this.dom.depth));
			var result = complicateElement(el);

			return {
				'el': el,
				'query': result.query,
				'question': 'Please find the element' + result.question + '.'
			};
		},

		parent: function() {
			var el = helpers.getRandomItem(this.dom.body, helpers.random(1, this.dom.depth));
			var parent = complicateElement(el.parentNode);
			var child = complicateElement(el);

			return {
				'el': el,
				'query': parent.query + ' > ' + child.query,
				'question': 'Please find the child of the element' + parent.question +
					' that is the element' + child.question
			};
		},

		ancestor: function() {
			var getAncestor = function(el, depth) {
				if (depth === 0 || !el.parentNode || Object.prototype.toString.call(el.parentNode) === '[object HTMLDocument]') {
					return el;
				}
				return getAncestor(el.parentNode, --depth);
			};

			var el = helpers.getRandomItem(this.dom.body, helpers.random(1, this.dom.depth));
			var ancestor = complicateElement(getAncestor(el, helpers.random(1, 4)));
			var child = complicateElement(el);

			return {
				'el': el,
				'query': ancestor.query + ' ' + child.query,
				'question': 'Please find the descendant of the element' + ancestor.question +
					' that is the element' + child.question
			};
		}

	};

	window.getTest = function(newDom, questionCount) {
		var test = new QuestionList(newDom);

		var fraction = Math.ceil(questionCount / 18);
		var easyTest = new QuestionList(newDom);
		for (var i = 0; i < fraction * 2; i++) {
			easyTest.append(easyTest.getUniqueQuestion(questionGenerators.idSearch))
				.append(easyTest.getUniqueQuestion(questionGenerators.classSearch))
				.append(easyTest.getUniqueQuestion(questionGenerators.attribute));
		}

		var hardTest = new QuestionList(newDom);
		for (var j = 0; j < fraction * 4; j++) {
			hardTest.append(hardTest.getUniqueQuestion(questionGenerators.random))
				.append(hardTest.getUniqueQuestion(questionGenerators.parent))
				.append(hardTest.getUniqueQuestion(questionGenerators.ancestor));
		}

		test.extend(easyTest.shuffle()).extend(hardTest.shuffle());

		return test.toArray();
	};
})(window.helpers, window.getDom);