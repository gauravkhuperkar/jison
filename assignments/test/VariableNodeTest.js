var expect = require('chai').expect;
var VariableNode = require('../lib/VariableNode.js');
var OperatorNode = require('../lib/OperatorNode.js');
var NumberNode = require('../lib/NumberNode.js');

describe('VariableNode', function() {

  	it('should be evaluate if value of variable is present in variableStroage', function(){
  			var _10 = new NumberNode("10");
	  		var x = new VariableNode("x",{x:_10});
	    	expect(x.evaluate()).to.equal(10);
  	});

  	it('should be rutrun name if value of variable is NOT present in variableStroage', function(){
	  		var y = new VariableNode("y",{});
	    	expect(y.evaluate()).to.equal("y");
  	});
});