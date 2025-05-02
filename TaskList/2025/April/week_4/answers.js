



/************************************** FIND ALL ANAGRAMS IN THE STRING  *************************************************
 * leetcode 1: https://leetcode.com/problems/find-all-anagrams-in-a-string/
*/

// SOLUTION: HASHMAP + SLIDING WINDOW -> O(N+K)

/**
 * @param {string} s - The source string in which we look for anagrams of p.
 * @param {string} p - The pattern string whose anagrams we're searching for.
 * @return {number[]} - An array of starting indices of p's anagrams in s.
 */
var findAnagrams = function(s, p) {
    let k = p.length; // Length of the pattern string

    let targetMap = new Map(); // Frequency map of characters in p
    let windowMap = new Map(); // Frequency map for the current window in s
    let result = []; // Stores the starting indices of found anagrams

    // Build the frequency map for pattern p
    for (let i = 0; i < k; i++) {
        targetMap.set(p[i], (targetMap.get(p[i]) || 0) + 1);
    }

    let left = 0; // Start index of the sliding window

    // Iterate over the string s with the right pointer
    for (let right = 0; right < s.length; right++) {
        // Add current character to window map
        windowMap.set(s[right], (windowMap.get(s[right]) || 0) + 1);

        // If the window size exceeds the pattern length, shrink it from the left
        if (right - left + 1 > k) {
            let leftChar = s[left];
            if (windowMap.get(leftChar) === 1) {
                windowMap.delete(leftChar); // Remove character if count becomes 0
            } else {
                windowMap.set(leftChar, windowMap.get(leftChar) - 1); // Decrease count
            }
            left++; // Slide the window forward
        }

        // If window size equals pattern length, compare the frequency maps
        if (right - left + 1 === k && compare(targetMap, windowMap)) {
            result.push(left); // If maps match, it's an anagram — store the start index
        }
    }

    return result; // Return all starting indices where anagrams were found
};

/**
 * Helper function to compare two frequency maps
 * @param {Map} map1 - First map to compare
 * @param {Map} map2 - Second map to compare
 * @return {boolean} - True if maps are equal, else false
 */
function compare(map1, map2) {
    if (map1.size !== map2.size) return false;

    for (let [key, val] of map1) {
        if (map2.get(key) !== val) return false;
    }
    return true;
}


/************************************** 132 Pattern  *************************************************
 * Leetcode 1: https://leetcode.com/problems/132-pattern/description/
*/

// SOLUTION: STACK -> O(N)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    
    let stack = []; // Initialize an empty stack to store elements.
    let middle = -Infinity; // Variable to keep track of the "middle" value (nums[k] in the 132 pattern).

    // Loop through the array from right to left (starting from the last element).
    for (let i = nums.length - 1; i >= 0; i--) {

        // Check if the current element nums[i] is less than the "middle" value (nums[k]).
        // If so, we have found a valid 132 pattern, return true.
        while (nums[i] < middle) {
            return true;
        }

        // While there are elements in the stack and the top of the stack is smaller than nums[i],
        // pop elements from the stack and update the "middle" value. 
        // This will help identify the largest possible "middle" value for a valid 132 pattern.
        while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
            middle = stack.pop(); // Update the middle to the top element of the stack.
        }

        // Push the current element nums[i] onto the stack, as it might be a candidate for nums[j] in the future.
        stack.push(nums[i]);
    }
    
    // If no valid 132 pattern is found, return false.
    return false;
};


/************************************** UNIQUE PATHS - II  *************************************************
 * Leetcode 2: https://leetcode.com/problems/unique-paths-ii/description/
*/

// SOLUTION: DYNAMIC PROGRAMMING -> O(M*N)

/**
 * @param {number[][]} obstacleGrid - 2D grid where 1 represents an obstacle and 0 represents a free cell
 * @return {number} - Number of unique paths from top-left to bottom-right avoiding obstacles
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;       // Total number of rows
    let n = obstacleGrid[0].length;     // Total number of columns

    // 🚫 Edge case: If start or end cell is blocked, no paths are possible
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) return 0;

    // 🛤️ Create a 2D array to store the number of unique paths to reach each cell
    let path = new Array(m).fill(0).map(() => new Array(n).fill(0));

    // 🔥 Set the starting cell. There's exactly 1 way to stand at the start.
    path[0][0] = 1;

    // 🧠 Traverse the grid cell by cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            
            // Skip the start cell because it's already initialized
            if (i === 0 && j === 0) continue;

            // 🚧 If the current cell has an obstacle, set paths to 0 (unreachable)
            if (obstacleGrid[i][j] === 1) {
                path[i][j] = 0;
            } else {
                // 👆 If not in the first row, add the number of ways from the cell directly above
                if (i > 0) path[i][j] += path[i-1][j];

                // 👉 If not in the first column, add the number of ways from the cell directly to the left
                if (j > 0) path[i][j] += path[i][j-1];
            }
        }
    }

    // ✅ The final result will be the number of paths to reach the bottom-right cell
    return path[m-1][n-1];
};
