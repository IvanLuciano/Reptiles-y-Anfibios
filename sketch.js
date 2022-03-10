let x = 1920,
  y = 1080;

let instruccionesTimer = 0;

let pantallas = 0;

let objs = [];
let frt, obj, pj, fn, pts;

function setup() {
  createCanvas(1920, 1080);

  for (let i = 0; i < 7; i++) {
    objs[i] = new Objetos(130 + (220 * i), 0);
  }

  frt = new Fruta();
  obj = new Objeto();
  pj = new Personaje();
  fn = new Funcion();
  pts = new Puntajes();

}

function draw() {
  if (pantallas == 0) {
    // INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO  INICIO
    instruccionesTimer +=1;
    if(instruccionesTimer >= 0 && instruccionesTimer <= 240){
      background(obj.imgInst1);
    }
    if(instruccionesTimer >= 241 && instruccionesTimer <= 480){
      background(obj.imgInst2);
    }
    if(instruccionesTimer >= 481 && instruccionesTimer <= 720){
      background(obj.imgInst3);
    }
    if(instruccionesTimer >= 721){
      pantallas = 1;
    }

  }
  if (pantallas == 1) {
    instruccionesTimer = 0;
    // JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR  JUGAR
    fn.pasarTiempo();
    background(obj.imgBackground);
    for (let i = 0; i < 7; i++) {
      objs[i].dibujado();
      objs[i].funcionalidad();
    }

    frt.dibujado();
    frt.funcionalidad();
    fn.dificultad();
    fn.bordes();
    fn.colisiones();
    pts.puntaje();
    pts.ganarPuntos();
    pj.dibujado();
    pj.funcionalidad();
    fn.barraDeTiempo();

  }
  if (pantallas == 2) {
    // PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER  PERDER
    background(obj.imgLose);
    // Score Score Score Score Score Score Score
    push();
    fill(255, 133, 133);
    textSize(75);
    text(round(pts.puntuacion), x / 2 + 165, y / 2 - 57);
    pop();
    /*
        push();
        fill(170, 20, 20);
        rectMode(CORNERS)
        rect(150, 910, 790, 1020);
        pop();
    */
    if (mouseIsPressed && mouseX > 150 && mouseX < 790 && mouseY > 910 && mouseY < 1020) {
      fn.reinicio();
      pantallas = 1;
    }
    /*
       push();
       fill(20, 170, 20);
       rectMode(CORNERS)
       rect(1130, 910, 1770, 1020);
       pop();
      */
    if (mouseIsPressed && mouseX > 1130 && mouseX < 1770 && mouseY > 910 && mouseY < 1020) {
      fn.reinicio();
      pantallas = 0;
    }
  }
  if (pantallas == 3) {
    // GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR  GANAR
    background(obj.imgWin);
    // Score Score Score Score Score Score Score
    push();
    fill(255, 133, 133);
    textSize(75);
    text(round(pts.puntuacion), x / 2 + 165, y / 2 - 57);
    pop();
    /*
     push();
     fill(20, 170, 20);
     rectMode(CORNERS)
     rect(430, 910, 1490, 1020);
     pop();
    */
    if (mouseIsPressed && mouseX > 430 && mouseX < 1490 && mouseY > 910 && mouseY < 1020) {
      fn.reinicio();
      pantallas = 0;
    }
  }
}
