$(document).ready(function() {

  var stage = 0;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenHeight = $(window).height();
  var screenWidth = $(window).width();
  var shapes = {};
  var shapeIndex = 0;
  var score = 0;
  var fallSpeed = 6.3;
  var shapeGenerateSpeed = 275;


  //DIMENSIONES CANVAS //DIMENSIONES CANVAS //DIMENSIONES CANVAS //DIMENSIONES CANVAS

  $(window).resize(function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
  });

  //CANVAS //CANVAS //CANVAS //CANVAS //CANVAS //CANVAS //CANVAS //CANVAS //CANVAS

  canvas.width = screenWidth;
  canvas.height = screenHeight;


    if (stage == 0) {
      function Instrucciones() {
        this.tiempo = 0;


        this.draw = function() {
          if (this.tiempo >= 0 && this.tiempo <= 240) {
            ctx.drawImage(document.getElementById('inst1'), 0, 0);
          }
          if (this.tiempo >= 241 && this.tiempo <= 480) {
            ctx.drawImage(document.getElementById('inst2'), 0, 0);
          }
          if (this.tiempo >= 480 && this.tiempo <= 720) {
            ctx.drawImage(document.getElementById('inst3'), 0, 0);
          }
        }

        this.reset = function() {
          if (this.tiempo >= 721) {
            stage = 1;
            Juego();
          }
        }


        this.timer = function() {
          this.tiempo++;
        }

        this.update = function() {
          this.draw();
          this.reset();
          this.timer();
        }
      }

      var instrucciones = new Instrucciones();


      function Actualizador() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        instrucciones.update();
      }

      setInterval(Actualizador, 10);
    }


    function Juego(){
    if (stage == 1) {

      //BARRA TIEMPO //BARRA TIEMPO //BARRA TIEMPO //BARRA TIEMPO //BARRA TIEMPO //BARRA TIEMPO

      function Barra(posX, posY) {
        this.posX = posX;
        this.posY = posY;

        this.tiempo = 0;
        this.progreso = 80;

        this.draw = function() {
          ctx.drawImage(document.getElementById('barra'), this.posX, this.posY);
          // ctx.fillStyle = "#7FCFE9"
          // ctx.fill();
          // ctx.rect(this.posX, this.posY, this.tiempo*0.09, 80);
          ctx.drawImage(document.getElementById('progreso'), this.posX, this.posY - 5, this.progreso, 87);
          ctx.drawImage(document.getElementById('icoReloj'), this.posX + 15, this.posY + 15);
        }
        this.funcionamiento = function() {
          this.tiempo++;
          this.progreso = 80 + this.tiempo * 0.135;
          // console.log(this.tiempo);
        }

        this.update = function() {
          this.draw();
          this.funcionamiento();
        }
      }

      var barra = new Barra(220, 65);

      //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS

      function Shape(posX, width, height) {
        this.Width = width;
        this.Height = height;

        this.Position = {
          X: posX,
          Y: -this.Height
        };

        this.Velocity = fallSpeed;
        this.Index = shapeIndex;

        shapes[shapeIndex] = this;
        shapeIndex++

        this.Draw = function() {
          ctx.drawImage(document.getElementById('causa'), this.Position.X, this.Position.Y, this.Width, this.Height);
        }

        this.updatePosition = function() {
          this.Position.Y += this.Velocity;
        }

        this.checkCollisions = function() {
          if (this.Position.Y >= screenHeight) {
            delete shapes[this.Index];
          }
        }

        this.update = function() {
          this.Draw();
          this.updatePosition();
          this.checkCollisions();
        }
      }

      // PERSONAJE// PERSONAJE// PERSONAJE// PERSONAJE// PERSONAJE// PERSONAJE// PERSONAJE

      function Personaje(pjx, width, height) {
        this.Width = width;
        this.Height = height;
        this.Position = {
          X: pjx,
          Y: screenHeight - this.Height - 50
        }
        this.Velocity = {
          X: 0,
          Y: 0,
        }

        this.checkCollisions = function() { //COLISIONES
          function collision(a, b) {
            if (
              a.Position.X <= b.Position.X + b.Width &&
              a.Position.X + a.Width >= b.Position.X &&
              a.Position.Y + a.Height >= b.Position.Y &&
              a.Position.Y <= b.Position.Y + b.Height) {
              return true
            }
          }
          for (i in shapes) {
            if (collision(this, shapes[i])) {
              newGame();
            }
          }
        }

        //POSICION //POSICION //POSICION //POSICION //POSICION //POSICION //POSICION

        this.updatePosition = function() {
          this.Position.X += this.Velocity.X;
          this.Position.Y += this.Velocity.Y;
        }

        this.Draw = function() {
          ctx.drawImage(document.getElementById('personaje'), this.Position.X, this.Position.Y, this.Width, this.Height);
        }

        this.update = function() {
          this.Draw();
          this.updatePosition();
          this.checkCollisions();
        }

        // MOVIMIENTO// MOVIMIENTO// MOVIMIENTO// MOVIMIENTO// MOVIMIENTO// MOVIMIENTO

        $("#flecha-izquierda").click(function() {
          personaje.Position.X += -25;
        });

        $("#flecha-derecha").click(function() {
          personaje.Position.X += 25;
        });
      }

      var personaje = new Personaje(screenWidth / 2 - 100, 200, 120);



      function newGame() {
        personaje = new Personaje(screenWidth / 2 - 100, 200, 120);
        shapes = {};
        //Utilizar puntaje antes de resetearlo
        score = 0;
        barra.tiempo = 0;
      }

      function Ganar() {
        this.victoria = function() {
          console.log("pantalla:" + stage);
          if (barra.tiempo == 3500) {
            stage = 2;
          }
        }
      }

      var ganar = new Ganar();

      function shapeGenerate() {
        new Shape(Math.random() * screenWidth, 175, 175);
        score++
        console.log("score:" + score);
      }

      function Updater() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for (i in shapes) {
          shapes[i].update();
        }
        personaje.update();
        barra.update();
        ganar.victoria();
      }

      setInterval(Updater, 10);
      setInterval(shapeGenerate, shapeGenerateSpeed);}
    }

    if (stage == 2) {}

});
