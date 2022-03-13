$( document ).ready(function() {
    console.log( "ready!" );


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var screenHeight = $(window).height();
var screenWidth = $(window).width();
var shapes = {};
var shapeIndex = 0;
var score = 0;
var fallSpeed = 6.3;
var shapeGenerateSpeed = 200;


// Setting Canvas Dimensions
$(window).resize(function(){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
});
canvas.width = screenWidth;
canvas.height = screenHeight;

// $(document).mousemove(function(e){
//   dude.Position.X = e.pageX;
//   dude.Position.Y = e.pageY;
// })

if(personaje.Position.X>100){
$("#flecha-izquierda").click(function(){
  personaje.Position.X+=25;
  });
}
if(personaje.Position.X<1820){
  $("#flecha-derecha").click(function(){
    personaje.Velocity.X = 5;
  });
}

/*
$(document.getElementById('flecha-izquierda').click(function(){

      personaje.Velocity.X = -5;

}));

$(document.getElementById('flecha-derecha').click(function(){

  personaje.Velocity.X = 5;
}));*/

$(document).mouseup(function(){
  dude.Velocity.X = 0;
  dude.Velocity.Y = 0;
});

//Generates Snake Head
function Shape(posX, width, height) {
    this.Width = width;
    this.Height = height;

    this.Position = {
        X: posX,
        Y: -this.Height
    };
    this.Velocity = Math.random() * fallSpeed + 5;
    this.Index = shapeIndex;

    shapes[shapeIndex] = this;
    shapeIndex++

    this.checkCollisions = function() {
      if(this.Position.Y >= screenHeight){
        delete shapes[this.Index];
      }
    }
    this.updatePosition = function() {
        this.Position.Y += this.Velocity;
    }
    this.Draw = function() {

      ctx.drawImage(document.getElementById('causa'),this.Position.X,this.Position.Y,this.Width, this.Height);

    }
    this.update = function(){
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}



function Personaje(pjx, width, height) {
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
    this.Width = width;
    this.Height = height;
    this.Position = {X: pjx, Y:screenHeight-this.Height}
    this.Velocity = {X: 0, Y:0,}

            this.checkCollisions = function(){ //COLISIONES
            function collision(a,b){
              if (
                a.Position.X <= b.Position.X + b.Width &&
                a.Position.X + a.Width >= b.Position.X &&
                a.Position.Y + a.Height >= b.Position.Y &&
                a.Position.Y <= b.Position.Y + b.Height ){
                  return true
              }
            }
            for (i in shapes){
              if(collision(this, shapes[i])){
                newGame();
              }
            }
          }

          this.updatePosition = function(){ //POSICION
          this.Position.X += this.Velocity.X;
          this.Position.Y += this.Velocity.Y;
        }

        this.Draw = function(){
          ctx.drawImage(document.getElementById('personaje'),this.Position.X,this.Position.Y,this.Width, this.Height);
          }

          this.update = function(){
            this.checkCollisions();
            this.updatePosition();
            this.Draw();
          }
}

    var personaje = new Personaje(screenWidth/2, 170, 120);

    function newGame(){
    personaje = new Personaje(screenWidth/2, 170, 120);
    shapes = {};
    //Utilizar puntaje antes de resetearlo
    score = 0;
  }

  function shapeGenerate(){
  new Shape(Math.random()*screenWidth,175,175);
  score++
  console.log(score);
  }

  function Updater() {
      ctx.clearRect(0, 0, screenWidth, screenHeight);
      for(i in shapes){
        shapes[i].update();
      }
      personaje.update();
      // requestAnimationFrame(Updater);
  }
  setInterval(Updater, 10);
  setInterval(shapeGenerate, shapeGenerateSpeed);

  });
