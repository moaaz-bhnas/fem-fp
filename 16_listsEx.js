"use strict";

// Put your code here! :)

/**
 * Note: in functional programming, contant refer to a function
 * that's wrapped around a value
 */

function constant(x) {
  return function constant() {
    return x;
  };
}

var five = constant(5);
var three = constant(3);
var seven = constant(7);

function add(a, b) {
  return a + b;
}

function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

/**
 * a. Iterative approach
 * 🐱‍🚀: You have a list of fns that u need to sum
 * 🐱‍💻: Izi, use add2 to sum the first two fns, ..
 * 🐱‍🚀: you'll get a number, and a waiting list of fns.
 * numbers and functions are not the same sort
 * so they won't work well together
 *
 * DEFERRING
 * 🐱‍🚀: You can deffer the addition inside another function like so
 */
function addn(...fns) {
  // 🐱‍🚀: First, what is the base case?
  // 🐱‍💻: if (fns.length == 2) stop and sum?
  // 🐱‍🚀: exactly, but since this is the iterative approach
  while (fns.length > 2) {
    let [fn1, fn2, ...rest] = fns;
    fns = [constant(add2(fn1, fn2)), ...rest];
    return addn(...fns);
  }

  return add2(fns[0], fns[1]);
}

/**
 * b. Recursive approach
 */
function addnRecursive(...fns) {
  if (fns.length == 2) {
    return add2(fns[0], fns[1]);
  }

  var [fn1, fn2, ...rest] = fns;
  fns = [constant(add2(fn1, fn2)), ...rest];
  return addnRecursive(...fns);
}

/**
 * c. reduce
 * Note: when u don't pass reduce an initial value, it takes the first element, and start from index 1
 */
function addnReduce(...fns) {
  var bigFn = fns.reduce(function reducer(prev, curr) {
    return constant(add2(prev, curr));
  });

  return bigFn();
}

const result3 = addnReduce(five, three, seven);

console.log({ result3 });

/**
 * 6. Start with an array of odd and even numbers (with some duplicates), and trim it down to only have unique values.
 */
var numbers = [5, 6, 54, 91, 5, 8, 2, 7, 69, 60, 40, 55, 95, 10];

var result = numbers.reduce(function reducer(unique, current) {
  if (!unique.includes(current)) return unique.concat(current);
  return unique;
}, []);

/**
 * 7. Filter your array to only have even numbers in it.
 */
function isEven(x) {
  return x % 2 == 0;
}
result = result.filter(isEven);

/**
 * 8. Map your values to functions, using (4), and pass the new list of functions to the `addn(..)` from (5).
 */
result = result.map(constant);
result = addn(...result);

console.log("🐇", { result });
