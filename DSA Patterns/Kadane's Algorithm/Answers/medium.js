/************************************** MAXIMUM SUM SUBARRAY  *************************************************
 * Leetcode 1: https://leetcode.com/problems/maximum-subarray/
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
