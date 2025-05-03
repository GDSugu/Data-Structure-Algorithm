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


/************************************** SORT CHARACTER BY FREQUENCY  *************************************************
 * Leetcode 2: https://leetcode.com/problems/sort-characters-by-frequency/description/
*/

// SOLUTION: SORTING -> O(N)

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    // Step 1: Count the frequency of each character using a Map
    const freq = new Map();
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }

    // Step 2: Sort characters by frequency (descending), and lexicographically if equal
    const sortedChars = [...freq.keys()].sort((a, b) => {
        if (freq.get(b) !== freq.get(a)) {
            return freq.get(b) - freq.get(a); // Higher frequency first
        } else {
            return a.localeCompare(b); // Lexicographical order if same frequency
        }
    });

    // Step 3: Build the final result by repeating each character by its frequency
    let result = '';
    for (const char of sortedChars) {
        result += char.repeat(freq.get(char));
    }

    return result;
};


/************************************** Sort Colors  *************************************************
 * Leetcode 3: https://leetcode.com/problems/sort-colors/
*/

// SOLUTION: THREE POINTERS -> O(N)

/**
 * Sorts the array containing only 0s, 1s, and 2s in-place.
 * Uses Dutch National Flag algorithm.
 * 
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let low = 0;                // Pointer for next position of 0
    let mid = 0;                // Current index being processed
    let high = nums.length - 1; // Pointer for next position of 2

    // Process elements until mid passes high
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap the current element with the low pointer
            // Move both low and mid forward
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1 is in the correct position, just move mid forward
            mid++;
        } else if (nums[mid] === 2) {
            // Swap the current element with the high pointer
            // Decrease high only, as the swapped-in element needs to be checked again
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }

    // No return needed as the array is modified in-place
};



/************************************** FIND ALL ANAGRAMS IN THE STRING  *************************************************
 * Leetcode 4: https://leetcode.com/problems/find-all-anagrams-in-a-string/
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



/************************************** UNIQUE PATHS - II  *************************************************
 * Leetcode 5: https://leetcode.com/problems/unique-paths-ii/description/
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


/************************************** LONGEST CONSECUTIVE SEQUENCE *************************************************
 * Leetcode 6: https://leetcode.com/problems/longest-consecutive-sequence/description/
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



/************************************** SET MATRIX ZERO *************************************************
 * Leetcode 7: https://leetcode.com/problems/set-matrix-zeroes/description/
*/

// SOLUTION: MATRIX MARKERS

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length;

    let firstRowZero = false;
    let firstColumnZero = false;

    // Check if first row contains zero
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
        }
    }

    // Check if first column contains zero
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColumnZero = true;
        }
    }

    // Mark rows and columns
    for (let i = 1; i < m; i++) {  // ✅ Added "let"
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // Set matrix elements based on markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[0][j] === 0 || matrix[i][0] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Handle first row separately
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }

    // Handle first column separately
    if (firstColumnZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;  // ✅ Fixed "=" instead of "==="
        }
    }
};



/************************************** MAXIMUM NUMBER OF VOWELS IN A SUBSTRING OF A GIVEN LENGTH *************************************************
 * Leetcode 8: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
*/

// SOLUTION: SLIDING WINDOW -> O(n)

var maxVowels = function (s, k) {
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']); // Set for quick lookup
    let maxVowelCount = 0, currentVowelCount = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        // Add right character to the window
        if (vowels.has(s[right])) {
            currentVowelCount++;
        }

        // If window size exceeds k, remove left character
        if (right - left + 1 > k) {
            if (vowels.has(s[left])) {
                currentVowelCount--;
            }
            left++; // Shrink the window
        }

        // Update max vowels found in any window
        maxVowelCount = Math.max(maxVowelCount, currentVowelCount);
    }

    return maxVowelCount;
};



/************************************** MAXIMUM NUMBER OF EVENTS THAT CAN BE ATTENDED *************************************************
 * Leetcode 9: https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/description/
*/

// SOLUTION: 

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
    let n = s.length;
    let result = 0;

    // Store unique characters seen so far on the left
    let leftSet = new Set();

    // Map to store the frequency of each character on the right
    let rightCount = new Map();
    for (let ch of s) {
        rightCount.set(ch, (rightCount.get(ch) || 0) + 1);
    }

    // Set to track unique palindromes
    let seenPalindromes = new Set();

    // Iterate over the string, treating s[i] as the middle character
    for (let i = 0; i < n; i++) {
        let midChar = s[i];

        // Remove current character from rightCount
        if (rightCount.get(midChar) === 1) {
            rightCount.delete(midChar);
        } else {
            rightCount.set(midChar, rightCount.get(midChar) - 1);
        }

        // Check all possible left and right characters
        for (let leftChar of leftSet) {
            if (rightCount.has(leftChar)) {
                let palindrome = leftChar + midChar + leftChar;
                seenPalindromes.add(palindrome);
            }
        }

        // Add current character to leftSet
        leftSet.add(midChar);
    }

    return seenPalindromes.size;
};



/************************************** NUMBER OF ISLANDS*********************************
 * Leetcode 10: https://leetcode.com/problems/number-of-islands/description/
*/

// SOLUTION: O(m×n)
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let islandCount = 0;
    let rows = grid.length;
    let columns = grid[0].length;

    function dfs(r, c) {
        // Base case: Stop if out of bounds or water is found
        if (r < 0 || c < 0 || r >= rows || c >= columns || grid[r][c] === "0") {
            return;
        }

        // Mark current land as visited
        grid[r][c] = "0";

        // Explore all 4 directions (right, left, down, up)
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
    }

    // Iterate through the entire grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (grid[r][c] === "1") {
                // Found a new island, increase count
                islandCount++;
                dfs(r, c); // Start DFS to mark the whole island
            }
        }
    }

    return islandCount;
};



/************************************** GROUP ANAGRAMS *********************************
 * Leetcode 11: https://leetcode.com/problems/group-anagrams/
*/

// SOLUTION: O(n * k log k)
var groupAnagrams = function (strs) {
    let map = new Map();

    for (let word of strs) {
        // Correctly split the word into characters
        let sorted = word.split("").sort().join("");

        // If the sorted word is not in the map, initialize a list
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }

        // Add the original word to the group
        map.get(sorted).push(word);
    }

    // Convert the values of the map to an array
    return Array.from(map.values());
};

// SOLUTION 2: O(nk)

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    let map = new Map();

    for (let word of strs) {
        // Step 1: Create a frequency array of 26 zeros (for 'a' to 'z')
        let freq = new Array(26).fill(0);

        // Step 2: Count occurrences of each character in the word
        for (let char of word) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Step 3: Convert frequency array to a key (string format)
        let key = freq.join("#");  // Joining with '#' to avoid collisions

        // Step 4: Store words in the map using this key
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(word);
    }

    // Step 5: Convert map values to an array and return
    return Array.from(map.values());
};



/************************************** SUM OF TWO INTEGERS  *************************************************
 * Leetcode 12: https://leetcode.com/problems/sum-of-two-integers/
*/

// SOLUTIONS: BITWISE OPERATOR

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    while (b !== 0) {
        let carry = (a & b) << 1; // Carry shifted left
        a = a ^ b; // Sum without carry
        b = carry; // Move carry to next iteration
    }
    return a;
};


/************************************** SPIRAL MATRIX  *************************************************
 * Leetcode 13: https://leetcode.com/problems/spiral-matrix/description/
*/

// SOLUTION: ITERATIVE USING BOUNDARIES


function spiralOrder(matrix) {
    if (!matrix.length || !matrix[0].length) return [];
    
    let result = [];
    let firstRow = 0, lastRow = matrix.length - 1;
    let firstCol = 0, lastCol = matrix[0].length - 1;
    
    while (firstRow <= lastRow && firstCol <= lastCol) {
        // Traverse from left to right (along firstRow)
        for (let i = firstCol; i <= lastCol; i++) {
            result.push(matrix[firstRow][i]);
        }
        firstRow++;
        
        // Traverse from top to bottom (along lastCol)
        for (let i = firstRow; i <= lastRow; i++) {
            result.push(matrix[i][lastCol]);
        }
        lastCol--;
        
        // Traverse from right to left (along lastRow, if valid)
        if (firstRow <= lastRow) {
            for (let i = lastCol; i >= firstCol; i--) {
                result.push(matrix[lastRow][i]);
            }
            lastRow--;
        }
        
        // Traverse from bottom to top (along firstCol, if valid)
        if (firstCol <= lastCol) {
            for (let i = lastRow; i >= firstRow; i--) {
                result.push(matrix[i][firstCol]);
            }
            firstCol++;
        }
    }
    
    return result;
}

// Example usage
let matrix = [
  [1,  2,  3,  4 ],
  [5,  6,  7,  8 ],
  [9, 10, 11, 12]
];
console.log(spiralOrder(matrix)); 
// Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]



/************************************** SUB ARRAY PRODUCT LESS THAN K  *************************************************
 * Leetcode 14: https://leetcode.com/problems/subarray-product-less-than-k/
*/

// SOLUTION: SLIDING WINDOW + TWO POINTER APPROACH

function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0; // Edge case

    let left = 0; // Left boundary of the window
    let product = 1; // Product of elements in the window
    let count = 0; // Count of valid subarrays

    for (let right = 0; right < nums.length; right++) {
        product *= nums[right]; // Expand the window

        // Shrink the window if product >= k
        while (product >= k) {
            product /= nums[left];
            left++;
        }

        // Count valid subarrays ending at `right`
        count += right - left + 1;
    }

    return count;
}



/************************************** FIND ALL SUBSETS  *************************************************
 * Leetcode 15: https://leetcode.com/problems/subsets/
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



/************************************** CLIMBING STAIRS *************************************************
 * Leetcode 16: https://leetcode.com/problems/climbing-stairs/
*/

// SOLUTION 1: RECURSION -> O(2^n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1; // Only one way to climb 1 step
    if (n === 2) return 2; // Two ways: (1+1) or (2)

    return climbStairs(n - 1) + climbStairs(n - 2); // Sum of ways to reach (n-1) and (n-2)
};

// Example
console.log(climbStairs(3)); // Output: 3
console.log(climbStairs(5)); // Output: 8

// SOLUTION 2: BOTTOM - UP APPROACH -> O(n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    let prev2 = 1, prev1 = 2;

    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        [prev2, prev1] = [prev1, current];
    }

    return prev1;
};

