


/************************************** Sum of Square Numbers  ****************************************
 * Leetcode 2: https://leetcode.com/problems/sum-of-square-numbers/
*/

// SOLUTION: TWO POINTER -> O(N)

/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let a = 0;
    let b = Math.floor(Math.sqrt(c));

    while (a <= b) {
        const sum = a * a + b * b;

        if (sum === c) {
            return true;
        } else if (sum < c) {
            a++; // Need a bigger sum
        } else {
            b--; // Need a smaller sum
        }
    }

    return false; // No pair found
};

/************************************** Sort Array by Parity  ****************************************
 * Leetcode 3: https://leetcode.com/problems/sort-array-by-parity/
*/

// SOLUTION: TWO POINTER -> O(N)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while(left <= right){
        if(nums[left] % 2 === 0){
            left++; // Even is in the correct place
        } else {
            // Swap odd to the right side
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--; // Now check the swapped value at nums[left] in next iteration
        }
    }

    return nums;
};

/************************************** Reverse only Letters  ****************************************
 * Leetcode 4: https://leetcode.com/problems/reverse-only-letters
*/

// SOLUTION: TWO POINTER -> O(N)

/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function(s) {
    // Convert the input string into an array so we can swap characters
    let chars = s.split('');
    let left = 0, right = chars.length - 1;

    // Helper function to check if a character is an English letter (a-z or A-Z)
    const isLetter = (ch) => /[a-zA-Z]/.test(ch);

    // Use two pointers: one from the start and one from the end
    while (left < right) {
        // If the left character is not a letter, skip it by moving the left pointer
        if (!isLetter(chars[left])) {
            left++;
        }
        // If the right character is not a letter, skip it by moving the right pointer
        else if (!isLetter(chars[right])) {
            right--;
        }
        // If both characters are letters, swap them
        else {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    // Join the modified array back into a string and return it
    return chars.join('');
};

/************************************** PARTITION LIST  ****************************************
 * Leetcode 5: https://leetcode.com/problems/partition-list/
*/

// SOLUTION: DIVIDE AND CONQUER -> O(N)

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let greaterList = new ListNode(0);  // Dummy head for >= x
    let lesserList = new ListNode(0);   // Dummy head for < x

    let lesser = lesserList;
    let greater = greaterList;

    while (head) {
        if (head.val < x) {
            lesser.next = head;
            lesser = lesser.next;
        } else {
            greater.next = head;
            greater = greater.next;
        }
        head = head.next; // Move to next node
    }

    greater.next = null;                      // Important to end the greater list
    lesser.next = greaterList.next;           // Connect lesser list with greater list

    return lesserList.next;                   // Skip dummy node
};


/************************************** NUMBER OF SUBARRAYS WITH BOUNDED MAXIMUM  *************************************************
 * Leetcode 6: https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/
*/

// SOLUTION: MATHEMATICAL WAY -> O(N)

/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var numSubarrayBoundedMax = function(nums, left, right) {
    return count(nums, right) - count(nums, left - 1);
};

function count(nums, bound) {
    let totalSubarray = 0;
    let currentCount = 0;

    for (let num of nums) {
        if (num <= bound) {
            currentCount++; // extend current valid subarrays
        } else {
            currentCount = 0; // reset on invalid number
        }
        totalSubarray += currentCount; // add valid subarrays ending here
    }

    return totalSubarray;
};


