var jison = require("jison");
var fs = require('fs');
var lexer = fs.readFileSync('numericExpr.jison', 'utf8');
var parser = new jison.Parser(lexer);
var tree = parser.parse("x=10;y=x+20;y+5;");

console.log("Expression is:\n", tree," \n\nAnd the answer is:",tree.evaluate());
console.log("\nConversion in js : ",tree.convertToJs());

