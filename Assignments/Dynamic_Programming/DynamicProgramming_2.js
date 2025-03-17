/************************************** GRID PUZZLE-I (UNIQUE PATH)***********************************
 
LEETCODE: https://leetcode.com/problems/unique-paths/description/

There is a robot on an ( m * n ) grid. The robot is initially located at the top-left corner (i.e., grid[0][0]).
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers ( m ) and ( n ), return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to ( 2 * 10^9 ).

Input Format:

The first line contains two integers ( m ) and ( n ) denoting the dimensions of the grid.
Output Format:

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
Sample Input 1:

3 2
Sample Output 1:

3
Explanation 1:

From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:

Right -> Down -> Down
Down -> Down -> Right
Down -> Right -> Down
Constraints:

( 1 <= m, n <= 100 )
Note: The function should return the result.
*/

function robotUniquePath(m,n){
    function factorial(x){
        let result = 1;
        for(let i=1; i<=x; i++){
            result*= i;
        }
        return result;
    }

    let totalMoves = m+n-2
    let downMoves = m-1
    let uniquePath = factorial(totalMoves)/ (factorial(downMoves) * factorial(totalMoves - downMoves));

    // console.log(uniquePath);
    return uniquePath;
}

robotUniquePath(5,2)


// Alternate Solution using Dynamic Programming

function uniquePath(m,n){
    let path = new Array(n).fill(1);

    for(let i=1; i<m; i++){
        for(let j=1; j<n; j++){
            path[j]+= path[j-1]
        }
    }
    // console.log(path[n-1])
    return path[n-1]
}

uniquePath(5,2)


/****************************************** GRID PUZZLE-II (UNIQUE PATH) ***************************
 
LEETCODE:https://leetcode.com/problems/unique-paths-ii/description/

 You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

*/


function uniquePathBlocked(obstacleGrid){
    let m = obstacleGrid.length
    let n = obstacleGrid[0].length

    if(obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) return 0;

    let path = new Array(n).fill(0)
    path[0] = 1

    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            if(obstacleGrid[i][j] === 1){
                path[j] = 0;
            }else if(j > 0){
                path[j]+= path[j-1]
            }
        }
    }

    // console.log(path[n-1])
    return path[n-1];
}

const obstacleGrid = [
    [0, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 0, 0]
];

uniquePathBlocked(obstacleGrid)


/*********************************** MIN TAX PAID_I **********************************
Given a m x n grid filled with non-negative numbers, A explorer is at top left cell and he has to find a path from top left to bottom right, but there is a condition he has to pay an amount equal to the cell if he choose to include a particular cell in his path, suggest a path which minimizes the money paid by the explorer

Example

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]

Output: 7
Note: You can only move either down or right at any point in time.

Constraints:

m == grid.length

n == grid[i].length

1 <= m, n <= 200

0 <= grid[i][j] <= 200

Note: The function should return the result.
 
 */

function minTaxPaid(matrix){
    let m = matrix.length
    let n = matrix[0].length

    let dp = new Array(n).fill(0)
    dp[0] = matrix[0][0]

    for(let j=1; j<n; j++){
        dp[j] = dp[j-1] + matrix[0][j]
    }

    
    for(let i=1; i<m; i++){
        dp[0]+= matrix[i][0]
        for(let j=1; j<n; j++){
            dp[j] = Math.min(dp[j],dp[j-1]) + matrix[i][j]
        }
    }
    console.log(dp[n-1])
    return dp[n-1]
}

let matrix = [[1,3,1],[1,5,1],[4,2,1]]
minTaxPaid(matrix)