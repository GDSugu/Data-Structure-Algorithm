/*************************************** FIND ALL PERMUTATION  ***************************
 * Leetcode 1: https://leetcode.com/problems/permutations/description/
*/

// SOLUTION 1: BACKTRACKING AND RECURSION (SWAPPING AND UNDO RECURSION)

var permute = function(nums) {
    
    let result = [];

    function backtrack(start){
        if(start === nums.length){
            result.push([...nums]);
            return;
        }

        for(let i=start; i<nums.length; i++){
            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }

    }

    backtrack(0);
    return result;
};

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


/*************************************** NEXT PERMUTATION  ***************************
 * Leetcode 2: https://leetcode.com/problems/next-permutation/description/
*/

// Solution:

var nextPermutation = function(nums) {
    let n = nums.length;
    let i = n - 2;

    // Step 1: Find the first decreasing element from the right
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) { // If not fully descending
        let j = n - 1;
        // Step 2: Find the element just larger than nums[i] from the right
        while (nums[j] <= nums[i]) {
            j--;
        }
        // Swap nums[i] and nums[j]
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // Step 3: Reverse the right part (from i+1 to end)
    let left = i + 1, right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }

    return nums;
};


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
