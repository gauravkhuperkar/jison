var converter = require('number-to-words');

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

AssignmentNode = function(name, left, right) {
	this.name = name;
	this.left = left;
	this.right = right;
};

AssignmentNode.prototype = {
	evaluate : function() { return this.right.evaluate() },
	convertToJs : function() { return "var "+this.left.convertToJs()+this.name+this.right.convertToJs()+";" },
	toString : function() { return ""+this.left.toString()+this.name+this.right.toString()+";" },
	toWords : function() { return ""+this.left.toWords()+mapNameOperator(this.name)+this.right.toWords()+";" }
};

module.exports = AssignmentNode;
