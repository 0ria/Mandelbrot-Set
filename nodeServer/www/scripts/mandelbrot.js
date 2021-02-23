/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 29/03/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 7, Mnadelbrot, Gráficos en JS usando canvas. 
 * Task: mandelbrot
 * @brief programa que calcula el conjunto de mandelbrot siguiendo la siguiente expresión:
 *     z = z^2 + c, donde z y c son número complejos.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md.
 */
'use strict';

const CANVAS = document.getElementById('myCanvas');
const CTX = CANVAS.getContext('2d');
const MAXREAL = 0.5;
const MINREAL = -2;
const MAXIMAGINARY = 1.125;
const MINIMAGINARY = 0;
const MAXITERATIONS = 10000;

/**
 * @description Clase mandelbrot en la cual se calcula el área y el error del conjunto
 */
class Mandelbrot {
  /**
   * 
   * @param {Array} allPoints Array de objetos puntos complejos
   * @description Método constructor de la clase, recuenta cuantos puntos hay dentro del área
   *     y calcula el área y el error
   */
  constructor(allPoints) {
    this.totalInside = 0;
    for (let point of allPoints) {
      this.totalInside += point.inside;
    }
    this.area = (2 * 2.5 * 1.125 * this.totalInside) / allPoints.length;
    this.error = this.area / Math.sqrt(allPoints.length);
    console.log(this.totalInside + ' : ' + allPoints.length);
  }
  /**
   * @description Getter del valor área
   */
  get Area() {
    return this.area;
  }
  /**
   * @description Getter del valor Error
   */
  get Error() {
    return this.error;
  }
}

/**
 * 
 * @param {Object} mandelbrot Objecto mandelbrot
 * @description Método que pinta al canvas el área y el error del cojunto 
 */
function getAreaAndError(mandelbrot) {
  //CTX.beginPath();
  CTX.font = "30px Arial";
  CTX.fillStyle = "white";
  CTX.fillText("Area: " + mandelbrot.Area.toFixed(4), 10, 780);
  CTX.fillText("Error: " + mandelbrot.Error.toFixed(4), 200, 780);
  //CTX.fill();
}
/**
 * 
 * @param {Array} allPoints Conjunto de puntos complejos
 * @description Función que itera por todos los puntos generados categorizandolos dentro
 *    o fuera del conjunto mandelbrot 
 */
function iteratePoints(allPoints) {
  for (let point of allPoints) {
    let n = 0;
    let z = new ComplexPoint(point.realPart, point.imaginaryPart);
    while (z.absoluteValue() <= 2 && n < MAXITERATIONS) {
      z.multiplyBy(z);
      z.add(point);
      n += 1;
    }
    if (n < MAXITERATIONS) {
      point.nPos(n);
    }
    else {
      point.Inside();
    }
  }
}

function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}

/**
 * 
 * @param {number} x Coordenada x
 * @param {number} y Coordenada y
 * @param {number} color Valor numérico que varia en base a donde se encuentra el punto
 */
function drawPixel(x, y, color) {
  CTX.fillStyle = 'hsl(241, 100%, ' + color + '%)';
  CTX.fillRect(x, y, 1, 1);
}

/**
 * 
 * @param {Object} complexPixel Pixel transformado a número complejo
 * @description Chequea si un punto pertenece al conjunto 
 * @returns Valor numérico en base a la posición
 */
function checkIfBelongsToMandelbrot(complexPixel) {
  let realComponent = complexPixel.realPart;
  let imaginaryComponent = complexPixel.imaginaryPart;
  const maxIter = 105;
  for (let i = 0; i < maxIter; i++) {
    let tempRealComponent = realComponent * realComponent - imaginaryComponent * imaginaryComponent + complexPixel.realPart;
    let temImaginaryComponent = 2 * realComponent * imaginaryComponent + complexPixel.imaginaryPart
    realComponent = tempRealComponent;
    imaginaryComponent = temImaginaryComponent;
    if (realComponent * imaginaryComponent > 5)
      return (i / maxIter * 100);
  }
  return 0;
}

/**
 * @description Función que se recorre el canvas pixel a pixel dibujando el Mandelbrot
 */
function drawMandelbrot() {
  let maginifactionFactor = 430; // 430
  let panX = 2.2; // 2.2
  let panY = 0.9; // 0.9
  for (let i = 0; i < CANVAS.width; i++) {
    for (let j = 0; j < CANVAS.height; j++) {
      let pixel = new ComplexPoint(i / maginifactionFactor - panX, j / maginifactionFactor - panY);
      drawPixel(i, j, checkIfBelongsToMandelbrot(pixel));
    }
  }
}

/**
 * @description Función que genera un número aleatorio entre un intervalo dado
 */
function generateRealPart() {
  return (Math.random() * (MAXREAL - MINREAL) + MINREAL);
}

/**
 * @description Función que genera un número aleatorio entre un intervalo dado
 */
function generateImaginaryPart() {
  return (Math.random() * (MAXIMAGINARY - MINIMAGINARY) + MINIMAGINARY);
}

/**
 * 
 * @param {Number} totalNumberPoints Número total de puntos a generar
 * @description Función que genera Objectos puntos complejos
 */
function generateRandomPoints(totalNumberPoints) {
  let points = [];
  for (let i = 0; i < totalNumberPoints; i++) {
    points.push(new ComplexPoint(generateRealPart(), generateImaginaryPart()));
  }
  return points;
}

/**
 * @description Método principal del programa
 */
async function main() {
  drawMandelbrot();
  await sleep(1000);
  let totalNumberPoints = prompt('Enter the total number of points', '0');
  let allPoints = generateRandomPoints(totalNumberPoints);
  console.log(allPoints);
  iteratePoints(allPoints);
  getAreaAndError(new Mandelbrot(allPoints));
}

main();


/*
function hlsToRgb(h, s, v) {
  if (v > 1) v = 1;
  let hp = h/60;
  let c = v * s;
  let x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb = [0, 0, 0];

  if (0 <= hp && hp < 1) rgb = [c, x, 0];
  if (1 <= hp && hp < 2) rgb = [x, c, 0];
  if (2 <= hp && hp < 3) rgb = [0, c, x];
  if (3 <= hp && hp < 4) rgb = [0, x, c];
  if (4 <= hp && hp < 5) rgb = [x, 0, c];
  if (5 <= hp && hp < 6) rgb = [c, 0, x];

  let m = v - c;
  rgb[0] += m;
  rgb[1] += m;
  rgb[2] += m;
  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;
  return rgb;
}
*/