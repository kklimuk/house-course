# Assignment 3
If you have any questions, come to Office Hours on Wednesday from 7-9pm at the Link *or* post on Lore and we'll answer them there.

## Part 2
Instead of building Bootstrap purely in CSS, the folks at Twitter use a language that compiles to CSS called LessCSS. In this part, you will learn how to modify the internals of Bootstrap to modify your portfolio. 

Here's how you can get the tools needed to finagle with Bootstrap:

- LessCSS:
	- Install [Node.js](http://nodejs.org/download/)
		- Use the right installer on the above page
	- Go into your command line interface
		- Terminal on Mac/Linux, Command Prompt on Windows
	- Run the following command:
		- `npm install -g less`
- LessCSS Syntax Highlighting:
	- Open Sublime
	- Use package installer to install the package `LESS`

Inside the assignment, you will find the source code of Bootstrap. In order to compile the code:

- Navigate to its location on your machine using your command line 
	- Use the `cd` command to navigate 
- Then, use the following command to compile the code: 
	- `lessc bootstrap.less > bootstrap.css`
- This will create a file called `bootstrap.css`, which you will use to replace your old Bootstrap file.

Your job is to create a new color scheme for Bootstrap and use it in your portfolio. Use `http://colorschemedesigner.com/` to pick out a suitable one.

### Required Readings
- [LessCSS Documentation](http://www.lesscss.org/#docs)
	+ Please read the following sections (under the "language" tab) carefully:
		* Variables
		* Mixins and Parametric Mixins
		* Importing and Nested Rules
		* Operations and Functions