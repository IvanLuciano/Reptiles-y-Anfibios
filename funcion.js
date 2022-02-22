$(document).ready(function() {

  $(".contenedor").scroll(function () {
    var y = $(this).scrollTop();
    console.log(y);
    if (y >= 520 & y <= 3240) {
      $(".caractImgFixed").fadeIn(250);
    } else {
      $(".caractImgFixed").fadeOut(50);
    }
    console.log(y);

    //Habilitar causas

    if(y > 4500){

      $(".causas").css( "display", "flex" );
      $(".contenedor").hide()
    }


  });






});
