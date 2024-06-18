"use strict";

function increment(x) {
  return x + 1;
}
function decrement(x) {
  return x - 1;
}
function double(x) {
  return x * 2;
}
function half(x) {
  return x / 2;
}

function reverseArgs(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}

function pipe(...functions) {
  return function piped(value) {
    var result = functions[0](value);
    for (var i = 1; i < functions.length; i++) {
      result = functions[i](result);
    }

    return result;
  };
}

var compose = reverseArgs(pipe);

var f1 = compose(increment, decrement);
var f2 = pipe(decrement, increment);
var f3 = compose(decrement, double, increment, half);
var f4 = pipe(half, increment, double, decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log(f1(3) === 3);
console.log(f1(3) === f2(3));
console.log(f3(3) === 4);
console.log(f3(3) === f4(3));
console.log(f5(3) === 4);
console.log(f5(3) === f6(3));
