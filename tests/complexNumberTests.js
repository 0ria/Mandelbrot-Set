/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 29/03/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 7, Mnadelbrot, Gráficos en JS usando canvas. 
 * Task: Complex class testing
 * @brief programa que testea la clase complex number.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md.
 */
'use strict';
'use strict'

const assert = chai.expect;
const expect = chai.expect;

describe('Testing ComplexNumber class Methods:', () => {
  let complexNumber;
  let auxComplex;
  beforeEach(function() {
    complexNumber = new ComplexPoint(2, 2);
    auxComplex = new ComplexPoint(1, 1);
  });
  it('Constructor.', function() {
    complexNumber = new ComplexPoint(2, 4);
    expect(complexNumber.realPart).to.equal(2);
    expect(complexNumber.imaginaryPart).to.equal(4);
  });
  it('MultiplyBy.', function() {
    complexNumber.multiplyBy(auxComplex);
    expect(complexNumber.realPart).to.equal(0);
    expect(complexNumber.imaginaryPart).to.equal(0);
  });
  it('Add.', function() {
    complexNumber.add(auxComplex);
    expect(complexNumber.realPart).to.equal(3);
    expect(complexNumber.imaginaryPart).to.equal(3);
  });
  it('AbsoluteValue.', function() {
    complexNumber.absoluteValue();
    expect(complexNumber.absVal).to.equal(2 * Math.sqrt(2));
  });
});