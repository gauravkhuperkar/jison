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
};
	
nodes.Structure.prototype = {
	evaluate : function() { return this.nextExp.evaluate() },
	convertToJs : function() { return this.previousExp.convertToJs()+this.nextExp.convertToJs(); },
	toString : function() { return ""+this.previousExp.toString()+this.nextExp.toString(); },
	toWords : function() { return ""+this.previousExp.toWords()+this.nextExp.toWords(); }
};
//-------------------------------------------------------------------------------------------------------

nodes.IfBlock = function(condition, expressionTree) {
	this.condition = condition;
	this.expressionTree = expressionTree;
};

nodes.IfBlock.prototype = {
	evaluate : function() { return eval(this.condition) ? this.expressionTree.evaluate() : undefined },
	convertToJs : function() { return "if ("+this.condition+")\n{\n"+this.expressionTree.convertToJs()+"\n};"},
	toString : function() { return "if "+this.condition+" {\n"+this.expressionTree.toString()+"\n};"},
	toWords : function() { return "if condtion is "+this.condition+" then -->\n"+this.expressionTree.toWords()+"\n};"},
};
//-------------------------------------------------------------------------------------------------------

nodes.IfElseBlock = function(condition, truthyExpr, falsyExpr) {
	this.condition = condition;
	this.truthyExpr = truthyExpr;
	this.falsyExpr = falsyExpr;
};

nodes.IfElseBlock.prototype = {
	evaluate : function() { return eval(this.condition) ? this.truthyExpr.evaluate() : this.falsyExpr.evaluate() },
	convertToJs : function() { return "if ("+this.condition+")\n{\n"+this.truthyExpr.convertToJs()+"\n} else {\nmy expression };\n"},
	toString : function() { return "if "+this.condition+"{\n"+this.truthyExpr.toString()+"\n} else {\nmy expression };\n"},
	toWords : function() { return "if condition is "+this.condition+"then  -> "+this.truthyExpr.toWords()+" othrewise expands -->"+this.falsyExpr.toWords()},
};
//-------------------------------------------------------------------------------------------------------

module.exports = nodes;
