(function(helpers) {
	'use strict';

	function DomBuilder(document) {
		this.document = document || window.document;
		this.dom = this.document.createElement('html');
		this.head = this.document.createElement('head');
		this.head.innerHTML = '<style>h1, h2, p, pre, code, article, section, header, nav, div, span, a { display: block; font-size: 18px; width: 60%; min-height: 50px; margin: 15px auto; padding: 15px; background-color: white; border: 1px solid black; word-wrap: break-word; font-family: sans-serif; font-weight: normal;  }</style>';
		this.body = this.document.createElement('body');
		this.dom.appendChild(this.head);
		this.dom.appendChild(this.body);

		this.elems = ['h1', 'h2', 'p', 'pre', 'code', 'article', 'section', 'header', 'nav', 'div', 'span', 'a'];
		this.attrs = ['id', 'class', 'data-item', 'data-flipped'];
		this.names = ['lorem', 'lean', 'startup', 'ipsum', 'product', 'market', 'customer', 'development', 'acquihire', 'technical', 'cofounder', 'user', 'engagement', 'testing', 'shrink', 'market', 'venture', 'capital', 'pitch', 'deck', 'social', 'bookmarking', 'group', 'buying', 'crowded', 'market', 'pivot', 'onboarding', 'freemium', 'prototype', 'ping', 'pong', 'early', 'stage', 'disruptive', 'ecosystem', 'community', 'outreach', 'dynamic', 'location', 'based', 'strategic', 'investor'];
	}

	DomBuilder.prototype.populate = function (el, maxLevel) {
		if (maxLevel-- === 0) {
			return el;
		}

		var total = Math.ceil(Math.random() * 4) + 1;
		for (var i = 0; i < total; i++) {
			var child = this.populate(this.getRandomElement(), maxLevel);
			el.appendChild(child);
		}

		return el;
	};

	DomBuilder.prototype.setRandomAttribute = function(el) {
		var attr = this.attrs[Math.round(Math.random() * (this.attrs.length - 1))];
		if (attr === 'id') {
			el.setAttribute(attr, helpers.makeName(helpers.random(1, 6)));
		} else if (attr === 'data-flipped') {
			el.setAttributeNode(this.document.createAttribute('data-flipped'));
		} else {
			el.setAttribute(attr, this.names[Math.round(Math.random() * (this.names.length - 1))]);
		}
	};

	DomBuilder.prototype.getRandomElement = function() {
		var el = this.document.createElement(
			this.elems[
				Math.round(Math.random() * (this.elems.length - 1))
			]
		);

		if (helpers.random(0, 5)  % 5 > 0) {
			this.setRandomAttribute(el);
			if (helpers.isCoinTossHeads()) {
				this.setRandomAttribute(el);
			}
		}

		this.addTagsToElement(el);

		return el;
	};

	DomBuilder.prototype.addTagsToElement = function(el) {
		var text = el.tagName.toLowerCase();
		var attrs = ['id', 'class', 'data-item', 'data-flipped'];
		for (var i in attrs) {
			var value = '';
			if (attrs[i] === 'id') {
				value = el.id;
			} else if (attrs[i] === 'data-flipped' && el.hasAttribute(attrs[i])) {
				text += '; data-flipped exists';
				continue;
			} else if (el.hasAttribute(attrs[i])) {
				value = el.getAttribute(attrs[i]);
			}

			if (value) {
				text += '; ' + attrs[i] + ' is ' + value;
			}
		}

		var node = this.document.createTextNode(text);
		if (el.parentNode !== null) {
			el.removeChild(el.firstChild);
			el.insertBefore(node, el.firstChild);
		} else {
			el.appendChild(node);
		}
	};


	window.getDom = function(level, document) {
		var dom = new DomBuilder(document);
		dom.depth = level;
		dom.html = dom.dom;
		dom.populate(dom.dom.querySelector('body'), level);
		return dom;
	};
})(window.helpers);