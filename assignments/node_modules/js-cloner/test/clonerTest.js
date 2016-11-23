var cloner = require('../cloner.js');
var expect = require('chai').expect;

describe('Cloner', function() {
  it('should clone an array', function() {
    var actual = [1, 2, 3];
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone a Date', function() {
    var actual = new Date();
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone an Object', function() {
    var actual = {numbers: [1, 2, 3]};
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone a String Object', function() {
    var actual = new String('foobar');
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone a Number object', function() {
    var actual = new Number(1);
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });

  it('should clone a Boolean object', function() {
    var actual = new Boolean(true);
    var cloned = cloner.clone(actual);

    expect(actual).to.eql(cloned);
    expect(actual).not.to.equal(cloned);
  });
});