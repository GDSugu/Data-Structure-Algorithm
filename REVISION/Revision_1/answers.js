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


/************************************** THREE SUM ***************************
 * Leetcode 2: https://leetcode.com/problems/3sum/description/
*/

// SOLUTION: SORTING + TWO POINTER APPROACH

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {

    // Step 1: Sort the array to make two-pointer technique possible
    nums.sort((a, b) => a - b);
    let result = [];

    // Step 2: Traverse the array, treating each number as a potential first element of the triplet
    for (let i = 0; i < nums.length - 2; i++) {

        // Skip duplicate elements to avoid duplicate triplets in result
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1; // Pointer to the next element
        let right = nums.length - 1; // Pointer to the last element

        // Step 3: Use two pointers to find two numbers such that their sum with nums[i] is 0
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                // If the sum is zero, we found a triplet
                result.push([nums[i], nums[left], nums[right]]);

                // Move left pointer to the right skipping duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Move right pointer to the left skipping duplicates
                while (left < right && nums[right] === nums[right - 1]) right--;

                // Move both pointers after finding a valid triplet
                left++;
                right--;

            } else if (sum < 0) {
                // If sum is less than 0, move left pointer to increase sum
                left++;
            } else {
                // If sum is greater than 0, move right pointer to decrease sum
                right--;
            }
        }
    }

    // Step 4: Return the list of triplets
    return result;
}
