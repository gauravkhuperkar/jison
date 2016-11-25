var expect = require('chai').expect;
var StructureTree = require('../lib/StructureTree.js');
var OperatorNode = require('../lib/OperatorNode.js');
var NumberNode = require('../lib/NumberNode.js');

describe('StructureTree', function() {
  	it('should be evaluate nest value of simple two number expression', function(){
	  		var _14= new NumberNode("14");
	  		var _3= new NumberNode("3");
	  		var structureTree = new StructureTree(_14, ";", _3);
	    	expect(structureTree.evaluate()).to.equal(3);
  	});

  	it('should be evaluate nest value of simple number and complex expression', function(){
	  		var _4= new NumberNode("4");
	  		var _5= new NumberNode("5");
	  		var operatorNode = new OperatorNode("+", _4, _5);
	  		var structureTree = new StructureTree(_4, ";", operatorNode);
	    	expect(structureTree.evaluate()).to.equal(9);
  	});

  	it('should be evaluate nest value of simple two complex expression', function(){
	  		var _14= new NumberNode("14");
	  		var _31= new NumberNode("31");
	  		var _1srOperatorNode = OperatorNode("+", _14, _31)
	  		var _2ndOperatorNode = new OperatorNode("-", _31, _14)
	  		var structureTree = new StructureTree(_1srOperatorNode,";",_2ndOperatorNode);
	    	expect(structureTree.evaluate()).to.equal(17);
  	});
});