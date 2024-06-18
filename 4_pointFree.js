/** Point free: https://divyanshu013.dev/blog/point-free-programming-and-composition/#:~:text=In%20simpler%20terms%2C%20point%20free,reasoning%20in%20more%20functional%20languages.
 * Defining a function without needing to define its points (inputs)
 * It instead focuses more on combinators and composition to manipulate the arguments themselves.
 * point free programming focuses on eliminating unnecessary parameters and arguments from the code.
 * This methodology is also sometimes referred to as equational reasoning in more functional languages.  equational reasoning is a means to make a program point free.
 */

/**
 * Equational reasoning
 * If two functions have the same shape (even if they do different things),
 * then they are interchangable
 */
["a", "b"].map(function format(letter) {
  return capitalize(letter);
});
["a", "b"].map(capitalize); // point-free

/** Point-free refactoring
 * Can I define isEven in terms of isOdd without having
 * to list "number" that's being passed in? As it's unnecessary detail (imperative)
 * It's a "pointed-definition". Can I make it point-free
 */
function isOdd(number) {
  return number % 2 == 1;
}
function isEven(number) {
  return !isOdd(number);
}

// =>

function not(fn) {
  return function (...args) {
    return !fn(...args);
  };
}

const isEven = not(isOdd);

/** Notes
 * Predicate: a function that returns a boolean
 * Composition: on function call;s output immediately becoming input of another function e.g. print(generateName())
 */

/** Let's take an equational reasoning trip
 * We previously defined isEven in terms of idOdd
 * What if we want also "isOdd" to be point-free?
 */
// In FP libraries, you'll find these two utils, the shape matters, the order y, x also matters
function mod(y) {
  return function forX(x) {
    return x % y;
  };
}
function eq(y) {
  return function forX(x) {
    return x == y;
  };
}
var mod2 = mod(2); // a function that takes an imput, mod it with2
var eq1 = eq(1); // a function that takes an input, == 1

// Let's do isOdd
function isOdd(number) {
  return eq1(mod2(number)); // composition
}

// We're half way. Take a break ..
// Welcome back, did you notice we used composition in the previous function?
// Forgot to tell u about another commenly used function in FP
function compose(fn2, fn1) {
  return function composed(v) {
    return fn2(fn1(v));
  };
}
/**
 * Notice here "composed" is the same shape as "isOdd" *equational reasoning*
 * Equational reasoning is at the heart of point-free
 */

var isOdd = compose(eq1, mod2);
// We can also say
var isOdd = compose(eq(1), mod(2));
