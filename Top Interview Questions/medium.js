/****************************************  MAXIMUM MATRIX SUM  ********************************
 * LEETCODE 1: https://leetcode.com/problems/maximum-matrix-sum/description/
*/

// SOLUTION : GREEDY ALGORITHM -> O(n^2)

/**
 * @param {number[][]} matrix
 * @return {number}
 */

var maxMatrixSum = function(matrix) {

    let totalSum = 0;
    let totalNegativeCount = 0;
    let minAbsolute = Infinity;
    
    for(let row of matrix){
        for(let value of row){
            totalSum+= Math.abs(value);
            if(value < 0){
                totalNegativeCount++;
            }
            minAbsolute = Math.min(minAbsolute,Math.abs(value))
        }
    }

    if(totalNegativeCount % 2 === 0){
        return totalSum;
    }

    return totalSum -2 * minAbsolute;
};


/****************************************  COIN CHANGE PROBLEM  ********************************
 * LEETCODE 1: https://leetcode.com/problems/coin-change/
*/

// SOLUTION : DYNAMIC PROGRAMMING (Bottom-Up DP APPROACH)


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // Base case: 0 coins needed for amount 0

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}


/****************************************  LONGEST INCREASING SUBSEQUENCE  ********************************
 * LEETCODE 1: https://leetcode.com/problems/longest-increasing-subsequence/
*/

// SOLUTION : BINARY SEARCH WITH GREEDY -> O(log n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let sub = [];

    for (let num of nums) {
        let left = 0, right = sub.length - 1;
        
        // Binary search to find the first element >= num
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (sub[mid] >= num) right = mid - 1;
            else left = mid + 1;
        }

        // If left is within the array, replace; otherwise, append
        if (left < sub.length) sub[left] = num;
        else sub.push(num);
    }

    return sub.length;
};


/************************************** THREE SUM ***************************
 * Leetcode 12:https://leetcode.com/problems/3sum/description/
*/

// SOLUTION: SORTING + TWO POINTER

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {

    nums.sort((a,b) => a-b);
    let result = [];

    for(let i=0; i<nums.length-2; i++){

        if(i>0 && nums[i] === nums[i-1]) continue;

        let left = i+1;
        let right = nums.length-1;

        while(left < right){
            let sum = nums[i]+ nums[left]+ nums[right];

            if(sum === 0){
                result.push([nums[i],nums[left],nums[right]]);
                while(left < right && nums[left] === nums[left+1]) left++;
                while(left < right && nums[right] === nums[right -1]) right--;

                left++;
                right--;
            }else if(sum < 0){
                left++;
            }else{
                right--;
            }
        }
    }

    return result;
}


/************************************** FOUR SUM ***************************
 * Leetcode 12:https://leetcode.com/problems/4sum/description/
*/

// SOLUTION: SORTING + TWO POINTER

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a,b) => a-b);

    let result = [];

    for(let i=0; i<nums.length-3; i++){
        if(i>0 && nums[i] === nums[i-1]) continue;

        for(j=i+1; j<nums.length -2; j++){
            if(j>i+1 && nums[j] === nums[j-1]) continue;

            let left = j+1;
            let right = nums.length -1;

            while(left < right){
                let sum = nums[i]+nums[j]+nums[left]+nums[right];

                if(sum === target){
                    result.push([nums[i],nums[j],nums[left],nums[right]]);

                    while(left < right && nums[left] === nums[left+1]) left++;
                    while(left < right && nums[right] === nums[right-1]) right--;

                    left++;
                    right--;
                }else if(sum < target){
                    left++;
                }else{
                    right--;
                }
            }
        }
    }

    return result;
    
};

/************************************** REMOVE DUPLICATES FROM SORTED LIST II *************************************************
 * Leetcode 13: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/
*/

// SOLUTION: 
var deleteDuplicates = function(head) {
    let dummy = new ListNode(0, head); // Dummy node to handle edge cases

    let prev = dummy;
    let current = head;

    while (current) {
        while (current.next && current.val === current.next.val) {
            current = current.next; // Skip all duplicates
        }

        if (prev.next === current) {
            prev = prev.next; // Move prev forward only if no duplicates were found
        } else {
            prev.next = current.next; // Remove duplicates by linking prev to current.next
        }

        current = current.next; // Move to the next node
    }

    return dummy.next;
};
