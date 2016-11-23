var cloner = require('../../lib/DateCloner.js');
var expect = require('chai').expect;

describe('Date Cloner', function() {
  it('should clone current date', function() {
    var now = new Date();
    var cloned = cloner.clone(now);
    expect(now).to.eql(cloned);
    expect(now).not.to.equal(cloned);
  });

  it('should clone any date', function(){
    var now = new Date('01/01/2016');
    var cloned = cloner.clone(now);
    expect(now).to.eql(cloned);
    expect(now).not.to.equal(cloned);
  });
});