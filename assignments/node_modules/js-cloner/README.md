# cloner
a simple cloner for deep cloning all Javascript objects

```
var cloner = require('js-cloner');

var numbers = [1, 2, 3];
var numbersClone = cloner.clone(numbers);

var cloned = cloner.clone({
  'alpahbets': {
    'a':1,
    'b':2,
    'z':26
  },
  numbers: [1, 2, 3],
  self: this
});

```
