/**************************************** TWO SUM  ********************************
 * LEETCODE 1: https://leetcode.com/problems/two-sum/
*/

// SOLUTION: USING HASHMAP METHOD
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map()

    for(let i=0; i<nums.length; i++){
        // target = nums[i]+ pairvalue
        let pairvalue = target - nums[i]

        if(map.has(pairvalue)){
            return [map.get(pairvalue),i]
        }
        map.set(nums[i],i)
    }

};


/**************************************** TWO SUM- II INPUT ARRAY IS SORTED  ********************************
 * LEETCODE 1: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
*/

// SOLUTION:  USING TWO POINTER METHOD

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length -1;

    while(left < right){
        let sum = numbers[left] + numbers[right]

        if(sum === target){
            return [left+1,right+1];
        }else if(sum > target){
            right--;
        }else{
            left++;
        }
    }
};