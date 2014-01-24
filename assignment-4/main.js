(function() {
	'use strict';

	window.formatData = function formatData(facebookData) {
		// Write your code here:

		// The output of `formatData` should be an object that looks something like this:
		// {
		// 	'gender': {
		// 		'male': 200, // number of male friends
		// 		'female': 200 // number of female friends
		// 	},
		// 	'interests': { // use people's likes
		// 		'category_name': { // name of the category
		// 			'item_name': 200 // name of the like: count of the like
		// 		}
		// 	},
		// 	'firstNames': [], // this should be a "set" of first names (only uniques),
		// 	'goodFriends': [ // this should be an array of at least 10 of your good friends
		// 		{
		// 			'firstName': 'Ben',
		// 			'lastName': 'Schwab',
		// 			'link': 'http://facebook.com/100000321098016' // use ids to create links
		// 		}
		// 	]
		// }

		return facebookData;
	};

})();