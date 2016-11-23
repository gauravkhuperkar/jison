var objectCloner = require('./lib/ObjectCloner.js');
var arrayCloner = require('./lib/ArrayCloner.js');
var dateCloner = require('./lib/DateCloner.js');

var clone = function(valueToClone) {
  if(valueToClone instanceof Array) {
    return arrayCloner.clone(valueToClone);
  } else if(valueToClone instanceof Date) {
    return dateCloner.clone(valueToClone);
  } else if(valueToClone instanceof Object) {
    return objectCloner.clone(valueToClone);
  } else {
    return valueToClone;
  }
};

exports.clone = clone;