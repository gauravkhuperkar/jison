var expect = require('chai').expect;
var OperatorNode = require('../lib/OperatorNode.js');
var NumberNode = require('../lib/NumberNode.js');

describe('OperatorNode', function() {
	describe('evaluate method', function() {
		describe('plus opration should be able to evaluate', function() {

		  	it('two simple number calculation', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		    	var operatorNode = new OperatorNode('+', _2, _3);
		    	expect(operatorNode.evaluate()).to.equal(5);
		  	});

		  	it('simple number and complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("+",_3,_2);
		    	var operatorNode = new OperatorNode('+', _2, complexExpression);
		    	expect(operatorNode.evaluate()).to.equal(7);
		  	});

		  	it('complex and simple number mathematical expression', function(){
		  		var _12 = new NumberNode("12");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("+",_12,_3);
		    	var operatorNode = new OperatorNode('+', complexExpression, _3);
		    	expect(operatorNode.evaluate()).to.equal(18);
		  	});

		  	it('two complex mathematical expression', function(){
		  		var _8 = new NumberNode("8");
		  		var _5 = new NumberNode("5");
		  		var _7 = new NumberNode("7");
		  		var _1stComplex = new OperatorNode("+",_7,_8);
		  		var _2ndComplex = new OperatorNode("+",_5,_7);
		    	var operatorNode = new OperatorNode("+", _1stComplex, _2ndComplex);
		    	expect(operatorNode.evaluate()).to.equal(27);
		  	});
		});

		describe('minus opration should be able to evaluate', function() {

		  	it('two simple mathematical calculation', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		    	var operatorNode = new OperatorNode('-', _3, _2);
		    	expect(operatorNode.evaluate()).to.equal(1);
		  	});

		  	it('simple number and complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _5 = new NumberNode("5");
		  		var complexExpression = new OperatorNode("-",_5,_2);
		    	var operatorNode = new OperatorNode('-', complexExpression,_2);
		    	expect(operatorNode.evaluate()).to.equal(1);
		  	});		

		  	it('complex and simple number mathematical expression', function(){
		  		var _12 = new NumberNode("12");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("-",_12,_3);
		    	var operatorNode = new OperatorNode('-', complexExpression, _3);
		    	expect(operatorNode.evaluate()).to.equal(6);
		  	});

		  	it('two complex mathematical expression with negative number as the result', function(){
		  		var _8 = new NumberNode("8");
		  		var _5 = new NumberNode("5");
		  		var _1 = new NumberNode("1");

		  		var _1stComplex = new OperatorNode("-",_1,_8);
		  		var _2ndComplex = new OperatorNode("-",_1,_5);
		    	var operatorNode = new OperatorNode("-", _1stComplex, _2ndComplex);
		    	expect(operatorNode.evaluate()).to.equal(-3);
		  	});
		});

		describe('multiplication opration should be able to evaluate', function() {

		  	it('multiplication node should be able to evaluate simple mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		    	var operatorNode = new OperatorNode('*', _3, _2);
		    	expect(operatorNode.evaluate()).to.equal(6);
		  	});

		  	it('simple number and complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("*",_3,_2);
		    	var operatorNode = new OperatorNode('*', _2, complexExpression);
		    	expect(operatorNode.evaluate()).to.equal(12);
		  	});

		  	it('complex and simple number mathematical expression', function(){
		  		var _1 = new NumberNode("1");
		  		var _4 = new NumberNode("4");
		  		var complexExpression = new OperatorNode("*",_1,_4);
		    	var operatorNode = new OperatorNode('*', complexExpression, _4);
		    	expect(operatorNode.evaluate()).to.equal(16);
		  	});

		  	it('two complex mathematical expression', function(){
		  		var _8 = new NumberNode("8");
		  		var _0 = new NumberNode("0");
		  		var _7 = new NumberNode("7");
		  		var _1stComplex = new OperatorNode("*",_7,_8);
		  		var _2ndComplex = new OperatorNode("*",_0,_7);
		    	var operatorNode = new OperatorNode("*", _1stComplex, _2ndComplex);
		    	expect(operatorNode.evaluate()).to.equal(0);
		  	});
		});
	  	
		describe('division opration should be able to evaluate', function() {

		  	it('division node should be able to evaluate simple mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _4 = new NumberNode("4");
		    	var operatorNode = new OperatorNode('/', _4, _2);
		    	expect(operatorNode.evaluate()).to.equal(2);
		  	});

		  	it('simple number and complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _4 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("/",_4,_2);
		    	var operatorNode = new OperatorNode('/', _4, complexExpression);
		    	expect(operatorNode.evaluate()).to.equal(2);
		  	});

		  	it('complex and simple number mathematical expression', function(){
		  		var _1 = new NumberNode("1");
		  		var _4 = new NumberNode("4");
		  		var complexExpression = new OperatorNode("/",_4,_1);
		    	var operatorNode = new OperatorNode('/', complexExpression, _1);
		    	expect(operatorNode.evaluate()).to.equal(4);
		  	});

		  	it('two complex mathematical expression', function(){
		  		var _12 = new NumberNode("12");
		  		var _3 = new NumberNode("3");
		  		var _6 = new NumberNode("6");
		  		var _1stComplex = new OperatorNode("/",_6,_3);
		  		var _2ndComplex = new OperatorNode("/",_12,_6);
		    	var operatorNode = new OperatorNode("/", _1stComplex, _2ndComplex);
		    	expect(operatorNode.evaluate()).to.equal(1);
		  	});

		  	it('simple number and zero as denominator should give Infinity', function(){
		  		var _5 = new NumberNode("5");
		  		var _0 = new NumberNode("0");
		  		var complexExpression = new OperatorNode("/",_5,_0);
		    	var operatorNode = new OperatorNode('/', _5, _0);
		    	expect(operatorNode.evaluate()).to.equal(Infinity);
		  	});

		  	it('complex and and zero as denominator should give Infinity', function(){
		  		var _1 = new NumberNode("1");
		  		var _4 = new NumberNode("4");
		  		var _0 = new NumberNode("0");
		  		var complexExpression = new OperatorNode("/",_4,_1);
		    	var operatorNode = new OperatorNode('/', complexExpression, _0);
		    	expect(operatorNode.evaluate()).to.equal(Infinity);
		  	});
		});

		describe('power of method should be able to evaluate', function() {

		  	it('to the power node should be able to evaluate simple mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		    	var operatorNode = new OperatorNode('^', _2, _2);
		    	expect(operatorNode.evaluate()).to.equal(4);
		  	});

		  	it('simple number and complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("^",_3,_2);
		    	var operatorNode = new OperatorNode('^', _2, complexExpression);
		    	expect(operatorNode.evaluate()).to.equal(512);
		  	});

		  	it('complex and simple number mathematical expression', function(){
		  		var _1 = new NumberNode("1");
		  		var _3 = new NumberNode("3");
		  		var complexExpression = new OperatorNode("^",_1,_3);
		    	var operatorNode = new OperatorNode('^', complexExpression, _3);
		    	expect(operatorNode.evaluate()).to.equal(1);
		  	});

		  	it('two complex mathematical expression', function(){
		  		var _2 = new NumberNode("2");
		  		var _1 = new NumberNode("1");
		  		var _7 = new NumberNode("7");
		  		var _1stComplex = new OperatorNode("^",_7,_1);
		  		var _2ndComplex = new OperatorNode("^",_1,_2);
		    	var operatorNode = new OperatorNode("^", _1stComplex, _2ndComplex);
		    	expect(operatorNode.evaluate()).to.equal(7);
		  	});
		});
	})
})
