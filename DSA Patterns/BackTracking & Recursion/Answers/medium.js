
/************************************** FIND ALL SUBSETS  *************************************************
 * Leetcode 5: https://leetcode.com/problems/subsets/
*/

// SOLUTIONS: BACKTRACKING
var subsets = function(nums) {
    const result = []; // To store all subsets

    // Backtracking function
    function backtrack(start, currentSubset) {
        // Add the current subset to the result
        result.push([...currentSubset]);

        // Explore all possible numbers from start to the end of nums
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]); // Add the current number to the subset
            backtrack(i + 1, currentSubset); // Recursively explore further
            currentSubset.pop(); // Backtrack: remove the last number
        }
    }

    // Start the backtracking process
    backtrack(0, []);
    return result;
};