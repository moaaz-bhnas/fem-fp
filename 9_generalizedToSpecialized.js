function ajax(url, data, cb) {
  /** */
}

ajax(CUSTOMER_API, { id: 1 }, renderCustomers);

/**
 * There's nothing wrong with the call,
 * but for getting a customer, this call show more data than needed
 * Let's try to specialize it
 */

function getCustomer(data, cb) {
  return ajax(CUSTOMER_API, data, cb);
}

getCustomer({ id: 1 }, renderCustomer);

/**
 * Much more delarative
 * We can even specialize more for the current authed user
 */

function getCurrentCustomer(cb) {
  // return ajax(CUSTOMER_API, { id: 1 }, cb);
  return getCustomer({ id: 1 }, cb);
}

getCurrentCustomer(renderCustomer);

/**
 * Nice! but why not declare the function in terms of ajax
 * "getCustomer" strongly show the relationship
 * that "getCurrentCustomer" is a specialization of "getCustomer"
 *
 * Now, can we specialize in a point-free manner?
 */

function ajax(url, data, cb) {
  /** */
}

ajax(CUSTOMER_API, { id: 1 }, renderCustomers);
var getCustomer = partial(ajax, CUSTOMER_API);
var getCurrentCustomer = partial(getCustomer, { id: 1 });

/**
 * Wow!
 * This is called "Partial Application"
 * "partial" utility takes a function as it's first input,
 * then a set of arguments to pass to the funciton
 * Partially setting thr inputs noe, receiving some later
 * Notice that we had to call "partial" twice
 */

function ajax(url) {
  return function getData(data) {
    return function getCb(cb) {};
  };
}

// equational reasoning?
var getCustomer = ajax(CUSTOMER_API);
var getCurrentCustomer = getCustomer({ id: 1 });

/** Currying
 * you pass an argument, you get a more specialized function
 * Is there a utility instead of that manual currying?
 */
var ajax = curry(3, function ajax(url, data, cb) {
  /** */
});
var getCustomer = ajax(CUSTOMER_API);
var getCurrentCustomer = getCustomer({ id: 1 });

// Loose currying
var getCurrentCustomer = ajax(CUSTOMER_API, { id: 1 });

/**
 * Partial application vs Currying
 * both for specializing
 * Partial application takes some inputs now, rest later
 * Currying takes no inputs now, later one at a time
 */

function add(a, b) {
  return a + b;
}

[1, 2, 3].map(function addOne(element) {
  return add(1, element);
});

/**
 * Here, how can transform the callback of the .map() funviton to be point-free?
 */

add = curry(add);
[1, 2, 3].map(add(1));
