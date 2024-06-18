"use strict";

// My initial solution (not pure)
function strBuilder(str) {
  return function build(v) {
    if (typeof str == "string") {
      str += v;
      return build;
    }
    return str;
  };
}

// The actual solution
function strBuilder(str) {
  return function next(v) {
    if (typeof str == "string") {
      return strBuilder(str + v);
    }
    return str;
  };
}

/** The takeaway
 * Functional programming is built on top of closures
 * Try to make them pure
 * The variables closed over should be changable
 */

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

console.log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
console.log(hello() === "Hello, ");
console.log(kyle() === "Hello, Kyle");
console.log(susan() === "Hello, Susan");
console.log(question === "Hello, Kyle?");
console.log(greeting === "Hello, Susan!");
