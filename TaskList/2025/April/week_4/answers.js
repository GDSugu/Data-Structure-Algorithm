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
