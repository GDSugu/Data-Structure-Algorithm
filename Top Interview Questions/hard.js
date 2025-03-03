/**************************************** REGULAR EXPRESSION MATCHING  ********************************
 * LEETCODE 1: https://leetcode.com/problems/regular-expression-matching/description/
*/

// SOLUTION:  



/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:  



/**************************************** RAIN WATER TRAPPING  ********************************
 * LEETCODE 3: https://leetcode.com/problems/trapping-rain-water/
*/

// SOLUTION: TWO POINTER METHOD

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0; right = height.length - 1;
    let leftMax = 0; rightMax = 0;
    let trappedWater = 0;

    while(left < right){
        if(height[left] < height[right]){
            leftMax = Math.max(leftMax,height[left]);
            trappedWater+= leftMax - height[left]
            left++;
        }else{
            rightMax = Math.max(rightMax, height[right]);
            trappedWater+= rightMax - height[right];
            right--;
        }
    }

    return trappedWater;

};

/**************************************** LARGEST RTECTANGLE IN HISTOGRAM  ********************************
 * LEETCODE 4: https://leetcode.com/problems/largest-rectangle-in-histogram/
*/

// SOLUTION: MONOTONIC INCREASING STACK

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    let stack = [];
    heights.push(0); // Append 0 to ensure all elements get processed

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()]; // Get the height of the popped bar
            let width;
            
            if (stack.length === 0) {
                width = i; // No left boundary, so width spans from 0 to i
            } else {
                width = i - stack[stack.length - 1] - 1; // Width is between current index and previous stack top
            }

            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i); // Push the current index to the stack
    }

    return maxArea;
};

/****************************************  SUPER EGG DROP  ********************************
 * LEETCODE 4: https://leetcode.com/problems/super-egg-drop/
*/

// SOLUTION: DYNAMIC PROGRAMMING

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
    let dp = new Array(k + 1).fill(0);
    let moves = 0;

    while (dp[k] < n) {  // Keep increasing moves until we can check all n floors
        moves++;
        for (let egg = k; egg > 0; egg--) {
            dp[egg] = dp[egg - 1] + dp[egg] + 1;
        }
    }

    return moves;  // Return after the loop completes
};


/****************************************  BEST TIME TO BUY AND SELL STOCK  ********************************
 * LEETCODE 4: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
*/

// SOLUTION: 

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let firstBuy = Infinity;
    let firstProfit = 0;
    let secondBuy = Infinity;
    let secondProfit = 0;

    for (let price of prices) {
        firstBuy = Math.min(firstBuy, price);                 // Min price to buy first stock
        firstProfit = Math.max(firstProfit, price - firstBuy); // Max profit from first sell
        
        secondBuy = Math.min(secondBuy, price - firstProfit);  // Min cost to buy second stock
        secondProfit = Math.max(secondProfit, price - secondBuy); // Max profit from second sell
    }

    return secondProfit; // Max profit after at most two transactions
};

