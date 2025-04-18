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
 * Leetcode 2: https://leetcode.com/problems/path-sum-ii/
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


/************************************** SMALLEST STRING STARTING FROM LEAF  *************************************************
 * Leetcode 3: https://leetcode.com/problems/smallest-string-starting-from-leaf/
*/

// SOLUTION: O(N)

var smallestFromLeaf = function(root) {
    let smallest = null;

    function dfs(node, path) {
        if (!node) return;
        
        // Convert node value to character and prepend to path
        path = String.fromCharCode(97 + node.val) + path;
        
        // If leaf node, update smallest if needed
        if (!node.left && !node.right) {
            if (smallest === null || path < smallest) {
                smallest = path;
            }
        }

        // Recur for left and right subtrees
        dfs(node.left, path);
        dfs(node.right, path);
    }

    dfs(root, "");
    return smallest;
};


/************************************** MAXIMUM DIFFERENCE BETWEEN NODE AND ANCESTOR  *************************************************
 * Leetcode 4: https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/
*/

// SOLUTION: BACKTRACKING AND RECURSION

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
 * @return {number}
 */
var maxAncestorDiff = function(root) {
    function dfs(node, maxVal, minVal) {
        if (!node) return maxVal - minVal; // Base case: return max difference so far

        // Update max and min values for the current path
        maxVal = Math.max(maxVal, node.val);
        minVal = Math.min(minVal, node.val);

        // Recur for left and right subtrees
        let left = dfs(node.left, maxVal, minVal);
        let right = dfs(node.right, maxVal, minVal);

        // Return the maximum difference found in both subtrees
        return Math.max(left, right);
    }

    return dfs(root, root.val, root.val);
};


/************************************** MAXIMUM LEVEL SUM OF A BINARY TREE  *************************************************
 * Leetcode 5: https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/
*/

// SOLUTION: BREADTH FIRST SEARCH - BFS -> O(N)

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
 * @return {number}
 */
var maxLevelSum = function(root) {
    if(!root) return 0;
    let maxSum = -Infinity;
    let queue = [root];
    let resultLevel = 0;
    let currentLevel = 0;

    while(queue.length > 0){
        currentLevel++;
        let levelSum = 0;
        const levelSize = queue.length;

        for(let i=0; i<levelSize; i++){
            const node = queue.shift();
            levelSum += node.val;

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        if(levelSum > maxSum){
            maxSum = levelSum;
            resultLevel = currentLevel;
        }
    }

    return resultLevel;
};

/************************************** Kth SMALLEST ELEMENT IN THE BST  *************************************************
 * Leetcode 6: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
*/

// SOLUTION: O(N)

var kthSmallest = function(root, k) {
    let count = 0;  // Keeps track of the number of nodes visited in inorder traversal
    let result = null;  // Stores the kth smallest element once found

    function inorder(node) {
        if (!node || result !== null) return;  // Stop if node is null or we have already found the kth element

        inorder(node.left);  // Traverse the left subtree (smaller values)

        count++;  // Increment count when visiting a node
        if (count === k) {  // If this is the kth node visited
            result = node.val;  // Store the kth smallest value
            return;  // Stop further traversal
        }

        inorder(node.right);  // Traverse the right subtree (larger values)
    }

    inorder(root);  // Start inorder traversal from the root
    return result;  // Return the kth smallest element
};

/************************************** BINARY TREE CAMERA   *************************************************
 * Leetcode 7: https://leetcode.com/problems/binary-tree-cameras/description/
*/

// SOLUTION: O(N)

/*
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
*/

/**
 * @param {TreeNode} root
 * @return {number}
 */
var minCameraCover = function(root) {
    // Define three states for nodes
    const NOT_WATCHED = 0; // Node is not monitored
    const WATCHED = 1;      // Node is covered by a camera
    const HAS_CAMERA = 2;   // Node has a camera

    let cameras = 0; // Counter to keep track of the total cameras used

    // Depth-First Search (DFS) function to traverse the tree
    function dfs_traverse(node = root) {
        if (!node) return WATCHED; // Null nodes are considered as already covered

        let left = dfs_traverse(node.left);  // Traverse left subtree
        let right = dfs_traverse(node.right); // Traverse right subtree

        // If any of the children are NOT_WATCHED, place a camera at the current node
        if (left == NOT_WATCHED || right == NOT_WATCHED) {
            cameras++;  // Increase the camera count
            return HAS_CAMERA; // Mark current node as having a camera
        }

        // If any child has a camera, the current node is watched
        if (left == HAS_CAMERA || right == HAS_CAMERA) {
            return WATCHED; // This node is covered but does not need a camera
        }

        // If both children are watched but have no cameras, mark this node as NOT_WATCHED
        return NOT_WATCHED;
    }

    let rootStatus = dfs_traverse(); // Start DFS traversal from the root

    // If the root is NOT_WATCHED after traversal, we must place a camera there
    if (rootStatus == NOT_WATCHED) cameras++;

    return cameras; // Return the minimum number of cameras needed
};

/************************************** VALIDATE THE BINARY SEARCH TREE   *************************************************
 * Leetcode 8: https://leetcode.com/problems/validate-binary-search-tree/description/
*/

/*
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
*/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    function dfs(node, min, max) {
        if (!node) return true; // Base case: empty subtree is valid
        
        // Check if current node's value is within the valid range
        if (node.val > min && node.val < max) {
            // Recursively check left and right subtrees with updated ranges
            return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
        } else {
            return false; // Current node violates BST property
        }
    }
    
    // Start with the root and full range (-Infinity to Infinity)
    return dfs(root, -Infinity, Infinity);
};

/************************************** BINARY SEARCH TREE ITERATOR  *************************************************
 * Leetcode 9: https://leetcode.com/problems/binary-search-tree-iterator/
*/

// SOLUTION: INORDER TRAVERSAL + STACK -> O(N)

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
 */
var BSTIterator = function(root) {
    this.stack = [];
    this._pushLeft(root)
};

BSTIterator.prototype._pushLeft = function(node) {
    while(node){
        this.stack.push(node);
        node = node.left;
    }
    
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let node = this.stack.pop();
    this._pushLeft(node.right);
    return node.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0;
};

/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */