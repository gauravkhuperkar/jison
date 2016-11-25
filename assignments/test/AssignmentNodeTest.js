var expect = require('chai').expect;
var AssignmentNode = require('../lib/AssignmentNode.js');
var NumberNode = require('../lib/NumberNode.js');
var VariableNode = require('../lib/VariableNode.js');
var OperatorNode = require('../lib/OperatorNode.js');

describe('AssignmentNode', function() {
	describe('evaluate method', function() {

	  	it('should evaluate right child in case of simple number expression', function(){
	  		var _2 = new NumberNode("2");
	  		var x = new VariableNode("x",{x:10});
	    	var assignmentNode = new AssignmentNode('=', x, _2);
	    	expect(assignmentNode.evaluate()).to.equal(2);
	  	});

	  	it('should evaluate right child in case of complex expression', function(){
	  		var _6 = new NumberNode("6");
	  		var _3 = new NumberNode("3");
	  		var y = new VariableNode("y",{});
	  		var complexExpression = new OperatorNode("+",_3,_6);
	    	var assignmentNode = new AssignmentNode("=", y, complexExpression);
	    	expect(assignmentNode.evaluate()).to.equal(9);
	  	});
	});
})
