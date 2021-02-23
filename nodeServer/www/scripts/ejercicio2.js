/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 29/03/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 7, Mnadelbrot, Gráficos en JS usando canvas. 
 * Task: ejericio1
 * @brief programa que trata de imitar una imagen dada.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md.
 */
'use strict';


const CANVAS = document.getElementById('myCanvas2');
const CTX = CANVAS.getContext('2d');
const LINESIZE = CANVAS.width / 30;

class Line {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
  }
  drawBlackLine() {
    CTX.beginPath();
    CTX.fillStyle = "black";
    CTX.lineWidth = 3;
    CTX.moveTo(this.posX, this.posY);
    CTX.lineTo(400,400);
    CTX.fill();
  }
  drawWhiteLine() {
    CTX.beginPath();
    CTX.fillStyle = "white";
    CTX.lineWidth = 3;
    CTX.moveTo(this.posX, this.posY);
    CTX.lineTo(400,400);
    CTX.fill();
  }
}

function createBackground() {
  for(let i = 0; i < 40; i++) {
    let lin = new Line(i, 0);
    if (i % 2 === 0) 
      lin.drawWhiteLine();
    else  
      lin.drawBlackLine();
  }
}

function main() {
  createBackground();
}

main();