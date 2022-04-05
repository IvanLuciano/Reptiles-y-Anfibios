$(document).ready(function() {

  var estado = "portada";



  $(".contenedor").scroll(function () {
    var y = $(this).scrollTop();
    /*console.log(y);*/

    if(y>=0 && y <1071){
      estado= "portada";
      estados();
      console.log(estado);
    } else if (y >= 1079 && y <= 1100) {
      estado = "habitat";
      estados();
      console.log(estado);
    } else if (y >= 2150 && y <= 2640) {
      estado = "caracteristicas";
      estados();
      console.log(estado);

    }
    else if (y >= 2960 && y <= 3840) {
      estado = "desarrollo";
      estados();
      console.log(estado);

    }
    else if (y >= 4000 && y <= 7140) {
      estado = "peligro";
      estados();
      console.log(estado);

    }else if (y >= 7581 ){
      estado="causas";
    estados();
    console.log(estado);
    }
      console.log(y);
  });


/*  function startShowing(){
    var elementToHide = document.getElementById("show");
    elementToHide.style.opacity = 0;
    var intervalId = setInterval(function(){
      if(elementToHide.style.opacity >= 1)
      {
        clearInterval(intervalId);
      }else{
        elementToHide.style.opacity = parseFloat(elementToHide.style.opacity) + 0.1;
      }
    },250);
  }*/






function estados(){



  if(estado == "portada"){
    $(".habitat-obj").stop(true, true);
    $(".elemento-dinamico").hide();

  }else if(estado == "habitat"){

    $(".caracteristicas-obj").stop(true, true);
    $(".elemento-dinamico").hide();


    $("#agua").fadeIn();
    $("#rana").fadeIn(500);

    $("#fondo-tortuga").fadeIn(200);
    $("#tortuga").fadeIn(300);
    $("#nubes").fadeIn(400);
    $("#flecha1").fadeIn(500);
    $("#dato1").fadeIn(600);
    $("#flecha2").fadeIn(700);
    $("#dato2").fadeIn(800);
    $("#flecha3").fadeIn(900);
    $("#dato3").fadeIn(1000);
    $("#flecha4").fadeIn(1100);
    $("#dato4").fadeIn(1200);


  } else if(estado=="caracteristicas"){
    $(".habitat-obj").stop(true, true);
    $(".desarrollo-obj").stop(true, true);

    $(".elemento-dinamico").hide();

    $("#fondo-rana-2").fadeIn(200);
    $("#rana-2").fadeIn(300);
    $("#pulmones-1").fadeIn(400);
    $("#dato5").fadeIn(500);
    $("#flecha5").fadeIn(500);
    $("#larva").fadeIn(600);
    $("#dato6").fadeIn(600);
    $("#flecha7").fadeIn(700);
    $("#dato7").fadeIn(700);
    $("#flecha6").fadeIn(700);
    $("#piel-lisa").fadeIn(800);
    $("#dato9").fadeIn(850);

    $("#fondo-tortuga-2").fadeIn(800);
    $("#tortuga-2").fadeIn(850);
    $("#pulmones-2").fadeIn(800);
    $("#flecha6").fadeIn(920);
    $("#escamas").fadeIn(930);
    $("#dato8").fadeIn(950);
    $("#flecha8").fadeIn(980);
    $("#flecha9").fadeIn(1000);
    $("#vertebrados-fria").fadeIn(1000);
    $("#dato10").fadeIn(1100);
    $("#dato11").fadeIn(1150);
  }
  else if(estado=="desarrollo"){
    $(".caracteristicas-obj").stop(true,true);
    $(".elemento-dinamico").hide();

    $("#rana-desarrollo").fadeIn(100);
    $("#fondo-tortuga-3").fadeIn(100);
    $("#toruga-desarrollo").fadeIn(150);
    $("#huevos").fadeIn(150);

    $(".agua-2").fadeIn(200);
    $("#rana-3").fadeIn(300);
    $("#dato12").fadeIn(500);
    $("#flecha10").fadeIn(500);

    $("#dato13").fadeIn(600);
    $("#flecha12").fadeIn(700);
    $("#dato14").fadeIn(700);
    $("#flecha11").fadeIn(700);
    $("#dato15").fadeIn(850);
    $("#flecha13").fadeIn(900);



  }
  else if(estado=="peligro"){

    $(".desarrollo-obj").stop(true,true);
    $(".elemento-dinamico").hide();

  }
  else if(estado=="causas"){
    console.log("estamos ac?");
    $(".causas").css( "display", "flex" );
    $(".contenedor").hide()

  }


}

console.log(estado);


estados();



});
