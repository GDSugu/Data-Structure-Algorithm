/**************************************** 1) Shortest Path in Binary Matrix ********************************
LEETCODE: https://leetcode.com/problems/shortest-path-in-binary-matrix/description/

Given a square binary matrix, find the length of the shortest path from the top-left cell to the destination cell given as (x, y) moving only in up, down, left, right directions. consider matrix as 0 indexed. You must return -1 in case of no path.

Input Format
N : Number of rows
M : Number of columns
A : (N x M) Square Binary Matrix
X : Destination row 
Y : Destination column
Output format
Return an integer representing the length of the shortest path from the top-left cell (0, 0) to the destination cell (x, y). If there is no path, return -1.
Example 1
Input
3 4
1 0 0 0 
1 1 0 1 
0 1 1 1
2 3
Output
5
Explanation:
we have to go from A[0][0] to A[2][3]. Minimun steps will be 5.

Example 2
Input
4 4
1 1 1 0 
0 0 0 0 
1 1 0 1 
0 0 1 1 
1 3
Output
-1
Explanation:
You start at the top-left cell (0, 0) and want to reach the destination cell (1, 3).
In the matrix, 1 represents a cell you can walk on, and 0 represents a blocked cell.
From the top-left, all possible moves to the destination (1, 3) are blocked by cells with 0s.
Since no valid path exists from the start to the destination, the result is -1.
Constraints:
1 <= n,m <= 100
0 <= x < n
0 <= y < m
Note:The function should return the result. The driver code will handle printing the output.
 */

function shortestDistance(M, N, A, X, Y) {
    // If the start or destination is blocked, return -1
    if (A[0][0] === 0 || A[X][Y] === 0) return -1;

    // Directions for moving in 4 directions (up, down, left, right)
    let directions = [
      [0, 1],   // Right
      [1, 0],   // Down
      [0, -1],  // Left
      [-1, 0]   // Up
    ];

    // Initialize BFS queue with the starting position (0,0) and steps
    let queue = [[0, 0, 0]]; // [row, col, steps]
    
    // Initialize visited matrix
    let visited = Array.from({ length: M }, () => Array(N).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
      let [row, col, steps] = queue.shift(); // Dequeue the first element

      // If we've reached the destination, return the number of steps
      if (row === X && col === Y) return steps;

      // Explore the 4 neighbors
      for (let [dr, dc] of directions) {
        let newRow = row + dr;
        let newCol = col + dc;

        // Check if the new cell is within bounds, unvisited, and walkable (A[newRow][newCol] === 1)
        if (newRow >= 0 && newRow < M &&
            newCol >= 0 && newCol < N &&
            A[newRow][newCol] === 1 && 
            !visited[newRow][newCol]) {
          visited[newRow][newCol] = true; // Mark as visited
          queue.push([newRow, newCol, steps + 1]); // Enqueue the new cell
        }
      }
    }
    // If we exhausted the queue and haven't found the destination, return -1
    return -1;
  }

  let N = 4
  let M = 4
  let X = 3
  let Y = 3 
  let A = [
    [1, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 1]
  ]

shortestDistance(M, N, A, X, Y)


/********************************** 2) Water & Jug Problem *********************************************
LEETCODE: https://leetcode.com/problems/water-and-jug-problem/description/

 You are given two jugs with capacities x liters and y liters, respectively. You have an infinite supply of water available. You must determine whether it is possible to measure exactly target liters of water using the following operations:

Fill either jug completely with water. Completely empty either jug. Pour water from one jug into another until the receiving jug is full, or the transferring jug is empty. Return whether you can measure exactly target liters.

Input Format:

Three integers x, y, and target are provided:
x: capacity of the first jug (1 ≤ x ≤ 10^6)
y: capacity of the second jug (1 ≤ y ≤ 10^6)
target: the desired amount of water (0 ≤ target ≤ 10^6).
Output Format:

Return true if you can measure exactly target liters using the two jugs, otherwise return false.

Example 1:

Input 1:

x = 3, y = 5
target = 4
Output 1:

true
Explanation:

Fill the 5-liter jug.
Transfer 3 liters from the 5-liter jug to the 3-liter jug.
Now the 5-liter jug has 2 liters. Empty the 3-liter jug and transfer the 2 liters from the 5-liter jug to the 3-liter jug.
Fill the 5-liter jug again, and transfer 1 liter to the 3-liter jug. The 5-liter jug will now have exactly 4 liters.
Example 2:

Input 2:

 x = 2, y = 6
target = 5
Output 2:

false
Explanation
You have two jugs with capacities of 2 liters and 6 liters.
You need to measure exactly 5 liters, but the problem here is that there’s no way to achieve this exact amount using the given operations.
The key idea is that you can measure target liters of water if and only if target is a multiple of the greatest common divisor (GCD) of the two jug capacities and target is less than or equal to the sum of the two capacities (x + y).
Constraints
1 ≤ x ≤ 10^6: Capacity of the first jug.
1 ≤ y ≤ 10^6: Capacity of the second jug.
0 ≤ target ≤ 10^6: The amount of water to be measured.

*/

// Solution 1

function canMeasureWater(jug1Capacity, jug2Capacity, targetCapacity){
    if(targetCapacity > jug1Capacity + jug2Capacity) return false;

    let visited = new Set();
    let queue = [[0,0]]


    while(queue.length > 0){
        let [curX, curY] = queue.shift();

        if(targetCapacity === curX || targetCapacity === curY || targetCapacity === curX + curY) return true;

        let state = `${curX}, ${curY}`

        if(visited.has(state)){
          continue;
        }
        visited.add(state)

        queue.push([jug1Capacity,curY]);
        queue.push([curX,jug2Capacity]);
        queue.push([0,curY])
        queue.push([curX,0])
        queue.push([Math.max(0, curX-(jug2Capacity-curY)), Math.min(jug2Capacity,curX+curY)])
        queue.push([Math.min(jug1Capacity,curX+curY),Math.max(0,curY-(jug1Capacity-curX))])
    }
    return false;
}

// Solution 2

function waterJug(jug1Capacity, jug2Capacity, targetCapacity){

  if(targetCapacity > jug1Capacity+ jug2Capacity) return false;

  function gcd(x,y){
    while(y !== 0){
      let temp = y
      y = x % y
      x = temp
    }
    return X;
  }

  let waterGcd = gcd(jug1Capacity,jug2Capacity)

  return target % waterGcd === 0;
}
