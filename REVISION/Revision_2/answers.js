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
 * Leetcode 4: https://leetcode.com/problems/generate-parentheses/
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


/************************************** LONGEST SUBSTRING WITHOUT REPEATING CHARACTER *************************************************
 * Leetcode 5: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
*/

// SOLUTION: HASHMAP WITH SLIDING WINDOW -> O(n)

function longestSubstringWithNoRepeatingChars(s) {
    let left = 0; // Left pointer
    let maxLength = 0; // Maximum length of substring without repeating characters
    let charCount = new Map(); // Map to store character counts

    // Traverse the string with the right pointer
    for (let right = 0; right < s.length; right++) {
        let rightChar = s[right];

        // Increment count of the character in the map
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // If the character count exceeds 1, shrink the window from the left
        while (charCount.get(rightChar) > 1) {
            let leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);

            // If count becomes 0, remove the character from the map
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }

            left++; // Move the left pointer to shrink the window
        }

        // Update the maxLength after adjusting the window
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength; // ✅ Return the result instead of just logging it
}

/************************************** LONGEST SUBSTRING WITH K UNIQUE CHARACTER *************************************************
 * Geeks 6: https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1
*/

// Solution: SLIDING WINDOW + TWO POINTER + HASHMAP APPROACH -> O(N);

class Solution {
    longestKSubstr(s, k) {
        // Initialize the maximum length to -1 (to indicate no valid substring found yet)
        let maxLength = -1;
        
        // Use a Map to store character frequencies in the current window
        let map = new Map();
        
        // Left pointer of the sliding window
        let left = 0;
        
        // Iterate through the string using the right pointer
        for (let right = 0; right < s.length; right++) {
            let rightChar = s[right];
            
            // Add current character to the map and update its frequency
            map.set(rightChar, (map.get(rightChar) || 0) + 1);
            
            // If the number of unique characters exceeds k, shrink the window from the left
            while (map.size > k) {
                let leftChar = s[left];
                
                // Decrease the frequency of the character at the left pointer
                map.set(leftChar, map.get(leftChar) - 1);
                
                // If the frequency becomes 0, remove the character from the map
                if (map.get(leftChar) === 0) {
                    map.delete(leftChar);
                }
                
                // Move the left pointer to shrink the window
                left++;
            }
            
            // If the current window has exactly k unique characters, update maxLength
            if (map.size === k) {
                maxLength = Math.max(maxLength, right - left + 1);
            }
        }
        
        // Return the length of the longest substring with exactly k unique characters
        return maxLength;
    }
}


/************************************** LONGEST SUBSTRING ATLEAST K REPEATING CHARACTER  *************************************************
 * Leetcode 7: https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
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
 * Geeks 8: https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1
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

/************************************** SUBARRAY WITH SUM EQUALS ZERO  *************************************************
 * Geeks 9: https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1
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


/**************** ABSOLUTE DIFFERENCE BETWEEN PREFIX AND SUFFIX SUM EQUALS ZERO  ****************
 * HEYCOACH 10: Return a list of integers representing the indexes where the absolute difference between PrefixSum[i] and SuffixSum[i] is 0.
 *  If no such index exists, return -1.
*/

// SOLUTION: Prefix Sum + Linear Scan -> O(N)

class Solution {
    solve(arr) {
        let n = arr.length;

        // Array to store the result indices
        let result = [];

        // Calculate the total sum of the array
        let sum = arr.reduce((acc, cur) => acc + cur, 0);

        // To keep track of prefix sum while iterating
        let prefixSum = 0;

        // Traverse through each element of the array
        for (let i = 0; i < n; i++) {
            // Update the prefix sum by adding current element
            prefixSum += arr[i];

            // Calculate suffix sum by subtracting current prefix sum from total sum
            let suffixSum = sum - prefixSum;

            // Check if the sum of elements before index 'i' is equal to the sum of elements after index 'i'
            // (prefixSum - arr[i]) gives sum before index 'i'
            if (prefixSum - arr[i] === suffixSum) {
                // If condition is met, add the index to the result array
                result.push(i);
            }
        }

        // Return the result array if there are any indices, else return an empty array
        return result.length ? result : [];
    }
}


/**************** LENGTH OF THE LONGEST SUBSTRING AFTER K TIMES REPLACEMENT ****************
 * HEYCOACH 11: Diwali Party
 */

// SOLUTION: SLIDING WINDOW + TWO POINTER -> O(N)

class Solution {
    longestWorkingLights(s, k) {
        let maxLen = 0;     // To store the maximum length of valid window
        let left = 0;       // Left pointer of the sliding window
        let count = 0;      // To count the number of broken lights ('.') in the current window

        for (let right = 0; right < s.length; right++) {
            // If current character is a broken light ('.'), increment count
            if (s[right] === '.') {
                count++;
            }

            // If broken lights exceed allowed limit (k), shrink the window from the left
            while (count > k) {
                if (s[left] === '.') {
                    count--;  // Reduce count of broken lights as we're removing this character from the window
                }
                left++; // Move the left pointer forward
            }

            // Update maxLen with the size of the current valid window
            maxLen = Math.max(maxLen, right - left + 1);
        }

        // Return the length of the longest valid substring
        return maxLen;
    }
}



/************************************** MINIMUM WINDOW SUBSTRING  *************************************************
 * Leetcode 12: https://leetcode.com/problems/minimum-window-substring/
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

 
/**************** FIND ALL THE FIRST INDEX OF THE STRING THAT MATCHES THE PATTERN ****************
 * HEYCOACH 13: Unraveling Clues with Professor
 * Professor Prateek from HeyCoach coding academy in Bangalore challenges Varshil to find all indices where a given pattern appears within a given text. Both text and pattern consist of lowercase alphabetical characters. The goal is to identify the starting indices in the text where the complete pattern is found.
*/

// SOLUTION: O(M*N)

class Solution {
    findPatternIndices(text, pattern) {
      let textLength = text.length;          // Length of the input text
      let patternLength = pattern.length;    // Length of the pattern to search
      let result = [];                       // Array to store starting indices of pattern matches
  
      // Loop through the text up to the point where a full pattern can still fit
      for (let i = 0; i <= textLength - patternLength; i++) {
        
        // Extract substring of the same length as the pattern starting at index i
        if (text.substring(i, i + patternLength) === pattern) {
          result.push(i);  // If substring matches the pattern, store the starting index
        }
      }
  
      // Return the list of all starting indices where the pattern is found
      return result;
    }
  }
  

/**************** FIND ALL THE FIRST INDEX OF THE STRING THAT MATCHES THE PATTERN ****************
 * HEYCOACH 14: Mars Mission
You are an astronaut on your way to Mars. There have been reports that extraterrestrial life forms have been found there, and they speak a language similar to English.
They use syllables to form sentences and use two types of syllables which are formed:
*/

//   SOLUTION: GREEDY ALGORITHM -> O(N^2)

  class Solution {
    solve(n, word) {
        // Initialize pointer at the end of the word
        let i = word.length - 1;

        let toggle; // To decide how many characters to take in each step
        let result = []; // To store final chunks
        let set = new Set(['a', 'e', 'i', 'o', 'u']); // Set of vowels for quick lookup

        // Process the word from end to start
        while (i >= 0) {
            // If the current character is a consonant
            if (!set.has(word[i])) {
                toggle = 3; // Take last 3 characters
            } else {
                toggle = 2; // Take last 2 characters if it's a vowel
            }

            // Calculate the starting index of the substring
            let start = i - toggle + 1;

            // Slice the substring from start to current index (i)
            let ans = word.slice(start, i + 1);

            // Add this chunk to the beginning of the result array
            result.unshift(ans);

            // Move the pointer back by the toggle amount
            i = i - toggle;
        }

        // Print the final chunks separated by space
        console.log(...result);
    }
}


/************************************** GAS STATION  *************************************************
 * Leetcode 15: https://leetcode.com/problems/gas-station/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    // Step 1: Calculate total gas available and total cost required
    let totalGas = gas.reduce((sum, g) => sum + g, 0);  // Sum of all gas stations
    let totalCost = cost.reduce((sum, c) => sum + c, 0); // Sum of all costs

    // Step 2: If total gas is less than total cost, it's impossible to complete the circuit
    if (totalGas < totalCost) return -1;

    // Step 3: Initialize variables to track remaining gas and starting station index
    let remainingGas = 0, start = 0;

    // Step 4: Iterate through each gas station
    for (let i = 0; i < gas.length; i++) {
        remainingGas += gas[i] - cost[i]; // Update remaining gas after reaching next station

        // Step 5: If remaining gas becomes negative, reset start index to the next station
        if (remainingGas < 0) {
            start = i + 1; // Set new starting station
            remainingGas = 0; // Reset remaining gas
        }
    }

    // Step 6: Return the starting station index
    return start;
};



/**************** FIND ALL THE FIRST INDEX OF THE STRING THAT MATCHES THE PATTERN ****************
 * HEYCOACH 16: First Non Repeating

Given a string str which denotes a stream of characters, your task is to find a new string output_str. output_str is formed such that 
we have to find the first non-repeating character at each instance when a character is inserted into the stream and append it at the end of output_str. If no such non-repeating character is found, then append 'X' at the end of output_str.
*/

// SOLUTION: Queue + HashMap -> O(N^2)

class Solution {
    firstNonRep(str) {
        let queue = []; // Queue to keep track of characters in the order they appear
        let map = new Map(); // Map to store the frequency of each character
        let result = ''; // String to store the final answer

        // Loop through each character in the input string
        for (let char of str) {
            // Update the character frequency in the map
            map.set(char, (map.get(char) || 0) + 1);

            // Add the current character to the queue
            queue.push(char);

            // Remove characters from the front of the queue if they have frequency > 1 (i.e., are repeating)
            while (queue.length > 0 && map.get(queue[0]) > 1) {
                queue.shift(); // Remove the repeating character from the front
            }

            // If queue is empty, there are no non-repeating characters so far
            if (queue.length === 0) {
                result += 'X';
            } else {
                // The character at the front of the queue is the first non-repeating character
                result += queue[0];
            }
        }

        return result; // Return the final result string
    }
}
