/************************************** REMOVE DUPLICATES FROM SORTED LIST II *************************************************
 * Leetcode 1: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
*/

// SOLUTION: TWO POINTER TECHNIQUE + DUMMY NODE -> O(N)

var deleteDuplicates = function (head) {
    // Create a dummy node that points to the head of the list.
    // This helps in handling edge cases where the head itself might be a duplicate.
    let dummy = new ListNode(0, head); 

    // 'prev' will always point to the last node before the sequence of duplicates.
    let prev = dummy;

    // 'current' is used to scan through the list.
    let current = head;

    // Traverse the entire list
    while (current) {

        // Skip all nodes that have the same value as 'current'
        // This loop moves 'current' to the last node of a group of duplicates.
        while (current.next && current.val === current.next.val) {
            current = current.next;
        }

        // Check if 'prev.next' is still 'current'.
        // If true, no duplicates were found for 'current', so move 'prev' forward.
        if (prev.next === current) {
            prev = prev.next;
        } else {
            // If 'prev.next' is not 'current', duplicates were found.
            // So we skip the entire duplicate sequence by pointing 'prev.next' to 'current.next'.
            prev.next = current.next;
        }

        // Move 'current' to the next node to continue the process
        current = current.next;
    }

    // Return the cleaned-up list, skipping the dummy node
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
    let increasingSequence = [];

    for (let num of nums) {
        let left = 0, right = increasingSequence.length - 1;

        // Binary search to find the first element >= num
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (increasingSequence[mid] >= num) right = mid - 1;
            else left = mid + 1;
        }

        // If left is within the array, replace; otherwise, append
        if (left < increasingSequence.length) {
            increasingSequence[left] = num;
        } else {
            increasingSequence.push(num);
        }
    }

    return increasingSequence.length;
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
    // Edge case: if the array is empty, return 0
    if (nums.length === 0) return 0;

    let left = 0;      // Points to the position of the last unique element
    let count = 1;     // Start with 1 because the first element is always unique

    // Start from the second element and iterate through the array
    for (let right = 1; right < nums.length; right++) {
        // If current element is not equal to the last unique element
        if (nums[right] !== nums[left]) {
            left++;                        // Move the left pointer forward
            nums[left] = nums[right];     // Overwrite the duplicate with the new unique element
            count++;                      // Increase the count of unique elements
        }
        // If nums[right] === nums[left], do nothing (skip the duplicate)
    }

    // Return the number of unique elements
    return count;
};


/**************************************** RAIN WATER TRAPPING  ********************************
 * Leetcode 5: https://leetcode.com/problems/trapping-rain-water/
*/

// SOLUTION: TWO POINTER METHOD -> O(N)

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    // Initialize two pointers: left starts at 0, right starts at the last index
    let left = 0;
    let right = height.length - 1;
    
    // Initialize variables to store the maximum heights encountered so far from left and right
    let leftMax = 0;
    let rightMax = 0;
    
    // Variable to store the total trapped water
    let trappedWater = 0;

    // While the two pointers haven't crossed each other
    while (left < right) {
        // If the height at the left pointer is smaller than the height at the right pointer
        if (height[left] < height[right]) {
            // Update leftMax to be the greater of the current leftMax or the current height[left]
            leftMax = Math.max(leftMax, height[left]);

            // Calculate the trapped water at the current left position (if any)
            trappedWater += leftMax - height[left];

            // Move the left pointer to the right
            left++;
        } else {
            // If the height at the right pointer is smaller or equal to the height at the left pointer
            // Update rightMax to be the greater of the current rightMax or the current height[right]
            rightMax = Math.max(rightMax, height[right]);

            // Calculate the trapped water at the current right position (if any)
            trappedWater += rightMax - height[right];

            // Move the right pointer to the left
            right--;
        }
    }

    // Return the total trapped water
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

    let totalSum = 0;                // Total sum of absolute values
    let totalNegativeCount = 0;     // Count of negative numbers in the matrix
    let minAbsolute = Infinity;     // Track the smallest absolute value in the matrix
    
    // Loop through every element in the 2D matrix
    for (let row of matrix) {
        for (let value of row) {
            totalSum += Math.abs(value);  // Add absolute value to total sum

            if (value < 0) {
                totalNegativeCount++;     // Count how many values are negative
            }

            // Update the smallest absolute value seen so far
            minAbsolute = Math.min(minAbsolute, Math.abs(value));
        }
    }

    // If the number of negative values is even,
    // we can flip all to positive → maximum sum possible
    if (totalNegativeCount % 2 === 0) {
        return totalSum;
    }

    // If there's an odd number of negatives,
    // one value must remain negative.
    // To minimize the loss, we leave the smallest absolute value negative.
    // So we subtract it twice (undo +x and apply -x)
    return totalSum - 2 * minAbsolute;
};


/************************************** MAXIMIZE THE CONFUSION OF EXAM  *************************************************
 * Leetcode 11: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/
*/

// SOLUTION: SLIDING WINDOW + TWO POINTER -> O(N)

/**
 * @param {string} answerKey    // A string of 'T' and 'F' characters
 * @param {number} k            // Maximum number of flips allowed
 * @return {number}             // Maximum number of consecutive same answers after flipping
 */
var maxConsecutiveAnswers = function(answerKey, k) {
    
    // Helper function to calculate max consecutive characters 
    // we can get by changing at most k characters to 'key'
    const maxConsecutive = (key) => {
        let left = 0;           // Start of the sliding window
        let maxLength = 0;      // Maximum length of valid window
        let count = 0;          // Number of chars in window that are not equal to 'key'

        // Expand the right end of the window
        for (let right = 0; right < answerKey.length; right++) {

            // If current char is not the desired key, count it as a flip
            if (answerKey[right] !== key) {
                count++;
            }

            // If flips exceed allowed 'k', shrink the window from the left
            while (count > k) {
                if (answerKey[left] !== key) {
                    count--;    // Undo a flip
                }
                left++;         // Shrink the window
            }

            // Update the maximum length
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
    
    // Try both flipping to all 'T' and all 'F', take the max
    return Math.max(maxConsecutive('T'), maxConsecutive('F'));
};


/**************************************** LARGEST RECTANGLE IN HISTOGRAM  ********************************
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
    // dp[i] represents the maximum number of floors that can be tested with i eggs and 'moves' moves
    let dp = new Array(k + 1).fill(0);
    
    let moves = 0; // Total number of moves (attempts) made

    // Continue until we can check at least 'n' floors using 'k' eggs
    while (dp[k] < n) {
        moves++; // Increase the number of allowed moves

        // Update dp from right to left to avoid overwriting dp[i - 1] too early
        for (let i = k; i > 0; i--) {
            /*
             * Transition formula:
             * dp[i] = dp[i - 1] (egg breaks) + dp[i] (egg survives) + 1 (current floor tested)
             * This tells how many floors can be tested with 'i' eggs and 'moves' moves.
             */
            dp[i] = dp[i - 1] + dp[i] + 1;
        }
    }

    // Once dp[k] >= n, we have enough moves to check all floors
    return moves;
};




/************************************** MAXIMUM SUM SUBARRAY  *************************************************
 * Leetcode 14: https://leetcode.com/problems/maximum-subarray/
*/

// SOLUTION: KADANE'S ALGORITHM -> O(N)

/**
 * @param {number[]} nums - An array of integers
 * @return {number} - The maximum subarray sum
 */
var maxSubArray = function(nums) {
    // Initialize maxSum to the first element
    let maxSum = nums[0];
    // This will track the current subarray sum
    let currentSum = 0;

    for (let num of nums) {
        // Either start a new subarray at this number, or extend the previous one
        currentSum = Math.max(num, currentSum + num);
        
        // Update the maxSum if currentSum is higher
        maxSum = Math.max(maxSum, currentSum);
    }

    // Return the largest sum found
    return maxSum;
};


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
 * @param {number[]} nums - An array of integers
 * @return {number[]} - The array sorted by parity (evens at the front, odds at the back)
 */
var sortArrayByParity = function(nums) {
    let  left =0; // Pointer to track where to place the next even number

    // Loop through the array with 'right' pointer
    for (let right = 0; right < nums.length; right++) {
        // If the current number is even
        if (nums[right] % 2 === 0) {
            // Swap the even number at 'right' with the number at 'left'
            [nums[left], nums[right]] = [nums[right], nums[left]];
            // Increment 'left' to move to the next position for the next even number
            left++;
        }
    }

    // Return the modified array where all even numbers are at the front and odd numbers at the back
    return nums;
};
