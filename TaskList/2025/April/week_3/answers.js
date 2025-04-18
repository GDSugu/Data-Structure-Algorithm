/************************************** COIN CHANGE - II  *************************************************
 * Leetcode 1: htthttps://leetcode.com/problems/coin-change-ii/
*/

// SOLUTION: DYNAMIC PROGRAMMING -> O(amount * coins)

/**
 * @param {number} amount - The total amount we want to make change for.
 * @param {number[]} coins - An array of different coin denominations.
 * @return {number} - The number of combinations to make up that amount.
 */
var change = function(amount, coins) {
    
    // Initialize a dp array where dp[i] represents the number of ways to make amount 'i'
    let dp = new Array(amount + 1).fill(0);

    // There is 1 way to make amount 0 — by choosing no coins at all.
    dp[0] = 1;

    // Loop through each coin denomination
    for (let coin of coins) {
        // For each amount from coin value up to the target amount
        for (let i = coin; i <= amount; i++) {
            // Add the number of ways to make (i - coin) to dp[i]
            // Because we can form amount 'i' by adding this coin to combinations that make 'i - coin'
            dp[i] += dp[i - coin];
        }
    }

    // The answer is the number of ways to make the full amount
    return dp[amount];
};


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

/************************************** JUMP GAME - II *************************************************
 * Leetcode 3: https://leetcode.com/problems/longest-consecutive-sequence/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let jumps = 0;           // Count of total jumps made
    let currentEnd = 0;      // End of the current jump's range
    let farthest = 0;        // Farthest index we can reach so far

    // Loop until the second-to-last element (we stop once we jump into the last index)
    for (let i = 0; i < nums.length - 1; i++) {
        
        // From index i, calculate the farthest index we can reach
        farthest = Math.max(farthest, i + nums[i]);

        // If we've reached the end of the current jump's range
        if (i === currentEnd) {
            jumps++;                 // Make a jump
            currentEnd = farthest;  // Set the new range end for the next jump
        }
    }

    // Return the total number of jumps needed to reach the end
    return jumps;
};


/************************************** PERMUTATION - II *************************************************
 * Leetcode 1: https://leetcode.com/problems/permutations-ii/
*/

// SOLUTION: BACKTRACKING AND RECURSION -> O(N * N!)

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    // 1. First sort the array to group duplicates together
    nums.sort((a, b) => a - b);

    // 2. Initialize the result array to store all unique permutations
    const result = [];

    // 3. Define the backtracking function (nested for closure access)
    function backtrack(current, used) {
        // Base case: if current permutation is complete
        if (current.length === nums.length) {
            result.push([...current]); // Add a copy to results
            return;
        }

        // Recursive case: try adding each available number
        for (let i = 0; i < nums.length; i++) {
            // Skip already used numbers
            if (used[i]) continue;

            /* Skip duplicates only when:
               - Not the first element AND
               - Same as previous number AND
               - Previous duplicate wasn't used yet
               (This prevents duplicate permutations) */
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            // Choose the current number
            used[i] = true;
            current.push(nums[i]);

            // Recursively build the permutation
            backtrack(current, used);

            // Unchoose (backtrack)
            current.pop();
            used[i] = false;
        }
    }

    // 4. Start the backtracking with empty permutation
    backtrack([], Array(nums.length).fill(false));

    // 5. Return all unique permutations
    return result;
};