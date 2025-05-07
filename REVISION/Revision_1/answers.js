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

// SOLUTION: SORTING + TWO POINTER APPROACH -> O(N^2)

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

/************************************** FOUR SUM ***************************
 * Leetcode 3: https://leetcode.com/problems/4sum/description/
*/

// SOLUTION: SORTING + TWO POINTER -> 0(n^3)

/**
 * @param {number[]} nums - Input array of integers
 * @param {number} target - Target sum to find four numbers that add up to it
 * @return {number[][]} - Array of all unique quadruplets that sum to the target
 */
var fourSum = function (nums, target) {
    // Step 1: Sort the input array to simplify duplicate removal and two-pointer logic
    nums.sort((a, b) => a - b);

    let result = [];

    // Step 2: Outer loop to fix the first number (nums[i])
    for (let i = 0; i < nums.length - 3; i++) {
        // Skip duplicates for the first number
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Step 3: Second loop to fix the second number (nums[j])
        for (let j = i + 1; j < nums.length - 2; j++) {
            // Skip duplicates for the second number
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            // Step 4: Initialize two pointers for the remaining two numbers
            let left = j + 1;
            let right = nums.length - 1;

            // Step 5: Two-pointer approach to find the other two numbers
            while (left < right) {
                let sum = nums[i] + nums[j] + nums[left] + nums[right];

                // Case 1: Found a valid quadruplet
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Skip duplicates for the third number
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    // Skip duplicates for the fourth number
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    // Move pointers inward after recording the valid result
                    left++;
                    right--;
                }
                // Case 2: Sum is too small, move left pointer to increase the sum
                else if (sum < target) {
                    left++;
                }
                // Case 3: Sum is too large, move right pointer to decrease the sum
                else {
                    right--;
                }
            }
        }
    }

    // Step 6: Return the list of unique quadruplets
    return result;
};


/**************************************** TWO SUM- II INPUT ARRAY IS SORTED  ********************************
 * Leetcode 4: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
*/

// SOLUTION: USING TWO POINTER METHOD -> O(N)

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    // Initialize two pointers: one at the beginning (left) and one at the end (right) of the array
    let left = 0;
    let right = numbers.length - 1;

    // Loop until the left pointer is no longer less than the right pointer
    while (left < right) {
        // Calculate the sum of the elements at the left and right pointers
        let sum = numbers[left] + numbers[right];

        // If the sum equals the target, return the 1-based indices of the two elements
        if (sum === target) {
            return [left + 1, right + 1]; // Return the indices as 1-based (hence, +1)
        }
        // If the sum is greater than the target, move the right pointer leftward (decrease sum)
        else if (sum > target) {
            right--; // Decrease the right pointer to reduce the sum
        }
        // If the sum is less than the target, move the left pointer rightward (increase sum)
        else {
            left++; // Increase the left pointer to increase the sum
        }
    }
    // If no solution is found, the problem guarantees there will always be one solution
    // So, no need to return anything else.
};


/*************************************** FIND ALL PERMUTATION  ***************************
 * Leetcode 5: https://leetcode.com/problems/permutations/description/
*/

// SOLUTION 1: BACKTRACKING AND RECURSION (SWAPPING AND UNDO RECURSION) -> O(N!)

var permute = function(nums) {
    
    // Result array to store all permutations
    let result = [];

    // Helper function to perform backtracking
    function backtrack(start) {
        // If we have generated a permutation (when start index reaches the length of the array),
        // push the current permutation to the result array.
        if (start === nums.length) {
            result.push([...nums]); // Use [...nums] to create a shallow copy of the current permutation.
            return;
        }

        // Iterate through the array starting from index 'start'
        for (let i = start; i < nums.length; i++) {
            // Swap the current element with the element at the 'start' index.
            [nums[start], nums[i]] = [nums[i], nums[start]];

            // Recur with the next index to fix the next element in the permutation.
            backtrack(start + 1);

            // Undo the swap (backtrack) to explore other possibilities.
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }

    // Start the backtracking process from index 0
    backtrack(0);

    // Return all the generated permutations
    return result;
};


/************************************** PERMUTATION - II *************************************************
 * Leetcode 6: https://leetcode.com/problems/permutations-ii/
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


/*************************************** NEXT PERMUTATION  ***************************
 * Leetcode 7: https://leetcode.com/problems/next-permutation/description/
*/

// Solution: GREEDY ALGORITHM + TWO POINTER -> O(N)

/**
 * Rearranges numbers into the lexicographically next greater permutation.
 * If no such permutation exists (i.e., the array is in descending order),
 * it rearranges the array into the lowest possible order (i.e., ascending).
 * 
 * @param {number[]} nums - The array of numbers to modify in-place.
 * @return {void}
 */
var nextPermutation = function(nums) {
    // Step 1: Find the first index from the right where nums[i] < nums[i+1]
    // This means nums[i] can be increased to form the next permutation
    let firstDecreasing = -1;

    for(let i = nums.length - 2; i >= 0; i--){
        if(nums[i] < nums[i + 1]){
            firstDecreasing = i;
            break;
        }
    }

    // Step 2: If such index is found, find the next greater number on the right side
    if(firstDecreasing >= 0){
        let nextGreater = 0;

        // Find the smallest number greater than nums[firstDecreasing] from the end
        for(let i = nums.length-1; i >= 0; i--){
            if(nums[i] > nums[firstDecreasing]){
                nextGreater = i;
                break;
            }
        }

        // Step 3: Swap them
        [nums[firstDecreasing], nums[nextGreater]] = 
        [nums[nextGreater], nums[firstDecreasing]];
    }

    // Step 4: Reverse the part after firstDecreasing to get the next smallest lexicographic order
    let left = firstDecreasing + 1;
    let right = nums.length - 1;

    while(left < right){
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }

    // No need to return anything since we modify the array in-place
};



/************************************** COMBINATIONS  *************************************************
 * Leetcode 8: https://leetcode.com/problems/combinations/
*/

// SOLUTIONS: BACKTRACKING AND RECURSION -> O(C(n,k)*k)

var combine = function(n, k) {
    let result = [];

    function backtrack(start, currentCombination) {
        // Base case: if the current combination is of size k, add it to the result
        if (currentCombination.length === k) {
            result.push([...currentCombination]); // Make a copy of the combination
            return;
        }

        // Explore all possible numbers from start to n
        for (let i = start; i <= n; i++) {
            currentCombination.push(i); // Add the current number to the combination
            backtrack(i + 1, currentCombination); // Recursively explore further
            currentCombination.pop(); // Backtrack: remove the last number
        }
    }

    // Start the backtracking process
    backtrack(1, []);
    return result;
};


/************************************** COMBINATION SUMS  *************************************************
 * Leetcode 9: https://leetcode.com/problems/combination-sum/description/
*/

// SOLUTION 1: BACKTRACKING -> O(n^T)

var combinationSum = function(candidates, target) {
    let result = [];

    function backtrack(start, combination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...combination]);
            return;
        }
        if (remainingTarget < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            combination.push(candidates[i]);
            backtrack(i, combination, remainingTarget - candidates[i]);
            combination.pop();  // Undo the last choice
        }
    }

    backtrack(0, [], target);
    return result;
};

// SOLUTION 2: BACKTRACKING + SORTING -> O(n^T)

function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b); // Step 1: Sort the array in ascending order for efficient traversal
    let result = []; // This will store all the valid combinations

    // Helper function to perform backtracking
    function backtrack(start, path, remainingTarget) {
        // If the remaining target is 0, it means we've found a valid combination
        if (remainingTarget === 0) {
            result.push([...path]); // Push a copy of the current path to the result array
            return;
        }

        // Loop through the candidates starting from the index 'start'
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remainingTarget) break; // If current candidate exceeds the remaining target, stop (early stopping)

            // Choose the current candidate and continue exploring
            path.push(candidates[i]);
            backtrack(i, path, remainingTarget - candidates[i]); // Allow repeated elements by not incrementing 'i'
            path.pop(); // Backtrack by removing the last element added to the path
        }
    }

    // Start the backtracking process with the initial parameters
    backtrack(0, [], target);
    return result; // Return the array of all valid combinations
}


/************************************** COMBINATION SUMS - II  *************************************************
 * Leetcode 10: https://leetcode.com/problems/combination-sum-ii/
*/

// SOLUTION: SORTING + BACKTRACKING -> O(n^T)

var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b); // Step 1: Sort to handle duplicates
    let result = [];

    function backtrack(start, combination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...combination]); // Found a valid combination
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue; // Step 2: Skip duplicates

            if (candidates[i] > remainingTarget) break; // Optimization: Stop if number exceeds target

            combination.push(candidates[i]);
            backtrack(i + 1, combination, remainingTarget - candidates[i]); // Move to next index
            combination.pop(); // Undo choice (backtrack)
        }
    }

    backtrack(0, [], target);
    return result;
};


/************************************** HOUSE ROBBER - I ********************************
* Leetcode 11: https://leetcode.com/problems/house-robber/description/
*/

// SOLUTION: DYNAMIC PROGRAMMING -> O(N)

function linearHouseRobbery(house) {
    let n = house.length;

    // 🏠 If there are no houses, there's nothing to rob
    if (n === 0) return 0;

    // 🏠 If there's only one house, rob it
    if (n === 1) return house[0];

    // 💰 Initialize:
    // firstStolen = max money if we rob only the first house
    // secondStolen = max money if we consider the first two houses
    let firstStolen = house[0];
    let secondStolen = Math.max(house[0], house[1]);

    // 🚶 Start from the 3rd house (index 2) to the last
    for (let i = 2; i < n; i++) {
        // 🧠 Option 1: skip current house → keep secondStolen
        // 🧠 Option 2: rob current house → firstStolen + current money
        // Take the better of the two options
        let tempMax = Math.max(secondStolen, firstStolen + house[i]);

        // 🔁 Move the window forward:
        // - secondStolen becomes firstStolen for next round
        // - tempMax becomes secondStolen (i.e., current max loot)
        firstStolen = secondStolen;
        secondStolen = tempMax;
    }

    // ✅ After checking all houses, secondStolen has the max money we can rob
    return secondStolen;
}

/**************************************  HOUSE ROBBER - II ********************************
* Leetcode 12: https://leetcode.com/problems/house-robber/description/
*/

// SOLUTION: DYNAMIC PROGRAMMING -> O(N)

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // Helper function to solve the linear (non-circular) house robbery problem
    function linearHouseRobbery(house) {
        let n = house.length;

        // 🏠 If there are no houses, nothing to rob
        if (n === 0) return 0;

        // 🏠 If only one house, rob it
        if (n === 1) return house[0];

        // 💰 Initialize:
        // firstStolen = max money robbing only the first house
        // secondStolen = max money robbing among first two houses
        let firstStolen = house[0];
        let secondStolen = Math.max(house[0], house[1]);

        // 🚶 Traverse from the third house to the last
        for (let i = 2; i < n; i++) {
            // 🧠 Option 1: Skip current house → keep secondStolen
            // 🧠 Option 2: Rob current house → firstStolen + current house value
            // Take the better of the two options
            let tempMax = Math.max(secondStolen, firstStolen + house[i]);

            // 🔁 Move window forward
            firstStolen = secondStolen;
            secondStolen = tempMax;
        }

        // ✅ secondStolen now holds the maximum loot
        return secondStolen;
    }

    let n = nums.length;

    // 🏠 If there are no houses
    if (n === 0) return 0;

    // 🏠 Only one house
    if (n === 1) return nums[0];

    // 🏠 Only two houses → rob the richer one
    if (n === 2) return Math.max(nums[0], nums[1]);

    // 🏠🔁 Because the houses are in a circle:
    // - We cannot rob both the first and last houses together
    // - So, we consider two scenarios:
    
    // 🔥 Case 1: Rob houses from index 0 to n-2 (exclude last house)
    let firstStolen = linearHouseRobbery(nums.slice(0, n - 1));

    // 🔥 Case 2: Rob houses from index 1 to n-1 (exclude first house)
    let secondStolen = linearHouseRobbery(nums.slice(1));

    // ✅ Return the maximum of the two cases
    return Math.max(firstStolen, secondStolen);
};


/************************************** JUMP GAME - I *************************************************
 * Leetcode 13: https://leetcode.com/problems/jump-game/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {number[]} nums - Array where each element represents the max jump from that index
 * @return {boolean} - Returns true if you can reach the last index, false otherwise
 */
var canJump = function(nums) {
    // Keeps track of the farthest index we can reach so far
    let farthest = 0;

    // Iterate through each index of the array
    for (let i = 0; i < nums.length; i++) {
        // If our current index is beyond the farthest reachable point, we can't proceed
        if (i > farthest) return false;

        // Update the farthest reachable index from the current position
        farthest = Math.max(farthest, i + nums[i]);
    }

    // If we finish the loop, it means we can reach the end
    return true;
};


/************************************** JUMP GAME - II *************************************************
 * Leetcode 14: https://leetcode.com/problems/jump-game-ii/
*/

// SOLUTION: SLIDING WINDOW + GREEDY ALGORITHM -> O(N)

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


/****************************************  COIN CHANGE PROBLEM  ********************************
 * Leetcode 15: https://leetcode.com/problems/coin-change/
*/

 // SOLUTION : DYNAMIC PROGRAMMING (Bottom-Up DP APPROACH) -> O(amount * n)

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    // Step 1: Create a DP array to store the minimum coins needed for each amount from 0 to 'amount'.
    // Initialize all values as Infinity (unreachable), except dp[0] = 0 (no coins needed to make amount 0).
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // Base case: 0 coins are needed for amount 0.

    // Step 2: Loop through each amount from 1 to the given 'amount'.
    for (let i = 1; i <= amount; i++) {
        // Step 3: Try all available coins to find the minimum number of coins needed.
        for (let coin of coins) {
            // Step 4: If the current coin can be used to make this amount (i >= coin), 
            // calculate the minimum coins needed by choosing the current coin.
            if (i >= coin) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);


                /*
                What this is doing:
                
                Compare:
                
                dp[i] → current minimum coins needed to form i (starts as Infinity)
                
                1 + dp[i - coin] → if we use this coin, how many coins do we need?
                
                1 for the current coin
                
                dp[i - coin] = coins needed to make the remaining amount
                
                So as soon as 1 + dp[i - coin] is smaller than Infinity, we replace it.
                
                */
                // dp[i - coin] stores the minimum coins needed to make (i - coin) amount.
                // Add 1 to represent using the current coin.
            }
        }
    }

    // Step 5: If dp[amount] is still Infinity, it means we can't make the given amount using the coins.
    // Otherwise, return dp[amount], which is the minimum number of coins required.
    return dp[amount] === Infinity ? -1 : dp[amount];
}


/************************************** COIN CHANGE - II  *************************************************
 * Leetcode 16: https://leetcode.com/problems/coin-change-ii/
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