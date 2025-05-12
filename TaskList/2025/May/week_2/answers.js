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
