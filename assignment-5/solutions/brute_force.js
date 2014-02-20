console.log(JSON.stringify((function(friends) {
	'use strict';

	friends.forEach(function(friend) {
		FriendMixin.call(friend);
	});

	var random = function() {
		return Math.round(Math.random() * (friends.length - 1));
	};

	function FriendMixin() {
		this.items = this.likes.reduce(function(acc, like) {
			if (!(like.name in acc)) {
				acc[like.name] = 0;
			}
			acc[like.name] += 1;
			return acc;
		}, {});

		this.getAlike = getAlike.bind(this);
		this.getName = getName.bind(this);
		return this;
	};

	function getAlike(atLeast, atMost) {
		var me = this,
			atLeast = atLeast || 1,
			atMost = atMost || Number.MAX_VALUE;
		if (this.common_map)
			return this.common_map.filter(function(friend) {
				return friend.common.length >= atLeast &&
					friend.common.length <= atMost &&
					friend.name !== me.getName();
			});

		var myItems = Object.keys(this.items);
		this.common_map = friends.map(function(friend) {
			return {
				name: friend.getName(),
				common: myItems.filter(function(item) {
					return item in friend.items;
				})
			};
		});
		return getAlike.call(this, atLeast, atMost);
	}

	function getName() {
		if (this.full_name)
			return this.full_name;

		this.full_name = this.first_name + ' ' + this.last_name;
		return this.full_name;
	}

	return friends.map(function(friend) {
		var new_friend = {
			first_name: friend.first_name,
			last_name: friend.last_name
		};
		var one_in_common = friend.getAlike(1, 1),
			two_in_common = friend.getAlike(2, 2),
			more_in_common = friend.getAlike(3);

		if (one_in_common.length)
			new_friend.one_in_common = one_in_common;
		if (two_in_common.length)
			new_friend.two_in_common = two_in_common;
		if (more_in_common.length)
			new_friend.more_in_common = more_in_common;

		return new_friend;
	});

})(
	JSON.parse(require('fs').readFileSync('./input.json', { encoding: 'utf-8' }))
), null, '\t'));