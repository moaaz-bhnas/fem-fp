/** Note
 * In practice, we don't call the function itself pure
 * rather, the function call is pure
 */

/** Functions or procedures
 * The first function doesn't return a value, so it's not a function, it's a procedure
 * The second function uses a procedure, so it's not a function too
 */

function addNumbers(a, b, c) {
  const total = a + b + c;
  console.log(total);
}

function extraNumbers(x, ...args) {
  return addNumbers(5, x, ...args);
}

/** Inputs & outputs
 * A function is a relationship between the input and the output
 * and the name of the function needs to communicate that relationship
 * Example:
 */
function shippingRate(size, weight, speed) {
  return (size + 1) * weight + speed;
}

/** Note
 * undefined is a valid return
 * If u have a function that should take id, and return some object
 * undefined is the semantic value if that object wasn't found
 */

/** Side effects
 * A function needs to take direct inputs / outputs
 * Examples of side effects:
 * - Console
 * - Reading files
 * - Network calls
 * - DOM
 * - Timestamps
 * - Random numbers
 * As you can see, they're unavoidable, but they break the function rules
 * So reduce them and make them as obvious as possible
 * An interesting idea to isolate them in a file
 * so when bugs happen, most probably you're gonna need to go look at that file
 */
function shippingRate() {
  rate = (size + 1) * weight + speed;
}

/** Is using an outside variable always impurifies a function?
 * Not if that variable is a constant, not necessarily with "const"
 * If you just know that it won't change
 * In the following example, you'll see that we're using a function variable "add"
 * that can be re-assigned, but we're certain that it won't
 * just try to make it obvious that it won't change
 * an option is to use the const keyword
 */
var discount = 5;

function calculateTotal(itemsPrice, shippingRate) {
  return add(itemsPrice, shippingRate) - discount;
}

/** Reducing surface area
 * You notice in the previous example, to make sure that "discount"
 * variable isn't being re-assigned, a reader must read through the whole program
 * So it might be better to reduce the "surface area"
 */
function calculateTotal(discount) {
  return function add(itemsPrice, shippingRate) {
    return itemsPrice + shippingRate - discount;
  };
}

calculateTotal(5)(50, 4); // both calls here are pure

/** Same input, same output
 * Not much to say 😅
 */

/** Extracting impurity
 * Think of pure function as the core of the program sphere,
 * and side effects are the outer shell
 * If you have a function that does some computation,
 * and changes the DOM accordingly, you could separate the two entities
 */
function addComment(userId, comment) {
  var record = {
    id: uniqueId(),
    userId,
    text: comment,
  };

  var elem = buildComponentElem(record);
  commentsList.appendChild(elem);
}

addComment(1, "Yo"); // ❌

// now this could be
function newComment(userId, comment, uniqueId) {
  var record = {
    id: uniqueId,
    userId,
    text: comment,
  };

  return buildComponentElem(record);
}

const commentId = uniqueId();
var elem = newComment(1, "Yo", 2); // ✔
commentsList.appendChild(elem);

/** Containing Impurity
 * Reduce its surface area
 * If the side effect will pollute our global scope that's bad
 * But if we can reduce its effect to a few lines of code ..
 * How do we contain the impurity here?
 */
var tmdbApi = {
  movie: "Coda",
  isTopMovie() {
    return this.getMovieRating(this.movie) > 5;
  },
  getMovieRating() {
    return Math.ceil(Math.random() * 10);
  },
};

var topMovies = [];

function insertIfTopMovie(movie) {
  tmdbApi.movie = movie;
  if (tmdbApi.isTopMovie()) {
    topMovies.push(movie);
  }
}

insertIfTopMovie("Harry Potter");
insertIfTopMovie("Inception");
insertIfTopMovie("Intersteller");
console.log(topMovies);

/** Solution #1 (wrap the side effect)
 * Instead of effecting th global scope "topMovies", we now pass it to "getTopMovies" function
 * "insertIfTopMovie" is still mutating an outside variable but at least it's not global
 * But we still have a problem.. We're muataing the API.movie
 */
var tmdbApi = {
  movie: "Coda",
  isTopMovie() {
    return this.getMovieRating(this.movie) > 5;
  },
  getMovieRating() {
    return Math.ceil(Math.random() * 10);
  },
};

var topMovies = [];

function getTopMovies(movies, movie) {
  var topMovies = movies.slice();
  insertIfTopMovie(movie);
  return topMovies;

  function insertIfTopMovie(movie) {
    tmdbApi.movie = movie;
    if (tmdbApi.isTopMovie()) {
      topMovies.push(movie);
    }
  }
}

topMovies = getTopMovies(topMovies, "Harry Potter");
topMovies = getTopMovies(topMovies, "Inception");
topMovies = getTopMovies(topMovies, "Intersteller");
console.log(topMovies);

/** Solution #2 (adapter function) "really ugly"
 * Wrapping won't work for "tmdbApi" as it's a third party library
 * The solution is to create an adaptor function that:
 * 1. takes a copy of the states that're gonna change
 * 2. setup an appropriate initial state
 * 3. Do all the side effects
 * 4. Capture the new state
 * 5. restore the old state
 * 6. Return the captured state
 */
var tmdbApi = {
  movie: "Coda",
  isTopMovie() {
    return this.getMovieRating(this.movie) > 5;
  },
  getMovieRating() {
    return Math.ceil(Math.random() * 10);
  },
};

var topMovies = [];

function insertIfTopMovie(movie) {
  tmdbApi.movie = movie;
  if (tmdbApi.isTopMovie()) {
    topMovies.push(movie);
  }
}

function getTopMovies(passedTopMovies, movie) {
  const [originalMovies, originalMovie] = [topMovies, tmdbApi.movie];
  topMovies = passedTopMovies.slice();
  insertIfTopMovie(movie);
  passedTopMovies = topMovies;
  [topMovies, tmdbApi.movie] = [originalMovies, originalMovie];
  return passedTopMovies;
}

topMovies = getTopMovies(topMovies, "Harry Potter");
topMovies = getTopMovies(topMovies, "Inception");
topMovies = getTopMovies(topMovies, "Intersteller");
console.log("🟢", topMovies);

/**
 * Now "getTopMovies" runs as a pure function call:
 * 1. It takes direct input / output
 * 2. It doesn't change the state of the program afterwards
 * 3. And it didn't rely on the state of the program before
 * Note: this is not very practical when dealing with the state of the DOM or the database
 */
