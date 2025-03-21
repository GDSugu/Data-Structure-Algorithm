
/************************************** SPIRAL MATRIX  *************************************************
 * Leetcode 1: https://leetcode.com/problems/spiral-matrix/description/
*/

// SOLUTION: ITERATIVE USING BOUNDARIES


function spiralOrder(matrix) {
    if (!matrix.length || !matrix[0].length) return [];
    
    let result = [];
    let firstRow = 0, lastRow = matrix.length - 1;
    let firstCol = 0, lastCol = matrix[0].length - 1;
    
    while (firstRow <= lastRow && firstCol <= lastCol) {
        // Traverse from left to right (along firstRow)
        for (let i = firstCol; i <= lastCol; i++) {
            result.push(matrix[firstRow][i]);
        }
        firstRow++;
        
        // Traverse from top to bottom (along lastCol)
        for (let i = firstRow; i <= lastRow; i++) {
            result.push(matrix[i][lastCol]);
        }
        lastCol--;
        
        // Traverse from right to left (along lastRow, if valid)
        if (firstRow <= lastRow) {
            for (let i = lastCol; i >= firstCol; i--) {
                result.push(matrix[lastRow][i]);
            }
            lastRow--;
        }
        
        // Traverse from bottom to top (along firstCol, if valid)
        if (firstCol <= lastCol) {
            for (let i = lastRow; i >= firstRow; i--) {
                result.push(matrix[i][firstCol]);
            }
            firstCol++;
        }
    }
    
    return result;
}

// Example usage
let matrix = [
  [1,  2,  3,  4 ],
  [5,  6,  7,  8 ],
  [9, 10, 11, 12]
];
console.log(spiralOrder(matrix)); 
// Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]


/************************************** SUM OF TWO INTEGERS  *************************************************
 * Leetcode 2: https://leetcode.com/problems/spiral-matrix/description/
*/

// SOLUTIONS: BITWISE OPERATOR

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    while (b !== 0) {
        let carry = (a & b) << 1; // Carry shifted left
        a = a ^ b; // Sum without carry
        b = carry; // Move carry to next iteration
    }
    return a;
};

/************************************** SUB ARRAY PRODUCT LESS THAN K  *************************************************
 * Leetcode 3: https://leetcode.com/problems/subarray-product-less-than-k/
*/

// SOLUTION: SLIDING WINDOW + TWO POINTER APPROACH

function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0; // Edge case

    let left = 0; // Left boundary of the window
    let product = 1; // Product of elements in the window
    let count = 0; // Count of valid subarrays

    for (let right = 0; right < nums.length; right++) {
        product *= nums[right]; // Expand the window

        // Shrink the window if product >= k
        while (product >= k) {
            product /= nums[left];
            left++;
        }

        // Count valid subarrays ending at `right`
        count += right - left + 1;
    }

    return count;
}


/************************************** COMBINATIONS  *************************************************
 * Leetcode 4: https://leetcode.com/problems/combinations/
*/

// SOLUTIONS: BACKTRACKING AND RECURSION

var combine = function(n, k) {
    let result = [];

    function backtrack(start, currentCombination) {
        // Base case: if the current combination is of size k, add it to the result
        if (currentCombination.length === k) {
            result.push([...currentCombination]); // Make a copy of the combination
            return;
        }

        // Explore all possible numbers from start to n
        for (let i = start; i <= n; i++) {
            currentCombination.push(i); // Add the current number to the combination
            backtrack(i + 1, currentCombination); // Recursively explore further
            currentCombination.pop(); // Backtrack: remove the last number
        }
    }

    // Start the backtracking process
    backtrack(1, []);
    return result;
};

/************************************** FIND ALL SUBSETS  *************************************************
 * Leetcode 5: https://leetcode.com/problems/subsets/
*/

// SOLUTIONS: BACKTRACKING
var subsets = function(nums) {
    const result = []; // To store all subsets

    // Backtracking function
    function backtrack(start, currentSubset) {
        // Add the current subset to the result
        result.push([...currentSubset]);

        // Explore all possible numbers from start to the end of nums
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]); // Add the current number to the subset
            backtrack(i + 1, currentSubset); // Recursively explore further
            currentSubset.pop(); // Backtrack: remove the last number
        }
    }

    // Start the backtracking process
    backtrack(0, []);
    return result;
};


/****************************************  COIN CHANGE PROBLEM  ********************************
 * Leetcode 6: https://leetcode.com/problems/coin-change/
*/

// SOLUTION : DYNAMIC PROGRAMMING (Bottom-Up DP APPROACH)


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // Base case: 0 coins needed for amount 0

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

/************************************** COMBINATION SUMS  *************************************************
 * Leetcode 7: https://leetcode.com/problems/combination-sum/description/
*/

// SOLUTION 1: BACKTRACKING -> O(n^T)

var combinationSum = function(candidates, target) {
    let result = [];

    function backtrack(start, combination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...combination]);
            return;
        }
        if (remainingTarget < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            combination.push(candidates[i]);
            backtrack(i, combination, remainingTarget - candidates[i]);
            combination.pop();  // Undo the last choice
        }
    }

    backtrack(0, [], target);
    return result;
};

// Example Usage:
console.log(combinationSum([2,3,6,7], 7)); // Output: [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8));   // Output: [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1));       // Output: []

// SOLUTION 2: BACKTRACKING + SORTING -> O(n^T)

function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b); // Step 1: Sort the array
    let result = [];

    function backtrack(start, path, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...path]); // Found a valid combination
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remainingTarget) break; // Early stopping

            path.push(candidates[i]);
            backtrack(i, path, remainingTarget - candidates[i]); // Allow repeated elements
            path.pop(); // Backtrack
        }
    }

    backtrack(0, [], target);
    return result;
}

// Example Test Cases
console.log(combinationSum([2,3,6,7], 7)); // Output: [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // Output: [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)); // Output: []

/************************************** COMBINATION SUMS - II  *************************************************
 * Leetcode 8: https://leetcode.com/problems/combination-sum-ii/
*/

// SOLUTION: SORTING + BACKTRACKING -> O(n^T)
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b); // Step 1: Sort to handle duplicates
    let result = [];

    function backtrack(start, combination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...combination]); // Found a valid combination
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue; // Step 2: Skip duplicates

            if (candidates[i] > remainingTarget) break; // Optimization: Stop if number exceeds target

            combination.push(candidates[i]);
            backtrack(i + 1, combination, remainingTarget - candidates[i]); // Move to next index
            combination.pop(); // Undo choice (backtrack)
        }
    }

    backtrack(0, [], target);
    return result;
};

// Example Test Cases
console.log(combinationSum2([10,1,2,7,6,1,5], 8));
// Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

console.log(combinationSum2([2,5,2,1,2], 5));
// Output: [[1,2,2],[5]]


/************************************** FIBONACCI NUMBERS *************************************************
 * Leetcode 9: https://leetcode.com/problems/combination-sum-ii/
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

/************************************** CLIMBING STAIRS *************************************************
 * Leetcode 10: https://leetcode.com/problems/climbing-stairs/
*/

// SOLUTION 1: RECURSION -> O(2^n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1; // Only one way to climb 1 step
    if (n === 2) return 2; // Two ways: (1+1) or (2)

    return climbStairs(n - 1) + climbStairs(n - 2); // Sum of ways to reach (n-1) and (n-2)
};

// Example
console.log(climbStairs(3)); // Output: 3
console.log(climbStairs(5)); // Output: 8

// SOLUTION 2: BOTTOM - UP APPROACH -> O(n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    let prev2 = 1, prev1 = 2;

    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        [prev2, prev1] = [prev1, current];
    }

    return prev1;
};


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


let largeArr = Array.from({ length: 100 }, (_, i) => i + 1);

// ✅ Precompute the HashMap outside the function
let map = new Map(largeArr.map(num => [num, num]));

function findValueLarge(arr) {
    for (let num of arr) {
        if (num === 50) {
            return;
        }
    }
}

function hashmapValueLarge() {
    map.has(50); // ✅ Only lookup, no creation
}

console.time("Large Array Search");
findValueLarge(largeArr);
console.timeEnd("Large Array Search");

console.time("Large HashMap Search");
hashmapValueLarge();
console.timeEnd("Large HashMap Search");
