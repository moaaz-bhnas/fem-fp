/** Lazy vs Eager execution
 * Both are enabled via closures, and there's a trade-off
 * It's not one better than the other
 */

/** Lazy
 * you run the computation in the inner function
 * which means it will run every time you run that inner function
 * Do it if you think the repeating will rearely actually happen
 * Don't if you're sure it always will be called. Large CPU consumption
 */
function repeater(count) {
  return function repeatA() {
    return "".padStart(count, "A");
  };
}

var aRepeater = repeater(10);
aRepeater();

/** Eager
 * you run the computation in the outer function
 * Do it if you're sure the inner function will always be called (once)
 */
function repeater(count) {
  var result = "".padStart(count, "A");
  return function repeatA() {
    return result;
  };
}

var aRepeater = repeater(10);
aRepeater();

/** (Memoization) What if we want the best of both worlds?
 * We want to do the work only once
 * but we only want to do it if it's been asked for
 */
function repeater(count) {
  var string;
  return function repeatA() {
    if (str == undefined) {
      string = "".padStart(count, "A");
    }
    return string;
  };
}

var repeatA = repeater("A");
repeatA();
repeatA();

/**
 * But this is not a pure closure, right? string is changing from undefined to string
 * BUT, is repeatA a pure function call.
 * Everytime you call it, it will produce the same output, so yes?
 * yes, but it's not obvious from the code (not readable)
 * memoize to the rescue
 * It's a utility function that, given the same input, returns the same output
 */
function repeater(count) {
  return memoize(function repeatA() {
    return "".padStart(count, "A");
  });
}

/** Cool! Should I use it everywhere then?
 * Predict your code. Is the function gonna be called multiple times with the same input? yes? then that's a good usage.
 * No? Maybe stay with lazy
 */
