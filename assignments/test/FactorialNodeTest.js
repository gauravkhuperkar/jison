var expect = require('chai').expect;
var FactorialNode = require('../lib/FactorialNode.js');
var OperatorNode = require('../lib/OperatorNode.js');
var NumberNode = require('../lib/NumberNode.js');

describe('FactorialNode', function() {
  	it('should be evaluate simple number', function(){
	  		var _5 = new NumberNode("5");
	  		var factorialNode = new FactorialNode("!", _5);
	    	expect(factorialNode.evaluate()).to.equal(120);
  	});

  	it('should be evaluate complex expression', function(){
	  		var _2 = new NumberNode("2");
	  		var operatorNode = new OperatorNode("+", _2, _2);
	  		var factorialNode = new FactorialNode("!", operatorNode);
	    	expect(factorialNode.evaluate()).to.equal(24);
  	});
});