(function() {
	'use strict';

	window.formatData = function formatData(facebookData) {
		// intermediate representation
		var friends = facebookData.friends.data.map(function(friend) {
			var name = friend.name.trim().split(' ');
			return {
				'id': friend.id,
				'firstName': name[0],
				'lastName': name[name.length - 1],
				'gender': friend.gender,
				'likes': friend.likes ? friend.likes.data.map(function(like) {
					return {
						'category': like.category,
						'name': like.name
					};
				}) : []
			};
		}).sort(function(a, b) {
			return a.firstName > b.firstName ? 1 : -1;
		});

		// functions to retrieve counts
		function getGenderCounts() {
			return friends.reduce(function(acc, current) {
				if (!(current.gender in acc)) {
					acc[current.gender] = 0;
				}
				acc[current.gender] += 1;
				return acc;
			}, {});
		}


		function getInterestCounts() {
			return friends.reduce(function(acc, friend) {
				friend.likes.forEach(function(like) {
					if (!(like.category in acc)) {
						acc[like.category] = {};
					}
					if (!(like.name in acc[like.category])) {
						acc[like.category][like.name] = 0;
					}
					acc[like.category][like.name] += 1;
				});
				return acc;
			}, {});
		}


		function getUniqueFirstNames() {
			return friends.filter(function(current, index, array) {
				if (index === 0) {
					return true;
				}
				return array[index - 1].firstName !== current.firstName;
			}).map(function(friend) {
				return friend.firstName;
			});
		}


		function getGoodFriends () {
			var goodFriends = {
				'first': ['Ben', 'Arun', 'Jason', 'Ginny', 'Ian', 'Jonathan', 'Josh', 'Ashley', 'Harris', 'James'],
				'last': ['Schwab', 'Karottu', 'Oettinger', 'Isava', 'Durie', 'Tran', 'Miller', 'Qian', 'Osserman', 'Hong']
			};

			return friends.filter(function(friend) {
				var index = goodFriends.first.indexOf(friend.firstName);
				if (index === goodFriends.last.indexOf(friend.lastName) && index !== -1) {
					return true;
				}
				return false;
			}).map(function(friend) {
				return {
					'firstName': friend.firstName,
					'lastName': friend.lastName,
					'link': 'http://facebook.com/' + friend.id
				};
			});
		}

		// return value
		return {
			gender: getGenderCounts(),
			interests: getInterestCounts(),
			firstNames: getUniqueFirstNames(),
			goodFriends: getGoodFriends()
		};
	};

})();