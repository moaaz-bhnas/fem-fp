/** Immutability
 * 🐱‍💻: Well, I know that one. data shouldn't change unexpectedly. We need to control state changes
 * 🐱‍🚀: Yes, but what kind of data?
 * 🐱‍🚀: You know that primitve types (e.g. 10) can never change
 * 🐱‍💻: So it's array and objects that we need to care for
 * 🐱‍🚀: Exactly, and value that is immutable
 */

var cart = {
  lineItems: [],
  totalPrice: 0,
};
cart.totalPrice = 10;
validate(cart);
addCartToDatabase(cart);

/**
 * 🐱‍🚀: This code should make you worry
 * 🐱‍🚀: "What might happen to this cart that's passed by reference before I send it to the database?"
 * 🐱‍💻: Object.freeze()?
 * 🐱‍🚀: Yes, it makes all the properties of an object readonly, but not it's shallow, won't work with nested objects
 */
validate(Object.freeze(cart));
addCartToDatabase(Object.freeze(cart));

/**
 * 🐱‍🚀: Now you communicated to the reader that they never should worry about that object
 */

function validate(cart) {
  if (cart.totalPrice < 0) {
    cart.error = "Total price error";
  }
  return cart;
}

/**
 * 🐱‍🚀: Let's say that you're the author of the "validate" function
 * 🐱‍💻: This is impure. I shoudln't change what's passed by reference
 * 🐱‍🚀: Exactly, always assume that passed data are readonly and make a copy instead
 */

function validate(cart) {
  var validatedCart = { ...cart };
  if (validatedCart.totalPrice < 0) {
    validatedCart.error = "Total price error";
  }
  return validatedCart;
}

/** Immutable Data Structures
 * 🐱‍🚀: Now, when you need to change the data passed in
 * 🐱‍💻: I create a copy 😉
 * 🐱‍🚀: Yup, but what if ..
 * 🐱‍💻: Don't.
 * 🐱‍🚀: What if you need to track the changes happening to that data like a state in React.js as it changes a lot
 * 🐱‍🚀: Immutable Data Structure. It doesn't give you access to the actual data, rather to an API to prevent accedents
 * 🐱‍🚀: Everytime you change, you get a new version
 * 🐱‍🚀: An example would be cart in "Shemsi" where u can have a state for it in thank-you page while it's deleted after the payment
 * 🐱‍💻: Isn't that very expensive? As the cart changes a real lot
 * 🐱‍🚀: What immutable data structures actually do is not create a whole new structure everytime, it make a new object with the the new changes and a pointer to the old
 * 🐱‍🚀: However, it's not yet implemented in JavaScript, so you'll have to use a library
 */
