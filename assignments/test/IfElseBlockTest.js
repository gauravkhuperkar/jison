var expect = require('chai').expect;
var IfElseBlock = require('../lib/IfElseBlock');
var NumberNode = require('../lib/NumberNode.js');

describe('IfElseBlock', function() {
	
	describe('should evaluate truthyExpr if condition is true', function() {

	  	it('in case of simple number expression', function(){
		  		var _6 = new NumberNode("6");
		  		var _1 = new NumberNode("1");
		    	var ifElseBlock = new IfElseBlock("true", _6, _1);
		    	expect(ifElseBlock.evaluate()).to.equal(6);
	  	});

	  	it('in case of complex expression', function(){
	  			var _10 = new NumberNode("10");
		  		var _50 = new NumberNode("50");
		    	var _1stOperatorNode = new OperatorNode('/', _50, _10);
		    	var _2ndOperatorNode = new OperatorNode('+', _50, _10);
		    	var ifElseBlock = new IfElseBlock("true", _1stOperatorNode, _2ndOperatorNode);
		    	expect(ifElseBlock.evaluate()).to.equal(5);
	  	});
	});

	describe('should evaluate falsyExpr if condition is false', function() {

	  	it('in case of simple number expression', function(){
		  		var _7 = new NumberNode("7");
		  		var _42 = new NumberNode("42");
		    	var ifElseBlock = new IfElseBlock("false", _7, _42);
		    	expect(ifElseBlock.evaluate()).to.equal(42);
	  	});

	  	it('in case of complex expression', function(){
	  			var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		    	var _1stOperatorNode = new OperatorNode('/', _2, _2);
		    	var _2ndOperatorNode = new OperatorNode('^', _2, _3);
		    	var ifElseBlock = new IfElseBlock("false", _1stOperatorNode, _2ndOperatorNode);
		    	expect(ifElseBlock.evaluate()).to.equal(8);
	  	});
	});
})
