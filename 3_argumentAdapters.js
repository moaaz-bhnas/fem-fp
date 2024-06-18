/** Shape of a function
 * something descided by its inputs/ouptuts
 * 1. unary: Single input, single output
 * 2. binary: 2 inputs, single output
 * 3. enary
 */

// unary
function increment(x) {
  return sum(x, 1);
}

// binary
function sum(x, y) {
  return x + y;
}

/** Shape adapter
 * A function in one shape can be adapted to have a different shape
 * Here, we restrict an n-ary function to be a unary function
 */
function nary(...args) {
  return args;
}

function unaryHof(fn) {
  return function one(arg1) {
    return fn(arg1);
  };
}

function binaryHof(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

var naryToUnary = unaryHof(nary);

/** Shape adapter flip
 */
function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  };
}

function f(...args) {
  return args;
}

var flippedF = flip(f);

console.log(flippedF(1, 2, 3, 4)); // [2, 1, 3, 4]

/** Excercise
 * Create a function that reverses all the arguments
 */
function reverseArguments(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}

/** Note
 * When you find yourself messing around with the shape of a function they don't fit:
 * 1. Can I change the shape of my function at definition, so that it fits better,
 * 2. If not, can I make an adapter to make it fit
 */

/**
 * What if I had a function that expects several arguments,
 * but I need to call it with an array
 * This function is often called "apply"
 */
function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args);
  };
}

function f(x, y, z, w) {
  return x + y + z + w;
}

const g = spreadArgs(f);

/** Excercise
 * Unspread. You have a function that takes an array,
 * and you need to call it with several arguments
 */
function unspread(fn) {
  return function (...args) {
    return fn(args);
  };
}
