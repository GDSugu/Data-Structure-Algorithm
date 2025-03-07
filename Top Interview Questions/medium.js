/**************************************** BEST TO BUY AND SELL THE STOCK  ******************
 * Leetcode 1: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
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


/****************************************  MAXIMUM MATRIX SUM  ********************************
 * LEETCODE 1: https://leetcode.com/problems/maximum-matrix-sum/description/
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


/****************************************  COIN CHANGE PROBLEM  ********************************
 * LEETCODE 1: https://leetcode.com/problems/coin-change/
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


/****************************************  LONGEST INCREASING SUBSEQUENCE  ********************************
 * LEETCODE 1: https://leetcode.com/problems/longest-increasing-subsequence/
*/

// SOLUTION : BINARY SEARCH WITH GREEDY -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
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


/************************************** THREE SUM ***************************
 * Leetcode 12:https://leetcode.com/problems/3sum/description/
*/

// SOLUTION: SORTING + TWO POINTER

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {

    nums.sort((a,b) => a-b);
    let result = [];

    for(let i=0; i<nums.length-2; i++){

        if(i>0 && nums[i] === nums[i-1]) continue;

        let left = i+1;
        let right = nums.length-1;

        while(left < right){
            let sum = nums[i]+ nums[left]+ nums[right];

            if(sum === 0){
                result.push([nums[i],nums[left],nums[right]]);
                while(left < right && nums[left] === nums[left+1]) left++;
                while(left < right && nums[right] === nums[right -1]) right--;

                left++;
                right--;
            }else if(sum < 0){
                left++;
            }else{
                right--;
            }
        }
    }

    return result;
}


/************************************** FOUR SUM ***************************
 * Leetcode 12:https://leetcode.com/problems/4sum/description/
*/

// SOLUTION: SORTING + TWO POINTER

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a,b) => a-b);

    let result = [];

    for(let i=0; i<nums.length-3; i++){
        if(i>0 && nums[i] === nums[i-1]) continue;

        for(j=i+1; j<nums.length -2; j++){
            if(j>i+1 && nums[j] === nums[j-1]) continue;

            let left = j+1;
            let right = nums.length -1;

            while(left < right){
                let sum = nums[i]+nums[j]+nums[left]+nums[right];

                if(sum === target){
                    result.push([nums[i],nums[j],nums[left],nums[right]]);

                    while(left < right && nums[left] === nums[left+1]) left++;
                    while(left < right && nums[right] === nums[right-1]) right--;

                    left++;
                    right--;
                }else if(sum < target){
                    left++;
                }else{
                    right--;
                }
            }
        }
    }

    return result;
    
};

/************************************** REMOVE DUPLICATES FROM SORTED LIST II *************************************************
 * Leetcode 13: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
*/

// SOLUTION: 
var deleteDuplicates = function(head) {
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


/************************************** NEXT GREATER ELEMENT II *************************************************
 * Leetcode: https://leetcode.com/problems/next-greater-element-ii/
*/

// MONOTONIC DECREASING STACK

const nextGreaterElements = nums => {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < 2 * n; i++) {
        while (stack.length > 0 && nums[i % n] > nums[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = nums[i % n];
        }

        if (i < n) {
            stack.push(i);
        }
    }

    return result;
};


/************************************** SERACH IN ROTATED SORTED ARRAY *************************************************
 * Leetcode 16: https://leetcode.com/problems/search-in-rotated-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Found the target
        }

        // Check if the left half is sorted
        if (nums[left] <= nums[mid]) {
            // If target is in the left sorted range
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Search left
            } else {
                left = mid + 1; // Search right
            }
        } 
        // Otherwise, the right half must be sorted
        else { 
            // If target is in the right sorted range
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Search right
            } else {
                right = mid - 1; // Search left
            }
        }
    }

    return -1; // Target not found
};

/************************************** SET MATRIX ZERO *************************************************
 * Leetcode 3: https://leetcode.com/problems/set-matrix-zeroes/description/
*/

// SOLUTION: MATRIX MARKERS

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let m = matrix.length;
    let n = matrix[0].length;

    let firstRowZero = false;
    let firstColumnZero = false;

    // Check if first row contains zero
    for(let j=0; j<n; j++){
        if(matrix[0][j] === 0){
            firstRowZero = true;
        }
    }

    // Check if first column contains zero
    for(let i=0; i<m; i++){
        if(matrix[i][0] === 0){
            firstColumnZero = true;
        }
    }

    // Mark rows and columns
    for(let i=1; i<m; i++){  // ✅ Added "let"
        for(let j=1; j<n; j++){
            if(matrix[i][j] === 0){
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // Set matrix elements based on markers
    for(let i=1; i<m; i++){
        for(let j=1; j<n; j++){
            if(matrix[0][j] === 0 || matrix[i][0] === 0){
                matrix[i][j] = 0;
            }
        }
    }

    // Handle first row separately
    if(firstRowZero){
        for(let j=0; j<n; j++){
            matrix[0][j] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }

    // Handle first column separately
    if(firstColumnZero){
        for(let i=0; i<m; i++){
            matrix[i][0] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }
};

/************************************** LONGEST SUBSTRING WITHOUT REPEATING CHARACTER *************************************************
 * Leetcode 18: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
*/

// SOLUTION: HASHMAP WITH SLIDING WINDOW -> O(n)

function longestSubstringWithNoRepeatingChars(s) {
    let left = 0; // Left pointer
    let maxLength = 0; // Maximum length of substring without repeating characters
    let charCount = new Map(); // Map to store character counts
    
    // Traverse the string with the right pointer
    for (let right = 0; right < s.length; right++) {
        let rightChar = s[right];

        // Increment count of the character in the map
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // If the character count exceeds 1, shrink the window from the left
        while (charCount.get(rightChar) > 1) {
            let leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            
            // If count becomes 0, remove the character from the map
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            
            left++; // Move the left pointer to shrink the window
        }

        // Update the maxLength after adjusting the window
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength; // ✅ Return the result instead of just logging it
}

/************************************** MAXIMUM NUMBER OF VOWELS IN A SUBSTRING OF A GIVEN LENGTH *************************************************
 * Leetcode 4: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
*/

// SOLUTION: SLIDING WINDOW -> O(n)

var maxVowels = function(s, k) {
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']); // Set for quick lookup
    let maxVowelCount = 0, currentVowelCount = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        // Add right character to the window
        if (vowels.has(s[right])) {
            currentVowelCount++;
        }

        // If window size exceeds k, remove left character
        if (right - left + 1 > k) {
            if (vowels.has(s[left])) {
                currentVowelCount--;
            }
            left++; // Shrink the window
        }

        // Update max vowels found in any window
        maxVowelCount = Math.max(maxVowelCount, currentVowelCount);
    }

    return maxVowelCount;
};


/************************************** GENERATE PARENTHESIS *************************************************
 * Leetcode 1: https://leetcode.com/problems/generate-parentheses/
*/

// SOLUTION: BACKTRACKING

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];

    // Helper function to perform backtracking
    function backtrack(current, openCount, closeCount) {
        // Base case: If we've used n opening and n closing parentheses, add the result
        if (openCount === n && closeCount === n) {
            result.push(current);
            return;
        }
        
        // Add opening parenthesis if we can
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }
        
        // Add closing parenthesis if we can
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }
    
    // Start the backtracking process with an empty string
    backtrack("", 0, 0);
    
    return result;
};
