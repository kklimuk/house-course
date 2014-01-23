# Assignment 3
If you have any questions, come to Office Hours on Wednesday from 7-9pm at the Link *or* post on Lore and we'll answer them there.

## Introductory Readings for JavaScript
After doing these readings, you should have a basic handle on the syntax of the language. The syntax is very C(and Java) like, so should be pretty quick to pick up.

- *Secrets of the JavaScript Ninja*, Chapter 3 Introduction and Section 3.1 (pg. 31-40)
- [Working with values, variables, literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Values,_variables,_and_literals)
- [Operators in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comma_operator)
- [Control Flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Statements)
- [Evaluating Sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Sameness)
- [Truthy and Falsy Values](http://www.sitepoint.com/javascript-truthy-falsy/)
- [Predefined Core Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Predefined_Core_Objects)

## Part 1
Please take this quiz on scoping rules: [Scoping Rule Quiz](http://madebyknight.com/javascript-scope/).

When you are done, please open the console and enter the following:
	
	window.alert('Your code: \n' + (function(){return btoa(Date.now()+" "+(+window.localStorage.getItem("yxr0zw1wdhm")+1)+" "+ +document.getElementById("correct").innerText+" "+window.prompt(atob("UGxlYXNlIGVudGVyIHlvdXIgbmV0aWQ6IA==")))})());

**Please only submit if you got everything right.** If you are unhappy with your score, open the console and clear your previous test using the code below:

	(function(){window.localStorage.setItem("yxr0zw1wdhm",+window.localStorage.getItem("yxr0zw1wdhm")+1);document.cookie="quiz_status=; expires="+(new Date(Date.now()-1)).toGMTString()+";";window.location.reload()})()

This will provide you with a code. Save it as `code.txt`.

### Required Readings
- *Secrets of the JavaScript Ninja*, Section 3.2 (pg. 40-46)

## Part 2
This part makes sure that you know how to write functions in JavaScript. To finish it:

- Go to `[codeacademy.com](http://www.codecademy.com/)`. 
- Go to the JavaScript section. 
- Complete the section called "Introduction to Functions in JS."
- Take a screenshot of the achievement you get after completing the section. 

Save the screenshot as `achievement.jpg`.

### Required Readings
- *Secrets of the JavaScript Ninja*, Section 3.3-3.4 (pg. 46-60)

## Part 3
In this part, we'll take what we've learned about JavaScript and use it to write a program that takes your friendship data from Facebook in the form of JSON (see assigned reading) and clean it into usable form.

Here's how we'll get the data into our assignment:

- Go to [Graph Explorer](https://developers.facebook.com/tools/explorer)
- Get a new Access Token:
	- "Get Access Token". 
	- Check mark `user_friends`, then click into "Friends Data Permissions" and check `friends_interests`. 
	- Click "Get Access Token" and accept the permissions dialog.
- Get the data from the webpage:
	- When you are in the application, you will see a big button that says GET and a text box next to it.
	- Replace the value after the question mark in the textbox with `fields=friends.fields(name,gender,likes.limit(5))`.
	- Press "Submit."
	- Open the console.
	- Copy the following code into the console:
		- `copy(JSON.stringify(JSON.parse(document.getElementById('response_body').innerText.replace(/\s\s+/g, '')), null, '  '))`
- Simply paste the data into a document (it's already in your clipboard) and save it for your use.
- Once you have the data, boot up `index.html` and put the data into the textbox.

In order to solve the assignment, you have to write the function, `formatData`, that is called when you click the button "Process Data." To do this:

- Open `main.js`.
- Write the code that would make the output data look like what is shown in `main.js`.
- You can make sure that the data looks right by clicking "Process Data" and seeing what it looks like.

When you are done, save `main.js`.

### Required Readings
- [What is JSON?](http://www.json.org/)

## Submission
Zip `code.txt`, `achievement.jpg`, and `main.js`. Submit them to Lore as `[netid]-assignment-3.zip`.

