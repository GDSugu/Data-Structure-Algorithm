/************************************** FAIR DISTRIBUTION OF COOKIES  *************************************************
 * Leetcode 1: https://leetcode.com/problems/fair-distribution-of-cookies/description/
*/

// SOLUTION: BACKTRACKING AND RECURSION + PRUNNING (AVOID SYMMETRY)-> O(K^n)

function distributeCookies(cookies, k) {
    // Initialize the minimum unfairness to Infinity.
    // This will store the smallest maximum total among all children across all distributions.
    let minUnfairness = Infinity;

    // Array to store the total cookies assigned to each of the k children.
    const distribution = new Array(k).fill(0);

    // Backtracking function to try assigning each cookie bag starting from index 'start'
    function backtrack(start) {
        // Base case: all cookie bags have been assigned
        if (start === cookies.length) {
            // Calculate the maximum cookies any child has in the current distribution
            const currentMax = Math.max(...distribution);
            // Update minimum unfairness if current distribution is better
            if (currentMax < minUnfairness) {
                minUnfairness = currentMax;
            }
            return;
        }

        // Try giving the current cookie bag to each child one by one
        for (let i = 0; i < k; i++) {
            // Prune the path early if current assignment already exceeds known best unfairness
            if (distribution[i] + cookies[start] < minUnfairness) {
                // Assign the cookie bag to the i-th child
                distribution[i] += cookies[start];

                // Recurse to assign the next cookie bag
                backtrack(start + 1);

                // Backtrack: remove the cookie bag from the i-th child
                distribution[i] -= cookies[start];
            }

            // Optimization:
            // If a child has 0 cookies even after trying to assign this one,
            // skip trying the same cookie with other children who also have 0.
            // This avoids exploring symmetric permutations that lead to the same result.
            if (distribution[i] === 0) {
                break;
            }
        }
    }

    // Start the backtracking from the 0th cookie
    backtrack(0);

    // Return the minimum unfairness found across all valid distributions
    return minUnfairness;
}

// SOLUTION: SORTING + BACKTRACKING + PRUNNING -> O(K^n) FASTER THAN SOLUTION 1;

var distributeCookies = function(cookies, k) {
    let minUnfairness = Infinity;
    const distribution = new Array(k).fill(0);
    
    // Sort in descending order for better pruning
    cookies.sort((a,b) => b-a);
    
    function backtrack(start) {
        if (start === cookies.length) {
            const currentMax = Math.max(...distribution);
            minUnfairness = Math.min(minUnfairness, currentMax);
            return;
        }
        
        // Try giving the current cookie to each child
        for (let i = 0; i < k; i++) {
            // Prune if this path can't improve minUnfairness
            if (distribution[i] + cookies[start] >= minUnfairness) continue;
            
            distribution[i] += cookies[start];
            backtrack(start + 1);
            distribution[i] -= cookies[start];
            
            // Early exit if this is first time child is getting a cookie
            if (distribution[i] === 0) break;
        }
    }
    
    backtrack(0);
    return minUnfairness;
};

// Example usage:
console.log(distributeCookies([8, 15, 10, 20, 8], 2)); // Output: 31
console.log(distributeCookies([6, 1, 3, 2, 2, 4, 1, 2], 3)); // Output: 7


/************************************** LARGEST NUMBER *************************************************
 * Leetcode 2: https://leetcode.com/problems/largest-number/
*/

// SOLUTION: O(n log n)

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    // Convert all numbers to strings
    let value = nums.map(String);

    // Sort using custom comparator: (b+a) - (a+b) won't work since these are strings
    // We use localeCompare or manual comparison of b+a vs a+b
    value.sort((a, b) => (b + a).localeCompare(a + b));

    // Join the sorted values
    let result = value.join("");

    // Handle edge case: if the number starts with '0', return "0"
    return result[0] === "0" ? "0" : result;
};


/************************************** MEETING ROOMS II  *************************************************
 * Geeks 3: https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1
*/

// SOLUTION: SORTING + TWO POINTER -> O(N log N)

class Solution {
    minMeetingRooms(start, end) {
        // Get the number of meetings
        let n = start.length;

        // Sort the start and end times independently
        // This helps us simulate the order of meeting events over time
        start.sort((a, b) => a - b);
        end.sort((a, b) => a - b);

        // room: current number of rooms in use
        // minRoom: maximum number of rooms needed at any time
        let room = 0;
        let minRoom = 0;

        // i: pointer to traverse start times
        // j: pointer to traverse end times
        let i = 0;
        let j = 0;

        // Traverse through all the start times
        while (i < n) {
            // If a new meeting starts before the earliest current one ends
            // Then we need an additional room
            if (start[i] < end[j]) {
                room++; // Allocate a new room
                i++;    // Move to next start time
            } else {
                // A meeting has ended, free up a room
                room--;
                j++;    // Move to next end time
            }

            // Track the maximum number of rooms ever used at once
            minRoom = Math.max(minRoom, room);
        }

        // Return the minimum number of rooms required to host all meetings
        return minRoom;
    }
}


/************************************** MAJORITY ELEMENT  *************************************************
 * Leetcode 4: https://leetcode.com/problems/majority-element/
*/

// SOLUTION: BOYER-MOORE -> O(N)

/**
 * @param {number[]} nums - An array of integers
 * @return {number} - The majority element that appears more than n/2 times
 */
var majorityElement = function(nums) {
    let candidate = null; // Will hold the potential majority element
    let count = 0;        // Vote counter for the current candidate

    for (let num of nums) {
        // If count is 0, we choose the current number as a new candidate
        if (count === 0) {
            candidate = num;
        }

        // If the current number is the same as the candidate, increase the count
        if (num === candidate) {
            count++;
        } else {
            // Otherwise, decrease the count
            count--;
        }
    }

    // After one pass, the candidate is guaranteed to be the majority element
    return candidate;
};


/************************************** MAJORITY ELEMENT-II  *************************************************
 * Leetcode 5: https://leetcode.com/problems/majority-element-ii/description/
*/

// SOLUTION: HASHMAP -> O(N) / SPACE COMPLEXITY -> O(N)

/**
 * @param {number[]} nums - An array of integers
 * @return {number[]} - An array of elements that appear more than ⌊n/3⌋ times
 */
var majorityElement = function(nums) {

    let result = []; // Array to store the elements that appear more than n/3 times
    let map = new Map(); // Map to keep track of the frequency of each element

    // Step 1: Count the frequency of each element in the array
    for (let num of nums) {
        // If the number already exists in the map, increment its count, otherwise set it to 1
        map.set(num, (map.get(num) || 0) + 1);
    }

    // Step 2: Determine the threshold for majority elements (⌊n/3⌋)
    let size = Math.floor(nums.length / 3);

    // Step 3: Iterate through the map to find elements that appear more than ⌊n/3⌋ times
    for (let [num, count] of map) {
        // If the count of the current number exceeds the threshold, add it to the result array
        if (count > size) {
            result.push(num);
        }
    }

    // Return the result array containing the majority elements
    return result;
};


// SOLUTION: BOYER-MOORE -> O(N) / SPACE COMPLEXITY -> O(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    let result = [];

    // Initialize two potential candidates for majority elements
    let candidate1 = null;
    let candidate2 = null;

    // Counts for the candidates
    let count1 = 0;
    let count2 = 0;

    // First pass: find potential candidates using Boyer-Moore Voting Algorithm (modified for n/3 case)
    for (let num of nums) {
        if (num === candidate1) {
            // If num matches candidate1, increment count1
            count1++;
        } else if (num === candidate2) {
            // If num matches candidate2, increment count2
            count2++;
        } else if (count1 === 0) {
            // If count1 is 0, assign new candidate1
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            // If count2 is 0, assign new candidate2
            candidate2 = num;
            count2 = 1;
        } else {
            // If num doesn't match either candidate and both counts are non-zero, decrement both
            count1--;
            count2--;
        }
    }

    // Reset counts for actual validation
    count1 = 0;
    count2 = 0;

    // Second pass: count actual occurrences of the two candidates
    for (let num of nums) {
        if (num === candidate1) count1++;
        if (num === candidate2) count2++;
    }

    // Compute the threshold for majority (more than ⌊n/3⌋ times)
    let size = Math.floor(nums.length / 3);

    // Include candidates in result if they appear more than n/3 times
    if (count1 > size) result.push(candidate1);
    if (candidate2 !== candidate1 && count2 > size) result.push(candidate2); // Avoid duplicates

    return result;
};


/************************************** SPIRAL MATRIX-II  *************************************************
 * Leetcode 6: https://leetcode.com/problems/spiral-matrix-ii/
*/

// SOLUTION: O(N^2)

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // Step 1: Create an empty n x n matrix
    let matrix = Array.from({ length: n }, () => new Array(n));

    // Step 2: Define the boundaries of the spiral traversal
    let left = 0, right = n - 1;
    let top = 0, bottom = n - 1;

    // Step 3: Start filling numbers from 1 to n*n
    let num = 1;

    // Step 4: Continue the spiral traversal while boundaries are valid
    while (left <= right && top <= bottom) {

        // 👉 Traverse from Left to Right on the top row
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++; // Move the top boundary down

        // 👉 Traverse from Top to Bottom on the right column
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--; // Move the right boundary left

        // 👉 Traverse from Right to Left on the bottom row (only if still within bounds)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--; // Move the bottom boundary up
        }

        // 👉 Traverse from Bottom to Top on the left column (only if still within bounds)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++; // Move the left boundary right
        }
    }

    // Step 5: Return the filled spiral matrix
    return matrix;
};


