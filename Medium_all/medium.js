/**************************************** BEST TO BUY AND SELL THE STOCK  ********************************
 * LEETCODE 1: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
*/

// SOLUTION:  GREEDY ALGORITHM  USED (We take every local profit instead of waiting for a bigger one → Greedy Algorithm.)

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length - 1; i++) {  
        if (prices[i] < prices[i + 1]) {  // Compare current day with next day
            maxProfit += prices[i + 1] - prices[i];  // Capture profit
        }
    }
    
    return maxProfit;
};
