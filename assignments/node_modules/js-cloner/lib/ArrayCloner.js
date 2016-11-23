var objectCloner = require('./ObjectCloner.js');
var dateCloner = require('./DateCloner.js');

var getValue = function(value) {
  if(value instanceof Array) {
    return clone(value);
  } else if(value instanceof Date) {
    return dateCloner.clone(value);
  } else if(value instanceof Object) {
    return objectCloner.clone(value);
  }
  return value;
};

var clone = function(arrayToClone) {
  var cloned = [];
  arrayToClone.forEach(function(value) {
    if(value === arrayToClone) {
      cloned.push(cloned);
    } else {
      cloned.push(getValue(value));
    }
  });

  return cloned;
};

exports.clone = clone;