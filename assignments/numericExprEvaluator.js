var jison = require("jison");
var fs = require('fs');
var lexer = fs.readFileSync('numericExpr.jison', 'utf8');
var parser = new jison.Parser(lexer);
var tree = parser.parse("x;");

var showErrMsg = function() {
	var msg = ["Please provide option \n",
				"Available options are :",
				"> evaluate","> echo",
				"> js","> toWords",
				"> repl (as 2nd option to run in repl mode)",
				"<<-- Note : Type quit to get out of repl -->>"
			]
	return msg.join("\n");
}

var option = process.argv[2];
var repl = process.argv[3];
var expression = "";

options = { 
	"evaluate" : tree.evaluate(),
	"js" : tree.convertToJs(),
	"echo" : tree.toString(),
	"toWords" : tree.toWords()
}

if (repl=="repl") {
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (text) {
	    if (text === 'quit\n')
	    	exit();
	    var tree = parser.parse(text);
	    console.log(">"+tree.evaluate());
		expression+=text;
	});
} else {
	console.log((options[option]) ? (options[option]) : showErrMsg())
}

var optionsRepl = function() {
	var tree = parser.parse(expression);
	var options = {
		"evaluate" : tree.evaluate(),
		"js" : tree.convertToJs(),
		"echo" : tree.toString(),
		"toWords" : tree.toWords()
	}
	console.log(options[option]);
}
var exit = function () {
	optionsRepl(option)
    process.exit();
}

