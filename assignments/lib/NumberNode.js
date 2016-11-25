var converter = require('number-to-words');

NumberNode = function(name) {
	this.name = name;
};

NumberNode.prototype = {
	evaluate : function() { return Number(this.name) },
	convertToJs : function() { return this.name },
	toString : function() { return this.name },
	toWords : function() { return converter.toWords(this.name) }
};

module.exports = NumberNode;
