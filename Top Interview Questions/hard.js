/**************************************** REGULAR EXPRESSION MATCHING  ********************************
 * LEETCODE 1: https://leetcode.com/problems/regular-expression-matching/description/
*/

// SOLUTION:  



/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:  



/**************************************** RAIN WATER TRAPPING  ********************************
 * LEETCODE 3: https://leetcode.com/problems/trapping-rain-water/
*/

// SOLUTION: TWO POINTER METHOD

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0; right = height.length - 1;
    let leftMax = 0; rightMax = 0;
    let trappedWater = 0;

    while(left < right){
        if(height[left] < height[right]){
            leftMax = Math.max(leftMax,height[left]);
            trappedWater+= leftMax - height[left]
            left++;
        }else{
            rightMax = Math.max(rightMax, height[right]);
            trappedWater+= rightMax - height[right];
            right--;
        }
    }

    return trappedWater;

};

/**************************************** LARGEST RTECTANGLE IN HISTOGRAM  ********************************
 * LEETCODE 4: https://leetcode.com/problems/largest-rectangle-in-histogram/
*/

// SOLUTION: MONOTONIC INCREASING STACK

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    let stack = [];
    heights.push(0); // Append 0 to ensure all elements get processed

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()]; // Get the height of the popped bar
            let width;
            
            if (stack.length === 0) {
                width = i; // No left boundary, so width spans from 0 to i
            } else {
                width = i - stack[stack.length - 1] - 1; // Width is between current index and previous stack top
            }

            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i); // Push the current index to the stack
    }

    return maxArea;
};



/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION:

/**************************************** SUDOKU SOLVER  ********************************
 * LEETCODE 2: https://leetcode.com/problems/sudoku-solver/description/
*/

// SOLUTION: