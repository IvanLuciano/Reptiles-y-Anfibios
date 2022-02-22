$(document).ready(function() {

  $(".contenedor").scroll(function () {
    var y = $(this).scrollTop();
    console.log(y);
    if (y >= 520 & y <= 3240) {
      $(".caractImgFixed").fadeIn(250);
    } else {
      $(".caractImgFixed").fadeOut(200);
    }
    console.log(y);

    //Habilitar causas

  if(y > 7210){

      $(".causas").css( "display", "flex" );
      $(".contenedor").hide()
    }
  });

});
