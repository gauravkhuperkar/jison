var ParseTree = function(oprator, leftValue, rightValue, variableStroage) {
	this.oprator = oprator;
	this.leftValue = leftValue;
	this.rightValue = rightValue;
	this.variableStroage = variableStroage;
}

ParseTree.prototype  = {
	toString : function() {
		return "(" + this.leftValue + this.oprator + this.rightValue + ")";
	},

	add : function(num1, num2) {
		return this.getValue(num1)+this.getValue(num2);
	},

	subtract : function(num1, num2) {
		return this.getValue(num1)-this.getValue(num2);
	},

	multiply : function(num1, num2) {
		return this.getValue(num1)*this.getValue(num2);
	},

	divide : function(num1, num2) {
		return this.getValue(num1)/this.getValue(num2);
	},

	powerOf : function(num1, num2) {
		return Math.pow(this.getValue(num1),this.getValue(num2));
	},

	evaluate : function(tree) {
		if(typeof tree.leftValue == 'object'){
			tree.leftValue = this.evaluate(tree.leftValue);
			this.evaluate(tree);
		}

		if(typeof tree.rightValue == 'object') {
			tree.rightValue = this.evaluate(tree.rightValue);
			this.evaluate(tree);
		}

		if(tree.oprator == "+")
			return this.add(tree.leftValue, tree.rightValue);

		if(tree.oprator == "-")
			return this.subtract(tree.leftValue, tree.rightValue);
		
		if(tree.oprator == "^")
			return this.powerOf(tree.leftValue, tree.rightValue);

		if(tree.oprator == "*")
			return this.multiply(tree.leftValue, tree.rightValue);

		if(tree.oprator == "/")
			return this.divide(tree.leftValue, tree.rightValue);
	},

	getValue: function(val) {
		return isNaN(val) ? Number(this.variableStroage[val]) : Number(val);
	}
}

module.exports = ParseTree;
