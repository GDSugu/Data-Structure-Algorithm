


/************************************** REMOVE DUPLICATES FROM SORTED LIST II *************************************************
 * Leetcode 4: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
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








/************************************** SET MATRIX ZERO *************************************************
 * Leetcode 7: https://leetcode.com/problems/set-matrix-zeroes/description/
*/

// SOLUTION: MATRIX MARKERS

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;

    let firstRowZero = false;
    let firstColumnZero = false;

    // Check if first row contains zero
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
        }
    }

    // Check if first column contains zero
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColumnZero = true;
        }
    }

    // Mark rows and columns
    for (let i = 1; i < m; i++) {  // ✅ Added "let"
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // Set matrix elements based on markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[0][j] === 0 || matrix[i][0] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Handle first row separately
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }

    // Handle first column separately
    if (firstColumnZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }
};



/************************************** MAXIMUM NUMBER OF VOWELS IN A SUBSTRING OF A GIVEN LENGTH *************************************************
 * Leetcode 8: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
*/

// SOLUTION: SLIDING WINDOW -> O(n)

var maxVowels = function (s, k) {
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




/************************************** MAXIMUM NUMBER OF EVENTS THAT CAN BE ATTENDED *************************************************
 * Leetcode 10: https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
*/

// SOLUTION: 

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
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


/************************************** NUMBER OF ISLANDS*********************************
 * Leetcode 11: https://leetcode.com/problems/rotting-oranges/
*/

// SOLUTION: O(m×n)
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
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
 * Leetcode 12: https://leetcode.com/problems/group-anagrams/
*/

// SOLUTION: O(n * k log k)
var groupAnagrams = function (strs) {
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
var groupAnagrams = function (strs) {
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


/************************************** UNIQUE LENGTH - 3 PALINDROMIC SUBSEQUENCE  *************************************************
 * Leetcode 13: https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/description/
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
 * LEETCODE 14: https://leetcode.com/problems/longest-increasing-subsequence/
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
 * Leetcode 15: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
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
 * Leetcode 16: https://leetcode.com/problems/trapping-rain-water/
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

/**************************************** LARGEST RTECTANGLE IN HISTOGRAM  ********************************
 * Leetcode 17: https://leetcode.com/problems/largest-rectangle-in-histogram/
*/

// SOLUTION: MONOTONIC INCREASING STACK

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
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
 * Leetcode 18: https://leetcode.com/problems/super-egg-drop/
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

/****************************************  BEST TIME TO BUY AND SELL STOCK  ********************************
 * Leetcode 19: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
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
 * Leetcode 20: https://leetcode.com/problems/sliding-window-maximum/
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