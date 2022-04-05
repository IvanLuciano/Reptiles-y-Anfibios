$(document).ready(function() {

  var stage = 0;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var screenHeight = $(window).height();
  var screenWidth = $(window).width();
  var shapes = {};
  var shapeIndex = 0;
  var score = 0;
  var fallSpeed = 0.09;
  var shapeGenerateSpeed = 1000;
  var causantes = 0;
  var numero = 0;
  var jugar =true;
  var perdisteBol = false;



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





      function Instrucciones() {
        this.tiempo = 0;

        this.draw = function() {
          if (this.tiempo >= 0 && this.tiempo <= 440) {
            ctx.drawImage(document.getElementById('inst1'), 0, 0);
          }
          if (this.tiempo >= 241 && this.tiempo <= 880) {
            ctx.drawImage(document.getElementById('inst2'), 0, 0);
          }
          if (this.tiempo >= 480 && this.tiempo <= 1220) {
            ctx.drawImage(document.getElementById('inst3'), 0, 0);
          }


        }

        this.reset = function() {
          if (this.tiempo >= 721 && jugar== true) {
            stage = 1;
            $("#flecha-izquierda").show();
            $("#flecha-derecha").show();
            arranca();

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

        function Actualizador() {
          ctx.clearRect(0, 0, screenWidth, screenHeight);
          if(jugar){
          instrucciones.update();
          }else{
            return}

        }
        var cicloIns = setInterval(Actualizador, 10);
        if(stage==2){
          clearInterval(cicloIns)
        }

      }


      if (stage == 0) {
        var instrucciones = new Instrucciones();

        }



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
          console.log("este otro tiempo"+this.tiempo);
          this.progreso = 80 + this.tiempo * 0.0135;
          // console.log(this.tiempo);
        }

        this.update = function() {
          if(jugar){
          this.draw();
          this.funcionamiento();
          } else{
            return;
          }
        }
      }

      var barra = new Barra(220, 65);

      //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS //OBJETOS

      function Shape(posX, width, height) {
        var numerin = numero;
        this.Width = width;
        this.Height = height;

        this.Position = {
          X: posX,
          Y: -this.Height
        };

        fallSpeed+=0.001;
        this.Velocity = fallSpeed;
        this.Index = shapeIndex;

        shapes[shapeIndex] = this;
        shapeIndex++;




        numero++;
        if(numero>11){
          numero=0;
        }
        this.Draw = function() {
          ctx.drawImage(document.getElementById('causa'+numerin), this.Position.X, this.Position.Y, this.Width, this.Height);
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

              perdisteBol = true;

              //newGame();
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

        $("#flecha-izquierda").on('mousedown',function() {
          personaje.Position.X += -35;

        });


        $("#flecha-derecha").on('mousedown',function() {
          personaje.Position  .X += 35;
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

      function Perder(){
        this.derrota = function() {
            if(perdisteBol){
            stage=2;
            perdiste();
          }
        }
      }

      var perder = new Perder();

      function Ganar() {
        this.victoria = function() {
        //  console.log("pantalla:" + stage);
          if (barra.tiempo >= 35000) {
            stage = 2;
            ganaste();
          }
        }
      }

      var ganar = new Ganar();

      function shapeGenerate() {


        new Shape(Math.random() * screenWidth*10, 120, 120);
        score++;
        console.log("score:" + score);
        if(stage==2 || stage ==3){
          return;

        }
      }

      function Updater() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for (i in shapes) {
          shapes[i].update();
        }
        personaje.update();
        barra.update();
        ganar.victoria();
        perder.derrota();
      }

      //Updater();
      function arranca(){
        if(stage ==1){
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        var ciclo = setInterval(Updater, 10);
        shapeGenerate();

          }else{
            clearInterval(ciclo);
            return;
          }
      }

      function ganaste(){

          if (stage == 2) {
            var puntaje = score;
            jugar=false;
            $("#flecha-izquierda").hide();
            $("#flecha-derecha").hide();
            ctx.clearRect(0, 0, screenWidth, screenHeight);
            ctx.drawImage(document.getElementById('ganar'), 0, 0);
            ctx.font ="60px Arial";
            ctx.fillText(""+puntaje,1120,475);
          }
    }

    function perdiste(){
      if (stage ==2){
        var puntaje = score;
        jugar=false;
        $("#flecha-izquierda").hide();
        $("#flecha-derecha").hide();
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        ctx.drawImage(document.getElementById('perder'), 0, 0);
        ctx.font ="60px Arial";
        ctx.fillText(""+puntaje,1120,475);
      }

    }

    function reiniciar(){
      var shapes = {};
      var shapeIndex = 0;
      var score = 0;
      var fallSpeed = 0.09;
      var shapeGenerateSpeed = 1000;
      var causantes = 0;
    }




});
