













/************************************** FIBONACCI NUMBERS *************************************************
 * Leetcode 9: https://leetcode.com/problems/fibonacci-number/description/
*/

// SOLUTION 1: RECURSION -> O(2^n)

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0) return 0; // Base case
    if (n === 1) return 1; // Base case
    
    return fib(n - 1) + fib(n - 2); // Recursive call
};


// SOLUTION 2: BOTTOM UP APPROACH -> O(n)

/**
 * @param {number} n - The index of the Fibonacci sequence.
 * @return {number} - The nth Fibonacci number.
 */
var fib = function(n) {
    // Base cases: 
    if (n === 0) return 0; // Fibonacci(0) = 0
    if (n === 1) return 1; // Fibonacci(1) = 1

    // Initialize two variables to store the last two Fibonacci numbers
    let prev2 = 0; // Fibonacci(n-2)
    let prev1 = 1; // Fibonacci(n-1)

    // Iterate from 2 to n to compute Fibonacci numbers iteratively
    for (let i = 2; i <= n; i++) {
        let current = prev1 + prev2; // Compute current Fibonacci number

        // Update prev1 and prev2 using array destructuring
        [prev1, prev2] = [current, prev1];
    }

    // Return the nth Fibonacci number
    return prev1;
};

// Example runs
console.log(fib(10)); // Output: 55
console.log(fib(50)); // Output: 12586269025

/****************************************  MAXIMUM MATRIX SUM  ********************************
 * Leetcode 11: https://leetcode.com/problems/maximum-matrix-sum/description/
*/

// SOLUTION : GREEDY ALGORITHM -> O(n^2)

/**
 * @param {number[][]} matrix
 * @return {number}
 */

var maxMatrixSum = function(matrix) {

    let totalSum = 0;
    let totalNegativeCount = 0;
    let minAbsolute = Infinity;
    
    for(let row of matrix){
        for(let value of row){
            totalSum+= Math.abs(value);
            if(value < 0){
                totalNegativeCount++;
            }
            minAbsolute = Math.min(minAbsolute,Math.abs(value))
        }
    }

    if(totalNegativeCount % 2 === 0){
        return totalSum;
    }

    return totalSum -2 * minAbsolute;
};

/**************************************** BEST TO BUY AND SELL THE STOCK  ******************
 * Leetcode 12: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
*/

// SOLUTION: GREEDY ALGORITHM -> O(n)

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;

    for(let i=0; i<prices.length; i++){
        if(prices[i] < prices[i+1] ){
            currentProfit = prices[i+1] - prices[i];
            maxProfit+= currentProfit;
        }
    }

    return maxProfit;
};


/************************************** MAXIMIZE THE CONFUSION OF EXAM  *************************************************
 * Leetcode 13: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/
*/

// SOLUTION: SLIDING WINDOW + TWO POINTER -> O(N)

/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function(answerKey, k) {
    const n = answerKey.length;

    // Function to find the longest subarray with at most k changes
    const maxConsecutiveChar = (key) => {
        let maxLen = 0, left = 0, count = 0;

        for (let right = 0; right < n; right++) {
            if (answerKey[right] !== key) count++; // Count the changes needed
            
            // Shrink window if too many changes
            while (count > k) {
                if (answerKey[left] !== key) count--; // Restore original count
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    };

    return Math.max(maxConsecutiveChar('T'), maxConsecutiveChar('F'));
};


/************************************** MAXIMUM SUM SUBARRAY  *************************************************
 * Leetcode 14: https://leetcode.com/problems/maximum-subarray/
*/

// SOLUTION: KADANE'S ALGORITHM -> O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    let maxSum = nums[0];  // Stores the maximum sum found
    let currentSum = 0;    // Tracks the current subarray sum

    for (let num of nums) {
        currentSum = Math.max(num, currentSum + num); // Extend or restart subarray
        maxSum = Math.max(maxSum, currentSum); // Update max sum if needed
    }

    return maxSum;
}

// Test Cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6
console.log(maxSubArray([1])); // Output: 1
console.log(maxSubArray([5,4,-1,7,8])); // Output: 23

