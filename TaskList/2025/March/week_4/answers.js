/************************************** INSERT INTO A BINARY SERACH TREE  *************************************************
 * Leetcode 1: https://leetcode.com/problems/insert-into-a-binary-search-tree/
*/

// SOLUTION: BINARY TREE - O(h) h - height of BST

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    if (!root) return new TreeNode(val);

    let curr = root;
    
    while (true) {
        if (val < curr.val) {
            if (!curr.left) {
                curr.left = new TreeNode(val);
                break;
            }
            curr = curr.left;
        } else { // val > curr.val
            if (!curr.right) {
                curr.right = new TreeNode(val);
                break;
            }
            curr = curr.right;
        }
    }
    
    return root;
};


/************************************** PATH SUM  *************************************************
 * Leetcode 1: https://leetcode.com/problems/path-sum-ii/
*/

// SOLUTION: BACKTRACKING AND RECURSION - O(N)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    let result = [];

    function dfs(node, currentPath, currentSum) {
        if (!node) return;  // Base case: if node is null, return

        // Include current node in path
        currentPath.push(node.val);
        currentSum += node.val;

        // If it's a leaf node and sum matches targetSum, add path to result
        if (!node.left && !node.right && currentSum === targetSum) {
            result.push([...currentPath]); // Copy the array
        }

        // Recur for left and right children
        dfs(node.left, currentPath, currentSum);
        dfs(node.right, currentPath, currentSum);

        // Backtracking: Remove the last node before returning
        currentPath.pop();
    }

    dfs(root, [], 0);
    return result;
};
