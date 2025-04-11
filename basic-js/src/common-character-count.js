const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let count = 0;
  const s1Chars = {};
  for (let char of s1) {
    s1Chars[char] = (s1Chars[char] || 0) + 1;
  }
  for (let char of s2) {
    if (s1Chars[char] > 0) {
      count++
      s1Chars[char]--;
    }
  }
  return count;
}

module.exports = {
  getCommonCharacterCount
};
