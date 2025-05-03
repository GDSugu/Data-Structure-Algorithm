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
