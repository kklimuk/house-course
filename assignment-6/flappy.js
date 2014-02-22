
(function(){

  //-------------Canvas and Scene Variables-----------------//

  //---------PART ONE (fill in these variables with the DOM)-------------:
  var canvas;
  var ctx;
  var screen_height; //from the canvas
  var screen_width;  //from the canvas


  //-------------Image Bank---------------------------------//
  var imageBank = (function prepareImages(){
    var images = ["background.png", "ground.png",
    "bird_one.png", "bird_two.png", "bird_three.png","bird_dead.png",
    "pipe_up.png", "pipe_down.png", "scoreboard.png", "bird_down.png",
    "play.png", "kirill_one.png","kirill_two.png","kirill_three.png","kirill_dead.png"];
    var imageBank = {};
    var doneCount= 0;

    images.forEach(function(im){
     var image = new Image();
     image.onload = function(){
      doneCount ++;
    };
    image.src = "assets/images/"+im;
    imageBank[im.split(".")[0]] = image;
  });
    return imageBank;
  })();


  //------------------------Object Definitions---------------------------------//


   function Camera(){
    apply_mixin.call(this, Scrollable);
    this.x = 0;
    this.y = 0;
    this.width = screen_width;
    this.height = screen_height;
    this.translatePoint = function(x,y){
     return ({"x": x - this.x,"y": y - this.y});
   };
   this.translatePointInverse = function(x,y){
     return ({"x": x + this.x,"y": y + this.y});
   };
 }

 var apply_mixin = function() {
  return Array.prototype.reduce.call(arguments, function(self, mixin) {
   mixin.call(self);
   return self;
 }, this);
};


SpriteSheet = function(images, durations){
  this.images = images;
  this.durations = durations;
  this.durationMap = durations.reduce(
   function(prev, current, index, array){
     if(index>=1){
      prev.push(prev[index-1]+current);
    }
    else{
      prev.push(current);
    }
    return prev;

  }, []
  );
  this.totalDuration = this.durationMap[this.durationMap.length-1];
  this.frame = 0;
  this.getNextSpriteImage = function(){
   this.frame = (this.frame+1)%this.totalDuration;
   var index = 0;
   while(this.frame>this.durationMap[index]){
    index++;
  }
  return this.images[index];
};
};

Entity = function() {
  this.x  = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.stationary = false;
  this.color = "#000000";
  this.spriteSheet = null;
  this.zIndex = 0;
  this.skew = 0;
  this.dirty = false;
  this.getBoundingBox = function(){
   var refX =this.x;
   var refY=this.y;
   if(this.stationary){
    var refPoint = camera.translatePointInverse(this.x, this.y);
    refX = refPoint.x;
    refY = refPoint.y;
  }
  return new Rectangle(new Point(refX,refY), new Point(refX+this.width, refY+this.height));
  };
  this.update  = function(){
   this.updateFunctions.forEach(function(updateFunction){
    updateFunction();
  });
  };
  this.getCameraPoint = function(){
    return camera.translatePoint(this.x, this.y);
  };
  this.containsPoint = function(point){
    return this.getBoundingBox().containsPoint(point);
  };

  this.draw = function(ctx, camera){
    var drawX = this.x;
    var drawY = this.y;
    if(!this.stationary){
     var point = this.getCameraPoint();
     drawX = point.x;
     drawY = point.y;
   }
   ctx.save();
   if(this.skew){
    var center = new Point(drawX+this.width/2, drawY+this.height/2);
    ctx.translate(center.x,center.y);
    ctx.rotate(this.skew*Math.PI/180);
    ctx.translate(-center.x,-center.y);
  }

  if(this.getSpriteSheet()===null){
    ctx.fillStyle = this.color;
    ctx.fillRect(drawX, drawY, this.width, this.height);
  }
  else{
   var image = this.getSpriteSheet().getNextSpriteImage();
   ctx.drawImage(image, drawX,drawY,this.width,this.height);
  }
  ctx.restore();
  };
  this.setSpriteSheet = function(spriteSheet){
   this.spriteSheet = spriteSheet;
  };
  this.getSpriteSheet = function(){
   return this.spriteSheet;
  };
  return this;
  };
  function Jumper(){
   this.jump = function(){
    if(this.alive){
     activeForces.push(new JumpForce(this));
   }
  };
  return this;
}
function CollidableEntity(){
 this.onCollision = null;
 this.checkCollision = function(entityOther, lOnCollision, lOnCollisionArgs)
 {
  if(this.getBoundingBox().intersect(entityOther.getBoundingBox())){
    if(lOnCollision!==undefined){
     lOnCollisionArg.apply(this, lOnCollisionArgs);
   }
   else if(this.onCollision!==null){
     this.onCollision.apply(this, this.collisionArguments);
   }
   return true;
 }
 return false;
};
return this;
}

function FlappyBird(){
 apply_mixin.call(this, Entity, Jumper);
 this.color = 'gray';
 this.height = 40;
 this.width = 40;
 this.x= 230;
 this.y= 200;
 this.zIndex = 2;
 this.alive = true;
 if(flappyKirill){
  this.aliveSpriteSheet =  new SpriteSheet([imageBank.kirill_one, imageBank.kirill_two, imageBank.kirill_three], [10,10,10]);
  this.deadSpriteSheet = new SpriteSheet([imageBank.kirill_dead],[25]);
}
else{
  this.aliveSpriteSheet =  new SpriteSheet([imageBank.bird_one, imageBank.bird_two, imageBank.bird_three], [10,10,10]);
  this.deadSpriteSheet = new SpriteSheet([imageBank.bird_dead, imageBank.bird_down],[25, 999999999999]);
}
this.getSpriteSheet = function(){
  if(this.alive){
   return this.aliveSpriteSheet;
 }
 else{
   return this.deadSpriteSheet;
 }
};
return this;
}

function Pipe(isBottomPipe) {

  //PART THREE: add Collidable Entity to pipe

 apply_mixin.call(this, Entity);
 this.zIndex = 1;
 this.color = 'black';
 this.height = 50;
 this.width = 100;
 this.x = 500;
 this.y = 100;
 this.bottom = 100;
 this.isBottomPipe = isBottomPipe ? isBottomPipe : false;
 this.bottomSpriteSheet = new SpriteSheet([imageBank.pipe_up],[10]);
 this.topSpriteSheet = new SpriteSheet([imageBank.pipe_down],[10]);
 this.getSpriteSheet =  function(){
  if(this.isBottomPipe){
   return this.bottomSpriteSheet;
 }
 else{
   return this.topSpriteSheet;
 }
};
this.completed = false;

return this;
}

function Ground(){
 apply_mixin.call(this, Entity, CollidableEntity);
 this.onCollision = function(){
  flappyBird.alive=false;
  momentum.dirty = true;
  gravityForce.dirty=true;
};

this.color = "green";
this.width = screen_width;
this.height = 100;
this.x = 0;
this.y = screen_height-100;
this.zIndex = 3;
this.stationary = true;
this.spriteSheet = new SpriteSheet([imageBank.ground],[10]);
this.onCollision = function(){
  flappyBird.alive=false;
  momentum.dirty = true;
  gravityForce.dirty=true;
  scoreBoard.visible = true;
  playButton.visible = true;
};
}

function Sky(){
 apply_mixin.call(this, Entity);
 this.color = "blue";
 this.width = screen_width;
 this.height = screen_height -100;
 this.x = 0;
 this.y = 0;
 this.zIndex = 0;
 this.stationary = true;
 this.spriteSheet = new SpriteSheet([imageBank.background],[10]);
}

function ScoreBoard(){
 apply_mixin.call(this,Entity);
 this.score = 0;
 this.bestScore = 0;
 this.visible = false;
 this.x = 140;
 this.y = 220;
 this.width = 200;
 this.height = 130;
 this.stationary = true;
 this.zIndex = 3;
 this.spriteSheet = new SpriteSheet([imageBank.scoreboard], [5]);

 this.getSpriteSheet = function(){
   return this.spriteSheet;
 };
 this.oldDraw = this.draw;
 this.draw = function(ctx, camera){
  if(!this.visible){
   return;
 }
 this.oldDraw(ctx, camera);
 ctx.font = "24px flappy_font";
 ctx.fillStyle = "black";
 ctx.fillText(this.score+"",this.x+160,this.y+60);
 ctx.fillText(this.bestScore+"",this.x+160,this.y+110);
};
this.scorePipes = function(pipes){
  var didScore = false;
  for(var i =0; i<pipes.length; i++){
   if(pipes[i].x+pipes[i].width<flappyBird.x&&pipes[i].completed === false){
     pipes[i].completed = true;
     didScore = true;
   }
 }
 if(didScore){
  this.score ++;
  this.bestScore = Math.max(this.bestScore, this.score);
  scoreMessage.message = this.score+"";
}
};
}

function TextMessage(message, position, duration){
 this.message = message;
 this.position = position;
 this.duration = duration;
 this.dirty = false;
 this.frames = 0;
 this.draw = function(ctx){
  this.frames++;
  if(this.frames>this.duration&&this.duration!=="infinte"){
   this.dirty = true;
   return;
 }
 ctx.fillStyle = "white";
 ctx.font = "50px flappy_font";
 ctx.fillText(this.message,this.position.x,this.position.y);
 ctx.fillStyle = "black";
 ctx.lineWidth = 2;
 ctx.strokeText(this.message,this.position.x,this.position.y);
};
return this;
}

function Force(){
 this.numberOfFrames = 0;
 this.currentFrame =  0;
 this.forceFunction = null;
 this.dirty = false;
 this.target = null;
 this.exertForce = function(){
  this.currentFrame++;
  if(this.numberOfFrames<this.currentFrame && this.duration !=="infinite"){
    this.dirty = true;
    return;
  }
  if(Array.isArray(this.target)){
    target.forEach(function(tar){this.forceFunction(tar);});
  }
  else{
   this.forceFunction(this.target);
 }
};
}
function GravityForce(target){
 apply_mixin.call(this,Force);
 this.numberOfFrames = "infinite";
 this.target = target;
 this.forceFunction = function (entity){
  var gravityForce = 6.5;
  entity.y +=  gravityForce;
  entity.skew +=5;
  entity.skew = Math.min(90,entity.skew);
};
}
function MomentumForce(target){
  apply_mixin.call(this,Force);
  this.numberOfFrames = "infinite";
  this.target = target;
  this.forceFunction =  function scrollFunc(target){
    var scrollSpeed = 2.5;
    target.x += scrollSpeed;
  };
}
function JumpForce(target){
 apply_mixin.call(this,Force);
 this.numberOfFrames = 10;
 this.target = target;
 this.forceFunction = function jumpForce(entity){
  var strength = 15;
  entity.y -=  strength-this.currentFrame/5;
  entity.skew = -30;
};
}
var jumpEventNotifier = (function(){
  subscribers = [];
  return {
   subscribe: function(jumpSubscriber){subscribers.push(jumpSubscriber);},
   notifyJumpEvent: function(){
    subscribers.forEach( function(subscriber){
     subscriber.jump();
   });
  }
};
})();

function Rectangle(upperLeft, lowerRight){
 this.upperLeft = upperLeft;
 this.lowerRight = lowerRight;
 this.top = upperLeft.y;
 this.bottom = lowerRight.y;
 this.right = lowerRight.x;
 this.left = upperLeft.x;
 this.intersect = function(r2){
  return !(r2.left > this.right ||
    r2.right < this.left ||
    r2.top > this.bottom ||
    r2.bottom < this.top);
};
this.containsPoint = function(p){
 return !(p.x> this.right ||
  p.x < this.left ||
  p.y > this.bottom ||
  p.y < this.top);
};
}

function Point(x,y){
  this.x = x;
  this.y = y;
}


function Scrollable(){
 this.scrollForce = new MomentumForce(this);
 this.onUpdate = function(){
  this.scrollForce.exertForce();
};
}

function PlayButton (){
 apply_mixin.call(this, Entity);
 this.spriteSheet = new SpriteSheet([imageBank.play], [5]);
 this.visible = false;
 this.onClick = function(e){
  e = camera.translatePointInverse(e.x, e.y);
  if(this.containsPoint(e)&&this.visible){
         //console.log("You got me!");
         restartGame();
       }
     };
     this.stationary = true;
     this.width = 100;
     this.height = 50;
     this.x =180;
     this.y = 360;

   }
   function restartGame(){
    createInitialGameObjects();
    scoreBoard.score = 0;
    scoreBoard.visible = false;
    playButton.visible = true;
    gameOn = true;
  }


   //-------------------------Game State ---------------------------//


  var overflowCheck = 9007199254740900;
  var flappyKirill = false;

   var gameText;
   var activeForces;
   var pipes;
   var ground;
   var sky;
   var scoreBoard = new ScoreBoard();
   var camera;
   var entities;
   var gravityForce;
   var momentum;
   var playButton;
   var flappyBird;
   var scoreMessage;

   function createInitialGameObjects(){
    camera = new Camera();
    gameText = [];
    activeForces = [];
    pipes = [];
    entities = [];
    sky = new Sky();
    ground = new Ground();
    flappyBird = new FlappyBird();
    jumpEventNotifier.subscribe(flappyBird);
    gravityForce = new GravityForce(flappyBird);
    momentum = new MomentumForce(flappyBird);
    activeForces.push(gravityForce);
    activeForces.push(momentum);
    playButton = new PlayButton();
    scoreMessage = new TextMessage(""+scoreBoard.score, new Point(screen_width/2, screen_height/4), "infinite");
    registerEntity(flappyBird);
    registerEntity(sky);
    registerEntity(ground);
    registerEntity(scoreBoard);
  }
  createInitialGameObjects();


  var pipeGenerator = (function (){
    var currentFrame = 0;
    var pipeFrequency = 150;
    var spaceSize = 150;
    var totalRoom = screen_height - ground.height;
    return function(){
     currentFrame++;
     if(currentFrame%pipeFrequency === 0){
       var pipeOne = new Pipe(false);
       var pipeTwo = new Pipe(true);
       pipeOne.x += camera.x;
       pipeTwo.x +=camera.x;
       pipeOne.y = 0;
       var pipeHeight = Math.floor((totalRoom - spaceSize)*Math.random());
       pipeOne.height = pipeHeight;
       pipeTwo.height = totalRoom-spaceSize-pipeHeight;
       pipeTwo.y = totalRoom-pipeTwo.height;

       pipes.push(pipeOne);
       pipes.push(pipeTwo);

       registerEntity(pipeOne);
       registerEntity(pipeTwo);
     }
   };

 })();

 var spriteCleaner = (function(){
  var currentFrame = 0;
  var cleanFrequency = 1000;
  return function(){
    function cleanSprite(currentSprite){
     var p = camera.translatePoint(currentSprite.x, currentSprite.y);
     p.x += currentSprite.width;
        return (p.x>0||currentSprite.stationary); //osmething wrong!
      }
      currentFrame++;
      if(currentFrame%cleanFrequency===0){
        entities = entities.filter(cleanSprite);
        pipes = pipes.filter(cleanSprite);
      }
    };

  })();

  function dirtyFilter(objectList){
   objectList =  objectList.filter(function(object){
     return object.dirty===undefined || !object.dirty;
   });
   return objectList;
 }

 function cleanDirtyElements(entity){
   return this.dirty;
 }

 function sortEntitiesForDrawing(entityOne, entityTwo){
   return entityOne.zIndex - entityTwo.zIndex;
 }

 function registerEntity(entity){
   entities.push(entity);
   entities.sort(sortEntitiesForDrawing);
 }

 function getNextPipe(){
   for(var i =0; i<pipes.length; i++){
    if(pipes[i].x>flappyBird.x){
     return pipes[i];
   }
 }
}

   //------------------------------------GameLoop------------------------------------//

   var gameOn;
   var animFrame;
   function startGame(){
    gameOn = true;
    animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    null ;
    animFrame(recursiveAnim);
  }
  var recursiveAnim = function() {
    mainloop();
    animFrame( recursiveAnim );
  };


  var mainloop = function() {
    if(gameOn){
     updateGame();
   }
   drawGame();

 };

//---------------------------Draw Loop----------------------------//


function drawGame(){
 entities.forEach(function(entity){
  entity.draw(ctx,camera);
});
 gameText.forEach(function(text){
  text.draw(ctx);
});
 scoreMessage.draw(ctx);
 if(flappyBird.alive===false){
  scoreBoard.draw(ctx,camera);
  if(playButton.visible){
   playButton.draw(ctx, camera);
 }
}

}

//-------------------------Update Loop-------------------------//

function updateGame(){
 if(flappyBird.alive){
  camera.onUpdate();
  pipeGenerator();
  spriteCleaner();
  scoreBoard.scorePipes(pipes);
  pipes.forEach(function(pipe){
    if(pipe.hasOwnProperty("checkCollision")){
      pipe.checkCollision(flappyBird);
    }
 });
}
ground.checkCollision(flappyBird);
activeForces.forEach(function(force){
  force.exertForce();
});
activeForces = dirtyFilter(activeForces);
}



//--------------------------Event Listeners---------------------------//

//PART TWO : Add Event Listener to canvas that calls 'canvasClick' and Event Listener to the document
//that listens for key presses and calls 'spaceClick'



function spaceClick(evt){
   evt = evt || window.event;
  if (evt.keyCode === 32) {
    jumpEventNotifier.notifyJumpEvent();
  }
}

function canvasClick(e){
  jumpEventNotifier.notifyJumpEvent();
  var x;
  var y;
  var canvasPoint = translateClickPointToCanvasPoint(e);
  playButton.onClick(canvasPoint);
}

function translateClickPointToCanvasPoint(e){
  if (e.pageX || e.pageY) {
   x = e.pageX;
   y = e.pageY;
 }
 else {
   x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
   y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
 }
 x -= canvas.offsetLeft;
 y -= canvas.offsetTop;
 return new Point(x,y);
}




/*--------------------Start the Game!!!----------------------*/
startGame();



})();