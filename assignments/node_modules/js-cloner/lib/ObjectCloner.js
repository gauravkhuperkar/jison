var dateCloner = require('./DateCloner.js');
var arrayCloner = require('./ArrayCloner.js');

var getValue = function(value) {
  if(value instanceof Array) {
    return arrayCloner.clone(value);
  } else if(value instanceof Date) {
    return dateCloner.clone(value);
  } else if(value instanceof Object) {
    return clone(value);
  }
  return value;
};

var clone = function(object) {
  var cloned = {};
  Object.keys(object).forEach(function(key) {
    if(object[key] === object){
      cloned[key] = cloned;
    }else{
      cloned[key] = getValue(object[key]);
    }
  });
  return cloned;
};

exports.clone = clone;
