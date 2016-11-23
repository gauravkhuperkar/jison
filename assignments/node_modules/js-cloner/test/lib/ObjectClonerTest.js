var expect = require('chai').expect;
var cloner = require('../../lib/ObjectCloner.js');

describe('Object Cloner', function() {
  it('should clone an empty object', function() {
    var actual = {};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone object with premitive values', function() {
    var actual = {a: 10, b: 'foo', c: true};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone object with values as array', function() {
    var numbers = [1, 2, 3];
    var actual = {num: numbers};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(numbers).to.eql(cloned.num);
    expect(numbers).not.to.equal(cloned.num);
  });

  it('should clone object with values as another object', function() {
    var alphabetOrder = {a: 1, b: 2};
    var actual = {alphabets: alphabetOrder};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(alphabetOrder).to.eql(cloned.alphabets);
    expect(alphabetOrder).not.to.equal(cloned.alphabets);
  });

  it('should clone objects having values as date', function() {
    var now = new Date();
    var actual = {now: now};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(now).to.eql(cloned.now);
    expect(now).not.to.equal(cloned.now);
  });

  it('should clone the objects with multiple complex objects', function() {
    var numbers = [1, 2, 3];
    var actual = {
      foo: {
        bar: {
          baz: {
            numbers: numbers
          }
        }
      }
    };
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(numbers).to.eql(cloned.foo.bar.baz.numbers);
    expect(numbers).not.to.equal(cloned.foo.bar.baz.numbers);
  });

  it('should clone object having values as arrays of objects', function() {
    var numbers = {one: 1, two: 2};
    var alphabetsOrder = {a: 1, b: 2};
    var collection = [numbers, alphabetsOrder];
    var actual = { data: collection};
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(collection).to.eql(cloned.data);
    expect(collection).not.to.equal(cloned.data);

    expect(numbers).to.eql(cloned.data[0]);
    expect(numbers).not.to.equal(cloned.data[0]);

    expect(alphabetsOrder).to.eql(cloned.data[1]);
    expect(alphabetsOrder).not.to.equal(cloned.data[1]);
  });

  it('should clone the objects with self reference', function() {
    var actual = {};
    actual.self = actual;
    var cloned = cloner.clone(actual);
    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);

    expect(actual).to.eql(cloned.self);
    expect(actual).not.to.equal(cloned.self);
  });
});