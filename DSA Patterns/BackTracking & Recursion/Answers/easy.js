/************************************** FIBONACCI NUMBERS *************************************************
 * Leetcode 1: https://leetcode.com/problems/combination-sum-ii/
*/

// SOLUTION 1: RECURSION -> O(2^n)

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0) return 0; // Base case
    if (n === 1) return 1; // Base case
    
    return fib(n - 1) + fib(n - 2); // Recursive call
};


// SOLUTION 2: BOTTOM UP APPROACH -> O(n)

/**
 * @param {number} n - The index of the Fibonacci sequence.
 * @return {number} - The nth Fibonacci number.
 */
var fib = function(n) {
    // Base cases: 
    if (n === 0) return 0; // Fibonacci(0) = 0
    if (n === 1) return 1; // Fibonacci(1) = 1

    // Initialize two variables to store the last two Fibonacci numbers
    let prev2 = 0; // Fibonacci(n-2)
    let prev1 = 1; // Fibonacci(n-1)

    // Iterate from 2 to n to compute Fibonacci numbers iteratively
    for (let i = 2; i <= n; i++) {
        let current = prev1 + prev2; // Compute current Fibonacci number

        // Update prev1 and prev2 using array destructuring
        [prev1, prev2] = [current, prev1];
    }

    // Return the nth Fibonacci number
    return prev1;
};

// Example runs
console.log(fib(10)); // Output: 55
console.log(fib(50)); // Output: 12586269025

/************************************** CLIMBING STAIRS *************************************************
 * Leetcode 2: https://leetcode.com/problems/climbing-stairs/
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

