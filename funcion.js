let animado = document.querySelectorAll(".animado");
let hacerFlex = document.querySelectorAll(".caractImgFixed");

function mostrarScroll() {
  let scrollTop = document.documentElement.scrollTop;
  for (var i = 0; i < animado.lenght; i++) {
    log(i);
    let altura = animado[i].offsetTop;
    if (altura - 500 < scrollTop) {
      animado[i].style.opacity = 1;
      /* hacerFlex.style.display = "flex"; */
    }
  }
}

window.addEventListener('scroll', mostrarScroll);
