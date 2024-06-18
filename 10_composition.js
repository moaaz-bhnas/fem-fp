function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}

// add shipping rate
var tmp = increment(4);
tmp = triple(tmp);
totalCost = basePrice + minus2(tmp);

/** Abstraction
 * before we start, what actually is abstraction?
 * 🐱‍💻: Hiding unnecessary details?
 * well, not exactly
 * Let's say we have two or more things interwined together
 * In the previous example (calculating shipping rate + adding it to base price)
 * Abstraction is about separating these two things apart,
 * and inserting between them a semantic boundary
 * 🐱‍💻: اهم حاجة
 * This allows us to look at one of them and understand it without worrying about the other
 * So it's about separation, not hiding
 * Bare with me
 */

/**
 * In the previous example, you'll notice that temp variable
 * is taking unneeded space
 */
totalCost = basePrice + minus2(triple(increment(4))); // 🐱‍💻: composition?

/**
 * 🐱‍💻: Much more readable
 * 🐱‍💻: I now can understand the code better, the right-hand is calculating the shipping rate
 * 🐱‍🚀: right, but don't you think we have to read too much for one purpose (shipping rate).
 * 🐱‍🚀: 3 function calls? come on
 */

function shippingRate(x) {
  return minus2(triple(increment(x)));
}
totalCost = basePrice + shippingRate(4);

/**
 * 🐱‍🚀: Do you feel the abstraction?
 * 🐱‍💻: Now, they're totally 100% separated
 * 🐱‍💻: I can read/edit shippingRate witout worrying about anything else
 * 🐱‍🚀: and the semantic boundary here is the function name "shippingRate"
 */

/**
 * 🐱‍💻: What?
 * 🐱‍🚀: what?
 * 🐱‍💻: I sense you're gonna add another thing
 * 🐱‍🚀: وبعدين ف سوء الظن دة؟
 * 🐱‍🚀: What if there's a different shipping rate for busy days, and another for night hours?
 * 🐱‍💻: Create a function called nightShippingRate?
 * 🐱‍🚀: Well, that's a solution, but there's another more readable one
 */
var shippingRate = compose(minus2, triple, increment);
var busyShippingRate = compose(minus1, triple, increment);

/**
 * 🐱‍🚀: If you understand composition, this is a much more readable, point-free approach
 */
/** Note
 * pipe() is the reverse of compose()
 */
