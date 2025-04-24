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


/************************************** LONGEST SUBSTRING ATLEAST K REPEATING CHARACTER  *************************************************
 * Leetcode 1: https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
*/

// SOLUTION: HASHMAP + DIVIDE AND CONQUER -> WORST CASE O(N^2), AVERAGE O(N LOG N)

/**
 * @param {string} s - The input string.
 * @param {number} k - Minimum number of times each character must appear.
 * @return {number} - Length of the longest valid substring.
 */
var longestSubstring = function(s, k) {
    // If the string is shorter than k, no character can appear k times
    if (s.length < k) return 0;
    
    // Step 1: Count the frequency of each character in the string
    const freqMap = new Map();
    for (const char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    // Step 2: Find the first character that does not meet the frequency condition
    for (let i = 0; i < s.length; i++) {
        if (freqMap.get(s[i]) < k) {
            // Step 3: Split the string into two parts around the invalid character
            // and recursively solve both halves
            const left = longestSubstring(s.substring(0, i), k);
            const right = longestSubstring(s.substring(i + 1), k);
            
            // Return the maximum of the two valid substrings
            return Math.max(left, right);
        }
    }
    
    // Step 4: If all characters occur at least k times, return the entire length
    return s.length;
};

