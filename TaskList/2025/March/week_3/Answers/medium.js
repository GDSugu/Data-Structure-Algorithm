
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

