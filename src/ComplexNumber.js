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

/**
 * @description Clase números complejos, la cual opera con ellos y almacena 
 *     distintos valores necesarios
 */
class ComplexPoint {
  /**
   * 
   * @param {number} realPart Parte real del número
   * @param {number} imaginaryPart Parte imaginaria del número
   * @description Método contructor
   */
  constructor(realPart, imaginaryPart) {
    this.realPart = realPart;
    this.imaginaryPart = imaginaryPart;
  }
  /**
   * 
   * @param {Object} otherPoint Objecto de la clase punto
   * @description Método que multiplica un numero complejo con otro
   */
  multiplyBy(otherPoint) {
    this.realPart = (this.realPart * otherPoint.realPart) - 
        (this.imaginaryPart * otherPoint.imaginaryPart);
    this.imaginaryPart = (this.realPart * otherPoint.imaginaryPart) +
        (this.realPart * otherPoint.realPart);
  }
  /**
   * 
   * @param {Object} otherPoint Objeto de la clase punto
   * @description Método que suma un numero imaginario con otro
   */
  add(otherPoint) {
    this.realPart = this.realPart + otherPoint.realPart;
    this.imaginaryPart = this.imaginaryPart + otherPoint.imaginaryPart;
  }
  /**
   * @description Método que calcula el valor absoluto de un número complejo
   * @returns retorna el valor absoluto de dicho numero
   */
  absoluteValue() {
    this.absVal = Math.sqrt((this.realPart * this.realPart) + (this.imaginaryPart * this.imaginaryPart));
    return this.absVal;
  }
  /**
   * 
   * @param {number} position número de iteración en la que se salio del bucle
   * @description Método que guarda la posición en la que se salió del bucle y setea el valor
   *     inside a fuera pues no se encuentra dentro del area
   */
  nPos(position) {
    this.posN = position;
    this.inside = 0;
  }
  /**
   * @description Método que setea el atributo inside a uno
   */
  Inside() {
    this.inside = 1;
  }
}