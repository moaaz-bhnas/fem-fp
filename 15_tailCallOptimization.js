function countVowels(str) {
  const first = isVowel(str[0]) ? 1 : 0; // Do the work first
  if (str.length == 1) return first; // Decide what to return here
  return first + countVowels(str.slice(1));
}

/**
 * 🐱‍🚀: Knowing about Tail Call Optimization, can you optimize this function?
 * 🐱‍💻: "first" here is what makes the engine goes back an execution context.
 * Instead of keeping it at the current execution context, let's pass it to the next one.
 * Then we would never need to go back
 */

function countVowels(count, str) {
  count += isVowel(str[0]) ? 1 : 0; // Do the work first
  if (str.length == 1) return count; // Decide what to return here
  return countVowels(count, str.slice(1));
}

countVowels(0, "Moaaz Bhnas");

/**
 * 🐱‍🚀: Ugly function call, no?
 * I'll give a nice trick 😉
 */

var countVowels = curry(2, function countVowels(count, str) {
  count += isVowel(str[0]) ? 1 : 0; // Do the work first
  if (str.length == 1) return count; // Decide what to return here
  return countVowels(count, str.slice(1));
})(0);

/**
 * 🐱‍🚀: One last problem: not all engines have implemented the Tail Call Optimization
 * 🐱‍💻: هنعمل ايه!!
 * 🐱‍🚀: Another trick 😉
 * What if you have a wrapper function that calls your recursive function in a while loop
 * It keeps running as long as your recursive returns a function
 * 🐱‍💻: Weird
 * 🐱‍🚀: This technique is called Trampoline
 */

function trampoline(fn) {
  return function trampolined(...args) {
    var result = fn(args);

    while (typeof result == "function") {
      result = result();
    }

    return result;
  };
}

var countVowels = trampoline(function countVowels(count, str) {
  count += isVowel(str[0]) ? 1 : 0;
  if (str.length == 1) return count;
  // The only difference is that you wrap whatever returned in a function
  return function f() {
    countVowels(count, str.slice(1));
  };
});
countVowels = curry(2, countVowels)(0);
