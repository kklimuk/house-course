(function() {
	'use strict';

	var helpers = {
		alphabet: 'abcdefghijklmnopqrstuvwxyz',

		isCoinTossHeads: function() {
			return Math.floor(Math.random() * 10) % 2 === 0;
		},

		random: function(start, end) {
			if (start === end) {
				return start;
			}
			return Math.round(Math.random() * Math.abs(start - end)) + start;
		},

		getChildNodes: function(el) {
			return Array.prototype.slice.call(el.childNodes).filter(function(node) {
				return node.nodeType !== 3;
			});
		},

		getRandomItem: function(el, depth) {
			if (depth === 0) {
				return el;
			}

			var children = helpers.getChildNodes(el);
			if (children.length === 0) {
				return el;
			}
			el = children[helpers.random(0, children.length - 1)];

			return helpers.getRandomItem(el, --depth);
		},

		makeName: function(length, string) {
			if (length === 0) {
				return string;
			}
			return helpers.makeName(--length, (string ? string : '') + helpers.alphabet[
				helpers.random(0, helpers.alphabet.length - 1)
			]);
		}
	};

	window.helpers = helpers;
})();