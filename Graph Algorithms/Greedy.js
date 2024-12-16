/************************************  1) Activity Selection *******************************************
Problem Description: Max Tasks Done

Raman is going through a very rough phase in his life, and he is determined to earn as much money as possible. He comes across a job where he is allowed to solve as many problems as he can. The problems are given in the form of two arrays of size N, containing the starting and ending day of each problem. Help Raman maximize the number of problems he can solve.

Input:

The first line contains an integer, N (1 ≤ N ≤ 2*10^5), representing the number of problems.
The next two lines contain two arrays of size N each:
The first array contains the starting day of each problem, where 1 ≤ start[i] ≤ 10^9.
The second array contains the ending day of each problem, where 1 ≤ end[i] ≤ 10^9.
Output:

Output a single integer representing the maximum number of problems Raman can solve.
Example:

Input:
5
1 2 3 4 5
3 4 5 6 7

Output:
3

Explanation:
Raman can solve the problems starting on days 1, 3, and 5, and finish on days 3, 5, and 7, respectively. Therefore, the maximum number of problems he can solve is 3.
Input:
4
1 2 3 6
3 5 9 8

Output:
2

Explanation:
This input consists of 4 problems with starting days [1, 2, 3, 6] and ending days [3, 5, 9, 8].

To maximize the number of problems Raman can solve, we consider each problem as a tuple of (start, end):

(1, 3), (2, 5), (3, 9), (6, 8).
After sorting by ending days and selecting non-overlapping problems:

Raman can solve Problem 1 (1, 3) and Problem 4 (6, 8).
Thus, the maximum number of problems he can solve is 2.
Constraints:

1 ≤ N ≤ 2*10^5
1 ≤ start[i] ≤ end[i] ≤ 10^9
Note:The function should return the result. The driver code will handle printing the output.
 */

function maxTaskDone(start, end, n){
    let dateArray = []

    for(let i=0; i<n; i++){
        dateArray.push({start:start[i], end:end[i]})
    }

    dateArray.sort((a,b) => a.end - b.end)

    let count = 0;
    let endDate = -1;

    for(let task of dateArray){
        if(task.start >= endDate){
            count++;
            endDate = task.end
        }
    }

    return count;
}