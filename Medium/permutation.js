

let permutations = permute([1, 2, 3]);
console.log(permutations);

// SOLUTION 2: USING HEAPS ALGORITHM

var permute = function(nums) {
    
    let result = [];

    function generate(n){
        if(n === 1){
            result.push([...nums]);
            return;
        }

        for(let i=0; i<n; i++){
            generate(n-1);

            if(n % 2 === 0){
                [nums[i], nums[n-1]] = [nums[n-1], nums[i]];
            }else{
                [nums[0], nums[n-1]] = [nums[n-1], nums[0]];
           }
        }
    }

    generate(nums.length);
    return result;
};

let permutations1 = permute([1, 2, 3]);
console.log(permutations1);





/*************************************** Kth PERMUTATION SEQUENCE  ***************************
 * Leetcode 2: https://leetcode.com/problems/permutation-sequence/description/
*/

// Solution:
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    let nums = [];  // Store numbers 1 to n
    let fact = [1]; // Factorials array
    let result = "";

    // Initialize numbers and factorials
    for (let i = 1; i <= n; i++) {
        nums.push(i);
        fact[i] = fact[i - 1] * i;
    }

    k--; // Convert k to 0-based index

    for (let i = n; i > 0; i--) {
        let index = Math.floor(k / fact[i - 1]);
        result += nums[index];  // Add selected number
        nums.splice(index, 1);  // Remove used number
        k %= fact[i - 1];       // Update k
    }

    return result;
};
