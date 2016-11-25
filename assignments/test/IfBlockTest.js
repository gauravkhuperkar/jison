var expect = require('chai').expect;
var IfBlock = require('../lib/IfBlock');
var NumberNode = require('../lib/NumberNode.js');

describe('IfBlock', function() {
	
	describe('evaluate method should evaluate expressionTree if condition is true', function() {

	  	it('in case of simple number expression', function(){
		  		var _9 = new NumberNode("9");
		    	var ifBlock = new IfBlock("true", _9);
		    	expect(ifBlock.evaluate()).to.equal(9);
	  	});

	  	it('in case of complex expression', function(){
	  			var _12 = new NumberNode("12");
		  		var _5 = new NumberNode("5");
		    	var operatorNode = new OperatorNode('-', _12, _5);
		    	var ifBlock = new IfBlock("true", operatorNode);
		    	expect(ifBlock.evaluate()).to.equal(7);
	  	});
	});

	describe('evaluate method should NOT evaluate expressionTree if condition is false and should return undefined', function() {

	  	it('in case of simple number expression', function(){
		  		var _7 = new NumberNode("7");
		    	var ifBlock = new IfBlock("false", _7);
		    	expect(ifBlock.evaluate()).to.equal(undefined);
	  	});

	  	it('in case of complex expression', function(){
	  			var _2 = new NumberNode("2");
		  		var _31 = new NumberNode("31");
		    	var operatorNode = new OperatorNode('-', _2, _31);
		    	var ifBlock = new IfBlock("false", operatorNode);
		    	expect(ifBlock.evaluate()).to.equal(undefined);
	  	});
	});
})
