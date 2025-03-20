
/************************************** SUB ARRAY PRODUCT LESS THAN K  *************************************************
 * Leetcode 1: https://leetcode.com/problems/subarray-product-less-than-k/
*/

// SOLUTION: SLIDING WINDOW + TWO POINTER APPROACH -> O(N)

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

/************************************** MAXIMIZE THE CONFUSION OF EXAM  *************************************************
 * Leetcode 2: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/
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
