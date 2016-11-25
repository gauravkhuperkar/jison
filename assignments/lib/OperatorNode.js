var converter = require('number-to-words');

var calculate = function(operator, left, right) {
	var operators = {
		"+" : function(left, right) { return left.evaluate() + right.evaluate() },
		"-" : function(left, right) { return left.evaluate() - right.evaluate() },
		"*" : function(left, right) { return left.evaluate() * right.evaluate() },
		"/" : function(left, right) { return left.evaluate() / right.evaluate() },
		"^" : function(left, right) { return  Math.pow(left.evaluate(), right.evaluate()) }
	}
	return operators[operator](left,right);
};

var mapNameOperator = function(name) { 
	var names = {
		"+" : " plus ",
		"-" : " minus ",
		"*" : " times ",
		"/" : " dived-by ",
		"^" : " Math.pow() ",
		"=" : " equal-to "
	}
	return names[name];
};

OperatorNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

OperatorNode.prototype =  {
	evaluate : function() { return calculate(this.name,this.left,this.right) },
	convertToJs : function() { return "console.log("+this.left.convertToJs()+this.name+this.right.convertToJs()+")" },
	toString : function() { return ""+this.left.toString()+this.name+this.right.toString() },
	toWords : function() { return ""+this.left.toWords()+mapNameOperator(this.name)+this.right.toWords() }
};

module.exports = OperatorNode;
