var converter = require('number-to-words');

StructureTree = function(previousExp,spliter,nextExp) {
	this.previousExp = previousExp;
	this.spliter = spliter;
	this.nextExp = nextExp;
};
	
StructureTree.prototype = {
	evaluate : function() { return this.nextExp.evaluate() },
	convertToJs : function() { return this.previousExp.convertToJs()+this.nextExp.convertToJs(); },
	toString : function() { return ""+this.previousExp.toString()+this.nextExp.toString(); },
	toWords : function() { return ""+this.previousExp.toWords()+this.nextExp.toWords(); }
};

module.exports = StructureTree;
