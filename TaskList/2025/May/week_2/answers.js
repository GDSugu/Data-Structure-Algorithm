/************************************** FAIR DISTRIBUTION OF COOKIES  *************************************************
 * Leetcode 1: https://leetcode.com/problems/fair-distribution-of-cookies/description/
*/

// SOLUTION: BACKTRACKING AND RECURSION -> O(K^n)

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

// Example usage:
console.log(distributeCookies([8, 15, 10, 20, 8], 2)); // Output: 31
console.log(distributeCookies([6, 1, 3, 2, 2, 4, 1, 2], 3)); // Output: 7
