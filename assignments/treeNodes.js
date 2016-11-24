var converter = require('number-to-words');

var calculate = function(operator, left, right) {
	var operators = {
		"+" : function(left, right) { return left.evaluate() + right.evaluate() },
		"-" : function(left, right) { return left.evaluate() - right.evaluate() },
		"*" : function(left, right) { return left.evaluate() * right.evaluate() },
		"/" : function(left, right) { return left.evaluate() / right.evaluate() },
		"^" : function(left, right) { return  Math.pow(left.evaluate(), right.evaluate())}
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

var nodes = {};
//-------------------------------------------------------------------------------------------------------

nodes.NumberNode = function(name) {
	this.name = name;
};

nodes.NumberNode.prototype = {
	evaluate : function() { return Number(this.name) },
	convertToJs : function() { return this.name },
	toString : function() { return this.name },
	toWords : function() { return converter.toWords(this.name) }
};
//-------------------------------------------------------------------------------------------------------

nodes.OperatorNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.OperatorNode.prototype =  {
	evaluate : function() { return calculate(this.name,this.left,this.right) },
	convertToJs : function() { return "console.log("+this.left.convertToJs()+this.name+this.right.convertToJs()+")" },
	toString : function() { return ""+this.left.toString()+this.name+this.right.toString() },
	toWords : function() { return ""+this.left.toWords()+mapNameOperator(this.name)+this.right.toWords() }
};
//-------------------------------------------------------------------------------------------------------

nodes.VariableNode = function(name, variables) {
	this.name = name;
	this.variables = variables;
};

nodes.VariableNode.prototype = {
	evaluate : function() { return (this.variables[this.name]) ? (this.variables[this.name].evaluate()) : this.name},
	convertToJs : function() { return this.name; },
	toString : function() { return this.name; },
	toWords : function() { return " "+this.name; }
};
//-------------------------------------------------------------------------------------------------------

nodes.AssignmentNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.AssignmentNode.prototype = {
	evaluate : function() { return this.right.evaluate() },
	convertToJs : function() { return "var "+this.left.convertToJs()+this.name+this.right.convertToJs()+";" },
	toString : function() { return ""+this.left.toString()+this.name+this.right.toString()+";" },
	toWords : function() { return ""+this.left.toWords()+mapNameOperator(this.name)+this.right.toWords()+";" }
};
//-------------------------------------------------------------------------------------------------------

nodes.Structure = function(previousExp,spliter,nextExp) {
	this.previousExp = previousExp;
	this.spliter = spliter;
	this.nextExp = nextExp;
}
	
nodes.Structure.prototype = {
	evaluate : function() { return this.nextExp.evaluate() },
	convertToJs : function() { return this.previousExp.convertToJs()+this.nextExp.convertToJs(); },
	toString : function() { return ""+this.previousExp.toString()+this.nextExp.toString(); },
	toWords : function() { return ""+this.previousExp.toWords()+this.nextExp.toWords(); }
};
//-------------------------------------------------------------------------------------------------------

module.exports = nodes;
