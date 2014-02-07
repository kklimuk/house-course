(function() {
	'use strict';

	window.formatData = function formatData(facebookData) {
		// Write your code here:
		var formattedData = new FormattedData();
		var mainData = facebookData["friends"]["data"];
		var people = 0;

		for (var i = 0; i < mainData.length; i++) {
			var person = mainData[i];

			var gender = person["gender"];
			formattedData.addGender(gender);

			var nameArray = person["name"].split(" ");
			var firstName = nameArray[0];
			formattedData.addFirstName(firstName);
			var lastName = nameArray[nameArray.length-1];
			var link = person["id"];

			if (people < 20) {
				formattedData.addGoodFriends(firstName, lastName, link);
				people++;
			}



			if (person.hasOwnProperty("likes")) {
				var likes = person["likes"]["data"];

				for (var j= 0; j< likes.length; j++) {
					var like = likes[j];
					var category = like["category"];
					var name = like["name"];
					formattedData.addLikes(category,name);
				}


			}



		}

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

		return formattedData;
	};

})();

function FormattedData() {
	this.gender = {
		male : 0,
		female : 0
	};
	this.interests = {};
	this.firstNames = [];
	this.goodFriends = [];

	this.addGender = function(gender) {
		if (gender === "male") this.gender.male+= 1;
		if (gender === "female") this.gender.female+=1;
	};

	this.addFirstName = function(firstName) {
		if (this.firstNames.indexOf(firstName) == -1) {
			this.firstNames.push(firstName);
		}
	}

	this.addLikes = function(likes) {
		this.interests.addInterest(likes);
	}
	this.addGoodFriends = function(firstName,lastName,link) {
		this.goodFriends.push(new GoodFriend(firstName,lastName,link));
	}

	this.addLikes = function(category, name) {
		if (!(category in this.interests)) {
			this.interests[category] = {};
		}
		var currentCategory = this.interests[category];
		if (!(name in currentCategory)) {
			currentCategory[name] = 1;
		} else {
			currentCategory[name] ++;
		}
	}
}







function GoodFriend(firstName, lastName, link) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.link = "http://facebook.com/" + link;
}