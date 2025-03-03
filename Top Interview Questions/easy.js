/****************************************  REMOVE DUPLICATES FROM THE SORTED ARRAY  ********************************
 * LEETCODE 1: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
*/

// SOLUTION : TWO POINTER METHOD -> O(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let i = 0; // Tracks unique element position

    for (let j = 1; j < nums.length; j++) {
        if (nums[i] !== nums[j]) { 
            i++;  // Move `i` only when we find a new unique element
            nums[i] = nums[j];  // Place the unique element at `i`
        }
    }

    return i + 1;  // Length of unique elements
};


