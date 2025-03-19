/**************************** Ingredients of Alchemist  ***************************************
TASK: 1

You are a young alchemist on a quest to brew a magical potion. Each day, you add a specific number of ingredients to the cauldron. Write a function to recursively calculate the total number of ingredients used to brew the potion over a given number of days.

Input Format:

An integer n, representing the number of days you have brewed the potion.
An integer ingredientsPerDay, representing the number of ingredients added to the cauldron each day.
Output Format:

An integer representing the total number of ingredients used over n days.
Sample Input 1:

8 9
Sample Output 1:

72
Explanation 1:

For 8 days, adding 9 ingredients each day results in (8 * 9 = 72) ingredients.

Sample Input 2:

10 6
Sample Output 2:

60
Explanation 2:

For 10 days, adding 6 ingredients each day results in (10 * 6 = 60) ingredients.

Constraints:

(1 <= n <= 20)
(1 <= ingredientsPerDay <= 100)
Note:The function should return the result.
*/

// SOLUTIUON:
class Solution {
    solve(n, ingredients_per_day) {
        return n * ingredients_per_day;
  
    }
  }


/**************************** Balanced Paranthesis  ***************************************
TASK: 2

Given a number n representing a pair of parentheses (closed and open), your task is to print the total number of balanced parenthesis pairs possible. A balanced parenthesis refers to the proper nesting and matching of open and close parentheses in an expression. An expression is considered balanced if every opening parenthesis has a corresponding closing parenthesis.

For Example:

Balanced: (), ((())), ()()(), (())()
Unbalanced: (, ((), )()(, (((
Input Format:

The first line contains the integer n denoting the number of pairs of parentheses.
Output Format:

A single integer denoting the total number of balanced parenthesis pairs possible.
Sample Input 1:

3
Sample Output 1:

5
Explanation:

The possible balanced parenthesis pairs are: ((())), ()()(), (())(), ()((), (()()).

Constraints:

(1 <= n <= 12)
Note: The function should return the result.
*/

// SOLUTION:

class Solution {
    printParenthesis(n) {
      // Initialize an array to store all valid parentheses sequences
      let result = [];
      
      // Temporary array to build each sequence step by step
      let current = [];

      // Helper function to generate valid parentheses using backtracking
      function backtrack(open, close) {
        // Base case: If the sequence reaches the required length (2 * n)
        if (current.length === 2 * n) {
          let parenthesis = current.join(""); // Convert array to string
          result.push(parenthesis); // Store the valid sequence
          return;
        }

        // Add an open parenthesis '(' if we haven't used all n open brackets
        if (open < n) {
          current.push('(');  // Choose '('
          backtrack(open + 1, close); // Recur with an increased open count
          current.pop(); // Undo choice (backtrack)
        }

        // Add a close parenthesis ')' if it doesn't exceed the number of open brackets
        if (close < open) {
          current.push(')');  // Choose ')'
          backtrack(open, close + 1); // Recur with an increased close count
          current.pop(); // Undo choice (backtrack)
        }
      }

      // Start backtracking with 0 open and 0 close brackets
      backtrack(0, 0);

      // Return the count of valid parentheses sequences
      return result.length;
   }
}



function distributeCookies(cookies, k) {
  let minUnfairness = Infinity;

  // Initialize the children array with zeros
  const children = new Array(k).fill(0);

  // Backtracking function
  function backtrack(index) {
      if (index === cookies.length) {
          // All bags are assigned, calculate unfairness
          const currentUnfairness = Math.max(...children);
          minUnfairness = Math.min(minUnfairness, currentUnfairness);
          return;
      }

      for (let i = 0; i < k; i++) {
          // Assign the current bag to the ith child
          children[i] += cookies[index];
          // Prune if the current unfairness is already worse than the best found
          if (children[i] < minUnfairness) {
              backtrack(index + 1);
          }
          // Backtrack
          children[i] -= cookies[index];
      }
  }

  // Start the backtracking process
  backtrack(0);
  return minUnfairness;
}

// Example usage:
const n = 4, k = 2;
const cookies = [2,2,2,2];




console.log(distributeCookies(cookies, k)); // Output: 7

