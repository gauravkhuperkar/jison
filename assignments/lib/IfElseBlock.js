var converter = require('number-to-words');

IfElseBlock = function(condition, truthyExpr, falsyExpr) {
	this.condition = condition;
	this.truthyExpr = truthyExpr;
	this.falsyExpr = falsyExpr;
};

IfElseBlock.prototype = {
	evaluate : function() { return eval(this.condition) ? this.truthyExpr.evaluate() : this.falsyExpr.evaluate() },
	convertToJs : function() { return "if ("+this.condition+")\n{\n"+this.truthyExpr.convertToJs()+"\n} else {\nmy expression };\n"},
	toString : function() { return "if "+this.condition+"{\n"+this.truthyExpr.toString()+"\n} else {\nmy expression };\n"},
	toWords : function() { return "if condition is "+this.condition+"then  -> "+this.truthyExpr.toWords()+" othrewise expands -->"+this.falsyExpr.toWords()},
};

module.exports = IfElseBlock;
