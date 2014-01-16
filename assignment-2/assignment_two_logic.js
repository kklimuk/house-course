$(document).ready();

var iframe = $('#iframe');
var catbasehtml = '<div id="newspaper-base"> <h1>Kitten in need of home.</h1> <div id="ad-body"><p> May bite.</p> <image id="ad-image" src ="cat1.jpg"/> <p id="cat-description">Meet Kiral the kitten. He is quite furry and very Russian. He likes to eat ribs and chicken nuggets. He is need of a good home. If you anyone who can help him out please contact 1-800-Kity-Kat</p> <div id="hidden-div"></div> </div> </div>';
document.body.onload = function() {
  refreshHTML();
};


var refreshHTML = function(){
  window.idocument = iframe[0].contentDocument;
  idocument.body.innerHTML = catbasehtml;
  window.idocument = $(window.idocument);
};



var CSS = function(csstring){
   var pieces = csstring.split(":");
   this.valid = true;
   if(pieces.length<2){
      alert("We couldn''t parse your css statement. Are you sure you are using the form 'property:value'?;");
      this.valid = false;
   }
   var attr = pieces[0];
   var value = pieces[1];
   value = value.replace(";","");
   this.attr = attr;
   this.value = value;

};

var handleInput = function(){
   $('#submit_css').click( function(){
        var selector =  $('#selector_input').val();
        var css =   $('#css_input').val();
        console.log(selector);
        console.log(css);
        var cssObj = new CSS(css);
        injectCSS(selector, cssObj);
        verifyQuestion(questions[currentQuestion]);

   });
   $('#giveup').click(function(){
      showAnswer();
      advanceQuestion(true);
   });
};

var getElementFromIframe = function(selector){
  var idocument = $(iframe[0].contentDocument);
  var elem = idocument.find(selector);
  return elem;
};

var injectCSS = function(selector, css){
   elem = getElementFromIframe(selector);
   if(elem.length <=0)
   {
      alert("You didn't match any elements. Are you sure you typed your selector correctly?");
   }
   else if(css.valid){
    console.log(css.attr);
    console.log(css.value);
      elem.css(css.attr, css.value);
   }

};


handleInput();
var questionOne =  createQuestion("Change all paragraph text gray.", catbasehtml, function(){return getElementFromIframe('p').css("color")==="rgb(128, 128, 128)";});
var questionTwo =  createQuestion("Change h1 font to courier.", catbasehtml, function(){return (getElementFromIframe('h1').css("font-family")==="courier"||getElementFromIframe('h1').css("font-family")==="Courier");});
var questionThree =  createQuestion("In one line add a 3px solid black border to #ad-image", catbasehtml, function(){return (getElementFromIframe('#ad-image').css("border")==="3px solid rgb(0, 0, 0)"||getElementFromIframe('#ad-image').css("border")==="3px rgb(0, 0, 0) solid"||getElementFromIframe('#ad-image').css("border")==="solid 3px rgb(0, 0, 0)"||getElementFromIframe('#ad-image').css("border")==="solid rgb(0, 0, 0) 3px"||getElementFromIframe('#ad-image').css("border")==="rgb(0, 0, 0) 3px solid"||getElementFromIframe('#ad-image').css("border")==="rgb(0, 0, 0) solid 3px");});
var questionFour =  createQuestion("Change the width property of #ad-image to 100px.", catbasehtml, function(){return getElementFromIframe('#ad-image').css("width")==="100px";});
var questionFive =  createQuestion("Make #ad-image float left", catbasehtml, function(){ return getElementFromIframe('#ad-image').css("float")==="left";} );
var questionSix =  createQuestion("In one line make #ad-image have a top margin of 5px and a right margin of 10px", catbasehtml, function(){ return getElementFromIframe('#ad-image').css("margin")==="5px 10px 0px 0px";} );
var questionSeven = createQuestion("Make #hidden-div have a black for its background color.",catbasehtml, function(){ return getElementFromIframe('#hidden-div').css("background-color")==="rgb(0, 0, 0)";} );
var questionEight = createQuestion("Uh-oh! We still cant see #hidden-div. That is because a div is a block level element and its height is determined by its content. But lets force it to have a height of 50px.'",catbasehtml, function(){ return getElementFromIframe('#hidden-div').css("height")==="50px";} );
var questionNine = createQuestion("I wonder what will happen if we make hidden-div a inline element... try it!",catbasehtml, function(){ return getElementFromIframe('#hidden-div').css("display")==="inline";} );
var questionTen = createQuestion("Oh man.. it disappeared again. That is because inline elements determine their width based on their content, whereas block elements take up their entire parents width. We don't want any content in #hidden-div, but I would like to keep it inline. How can I make #hidden-div display it's content in block form, but treat itself as an inline element?",catbasehtml, function(){ return getElementFromIframe('#hidden-div').css("display")==="inline-block";} );
var questionTenTen = createQuestion("Great. But I still don't see it. Let's give it a width of 50px.",catbasehtml, function(){ return getElementFromIframe('#hidden-div').css("width")==="50px";} );
var questionEleven = createQuestion("Make #ad-body have a padding top and bottom of 5px",catbasehtml, function(){ return (getElementFromIframe('#ad-body').css("padding")==="5px 0px 5px 0px"||getElementFromIframe('#ad-body').css("padding")==="5px 0px");});
var questionTwelve = createQuestion("No one likes to be bitten. Make the paragraph ''May bite' size 8 font. Hint: to do this properly you must use a non-trival selector'",catbasehtml, function(){ return getElementFromIframe('p:nth-child(1)').css("font-size")==="8px";} );
var questionThirteen = createQuestion("Center the title (h1)",catbasehtml, function(){ return getElementFromIframe('h1').css("text-align")==="center";} );
var questionFourteen = createQuestion("Our ad writer was a bit short on words. Let's make the add look bigger by setting a max-width of 250px on the outermost div (#newspaper-base).",catbasehtml, function(){ return getElementFromIframe('#newspaper-base').css("max-width")==="250px";} );
var questionFifteen = createQuestion("Center #newspaper-base (remember #newspaper-base is a block div)",catbasehtml, function(){ return (getElementFromIframe('#newspaper-base').css("margin")==="auto"||getElementFromIframe('#newspaper-base').css("margin")==="0px auto"||getElementFromIframe('#newspaper-base').css("margin")==="0px 265px"||getElementFromIframe('#newspaper-base').css("margin")==="0px");} );

var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen, questionTenTen, questionEleven, questionTwelve, questionThirteen, questionFourteen, questionFifteen];
var currentQuestion = 0;

function createQuestion(text, basehtml, evaluate){
  return {
    question: text,
    basehtml: basehtml,
    evaluate: evaluate
  };
}

loadQuestion(questionOne, currentQuestion);
//console.log("Okay?");

function loadQuestion(question, questionNumber){
  $('#question_title').text("Question: "+(currentQuestion+1));
  $('#question_text').text(question.question);
  //console.log("I set the text to: " + question.question);
}
function verifyQuestion(question){
    var valid = question.evaluate();
    console.log(valid);
    if(valid){
      advanceQuestion();
    }
    else{
      alert("Incorrect. It doesn't seem like you applied the proper css.");
    }
}

function showAnswer(){
  alert(answers[currentQuestion]);
}

function advanceQuestion(incorrect){
  if(currentQuestion<questions.length-1){
    //console.log("advancing quesiton");
    currentQuestion++;
    loadQuestion(questions[currentQuestion]);
    $('.list-group-item:nth-child('+(currentQuestion+1)+')').addClass('active');
    $('.list-group-item:nth-child('+(currentQuestion)+')').removeClass('active');
    if(incorrect){
       $('.list-group-item:nth-child('+(currentQuestion)+')').addClass('incorrect');
       incorrect++;
    }
    else{
      correct++;
      $('.list-group-item:nth-child('+(currentQuestion)+')').addClass('correct');
    }
  }
  else{
    var scoreCode = createScoreCode();
     $('.code').text("Code: "+scoreCode);
      $('#question_text').text("Great work! It is still pretty ugly, but hopefully you learned some basic css! Submit the score code:" + scoreCode + "\n on lore. Feel free to try the quiz again if you skipped any questions.");
  }
}

var createScoreCode = function(){
    var english = $('#name').val()+" time: "+ (new Date()).getTime() + " score: " +correct;
    console.log(english);
    var encode = btoa(english);
    return  encode;
};

var answers = ["Selector: p || CSS: color:gray;", "Selector: h1 || CSS: font-family: courier;","Selector: #ad-image ||CSS: border: solid black 3px;","Selector: #ad-image ||CSS: width: 100px;","Selector: #ad-image ||CSS: float: left;","Selector: #ad-image ||CSS: margin: 5px 10px 0 0;","Selector: #hidden-div ||CSS: background-color: black;","Selector: #hidden-div || CSS: height: 50px;","Selector: #hidden-div ||CSS: display: inline;","Selector: #hidden-div ||CSS: display: inline-block;","Selector: #hidden-div ||CSS: width: 50px;","Selector: #ad-body || CSS: padding: 5px 0;","Selector: p:nth-child(1) ||CSS: font-size: 8px;","Selector: h1 ||CSS: text-align: center;","Selector: #newspaper-base || CSS: max-width 250px;","Selector: #newspaper-base ||CSS: margin: 0 auto;","Selector: p ||CSS: color:gray;","Selector: p ||CSS: color:gray;"];
var correct = 0;

