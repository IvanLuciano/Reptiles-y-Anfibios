class Personaje {
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
  // PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##  PERSONAJE  ##
  constructor() {
    this.pjx = x / 2;
    this.pjy = y - 120;

    this.dibujarI = false;
    this.dibujarD = false;

    this.imgPj0 = loadImage("img/pj.png");
    this.botonMov = loadImage("img/botonMov.png");
    this.botonMovPress = loadImage("img/botonMovPress.png");
  }

  dibujado() {
    push();
    rectMode(CENTER);
    imageMode(CENTER);

    if (this.dibujarI) {
      image(this.imgPj0, this.pjx, this.pjy, 170, 120);
    } else if (this.dibujarD) {
      scale(-1, 1);
      image(this.imgPj0, -this.pjx, this.pjy, 170, 120);
    } else {
      fill(90, 180, 90);
      image(this.imgPj0, this.pjx, this.pjy, 170, 120);
    }
    pop();
  }

  funcionalidad() {
    // ARROW KEYS // ARROW KEYS // ARROW KEYS // ARROW KEYS // ARROW KEYS // ARROW KEYS
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.pjx -= 3.4;
      this.dibujarI = true;
      this.dibujarD = false;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.pjx += 3.4;
      this.dibujarD = true;
      this.dibujarI = false;
    }
    // BOTONES LATERALES // BOTONES LATERALES // BOTONES LATERALES // BOTONES LATERALES

    image(this.botonMov, 25, y / 3, 125, 404);
    push();
    scale(-1, 1);
    image(this.botonMov, -x+25, y / 3, 124, 404);
    pop();

    if (mouseIsPressed) {
      push();
      if (mouseX > 25 && mouseX < 125 && mouseY > y / 3 && mouseY < y / 3 + 404) {
        this.pjx -= 3.4;
        this.dibujarI = true;
        this.dibujarD = false;


        image(this.botonMovPress, 25, y / 3, 124, 404);
      }
      if (mouseX > x - 125 && mouseX < x-25 && mouseY > y / 3 && mouseY < y / 3 + 404) {
        this.pjx += 3.4;
        this.dibujarD = true;
        this.dibujarI = false;


        push();
        scale(-1, 1);
        image(this.botonMovPress, -x+25, y / 3, 124, 404);
        pop();
      }
      pop();
    }
  }
}

class Objetos {
  // OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##
  // OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##
  // OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##  OBJETOS  ##
  constructor(x, y) {
    //pos columna
    this.posx = x;
    this.posy = y;
    //pos objeto
    this.objx = random(this.posx, this.posx + 215);
    this.objy = random(this.posy, this.posy - 1900);
    //tam objeto
    this.tam = 175;
    this.velo = 6.3;


    this.objsImgs = [];

    for (let i = 0; i < 13; i++) {
      this.objsImgs[i] = loadImage("img/causas/nerf"+[i]+".png");
      this.randomImg = int(random(0,12));
    }
  }
  dibujado() {
    push();

    imageMode(CENTER);
    image(this.objsImgs[this.randomImg], this.objx, this.objy, this.tam, this.tam);
    /*
    rectMode(CENTER);
    fill(random(0, 250), 80, random(0, 20))
    rect(this.objx, this.objy, this.tam, this.tam);
    */
    pop();
  }
  funcionalidad() {
    this.objy += this.velo;

    if (this.objy > y - 150) {
      this.objx = random(this.posx, this.posx + 215);
      this.objy = random(this.posy, this.posy - 1900);

      for (let i = 0; i < 13; i++) {
        this.randomImg = int(random(0,12));
      }
    }
  }
}

class Objeto {
  constructor() {

    // FONDOS FONDOS FONDOS FONDOS FONDOS FONDOS FONDOS FONDOS FONDOS FONDOS //

    this.imgInst1 = loadImage("img/instruccion1.jpg");
    this.imgInst2 = loadImage("img/instruccion2.jpg");
    this.imgInst3 = loadImage("img/instruccion3.jpg");
    this.imgBackground = loadImage("img/background.jpg");
    this.imgWin = loadImage("img/win.jpg");
    this.imgLose = loadImage("img/lose.jpg");

  }

  dibujado() {
    push();
    fill(31);
    rect(0, 0, x / 3, y);
    rect(x - x / 3, 0, x, y);
    pop();
  }

  funcionalidad() {
    fn.bordeDer = x / 3 + 60;
    fn.bordeIzq = x - x / 3 - 60;
  }
}

class Fruta {
  constructor() {
    this.px = x / 2;
    this.py = 0 - random(1900, 2500);

    this.frutaImg = loadImage("img/causas/buff0.png");
  }

  dibujado() {
    push();
    imageMode(CENTER);
    image(this.frutaImg, this.px, this.py, 125, 125);
    pop();
  }

  funcionalidad() {
    if (fn.tiempo <= 2175) {
      this.py += 7.3;
      if (this.py >= y + 40) {
        this.px = random(280, y);
        this.py = 0 - random(1900, 2500);
      }
    }

    if (fn.tiempo >= 2175) {
      this.py += 12.2;
      if (this.py >= y + 40) {
        this.px = random(x / 3 + 40, x - x / 3 - 40);
        this.py = 0 - random(1900, 2500);
      }
    }
  }
}

class Funcion {
  // FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##
  // FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##
  // FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##  FUNCION  ##
  constructor() {
    this.coli = 999;
    this.tiempo = 0;
    this.barrax = 0;

    this.bordeDer = 240;
    this.bordeIzq = x - 240;

    this.reposicionamiento = false;

    this.imgBarraTiempo = loadImage("img/IMGBarraTiempo.png");
    this.imgReloj = loadImage("img/IMGreloj.png");
  }
  bordes() {
    //  BORDES  #  BORDES  #  BORDES  #  BORDES  #  BORDES  #  BORDES  #  BORDES  #
    if (pj.pjx < this.bordeDer) {
      pj.pjx = this.bordeDer;
    }
    if (pj.pjx > this.bordeIzq) {
      pj.pjx = this.bordeIzq;
    }
  }

  colisiones() {
    // COLISIONES  ##  COLISIONES  ##  COLISIONES  ##  COLISIONES  ##
    for (let i = 0; i < 7; i++) {
      this.coliX = dist(pj.pjx, pj.pjx, objs[i].objx, objs[i].objx);
      this.coliY = dist(pj.pjy, pj.pjy, objs[i].objy, objs[i].objy);

      if (this.coliX <= 175 && this.coliY <= 105) {
        pantallas = 2;
      }
    }
  }

  pasarTiempo() {
    //  TIEMPO  ##  TIEMPO  ##  TIEMPO  ##  TIEMPO  ##  TIEMPO  ##  TIEMPO  ##
    this.tiempo++;
    if (this.tiempo >= 2700) { // 45 SEGS
      pantallas = 3
    }
  }

  barraDeTiempo() {
    //  BARRA TIEMPO  ##  BARRA TIEMPO  ##  BARRA TIEMPO  ##  BARRA TIEMPO  ##
    this.barrax = map(this.tiempo, 0, 2700, 255, 670);
    push();

    push();
    image(this.imgBarraTiempo, 175, 50, 500, 85);
    pop();
    push();
    rectMode(CORNERS);
    fill(53, 176, 246);
    noStroke();
    rect(175, 47, this.barrax, 130, 255);
    pop();
    image(this.imgReloj, 190, 65);
    pop();
  }

  dificultad() {
    //  DIFICULTAD  ##  DIFICULTAD  ##  DIFICULTAD  ##  DIFICULTAD  ##
    // A PARTIR DE 20 SEGS // A PARTIR DE 20 SEGS // A PARTIR DE 20 SEGS
    if (this.tiempo >= 1200 && this.tiempo <= 1380) {
      // ALERTA
      push();
      textSize(45);
      text("¡Las causas ahora se acercan más rápido!", x / 2 - 480, y / 2);
      pop();
    }
    if (this.tiempo >= 1380) {

      for (let i = 0; i < 7; i++) {
        objs[i].velo = 9.5;
      }
    }
    // A PARTIR DE 35 SEGS // A PARTIR DE 35 SEGS // A PARTIR DE 35 SEGS
    if (this.tiempo >= 2000 && this.tiempo <= 2180) {
      push();
      textSize(45);
      text("¡Tu espacio se ha reducido!", x / 2 - 340, y / 2);
      pop();
    }

    if (this.tiempo >= 2175 && this.tiempo <= 2180) { // ACTIVAR REPORSICIONAMIENTO
      this.reposicionamiento = true;
    }

    /*
    push();
    fill(255,0,0,20);
    rectMode(CORNERS);
    rect(x/2-150,0,x/2+150,y);
    pop();
    */
    if (this.tiempo >= 2175 && this.tiempo <= 2240) { // PROTECCION antiMuerte injusta POR EL TELETRANSPORTE
      for (let i = 0; i < 7; i++) {
        if (objs[i].objx > x / 2 - 150 && objs[i].objx < x / 2 + 150) { // detecta objetos en el centro de la pantalla y los mueve arriba así le da tiempo al pj a moverse
          objs[i].objy = random(-75, -750);
        }
      }
    }

    if (this.tiempo >= 2180) { // EL REPOSICIONAMIENTO:
      if (this.reposicionamiento == true) {
        pj.pjx = x / 2; // Poner el PJ en el centro
        this.reposicionamiento = false;
      }
      obj.dibujado(); // BORDES DE CAUSAS MAYORES
      obj.funcionalidad(); // NO DEJAR PASAR (cambiar bordes)
    }
  }

  reinicio() {
    //  REINICIO  ##  REINICIO  ##  REINICIO  ##  REINICIO  ##  REINICIO  ##
    for (let i = 0; i < 7; i++) {
      objs[i].objy = random(objs[i].posy, objs[i].posy - 1900);
      objs[i].velo = 6.3;
      this.coli = 999
      this.tiempo = 0;

      pj.pjx = x / 2;

      fn.bordeDer = 240;
      fn.bordeIzq = x - 240;
      fn.reposicionamiento = false;

      pts.puntuacion = 0;

      frt.px = x / 2;
      frt.py = 0 - random(1900, 2500);
    }
  }
}

class Puntajes {
  constructor() {
    this.puntuacion = 0;
    this.agarrarFruta = 999;

    this.IMGPuntaje = loadImage("img/IMGPuntaje.png");
  }

  puntaje() {
    push();
    image(this.IMGPuntaje,1575, 50, 210, 85);

    textSize(45);
    fill(255);
    text(int(this.puntuacion), x - 320, 105);
    text("pts", x - 225, 103);
    pop();

    this.puntuacion += .04;
  }

  ganarPuntos() {
    print(this.agarrarFruta)
    this.agarrarFruta = dist(pj.pjx, pj.pjy, frt.px, frt.py);
    if (this.agarrarFruta <= 125) {
      if (fn.tiempo <= 2175) {
        frt.px = random(280, 1640);
        frt.py = 0 - random(1900, 2500);
      }
      if (fn.tiempo >= 2175) {
        frt.px = random(x / 3 + 40, x - x / 3 - 40);
        frt.py = 0 - random(1900, 2500);
      }
      // SUMAR PUNTOS SUMAR PUNTOS SUMAR PUNTOS SUMAR PUNTOS SUMAR PUNTOS SUMAR PUNTOS
      this.puntuacion = this.puntuacion + 3;
    }
  }
}
