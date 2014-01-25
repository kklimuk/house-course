# Assignment 3
If you have any questions, come to Office Hours on Wednesday from 7-9pm at the Link *or* post on Lore and we'll answer them there.

## Part 0
We highly recommend that if you did not finish the CSS challenge from last class to do so. An image of the challenge website and the solution css so that you can check your work (remember there is no single correct way to achieve pixel-perfect styling) are included on lore.

## Part 1
Use bootstrap to style an alternative version of your portfolio.

Go to [the bootstrap website](http://getbootstrap.com/getting-started/) and download the precompiled bootstrap package. Follow the directions after the download to get up and running. Include `<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>` at top of your head (not header!) element. We will touch on jQuery later in the class. 

Bootstrap requires a lot of divs to be inserted in your html. We recommend keeping a copy of your html before this assignment. The semantic version of your website contains all the information in the most condensed form possible and provides an excellent starting point for styling, whether you want to use vanilla css, bootstrap, or another framework like foundation.

For part 1 make sure to: 

- Use the grid system
- Use the bootstrap navbar
- Use responsive images
- Experiment with carousel and breadcrumbs or any other componenents of interest

### Resources
- [Bootstrap documentation and tutorials](http://getbootstrap.com/getting-started/) Click on the examples an inspect with CDT.
- Go to [Duke's lynda connection](http://oit.duke.edu/comp-print/training/online/lynda.php) and search for Bootstrap 3. 
    - The videos on grid layout are the most useful


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