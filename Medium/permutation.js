
/*************************************** Kth PERMUTATION SEQUENCE  ***************************
 * Leetcode 2: https://leetcode.com/problems/permutation-sequence/description/
*/

// Solution:
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    let nums = [];  // Store numbers 1 to n
    let fact = [1]; // Factorials array
    let result = "";

    // Initialize numbers and factorials
    for (let i = 1; i <= n; i++) {
        nums.push(i);
        fact[i] = fact[i - 1] * i;
    }

    k--; // Convert k to 0-based index

    for (let i = n; i > 0; i--) {
        let index = Math.floor(k / fact[i - 1]);
        result += nums[index];  // Add selected number
        nums.splice(index, 1);  // Remove used number
        k %= fact[i - 1];       // Update k
    }

    return result;
};
