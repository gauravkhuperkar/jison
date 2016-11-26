var jison = require("jison");
var fs = require('fs');
var lexer = fs.readFileSync('numericExpr.jison', 'utf8');
var parser = new jison.Parser(lexer);

var repl = function(option) {
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (text) {
	    if (text === 'quit\n')
	    	exit(option);
	    var tree = parser.parse(text);
	    console.log("> "+tree.evaluate());
		expression+=text;
	});
}

var expression = "";

var optionsRepl = function(option) {
	var tree = parser.parse(expression);
	var options = {
		"evaluate" : function(){ return tree.evaluate(); },
		"js" : function(){ tree.convertToJs(); },
		"echo" : function(){ tree.toString(); },
		"toWords" : function(){ tree.toWords(); },
		undefined : funtree.evaluate()
	}
	var msgLine = "\n***---------- Total result according to option "+option+" is -----------***\n"
	console.log(msgLine,options[option]);
}
var exit = function (option) {
	optionsRepl(option)
    process.exit();
}

module.exports = repl;