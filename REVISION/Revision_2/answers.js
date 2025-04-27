/************************************** NEXT GREATER ELEMENT - I  *************************************************
 * Leetcode 1: https://leetcode.com/phttps://leetcode.com/problems/next-greater-element-i/
*/

// SOLUTION: MONOTNIC DECREASING STACK + HASH MAP -> O(N)

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    let stack = [];  // Initialize an empty stack to help find next greater elements.
    let map = new Map();  // Map to store the next greater element for each number in nums2.

    // Loop through nums2 to find the next greater element for each number.
    for (let num of nums2) {
        // While there are elements in the stack and the current number is greater than the top of the stack:
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            let smallest = stack.pop();  // Pop the stack to get the element whose next greater element is being found.
            map.set(smallest, num);  // Map the popped element to the current number as its next greater element.
        }
        stack.push(num);  // Push the current number onto the stack to potentially find its next greater element later.
    }

    // For the remaining elements in the stack (which didn't have any greater element), set their next greater as -1.
    for (let num of stack) {
        map.set(num, -1);  // These elements don't have a next greater element, so their value is -1.
    }

    // Map each element from nums1 to its corresponding next greater element in the map and return the result.
    return nums1.map(num => map.get(num));
};


/************************************** NEXT GREATER ELEMENT II *************************************************
 * Leetcode 2: https://leetcode.com/problems/next-greater-element-ii/
*/

// SOLUTION: MONOTONIC DECREASING STACK -> O(N)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    let n = nums.length;
    let result = new Array(n).fill(-1); // Initialize result with -1
    let stack = []; // Monotonic decreasing stack (stores indices)

    // Traverse the array twice to simulate circular behavior
    for (let i = 0; i < 2 * n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i % n]) {
            let smallest = stack.pop(); // Get index of smaller element
            result[smallest] = nums[i % n]; // Update result for this index
        }

        // Only push indices from first pass (0 to n-1)
        if (i < n) {
            stack.push(i);
        }
    }

    return result;
};



/************************************** SERACH IN ROTATED SORTED ARRAY *************************************************
 * Leetcode 3: https://leetcode.com/problems/search-in-rotated-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

var search = function (nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Found the target
        }

        // Check if the left half is sorted
        if (nums[left] <= nums[mid]) {
            // If target is in the left sorted range
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Search left
            } else {
                left = mid + 1; // Search right
            }
        }
        // Otherwise, the right half must be sorted
        else {
            // If target is in the right sorted range
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Search right
            } else {
                right = mid - 1; // Search left
            }
        }
    }

    return -1; // Target not found
};



/************************************** GENERATE PARENTHESIS *************************************************
 * Leetcode 9: https://leetcode.com/problems/generate-parentheses/
*/

// SOLUTION: BACKTRACKING -> 4 power n divide by sqrt of n


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const result = [];

    // Helper function to perform backtracking
    function backtrack(current, openCount, closeCount) {
        // Base case: If we've used n opening and n closing parentheses, add the result
        if (openCount === n && closeCount === n) {
            result.push(current);
            return;
        }

        // Add opening parenthesis if we can
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }

        // Add closing parenthesis if we can
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    // Start the backtracking process with an empty string
    backtrack("", 0, 0);

    return result;
};
