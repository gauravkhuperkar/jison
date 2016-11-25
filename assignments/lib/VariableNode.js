var converter = require('number-to-words');

VariableNode = function(name, variables) {
	this.name = name;
	this.variables = variables;
};

VariableNode.prototype = {
	evaluate : function() { return (this.variables[this.name]) ? (this.variables[this.name].evaluate()) : this.name},
	convertToJs : function() { return this.name; },
	toString : function() { return this.name; },
	toWords : function() { return " "+this.name; }
};

module.exports = VariableNode;
