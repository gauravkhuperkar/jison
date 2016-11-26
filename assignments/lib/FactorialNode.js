var converter = require('number-to-words');

var factorial = function(number) {
	return (number==1) ? 1 : number * factorial(number-1);
}

var FactorialNode = function(name, expression) {
	this.name = name;
	this.expression = expression;
};

FactorialNode.prototype =  {
	evaluate : function() { return factorial(this.expression.evaluate()); },
	convertToJs : function() { return "console.log("+this.expression.convertToJs()+this.name+")" },
	toString : function() { return this.expression.toString()+this.name },
	toWords : function() { return this.expression.toWords()+" factorial" }
};

module.exports = FactorialNode;
