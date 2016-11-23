var cloner = require('../../lib/ArrayCloner.js');
var expect = require('chai').expect;

describe('Array Cloner', function() {
  it('should clone array of numbers', function() {
    var actual = [1, 2, 3];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone array of strings', function() {
    var actual = ['foo', 'bar', 'baz'];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone array of boolean values', function() {
    var actual = [true, false, true];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone array of Date', function() {
    var yesterday = new Date('01/01/2016');
    var today = new Date('02/01/2016');
    var actual = [yesterday, today];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(yesterday).to.eql(cloned[0]);
    expect(yesterday).not.to.equal(cloned[0]);
    expect(today).to.eql(cloned[1]);
    expect(today).not.to.equal(cloned[1]);
  });

  it('should clone array of array', function() {
    var numbers = [1, 2, 3];
    var alphabets = ['a', 'b', 'c'];
    var actual = [numbers, alphabets];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(numbers).to.eql(cloned[0]);
    expect(numbers).not.to.equal(cloned[0]);
    expect(alphabets).to.eql(cloned[1]);
    expect(alphabets).not.to.equal(cloned[1]);
  });

  it('should clone array of objects', function() {
    var numbers = {one: 1, two: 2};
    var alphabetOrder = {a: 1, b: 2};
    var actual = [numbers, alphabetOrder];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(numbers).to.eql(cloned[0]);
    expect(numbers).not.to.equal(cloned[0]);
    expect(alphabetOrder).to.eql(cloned[1]);
    expect(alphabetOrder).not.to.equal(cloned[1]);
  });

  it('should clone array of array of objects', function() {
    var alphabetOrder = {a: 1, b: 2};
    var actual = [[alphabetOrder]];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(alphabetOrder).to.eql(cloned[0][0]);
    expect(alphabetOrder).not.to.equal(cloned[0][0]);
  });

  it('should clone circular array', function() {
    var actual = [];
    actual.push(actual);

    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(actual).to.eql(cloned[0]);
    expect(actual).not.to.equal(cloned[0]);

  })

});