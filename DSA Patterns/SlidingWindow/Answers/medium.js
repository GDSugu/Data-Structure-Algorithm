
/************************************** SUB ARRAY PRODUCT LESS THAN K  *************************************************
 * Leetcode 3: https://leetcode.com/problems/subarray-product-less-than-k/
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
