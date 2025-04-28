

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

/************************************* FIRST NEGATIVE INTEGER IN THE EVERY WINDOW K SIZE  *************************************************
 * Geeks 1: https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1
*/

// SOLUTION: SLIDING WINDOW -> O(N)

class Solution {
    firstNegInt(arr, k) {
        let result = [];   // This will store the final results (first negative integer for each window)
        let queue = [];    // This will hold the indices of negative integers in the current window
        let left = 0;      // This is the left boundary of the sliding window

        // Loop through the array with 'right' pointer representing the right boundary of the window
        for (let right = 0; right < arr.length; right++) {
            
            // If the current element is negative, store its index in the queue
            if (arr[right] < 0) {
                queue.push(right);
            }

            // Check if the window size has reached 'k' (right - left + 1 is the window size)
            if (right - left + 1 === k) {
                
                // If no negative integers are found in the current window
                if (queue.length === 0) {
                    result.push(0);  // Add 0 to the result (no negative integer in the window)
                } else {
                    // The first negative integer in the window is at the front of the queue
                    result.push(arr[queue[0]]);
                    
                    // If the first negative integer is going out of the window (left boundary)
                    if (queue[0] === left) {
                        queue.shift();  // Remove it from the queue as it's no longer in the window
                    }
                }
                
                // Move the left boundary of the window (slide the window right)
                left++;
            }
        }

        // Return the list of first negative integers for each window of size k
        return result;
    }
}

/************************************** SUBARRAY WITH SUM EQUALS 0  *************************************************
 * Geeks 1: https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1
*/

// SOLUTION: PREFIX SUM + SET -> O(N)

/**
 * @param {number[]} arr
 * @returns {boolean}
 */
class Solution {
    // Function to check whether there is a subarray present with 0-sum or not.
    subArrayExists(arr) {
        // Create a Set to store prefix sums we've seen so far
        let set = new Set();

        // Initialize prefix sum as 0
        let sum = 0;

        // Traverse through the array
        for (let num of arr) {
            // Add current element to cumulative sum
            sum += num;

            // Case 1: If at any point, sum is 0, a subarray from the start has sum 0
            // Case 2: If we've seen this sum before, the elements in between sum to 0
            if (sum === 0 || set.has(sum)) {
                return true;
            }

            // Add current sum to the set
            set.add(sum);
        }

        // If loop completes and we didn't find any zero-sum subarray
        return false;
    }
}

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

/************************************** MINIMUM WINDOW SUBSTRING  *************************************************
 * Leetcode 1: https://leetcode.com/problems/minimum-window-substring/
*/

// SOLUTION: HASHMAP + SLIDING WINDOW -> O(N+M)

/**
 * @param {string} s - The string to search in
 * @param {string} t - The string with required characters
 * @return {string} - The minimum window in s which contains all characters in t
 */
var minWindow = function(s, t) {
    // Edge case: if s is smaller than t, it's impossible
    if (s.length === 0 || t.length === 0 || s.length < t.length) {
        return "";
    }

    // Step 1: Build a frequency map for t
    const targetCounts = new Map();
    for (const char of t) {
        targetCounts.set(char, (targetCounts.get(char) || 0) + 1);
    }

    const required = targetCounts.size; // Number of unique characters to match
    let formed = 0;                     // Number of unique characters matched with required count
    const windowCounts = new Map();     // Frequency of characters in current window

    let left = 0;
    let right = 0;

    let minLength = Infinity;
    let result = "";

    // Step 2: Start expanding the right pointer
    while (right < s.length) {
        const char = s[right];

        // Update window count if char is in t
        if (targetCounts.has(char)) {
            windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

            // If current character count matches required, increment formed
            if (windowCounts.get(char) === targetCounts.get(char)) {
                formed++;
            }
        }

        // Step 3: Try to shrink from the left as much as possible while valid
        while (left <= right && formed === required) {
            // Update result if smaller window found
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                result = s.substring(left, right + 1);
            }

            const leftChar = s[left];

            // If removing this char, update counts and formed
            if (targetCounts.has(leftChar)) {
                windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
                if (windowCounts.get(leftChar) < targetCounts.get(leftChar)) {
                    formed--;
                }
            }

            left++; // Shrink window
        }

        right++; // Expand window
    }

    return result;
};


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
