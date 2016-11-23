var calculate = function(operator, left, right) {
	var operators = {
		"+" : function(left, right) { return left.evaluate() + right.evaluate() },
		"-" : function(left, right) { return left.evaluate() - right.evaluate() },
		"*" : function(left, right) { return left.evaluate() * right.evaluate() },
		"/" : function(left, right) { return left.evaluate() / right.evaluate() }
	}
	return operators[operator](left,right);
}

var nodes = {}
//-------------------------------------------------------------------------------------------------------

nodes.NumberNode = function(name) {
	this.name = name;
};

nodes.NumberNode.prototype.evaluate = function() { return Number(this.name) }
//-------------------------------------------------------------------------------------------------------

nodes.OperatorNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.OperatorNode.prototype.evaluate = function() { return calculate(this.name,this.left,this.right) }
//-------------------------------------------------------------------------------------------------------

nodes.VariableNode = function(name) {
	this.name = name;
};

nodes.VariableNode.prototype.evaluate = function() { return Number(2) }
//-------------------------------------------------------------------------------------------------------

nodes.AssignmentNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

nodes.AssignmentNode.prototype.evaluate = function() { this.left = this.right.evaluate() }
//-------------------------------------------------------------------------------------------------------

module.exports = nodes;