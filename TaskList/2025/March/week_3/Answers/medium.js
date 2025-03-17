
/************************************** SPIRAL MATRIX  *************************************************
 * Leetcode 1: https://leetcode.com/problems/spiral-matrix/description/
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


/************************************** SUM OF TWO INTEGERS  *************************************************
 * Leetcode 2: https://leetcode.com/problems/spiral-matrix/description/
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

/************************************** SUB ARRAY PRODUCT LESS THAN K  *************************************************
 * Leetcode 3: https://leetcode.com/problems/subarray-product-less-than-k/
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


/************************************** COMBINATIONS  *************************************************
 * Leetcode 4: https://leetcode.com/problems/combinations/
*/

// SOLUTIONS: BACKTRACKING AND RECURSION

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