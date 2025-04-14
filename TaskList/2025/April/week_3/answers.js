/************************************** COIN CHANGE - II  *************************************************
 * Leetcode 1: htthttps://leetcode.com/problems/coin-change-ii/
*/

// SOLUTION: DYNAMIC PROGRAMMING -> O(amount * coins)

/**
 * @param {number} amount - The total amount we want to make change for.
 * @param {number[]} coins - An array of different coin denominations.
 * @return {number} - The number of combinations to make up that amount.
 */
var change = function(amount, coins) {
    
    // Initialize a dp array where dp[i] represents the number of ways to make amount 'i'
    let dp = new Array(amount + 1).fill(0);

    // There is 1 way to make amount 0 — by choosing no coins at all.
    dp[0] = 1;

    // Loop through each coin denomination
    for (let coin of coins) {
        // For each amount from coin value up to the target amount
        for (let i = coin; i <= amount; i++) {
            // Add the number of ways to make (i - coin) to dp[i]
            // Because we can form amount 'i' by adding this coin to combinations that make 'i - coin'
            dp[i] += dp[i - coin];
        }
    }

    // The answer is the number of ways to make the full amount
    return dp[amount];
};
