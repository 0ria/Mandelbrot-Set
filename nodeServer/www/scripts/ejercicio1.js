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
const SQUARESIZE = CANVAS.height / 12;
const ARCSIZE = 4.5;

/**
 * @description Clase Square la cual tiene un constructor que recibe la localización 
 *     y un método para dibujar cada cuadrado
 */
class Square {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
  }
  drawSquare() {
    CTX.strokeStyle = 'rgba(255, 255, 255, 0.4';
    CTX.lineWidth = 9;
    CTX.strokeRect(this.posX, this.posY, SQUARESIZE, SQUARESIZE);
    CTX.fillStyle = "white";
    CTX.beginPath();
    CTX.arc(this.posX, this.posY, ARCSIZE, 0, 2 * Math.PI);
    CTX.fill();
    CTX.beginPath();
    CTX.arc(this.posX + SQUARESIZE, this.posY, ARCSIZE, 0, 2 * Math.PI);
    CTX.fill();
    CTX.beginPath();
    CTX.arc(this.posX, this.posY + SQUARESIZE, ARCSIZE, 0, 2 * Math.PI);
    CTX.fill();
    CTX.beginPath();
    CTX.arc(this.posX + SQUARESIZE, this.posY + SQUARESIZE, ARCSIZE, 0, 2 * Math.PI);
    CTX.fill();
  }
}

/**
 * @description Dibuja cada cuadrado en su posición
 */
function drawAllSquares() {
  let posiniX = -30;
  let posiniY = -30;
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      let row = (j % 2 === 1) ? (SQUARESIZE * (j - 1) + i % 2 * SQUARESIZE) : (SQUARESIZE * j + i % 2 * SQUARESIZE);
      let squ = new Square(row + posiniX, SQUARESIZE * i + posiniY);
      squ.drawSquare();
    }
  }
}

/**
 * @description Genera el backgorund negro
 */
function drawBackground() {
  CTX.fillStyle = "black";
  CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function main() {
  drawBackground();
  drawAllSquares();
}

main();