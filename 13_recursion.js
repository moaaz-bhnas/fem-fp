/**
 * 🐱‍💻: يا دين أمي
 * 🐱‍🚀: استنى بس 😂
 */
function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char);
}

function countVowels(str) {}

countVowels("Moaaz"); // 3

/**
 * 🐱‍💻: احلى for loop
 * 🐱‍🚀: وريني
 */
function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char);
}

function countVowels(str) {
  var result = 0;
  for (var i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      result++;
    }
  }
  return result;
}

countVowels("Moaaz"); // 3

/**
 * 🐱‍🚀: متفق معايا انك لازم تفكر عشان تفهم اللوب ماشية ازاي
 * 🐱‍💻: بصراحة اه
 * 🐱‍🚀: تعالى نفكر فيها بطريقة تانية ابسط شوية
 * الدالة دة بتتوفع عدد لسة منعرفوش من الحروف
 * ايه رأيك نفكر بس ف أول حرف وبعدها نشوف الباقي
 * Reducing the problem set
 * (هل الحرف الاولاني "فاول" ولا لا + باقي الحروف الفاولز)
 * 🐱‍🚀: تيجي نحاول نحلها ريكيرسيفلي؟
 * 🐱‍💻: عاجباني بالعربي، يلا
 */

/**
 * 🐱‍🚀: First thing is to know (when to stop) = (base condition)
 * 🐱‍🚀: What do u think? When should we stop?
 * 🐱‍💻: If we're reducing the string each iteration, then when the string is empty?
 * 🐱‍🚀: ♥. You need to have at least one of those
 */

function countVowels(str) {
  if (str.length == 0) return 0; // When should I stop? when the string is empty
  const first = isVowel(str[0]) ? 1 : 0; // is the first letter vowel (smaller problem)
  return first + countVowels(str.slice(1)); // + rest of vowels number
}

/**
 * 🐱‍🚀: Something annoys me about this code though
 * 🐱‍💻: Who cares
 * 🐱‍🚀: That you ..
 * 🐱‍💻:انت مصمم!
 * 🐱‍🚀: you have to always make a call on an empty string
 * 🐱‍💻: You want to return after you know whether the last character is vowel?
 * Check this solution
 */

function countVowels(str) {
  const first = isVowel(str[0]) ? 1 : 0; // Do the work first
  if (str.length == 1) return first; // Decide what to return here
  return first + countVowels(str.slice(1));
}
