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


/************************************** SEPARATE BLACK AND WHITE BALLS  *************************************************
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
