/************************************** PARTITION LABELS *************************************************
 * Leetcode 1: https://leetcode.com/problems/partition-labels/description/
*/

// SOLUTION: SLIDING WINDOW + GREEDY ALGORITHM -> O(N)

/**
 * @param {string} s
 * @return {number[]}
 */
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    let map = new Map();

    // Step 1: Store the last occurrence index of each character
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], i);
    }

    let partition = [];
    let left = 0, right = 0;

    // Step 2: Find partitions
    for (let i = 0; i < s.length; i++) {
        right = Math.max(right, map.get(s[i])); // Expand window

        if (i === right) { // If we reach the end of a partition
            partition.push(right - left + 1); // Store partition size
            left = i + 1; // Move to the next partition
        }
    }

    return partition;
};

/************************************** STRINGS WITHOUT 'AAA' OR 'BBB' *************************************************
 * Leetcode 2: https://leetcode.com/problems/string-without-aaa-or-bbb/
*/

// SOLUTION: GREEDY ALGORITHM -> O(a+b)

/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var strWithout3a3b = function (a, b) {
    let res = [];
    while (a > 0 || b > 0) {
        if (res.length >= 2 && res[res.length - 1] === res[res.length - 2]) {
            // If last two are same, we must write the other char
            if (res[res.length - 1] === 'a') {
                res.push('b');
                b--;
            } else {
                res.push('a');
                a--;
            }
        } else {
            // Otherwise, write the more frequent character
            if (a > b) {
                res.push('a');
                a--;
            } else {
                res.push('b');
                b--;
            }
        }
    }
    return res.join('');
};

/************************************** GROUP THE PEOPLE GIVEN THE GROUP SIZE THEY BELONGS TO  *************************************************
 * Leetcode 3: https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to/description/
*/

// SOLUTION: 

/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */

var groupThePeople = function(groupSizes) {
    let map = new Map(); // A map to store groups based on their required size.
    let result = []; // The final list of groups.
 
    // Iterate through each person (index) in the groupSizes array
    for(let i = 0; i < groupSizes.length; i++) {
       let size = groupSizes[i]; // Get the required group size for person i.
 
       // If no group of this size exists in the map, create an empty list for it.
       if (!map.has(size)) {
           map.set(size, []);
       }
 
       // Add the current person (index) to the group.
       map.get(size).push(i);
 
       // If the group has reached its required size, finalize it.
       if (map.get(size).length === size) {
           result.push(map.get(size)); // Add the full group to the result list.
           map.set(size, []); // Reset the group list for future people of the same size.
       }
    }
 
    return result; // Return the list of grouped people.
 };
 