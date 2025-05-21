/************************************** SEPARATE BLACK AND WHITE BALLS  *************************************************
 * Leetcode 1: https://leetcode.com/problems/separate-black-and-white-balls/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {string} s - Binary string where '1' = black ball, '0' = white ball
 * @return {number} - Minimum steps to move all black balls to the right using adjacent swaps
 */
var minimumSteps = function(s) {
    let white = 0; // Count of white balls ('0') seen so far while scanning from right to left
    let step = 0;  // Total number of steps (swaps) needed

    // Traverse the string from right to left
    for (let right = s.length - 1; right >= 0; right--) {
        if (s[right] === '0') {
            // If current ball is white, increase the count
            white++;
        } else {
            // If current ball is black, it needs to pass all white balls after it
            step += white; // Add the number of whites after it (i.e., number of swaps needed)
        }
    }

    return step; // Return total steps required to group all black balls on the right
};


/************************************** FIND MINIMUM IN ROTATED SORTED ARRAY  *************************************************
 * Leetcode 2: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If the mid element is greater than the rightmost element,
        // the minimum must be in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum is in the left half (including mid)
            right = mid;
        }
    }

    // When left == right, we've found the minimum
    return nums[left];
};


/************************************** FIND PEAK ELEMENT  *************************************************
 * Leetcode 3: https://leetcode.com/problems/find-peak-element/
*/

// SOLUTION: BINARY SERACH -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    // Initialize pointers to the start and end of the array
    let left = 0;
    let right = nums.length - 1;

    // Binary search loop
    while (left < right) {
        // Find the middle index
        let mid = Math.floor((left + right) / 2);

        // Compare middle element with its right neighbor
        if (nums[mid] < nums[mid + 1]) {
            // If mid is less than mid+1, peak must be on the right side
            left = mid + 1;
        } else {
            // If mid is greater than or equal to mid+1, peak is on the left side (including mid)
            right = mid;
        }
    }

    // At the end, left and right will point to the peak element
    return left;
};


/************************************** FIND FIRST AND LAST POSITION OF ELEMENT  *************************************************
 * Leetcode 4: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * @param {number[]} nums - The sorted array
 * @param {number} target - The number we are searching for
 * @return {number[]} - The first and last index of target, or [-1, -1] if not found
 */
var searchRange = function(nums, target) {

    // Function to find the first occurrence (leftmost index) of the target
    function findFirst(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let index = -1; // Store the result if target is found

        // Binary search loop
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;      // Record the index
                right = mid - 1;  // Keep searching on the left side
            } else if (nums[mid] < target) {
                left = mid + 1;   // Move right
            } else {
                right = mid - 1;  // Move left
            }
        }

        return index;
    }

    // Function to find the last occurrence (rightmost index) of the target
    function findLast(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let index = -1; // Store the result if target is found

        // Binary search loop
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;     // Record the index
                left = mid + 1;  // Keep searching on the right side
            } else if (nums[mid] < target) {
                left = mid + 1;  // Move right
            } else {
                right = mid - 1; // Move left
            }
        }

        return index;
    }

    // Call both functions to get start and end index
    let start = findFirst(nums, target);
    let end = findLast(nums, target);

    return [start, end];
};


/************************************** SMALLEST SUBSEQUENCE OF DISTINCT CHARACTER  *************************************************
 * Leetcode 5: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/
*/

// SOLUTION: GREEDY + MONOTONIC INCREASING STACK + SET

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
    // Step 1: Count frequency of each character
    let count = new Map();
    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    let seen = new Set();  // Tracks characters already added to result
    let stack = [];        // Used to build the result (monotonic stack)

    // Step 2: Traverse each character in the string
    for (let ch of s) {
        // Decrease the frequency as we've seen this character now
        count.set(ch, count.get(ch) - 1);

        // If character is already in result, skip it
        if (seen.has(ch)) continue;

        // Step 3: Maintain lexicographical order
        // While stack is not empty,
        // and current char is smaller than top of stack (for lex order),
        // and the top character still appears later in the string
        while (
            stack.length &&
            ch < stack[stack.length - 1] &&
            count.get(stack[stack.length - 1]) > 0
        ) {
            // Remove top of stack from both stack and seen
            seen.delete(stack.pop());
        }

        // Step 4: Add current char to stack and mark it as seen
        stack.push(ch);
        seen.add(ch);
    }

    // Step 5: Join the stack to form the final result string
    return stack.join('');
};


/************************************** REMOVE DUPLICATE LETTERS  *************************************************
 * Leetcode 6: https://leetcode.com/problems/remove-duplicate-letters/description/
*/

// SOLUTION: GREEDY + MONOTONIC INCREASING STACK + SET

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    let map = new Map(); // To count the frequency of each character in the string

    // Step 1: Count how many times each character appears
    for (let char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    let stack = [];       // Stack to store the final result characters
    let set = new Set();  // Set to track which characters are already in the stack

    // Step 2: Iterate through the string
    for (let ch of s) {
        // Decrease the remaining count of the current character
        map.set(ch, map.get(ch) - 1);

        // If the character is already in the stack, skip it
        if (set.has(ch)) continue;

        // Step 3: Maintain lexicographical order and uniqueness
        // Remove characters from the stack if:
        // - The current character is smaller (to get lexicographically smaller string)
        // - The character at the top of the stack will appear again later (safe to remove)
        while (
            stack.length &&
            ch < stack[stack.length - 1] &&
            map.get(stack[stack.length - 1]) > 0
        ) {
            // Remove the character from the set and stack
            set.delete(stack.pop());
        }

        // Add the current character to the stack and mark it as seen
        stack.push(ch);
        set.add(ch);
    }

    // Step 4: Join the stack to form the result string
    return stack.join('');
};
