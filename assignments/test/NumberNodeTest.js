var expect = require('chai').expect;
var NumberNode = require('../lib/NumberNode.js');

describe('NumberNode', function() {

  	it('should be evaluate value of node', function(){
	  		var _4= new NumberNode("4");
	    	expect(_4.evaluate()).to.equal(4);
  	});
});