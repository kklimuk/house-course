function Cat(){
   this.color = "blue";

}
Cat.prototype = {
   meow: function(){
      console.log("Meow");
   }
};

function Tiger(){
   this.roar = function(){
      console.log("Rawr");
   };
}
Tiger.prototype = Cat.prototype;

function SuperTiger(){

}
SuperTiger.prototype = Tiger.prototype;

//Tiger.prototype =

//Cat();

//var cat = {};

//Cat.apply(cat);

var cat = new Cat();