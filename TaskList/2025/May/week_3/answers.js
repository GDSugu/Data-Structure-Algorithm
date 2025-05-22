/************************************** SEPARATE BLACK AND WHITE BALLS  *************************************************
 * Leetcode 1: https://leetcode.com/problems/separate-black-and-white-balls/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {string} s - Binary string where '1' = black ball, '0' = white ball
 * @return {number} - Minimum steps to move all black balls to the right using adjacent swaps
 */
var minimumSteps = function(s) {
    let white = 0; // Count of white balls ('0') seen so far while scanning from right to left
    let step = 0;  // Total number of steps (swaps) needed

    // Traverse the string from right to left
    for (let right = s.length - 1; right >= 0; right--) {
        if (s[right] === '0') {
            // If current ball is white, increase the count
            white++;
        } else {
            // If current ball is black, it needs to pass all white balls after it
            step += white; // Add the number of whites after it (i.e., number of swaps needed)
        }
    }

    return step; // Return total steps required to group all black balls on the right
};


/************************************** FIND MINIMUM IN ROTATED SORTED ARRAY  *************************************************
 * Leetcode 2: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If the mid element is greater than the rightmost element,
        // the minimum must be in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum is in the left half (including mid)
            right = mid;
        }
    }

    // When left == right, we've found the minimum
    return nums[left];
};


/************************************** FIND PEAK ELEMENT  *************************************************
 * Leetcode 3: https://leetcode.com/problems/find-peak-element/
*/

// SOLUTION: BINARY SERACH -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    // Initialize pointers to the start and end of the array
    let left = 0;
    let right = nums.length - 1;

    // Binary search loop
    while (left < right) {
        // Find the middle index
        let mid = Math.floor((left + right) / 2);

        // Compare middle element with its right neighbor
        if (nums[mid] < nums[mid + 1]) {
            // If mid is less than mid+1, peak must be on the right side
            left = mid + 1;
        } else {
            // If mid is greater than or equal to mid+1, peak is on the left side (including mid)
            right = mid;
        }
    }

    // At the end, left and right will point to the peak element
    return left;
};


/************************************** FIND FIRST AND LAST POSITION OF ELEMENT  *************************************************
 * Leetcode 4: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * @param {number[]} nums - The sorted array
 * @param {number} target - The number we are searching for
 * @return {number[]} - The first and last index of target, or [-1, -1] if not found
 */
var searchRange = function(nums, target) {

    // Function to find the first occurrence (leftmost index) of the target
    function findFirst(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let index = -1; // Store the result if target is found

        // Binary search loop
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;      // Record the index
                right = mid - 1;  // Keep searching on the left side
            } else if (nums[mid] < target) {
                left = mid + 1;   // Move right
            } else {
                right = mid - 1;  // Move left
            }
        }

        return index;
    }

    // Function to find the last occurrence (rightmost index) of the target
    function findLast(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let index = -1; // Store the result if target is found

        // Binary search loop
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;     // Record the index
                left = mid + 1;  // Keep searching on the right side
            } else if (nums[mid] < target) {
                left = mid + 1;  // Move right
            } else {
                right = mid - 1; // Move left
            }
        }

        return index;
    }

    // Call both functions to get start and end index
    let start = findFirst(nums, target);
    let end = findLast(nums, target);

    return [start, end];
};


/************************************** SMALLEST SUBSEQUENCE OF DISTINCT CHARACTER  *************************************************
 * Leetcode 5: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/
*/

// SOLUTION: GREEDY + MONOTONIC INCREASING STACK + SET

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
    // Step 1: Count frequency of each character
    let count = new Map();
    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    let seen = new Set();  // Tracks characters already added to result
    let stack = [];        // Used to build the result (monotonic stack)

    // Step 2: Traverse each character in the string
    for (let ch of s) {
        // Decrease the frequency as we've seen this character now
        count.set(ch, count.get(ch) - 1);

        // If character is already in result, skip it
        if (seen.has(ch)) continue;

        // Step 3: Maintain lexicographical order
        // While stack is not empty,
        // and current char is smaller than top of stack (for lex order),
        // and the top character still appears later in the string
        while (
            stack.length &&
            ch < stack[stack.length - 1] &&
            count.get(stack[stack.length - 1]) > 0
        ) {
            // Remove top of stack from both stack and seen
            seen.delete(stack.pop());
        }

        // Step 4: Add current char to stack and mark it as seen
        stack.push(ch);
        seen.add(ch);
    }

    // Step 5: Join the stack to form the final result string
    return stack.join('');
};


/************************************** REMOVE DUPLICATE LETTERS  *************************************************
 * Leetcode 6: https://leetcode.com/problems/remove-duplicate-letters/description/
*/

// SOLUTION: GREEDY + MONOTONIC INCREASING STACK + SET

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    let map = new Map(); // To count the frequency of each character in the string

    // Step 1: Count how many times each character appears
    for (let char of s) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    let stack = [];       // Stack to store the final result characters
    let set = new Set();  // Set to track which characters are already in the stack

    // Step 2: Iterate through the string
    for (let ch of s) {
        // Decrease the remaining count of the current character
        map.set(ch, map.get(ch) - 1);

        // If the character is already in the stack, skip it
        if (set.has(ch)) continue;

        // Step 3: Maintain lexicographical order and uniqueness
        // Remove characters from the stack if:
        // - The current character is smaller (to get lexicographically smaller string)
        // - The character at the top of the stack will appear again later (safe to remove)
        while (
            stack.length &&
            ch < stack[stack.length - 1] &&
            map.get(stack[stack.length - 1]) > 0
        ) {
            // Remove the character from the set and stack
            set.delete(stack.pop());
        }

        // Add the current character to the stack and mark it as seen
        stack.push(ch);
        set.add(ch);
    }

    // Step 4: Join the stack to form the result string
    return stack.join('');
};


/************************************** DIVIDE ARRAY IN SETS OF K CONSECUTIVE NUMBERS  *************************************************
 * Leetcode 7: https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/description/
*/

// SOLUTION: HASHMAP + SORTING + GREEDY O(n + m log m + m * k)

/**
 * @param {number[]} nums - Array of integers
 * @param {number} k - Size of each consecutive group
 * @return {boolean} - True if nums can be divided into sets of k consecutive numbers
 */
var isPossibleDivide = function(nums, k) {

    // If total number of elements isn't divisible by k, division into equal groups is impossible
    if (nums.length % k !== 0) return false;

    let map = new Map();

    // Count the frequency of each number in the array
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    // Sort the unique numbers to always start forming groups from the smallest
    let sorted = Array.from(map.keys()).sort((a, b) => a - b);

    // Try to form groups starting from each unique number
    for (let num of sorted) {
        let count = map.get(num);

        if (count === 0) continue; // If all of this number has been used, skip

        // Try to build a group of k consecutive numbers starting from `num`
        for (let i = 0; i < k; i++) {
            let current = num + i;

            // If any of the required numbers is missing or not enough to match `count`, return false
            if ((map.get(current) || 0) < count) return false;

            // Subtract `count` from each number in the sequence since we're forming `count` groups
            map.set(current, map.get(current) - count);
        }
    }

    // If all groups were successfully formed, return true
    return true;
};


/************************************** TIME BASED KEY - VALUE STORE  *************************************************
 * Leetcode 8: https://leetcode.com/problems/time-based-key-value-store/description/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

var TimeMap = function() {
    // Initialize a Map to store key -> list of [timestamp, value] pairs
    this.store = new Map();
};

/** 
 * Stores the key with the given value and timestamp.
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    // If the key doesn't exist yet, create a new empty array for it
    if (!this.store.has(key)) {
        this.store.set(key, []);
    }

    // Append the [timestamp, value] pair to the list for this key
    this.store.get(key).push([timestamp, value]);
};

/** 
 * Retrieves the value associated with the key at or before the given timestamp.
 * If there are multiple values before or at the timestamp, return the value with the largest timestamp <= given timestamp.
 * If no such timestamp exists, return an empty string.
 * 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    // Get the list of [timestamp, value] pairs for the given key
    let value = this.store.get(key);

    // If the key does not exist, return empty string
    if (!value) return "";

    // Initialize binary search bounds
    let left = 0;
    let right = value.length - 1;

    // This will store the result if a suitable timestamp is found
    let result = "";

    // Binary search to find the largest timestamp <= given timestamp
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let time = value[mid][0];

        // If the current timestamp is <= target timestamp, move right to search for a closer timestamp
        if (time <= timestamp) {
            // Update the result with the current value, as it satisfies the condition
            result = value[mid][1];
            // Move search window right to see if there's a later timestamp still <= target
            left = mid + 1;
        } else {
            // Current timestamp is too large, discard right half
            right = mid - 1;
        }
    }

    // Return the value corresponding to the closest timestamp <= given timestamp, or "" if none found
    return result;
};

/** 
 * Usage example:
 * var obj = new TimeMap()
 * obj.set(key, value, timestamp)
 * var param_2 = obj.get(key, timestamp)
 */


/************************************** FIRST BAD VERSION  *************************************************
 * Leetcode 9: https://leetcode.com/problems/first-bad-version/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion() - API to check if a version is bad
 * @return {function} - Returns a function that finds the first bad version
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n - Total number of versions
     * @return {integer} - The first bad version
     */
    return function(n) {
        let left = 1;        // Start of the search range
        let right = n;       // End of the search range

        // Binary search to find the first bad version
        while (left <= right) {
            let mid = Math.floor((left + right) / 2); // Find the middle version

            if (isBadVersion(mid)) {
                // If mid is bad, first bad version could be at mid or before
                right = mid - 1;
            } else {
                // If mid is good, first bad version must be after mid
                left = mid + 1;
            }
        }

        // At this point, 'left' points to the first bad version
        return left;
    };
};


/************************************** FIRST SMALLEST LETTER GREATER THAN TARGET  *************************************************
 * Leetcode 10: https://leetcode.com/problems/find-smallest-letter-greater-than-target/
*/

// SOLUTION: BINARY SEARCH -> O(log n)

/**
 * Finds the smallest character in the sorted array `letters` that is greater than the `target`.
 * If no such character exists, it wraps around and returns the first character.
 *
 * @param {character[]} letters - Sorted list of lowercase letters.
 * @param {character} target - Target letter to find the next greatest character for.
 * @return {character} - The next greatest letter.
 */
var nextGreatestLetter = function(letters, target) {
    // Initialize binary search boundaries
    let left = 0;
    let right = letters.length - 1;

    // Binary search to find the smallest letter greater than target
    while (left <= right) {
        let mid = Math.floor((left + right) / 2); // Calculate middle index

        // If the mid letter is greater than the target,
        // move the right pointer to search in the left half (could be a valid answer)
        if (letters[mid] > target) {
            right = mid - 1;
        } else {
            // If the mid letter is less than or equal to the target,
            // move the left pointer to search in the right half
            left = mid + 1;
        }
    }

    // If left points beyond the array, use modulo to wrap around to the first character
    return letters[left % letters.length];
};


/************************************** AGGRESSIVE COWS  *************************************************
 * Leetcode 11: https://www.geeksforgeeks.org/problems/aggressive-cows/1
*/

// SOLUTION: SORTING + BINARY SEARCH -> O(NlogN+NlogD)

// User function Template for javascript
/**
 * @param {number[]} stalls
 * @param {number} k
 * @returns {number}
 */

class Solution {
    // Function to solve the problem.
    aggressiveCows(stalls, k) {

        stalls.sort((a, b) => a - b);
        const n = stalls.length; // Get the length after sorting

        // Helper function to check if it's possible to place 'k' cows
        // such that the minimum distance between any two is at least 'minDist'.
        const check = (minDist) => { // Changed 'min' to 'minDist' for clarity
            let cowsPlaced = 1; // Place the first cow at the first stall
            let lastCowPosition = stalls[0];

            for (let i = 1; i < n; i++) { // Use 'n' for array length
                if (stalls[i] - lastCowPosition >= minDist) {
                    cowsPlaced++;
                    lastCowPosition = stalls[i];
                }

                if (cowsPlaced === k) {
                    return true;
                }
            }
            return false;
        };

        let left = 1; // The smallest possible minimum distance is 1 (if k > 1)
        
        // **CORRECTION HERE:**
        // The right boundary should be the maximum possible distance between any two stalls,
        // which is the difference between the largest and smallest stall positions.
        let right = stalls[n - 1] - stalls[0]; 
        
        let ans = 0; // Stores the maximum possible minimum distance found so far

        // If k is 1, the distance doesn't matter, we can place it anywhere.
        // If k is 2 and there's only one stall, or if k > n, then 0 is the answer, 
        // but constraints say 2 <= k <= stalls.size() and 2 <= stalls.size(),
        // so k will always be valid to place at least 2 cows.
        
        while (left <= right) {
            let mid = Math.floor(left + (right - left) / 2); // Safest way to calculate mid

            if (check(mid)) {
                ans = mid; // 'mid' is achievable, try for a larger distance
                left = mid + 1;
            } else {
                right = mid - 1; // 'mid' is not achievable, reduce the distance
            }
        }

        return ans;
    }
}

/************************************** ALLOCATE MINIMUM PAGES  *************************************************
 * Geeks 12: https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1
*/

// SOLUTION: SORTING + BINARY SEARCH -> O(NlogN+NlogD)

// User function Template for javascript
/**
 * @param {number[]} arr - Array representing pages in each book
 * @param {number} k - Number of students
 * @returns {number} - Minimum possible value of the maximum number of pages
 */

class Solution {
    // Function to find minimum number of pages.
    findPages(arr, k) {
        // Total sum of pages (used as the upper bound in binary search)
        let sum = arr.reduce((acc, cur) => acc + cur, 0);

        // If there are more students than books, it's impossible to allocate
        if (k > arr.length) return -1;

        // If only one student, they must read all the books
        if (k === 1) return sum;

        // Helper function to check if we can allocate books such that
        // no student gets more than 'mid' pages
        const check = (mid) => {
            let student = 1; // Start with one student
            let pages = 0;   // Track pages assigned to the current student

            for (let i = 0; i < arr.length; i++) {
                // If any single book has more pages than 'mid', it's impossible
                if (arr[i] > mid) return false;

                // If adding this book exceeds the current limit 'mid',
                // assign it to the next student
                if (pages + arr[i] > mid) {
                    student++;
                    pages = arr[i];

                    // If students required exceed 'k', not possible
                    if (student > k) return false;
                } else {
                    // Otherwise, assign book to the current student
                    pages += arr[i];
                }
            }
            return true; // Allocation possible with current 'mid'
        };

        // Set binary search bounds
        let left = Math.max(...arr); // Lower bound: max pages in a single book
        let right = sum;             // Upper bound: total sum of pages
        let ans = 0;                 // To store the result

        // Binary search to find the minimum possible max pages
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            // If allocation is possible with current mid as max pages
            if (check(mid)) {
                ans = mid;         // Store the result
                right = mid - 1;   // Try to find a smaller possible max
            } else {
                left = mid + 1;    // Increase the lower bound
            }
        }

        return ans; // Final answer: minimum possible value of the maximum pages
    }
}
