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
            const smallest = stack.pop();
            result[smallest] = nums[i % n];
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


/************************************** NUMBER OF ISLANDS*********************************
 * Leetcode 3: https://leetcode.com/problems/rotting-oranges/
*/

// SOLUTION: O(m×n)
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let islandCount = 0;
    let rows = grid.length;
    let columns = grid[0].length;

    function dfs(r, c) {
        // Base case: Stop if out of bounds or water is found
        if (r < 0 || c < 0 || r >= rows || c >= columns || grid[r][c] === "0") {
            return;
        }

        // Mark current land as visited
        grid[r][c] = "0";

        // Explore all 4 directions (right, left, down, up)
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
    }

    // Iterate through the entire grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (grid[r][c] === "1") {
                // Found a new island, increase count
                islandCount++;
                dfs(r, c); // Start DFS to mark the whole island
            }
        }
    }

    return islandCount;
};


/************************************** GROUP ANAGRAMS *********************************
 * Leetcode 22: https://leetcode.com/problems/group-anagrams/
*/

// SOLUTION: O(n * k log k)
var groupAnagrams = function(strs) {
    let map = new Map();

    for (let word of strs) {
        // Correctly split the word into characters
        let sorted = word.split("").sort().join("");  

        // If the sorted word is not in the map, initialize a list
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }

        // Add the original word to the group
        map.get(sorted).push(word);
    }

    // Convert the values of the map to an array
    return Array.from(map.values());
};

// SOLUTION 2: O(nk)

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = new Map();

    for (let word of strs) {
        // Step 1: Create a frequency array of 26 zeros (for 'a' to 'z')
        let freq = new Array(26).fill(0);

        // Step 2: Count occurrences of each character in the word
        for (let char of word) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Step 3: Convert frequency array to a key (string format)
        let key = freq.join("#");  // Joining with '#' to avoid collisions

        // Step 4: Store words in the map using this key
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(word);
    }

    // Step 5: Convert map values to an array and return
    return Array.from(map.values());
};


/************************************** MAXIMUM NUMBER OF EVENTS THAT CAN BE ATTENDED *************************************************
 * Leetcode 1: https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
*/

// SOLUTION:

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function(s) {
    let n = s.length;
    let result = 0;

    // Store unique characters seen so far on the left
    let leftSet = new Set();

    // Map to store the frequency of each character on the right
    let rightCount = new Map();
    for (let ch of s) {
        rightCount.set(ch, (rightCount.get(ch) || 0) + 1);
    }

    // Set to track unique palindromes
    let seenPalindromes = new Set();

    // Iterate over the string, treating s[i] as the middle character
    for (let i = 0; i < n; i++) {
        let midChar = s[i];

        // Remove current character from rightCount
        if (rightCount.get(midChar) === 1) {
            rightCount.delete(midChar);
        } else {
            rightCount.set(midChar, rightCount.get(midChar) - 1);
        }

        // Check all possible left and right characters
        for (let leftChar of leftSet) {
            if (rightCount.has(leftChar)) {
                let palindrome = leftChar + midChar + leftChar;
                seenPalindromes.add(palindrome);
            }
        }

        // Add current character to leftSet
        leftSet.add(midChar);
    }

    return seenPalindromes.size;
};


/************************************** UNIQUE LENGTH - 3 PALINDROMIC SUBSEQUENCE  *************************************************
 * Leetcode 1: https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/description/
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

function distributeCookies(cookies, k) {
    let minUnfairness = Infinity;

    // Initialize the children array with zeros
    const children = new Array(k).fill(0);

    // Backtracking function
    function backtrack(index) {
        if (index === cookies.length) {
            // All bags are assigned, calculate unfairness
            const currentUnfairness = Math.max(...children);
            minUnfairness = Math.min(minUnfairness, currentUnfairness);
            return;
        }

        for (let i = 0; i < k; i++) {
            // Assign the current bag to the ith child
            children[i] += cookies[index];
            // Prune if the current unfairness is already worse than the best found
            if (children[i] < minUnfairness) {
                backtrack(index + 1);
            }
            // Backtrack
            children[i] -= cookies[index];
        }
    }

    // Start the backtracking process
    backtrack(0);
    return minUnfairness;
}

// Example usage:
const n = 4, k = 2;
const cookies = [2,2,2,2];




console.log(distributeCookies(cookies, k)); // Output: 7


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

