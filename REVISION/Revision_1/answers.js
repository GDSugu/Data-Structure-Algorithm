/**************************************** TWO SUM  ********************************
 * Leetcode 1: https://leetcode.com/problems/two-sum/
*/

// SOLUTION: USING HASHMAP METHOD -> O(N)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map(); // Create a map to store (number, index) pairs

    for (let i = 0; i < nums.length; i++) {
        // Step 1: Calculate the value needed to reach the target
        let pairvalue = target - nums[i];

        // Step 2: Check if the pairvalue already exists in the map
        if (map.has(pairvalue)) {
            // If it exists, we found the two numbers whose sum is target
            // Return the stored index and the current index
            return [map.get(pairvalue), i];
        }

        // Step 3: If not found, store the current number and its index in the map
        map.set(nums[i], i);
    }

    // If no solution is found (though the problem guarantees exactly one solution)
};