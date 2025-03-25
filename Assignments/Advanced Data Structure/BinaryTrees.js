/************************************** ZIGZAGGING THROUGH BINARY TREE ********************************
 * At HeyCoach, a dedicated mentor aims to assist students, who are organized in a tree-like structure where each student is represented as a node in a binary tree. The mentor can move between nodes in a zigzag pattern, meaning:

If the mentor moves to the left child of a node, the next move must be to the right child of the subsequent node. Similarly, if the mentor moves to the right child first, the next move must be to the left child. The mentor’s goal is to maximize the number of students he can help in a single zigzag traversal. Your task is to determine the maximum number of nodes the mentor can visit following the zigzag pattern.

Input Format:

root: The root of the binary tree where each node contains an integer value. If the tree is empty, the root is null.
Output Format:

Return the maximum number of nodes the mentor can visit in a zigzag traversal.
Example 1
Input
root = [3,9,20,N, N,15,7]

      3
     / \
    9   20
       / \
      15  7
            
Output:
3
Explanation :
Ram is travelling in the path:- 3->20->15 20 is the right child of 3 15 is the left child of 20

Thus, the total nodes travelled: 3

Example 2:
Input:
root = []
Output:

0
Explnation:
Since the tree is empty, there are no nodes to visit.

Constraints:
The number of nodes in the tree is in the range [0, 200000].

-1000 <= Node.val <= 1000

Note:The function should return the result. The driver code will handle printing the output.

*/

// SOLUTION: DEPTH FIRST SEARCH (DFS) + RECURSION -> O(N)

/*
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}*/

class Solution {
    maxZigzagStudents(root) {
       if (!root) return 0; // If tree is empty, return 0
       
       let maxLength = 0; // Stores the maximum zigzag path length
 
       // Depth-First Search (DFS) function
       function dfs(node, direction, length) {
          if (!node) return; // Base case: If node is null, stop recursion
 
          maxLength = Math.max(maxLength, length); // Update maxLength if current path is longer
 
          // If moving left, we must go right next
          if (direction === "left") {
             if (node.left) dfs(node.left, "right", length + 1); // Move left → right (increase length)
             if (node.right) dfs(node.right, "left", 1); // Restart path from right child
          } 
          // If moving right, we must go left next
          else {
             if (node.right) dfs(node.right, "left", length + 1); // Move right → left (increase length)
             if (node.left) dfs(node.left, "right", 1); // Restart path from left child
          }
       }
 
       // Start DFS from the root in both left and right directions
       dfs(root, "left", 0);
       dfs(root, "right", 0);
 
       return maxLength; // Return the maximum zigzag path length found
    }
 }
 

 /************************************** OPTIMAL TREE ESCAPE ********************************
  * Objective: Determine who escapes first from a binary tree by either always moving left (Ram) or always moving right (Shyam).

Given:

A binary tree where each node represents a position in a unique training course, with two children nodes (left and right) except for leaf nodes, which have no children.
Two characters, Ram and Shyam, start from the root of the binary tree. Ram always moves to the left child, and Shyam always moves to the right child. Their goal is to reach any leaf node to escape the tree.
Input Format:

root: A binary tree where each node has a value. Leaf nodes are represented by -1 (no children). The structure of the binary tree is provided as a list in level-order traversal.
Output Format:

If both Ram and Shyam escape the tree simultaneously, return 0.
If Ram escapes first, return -1.
If Shyam escapes first, return 1.
Examples:

Input: root = [1]
Output: 0

Explanation: Both start and end at the root node (the only node), escaping simultaneously.

Input: root = [10, 5, -1, -1, 15, 12, -1, -1, -1]
Output: 1

Explanation: Shyam escapes the tree first by always moving to the right child.

Input: root = [3, 9, 20, -1, -1, 15, 7, -1, -1, -1, -1]
Output: -1

Explanation: Ram escapes the tree first by always moving to the left child.

Solution Approach:

The solutions provided traverse the binary tree based on Ram's and Shyam's strategies, tracking the depth of traversal to determine who reaches a leaf node first. The depth comparison between the leftmost and rightmost paths effectively decides the output according to the specified rules.

Constraints:

The number of nodes in the tree is in the range [0, 200000].
Node values are within [-1000, 1000].
Note:The function should return the result. The driver code will handle printing the output.

*/

// SOLUTION: DEPTH FIRST SEARCH TRAVERSAL - O(H) -> height of teh tree

/*
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}*/

class Solution {
    escapeTree(root) {
        // If the tree is empty, return 0 (both Ram and Shyam escape at the same time)
        if (!root) return 0;

        function dfs(node, isLeft) {
            let depth = 0; // Initialize depth counter
            while (node) { // Traverse until reaching a leaf node
                depth++; // Increment depth at each step
                node = isLeft ? node.left : node.right; // Move to left or right child
            }
            return depth; // Return the depth of the path
        }

        // Calculate the depth of Ram's (leftmost) and Shyam's (rightmost) paths
        let ram = dfs(root, true);
        let shyam = dfs(root, false);

        // Compare the depths to determine who escapes first
        if (ram === shyam) return 0; // Both escape at the same time
        return ram < shyam ? -1 : 1; // -1 if Ram escapes first, 1 if Shyam escapes first
    }
}


/************************************** MAXIMUM SUM OF A SUBARRAY IN TOPVIEW OF BINARY TREE ********************************
  * Given a binary tree, find the maximum sum of a subarray in its top view. The top view of a binary tree is the set of nodes visible when the tree is viewed from the top.

A subarray in the top view is defined as the sum of values of nodes visible from the top at any specific horizontal distance.

Input:

The function takes a pointer to the root of the binary tree root (1 <= nodes <= 10^4).
Output:

Return an integer representing the maximum sum of a subarray in the top view.

Example:

Input:
      1
     /\
    2   3
   / \  / \
  4   5 6   7

[1 2 3 4 5 6 7 -1 -1 -1 -1 -1 -1 -1 -1]

Output:
17

Explanation:
The top view is [4, 2, 1, 3, 7], and the maximum sum subarray is [4, 2, 1, 3, 7] with a sum of 17.

Note:

Nodes of the binary tree have values in the range [-1000, 1000].
The binary tree will not be empty.
Ensure that your solution has a time complexity of O(N), where N is the number of nodes in the binary tree.
Return the answer in the function and don't print it.
Constraints:
The number of nodes in the binary tree is in the range 1 < nodes < 10^4

The binary tree will not be empty.

Note:The function should return the result. The driver code will handle printing the output.

*/

// SOLUTION: DEPTH FIRST SEARCH TRAVERSAL -> O(N)

/*
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}*/

class Solution {
    maxSumTopView(root) {
        // Initialize maxSum to store the total sum of left and right top-view paths
        let maxSum = 0;

        function dfs(node, isLeft) {
            let sum = 0; // Initialize sum accumulator
            while (node) { // Traverse until reaching a leaf node
                sum += node.val; // Add node value to sum
                node = isLeft ? node.left : node.right; // Move to left or right child based on isLeft flag
            }
            return sum; // Return the total sum of the path
        }

        // Calculate the sum of the leftmost and rightmost paths
        let leftSum = dfs(root, true);
        let rightSum = dfs(root, false);

        // Since the root is counted in both left and right sums, subtract root value once
        return leftSum + rightSum - root.val;
    }
}

/************************************** MAXIMUM SUM OF A SUBARRAY IN TOPVIEW OF BINARY TREE ********************************
  * Given a Binary Tree of N Nodes having integer values . Your Task is to find out the Largest Number that could be formed by concatenating all its nodes values.

For example:

Given the Binary Tree

           5
         /    \
      34       47
     /    
    6

The answer would be 654734 since by concatenating the node values this is the highest number possible.

Input Format:

A single line that represents the value of the nodes and the value of '- 1' denotes NULL node.
Output Format:

Print the integer that represents the largest number that could be formed by concatenating all its nodes given in a Binary Tree.
Sample Input:

5 34 47 6 -1 -1 -1 -1 -1
Sample Output:

654734
Explanation
5 → 34 → 6 → 47 → 53647 (not optimal)
By arranging the numbers: 654734 is the largest possible concatenation.
The largest number is formed by rearranging the nodes as 6 → 5 → 47 → 34 which results in 654734.
Sample Input:

9 933 96 -1 -1 -1 -1
Sample Output:

996933
Explanation
9 → 933 → 96 → 993396 (not optimal)
By arranging the numbers: 996933 is the largest possible concatenation.
The largest number is formed by rearranging the nodes as 96 → 9 → 933 which results in 996933.
Constraints:

0 <= N <= 10^4

0 <= data <= 10^3

Where 'N' denotes the total number of nodes and 'data' denotes the value of the node.

Note: Print the answer in the Concatenate function and don't return the answer as an array.

*/

// SOLUTION: INORDER TRAVERSAL WITH CUSTOM SORTING -> O(N log N)

//The node class is given as;
/*class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}*/ 

class Solution {
    concatenate(root) {
        let numbers = [];

        // In-order traversal to collect values
        function inorderTraversal(node) {
            if (!node) return;
            inorderTraversal(node.left);
            numbers.push(node.data.toString()); // Store as string directly
            inorderTraversal(node.right);
        }

        inorderTraversal(root);

        // Custom sorting: Sort numbers as strings in descending order
        numbers.sort((a, b) => (b + a).localeCompare(a + b));

        // Concatenate all sorted strings
        console.log(numbers.join(""));
    }
}
