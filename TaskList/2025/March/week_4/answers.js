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
