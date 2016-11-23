var calculate = function(operator, left, right) {
	var operators = {
		"+" : function(left, right) { return left.evaluate() + right.evaluate() },
		"-" : function(left, right) { return left.evaluate() - right.evaluate() },
		"*" : function(left, right) { return left.evaluate() * right.evaluate() },
		"/" : function(left, right) { return left.evaluate() / right.evaluate() },
		"^" : function(left, right) { return  Math.pow(left.evaluate(), right.evaluate())}
	}
	return operators[operator](left,right);
}

var nodes = {}
//-------------------------------------------------------------------------------------------------------

nodes.NumberNode = function(name) {
	this.name = name;
};

nodes.NumberNode.prototype.evaluate = function() { return Number(this.name) }
nodes.NumberNode.prototype.convertToJs = function() { return this.name }
//-------------------------------------------------------------------------------------------------------

nodes.OperatorNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.OperatorNode.prototype.evaluate = function() { return calculate(this.name,this.left,this.right) }
nodes.OperatorNode.prototype.convertToJs = function() { return "console.log("+this.left.convertToJs()+this.name+this.right.convertToJs()+")" }
//-------------------------------------------------------------------------------------------------------

nodes.VariableNode = function(name, variables) {
	this.name = name;
	this.variables = variables;
};

nodes.VariableNode.prototype.evaluate = function() { return this.variables[this.name].evaluate() }
nodes.VariableNode.prototype.convertToJs = function() { return this.name; }
//-------------------------------------------------------------------------------------------------------

nodes.AssignmentNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.AssignmentNode.prototype.evaluate = function() { return this.right.evaluate() }
nodes.AssignmentNode.prototype.convertToJs = function() { return "var "+this.left.convertToJs()+this.name+this.right.convertToJs()+";" }
//-------------------------------------------------------------------------------------------------------

module.exports = nodes;