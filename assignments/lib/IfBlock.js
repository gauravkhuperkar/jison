var converter = require('number-to-words');

IfBlock = function(condition, expressionTree) {
	this.condition = condition;
	this.expressionTree = expressionTree;
};

IfBlock.prototype = {
	evaluate : function() { return eval(this.condition) ? this.expressionTree.evaluate() : undefined },
	convertToJs : function() { return "if ("+this.condition+")\n{\n"+this.expressionTree.convertToJs()+"\n};"},
	toString : function() { return "if "+this.condition+" {\n"+this.expressionTree.toString()+"\n};"},
	toWords : function() { return "if condtion is "+this.condition+" then -->\n"+this.expressionTree.toWords()+"\n};"},
};

module.exports = IfBlock;
