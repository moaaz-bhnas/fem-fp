"use strict";

function isPalindrome(str) {
  if (str.length <= 1) return true;

  if (str[0] != str[str.length - 1]) return false;

  return isPalindrome(str.slice(1, str.length - 1));
}

/**
 * 🐱‍🚀: Knowing about JS stacks, can you imaging the size of the call stack if the string is just 1000 characters long?
 * 🐱‍💻: 500 since it's a palindrome. A bit expensice?
 * 🐱‍🚀: Yup, engines are now implementing Tail Call Optimization.
 * 🐱‍💻: What's a tail call?
 * 🐱‍🚀: "a tail call is a specific kind of function call that happens at the very end of a function, where the function returns the result of calling another function. This means that the final action of the function is to call another function. When this happens, there is no need to return to the original function after the call completes." - Chat GPT
 * 🐱‍💻: Like this one. So the engine doesn't need to remember (return) to the original function after the tail call is finished
 * 🐱‍🚀: مسم. بالظبط
 * 🐱‍🚀: Now the call stack is O(1) instead of O(n)
 */

console.log(isPalindrome("") === true);
console.log(isPalindrome("a") === true);
console.log(isPalindrome("aa") === true);
console.log(isPalindrome("aba") === true);
console.log(isPalindrome("abba") === true);
console.log(isPalindrome("abccba") === true);

console.log(isPalindrome("ab") === false);
console.log(isPalindrome("abc") === false);
console.log(isPalindrome("abca") === false);
console.log(isPalindrome("abcdba") === false);
