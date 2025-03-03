/**************************************** BEST TIME TO BUY AND SELL STOCK  ********************************
 * LEETCODE 1: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
*/

// SOLUTION: USING SINGLE PASS METHOD

var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price; // Update the lowest price found so far
        } else {
            maxProfit = Math.max(maxProfit, price - minPrice); // Calculate max profit
        }
    }

    return maxProfit;
};


