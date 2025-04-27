


/************************************** LONGEST CONSECUTIVE SEQUENCE *************************************************
 * Leetcode 2: https://leetcode.com/problems/longest-consecutive-sequence/description/
*/

// SOLUTION: SET -> O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // Step 1: Use a Set to eliminate duplicates and allow O(1) lookup
    let set = new Set(nums);

    // To keep track of the longest consecutive sequence found
    let maxLength = 0;

    // Step 2: Loop through each unique number in the set
    for (let num of set) {
        // Step 3: Check if it's the start of a new sequence
        // A number is the start if num - 1 is NOT in the set
        if (!set.has(num - 1)) {
            let start = num; // Start of the current sequence
            let count = 1;   // Initialize the length of the sequence

            // Step 4: Expand the sequence by checking for next numbers
            while (set.has(start + 1)) {
                start += 1;   // Move to the next number
                count++;      // Increase the count of the sequence
            }

            // Step 5: Update maxLength if the current sequence is longer
            maxLength = Math.max(maxLength, count);
        }
    }

    // Step 6: Return the length of the longest consecutive sequence found
    return maxLength;
};


