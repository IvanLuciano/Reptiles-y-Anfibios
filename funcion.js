$(document).ready(function() {

  $(".contenedor").scroll(function () {
    var y = $(this).scrollTop();
    if (y >= 520 & y <= 3240) {
      $(".caractImgFixed").fadeIn(250);
    } else {
      $(".caractImgFixed").fadeOut(50);
    }
    console.log(y);
  });
});
