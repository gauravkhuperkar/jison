var jison = require("jison");
var fs = require('fs');
var lexer = fs.readFileSync('numericExpr.jison', 'utf8');
var parser = new jison.Parser(lexer);
var tree = parser.parse("x=10;y=3;x+y;");

var showErrMsg = function() {
	var msg = ["Please provide option \n",
				"Available options are :",
				"> evaluate","> echo",
				"> js","> toWords",
				"> repl",
				"\n<<-- Note : Type quit to get out of repl -->>"
			]
	return msg.join("\n");
}

var option = process.argv[2];
var _2ndoption = process.argv[3];

var repl = require('./repl.js');

var options = { 
	"evaluate" : function() { return tree.evaluate(); },
	"js" : function() { return tree.convertToJs(); },
	"echo" : function() { return tree.toString; },
	"toWords" : function() { return tree.toWords; },
	"repl" : function() { return repl(_2ndoption); }
}
console.log((options[option]) ? options[option]() : showErrMsg())

