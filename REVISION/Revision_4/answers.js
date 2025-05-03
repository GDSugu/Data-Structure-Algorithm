/************************************** REMOVE DUPLICATES FROM SORTED LIST II *************************************************
 * Leetcode 1: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
*/

// SOLUTION: 

var deleteDuplicates = function (head) {
    let dummy = new ListNode(0, head); // Dummy node to handle edge cases

    let prev = dummy;
    let current = head;

    while (current) {
        while (current.next && current.val === current.next.val) {
            current = current.next; // Skip all duplicates
        }

        if (prev.next === current) {
            prev = prev.next; // Move prev forward only if no duplicates were found
        } else {
            prev.next = current.next; // Remove duplicates by linking prev to current.next
        }

        current = current.next; // Move to the next node
    }

    return dummy.next;
};


/************************************** MINIMUM NUMBER OF WORK SESSION TO FINISH THE TASK  *************************************************
 * Leetcode 2: https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/description/
*/

// SOLUTION: BACKTRACKING 

/**
 * @param {number[]} tasks
 * @param {number} sessionTime
 * @return {number}
 */
function minSessions(tasks, sessionTime) {
    tasks.sort((a, b) => b - a); // Sort tasks in descending order
    let n = tasks.length;
    let minSessions = Infinity;

    function backtrack(index, sessions) {
        if (sessions.length >= minSessions) {
            return; // Prune if current sessions exceed the minimum found
        }

        if (index === n) {
            minSessions = Math.min(minSessions, sessions.length);
            return;
        }

        // Try to assign the current task to an existing session
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i] + tasks[index] <= sessionTime) {
                sessions[i] += tasks[index];
                backtrack(index + 1, sessions);
                sessions[i] -= tasks[index]; // Backtrack
            }
        }

        // Start a new session with the current task
        sessions.push(tasks[index]);
        backtrack(index + 1, sessions);
        sessions.pop(); // Backtrack
    }

    backtrack(0, []);
    return minSessions;
}



/****************************************  LONGEST INCREASING SUBSEQUENCE  ********************************
 * Leetcode 3: https://leetcode.com/problems/longest-increasing-subsequence/
*/

// SOLUTION : BINARY SEARCH WITH GREEDY -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let sub = [];

    for (let num of nums) {
        let left = 0, right = sub.length - 1;

        // Binary search to find the first element >= num
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (sub[mid] >= num) right = mid - 1;
            else left = mid + 1;
        }

        // If left is within the array, replace; otherwise, append
        if (left < sub.length) sub[left] = num;
        else sub.push(num);
    }

    return sub.length;
};



/****************************************  REMOVE DUPLICATES FROM THE SORTED ARRAY  ********************************
 * Leetcode 4: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
*/

// SOLUTION : TWO POINTER METHOD -> O(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let i = 0; // Tracks unique element position

    for (let j = 1; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
            i++;  // Move `i` only when we find a new unique element
            nums[i] = nums[j];  // Place the unique element at `i`
        }
    }

    return i + 1;  // Length of unique elements
};



/**************************************** RAIN WATER TRAPPING  ********************************
 * Leetcode 5: https://leetcode.com/problems/trapping-rain-water/
*/

// SOLUTION: TWO POINTER METHOD

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let left = 0; right = height.length - 1;
    let leftMax = 0; rightMax = 0;
    let trappedWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            trappedWater += leftMax - height[left]
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            trappedWater += rightMax - height[right];
            right--;
        }
    }

    return trappedWater;

};



/************************************** FIBONACCI NUMBERS *************************************************
 * Leetcode 6: https://leetcode.com/problems/fibonacci-number/description/
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



/**************************************** BEST TO BUY AND SELL THE STOCK-II  ******************
 * Leetcode 7: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
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



/****************************************  BEST TIME TO BUY AND SELL STOCK-III  ********************************
 * Leetcode 8: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
*/

// SOLUTION: 

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
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



/****************************************  SLIDING WINDOW MAXIMUM  ********************************
 * Leetcode 9: https://leetcode.com/problems/sliding-window-maximum/
*/

// SOLUTION 2: BRUTE FORCE APPROACH -> O(n*k)

var maxSlidingWindow = function (nums, k) {
    let result = [];

    // Iterate over all possible starting positions of the sliding window
    for (let i = 0; i <= nums.length - k; i++) {
        let maxVal = nums[i]; // Assume the first element of the window is the max

        // Iterate over the next k elements to find the max in this window
        for (let j = i; j < i + k; j++) {
            maxVal = Math.max(maxVal, nums[j]);
        }

        result.push(maxVal); // Store the maximum of the current window
    }

    return result;
};

// Example Usage:
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]

// SOLUTION 2: DEQUE (DOUBLE ENDED QUEUE) -> O(n)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let deque = [];  // Store indices
    let result = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove elements out of the current window
        if (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove all elements smaller than the current one
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // Add current element index to deque
        deque.push(i);

        // Store the maximum for the window (only when i >= k - 1)
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
};


/****************************************  MAXIMUM MATRIX SUM  ********************************
 * Leetcode 10: https://leetcode.com/problems/maximum-matrix-sum/description/
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


/************************************** MAXIMIZE THE CONFUSION OF EXAM  *************************************************
 * Leetcode 11: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/
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



/**************************************** LARGEST RTECTANGLE IN HISTOGRAM  ********************************
 * Leetcode 12: https://leetcode.com/problems/largest-rectangle-in-histogram/
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
 * Leetcode 13: https://leetcode.com/problems/super-egg-drop/
*/

// SOLUTION: DYNAMIC PROGRAMMING

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function (k, n) {
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



/************************************** Sum of Square Numbers  ****************************************
 * Leetcode 15: https://leetcode.com/problems/sum-of-square-numbers/
*/

// SOLUTION: TWO POINTER -> O(N)

/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let a = 0;
    let b = Math.floor(Math.sqrt(c));

    while (a <= b) {
        const sum = a * a + b * b;

        if (sum === c) {
            return true;
        } else if (sum < c) {
            a++; // Need a bigger sum
        } else {
            b--; // Need a smaller sum
        }
    }

    return false; // No pair found
};


/************************************** Sort Array by Parity  ****************************************
 * Leetcode 16: https://leetcode.com/problems/sort-array-by-parity/
*/

// SOLUTION: TWO POINTER -> O(N)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while(left <= right){
        if(nums[left] % 2 === 0){
            left++; // Even is in the correct place
        } else {
            // Swap odd to the right side
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--; // Now check the swapped value at nums[left] in next iteration
        }
    }

    return nums;
};