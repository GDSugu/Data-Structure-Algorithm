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

// SOLUTION: GREEDY ALGORITHM

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
 
 /************************************** NUMBER OF BURGERS WITH NO WASTE OF INGREDIENTS  *************************************************
 * Leetcode 4: https://leetcode.com/problems/number-of-burgers-with-no-waste-of-ingredients/description/
*/

// SOLUTION: LINEAR EQUATION SOLVING -> O(1)

/**
 * @param {number} tomatoSlices - Number of tomato slices available.
 * @param {number} cheeseSlices - Number of cheese slices available.
 * @return {number[]} - An array [jumboCount, smallCount] if a valid combination exists, otherwise an empty array [].
 */
var numOfBurgers = function(tomatoSlices, cheeseSlices) {
    // If the number of tomato slices is odd, it's impossible to form valid burgers
    if (tomatoSlices % 2 !== 0) return [];

    // If we have more cheese slices than tomato slices, it's impossible to form valid burgers
    if (cheeseSlices > tomatoSlices) return [];

    // Calculate the number of Jumbo Burgers (x)
    // Using the derived formula: x = (tomatoSlices - 2 * cheeseSlices) / 2
    /*
        x + y = cheeseSlices → y = cheeseSlices - x
        4x + 2(cheeseSlices - x) = tomatoSlices
        4x + 2*cheeseSlices - 2x = tomatoSlices
        2x + 2*cheeseSlices = tomatoSlices
        2x = tomatoSlices - 2*cheeseSlices
        x = (tomatoSlices - 2*cheeseSlices) / 2
        */

    let jumboCount = (tomatoSlices - 2 * cheeseSlices) / 2;

    // Calculate the number of Small Burgers (y)
    // Using the equation: y = cheeseSlices - x
    let smallCount = cheeseSlices - jumboCount;

    // Check if both jumboCount and smallCount are non-negative integers
    if (jumboCount >= 0 && smallCount >= 0 && Number.isInteger(jumboCount) && Number.isInteger(smallCount)) {
        return [jumboCount, smallCount]; // Return the valid number of jumbo and small burgers
    } else {
        return []; // Return an empty array if no valid combination exists
    }
};

/************************************** FIND THE CENTER OF STAR GRAPH  *************************************************
 * Leetcode 3: https://leetcode.com/problems/find-center-of-star-graph/
*/

// SOLUTION: 

/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
    // Extract nodes from the first edge
    let [u1, v1] = edges[0];  // First edge (u1 -- v1)
    let [u2, v2] = edges[1];  // Second edge (u2 -- v2)

    // The center node must appear in both edges
    // Check if u1 appears in the second edge
    if (u1 === u2 || u1 === v2) {
        return u1;  // u1 is the center node
    } else {
        return v1;  // Otherwise, v1 is the center node
    }
};



/************************************** CINEMA SEAT ALLOCATION  *************************************************
 * Leetcode 5: https://leetcode.com/problems/cinema-seat-allocation/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {number} n - Number of rows in the cinema.
 * @param {number[][]} reservedSeats - Array of reserved seat positions [row, seat].
 * @return {number} - Maximum number of 4-person groups that can be seated.
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    
    // Define seat groups where a 4-person group can sit
    let placeLeft = [2, 3, 4, 5];  // Left block
    let placeRight = [6, 7, 8, 9]; // Right block
    let placeMiddle = [4, 5, 6, 7]; // Middle block (fallback if left and right are occupied)

    let map = new Map(); // Map to store reserved seats per row

    // Populate the map with reserved seats for each row
    for (let [row, seat] of reservedSeats) {
        if (!map.has(row)) {
            map.set(row, new Set()); // Create a new Set for the row if not present
        }
        map.get(row).add(seat); // Add the reserved seat to the Set
    }

    let maxGroups = 0;

    // Process only rows that have reserved seats
    for (let [row, seat] of map) {
        let count = 0;

        // Check if the left block (2-5) is available
        if (!placeLeft.some(s => seat.has(s))) {
            count += 1;
        }

        // Check if the right block (6-9) is available
        if (!placeRight.some(s => seat.has(s))) {
            count += 1;
        }

        // If neither left nor right are available, check the middle block (4-7)
        if (count === 0 && !placeMiddle.some(s => seat.has(s))) {
            count += 1;
        }

        maxGroups += count;
    }

    // Add rows that have no reservations (each row can fit 2 groups)
    maxGroups += (n - map.size) * 2;

    return maxGroups;
};

/************************************** BOATS TO SAVE PEOPLE  *************************************************
 * Leetcode 1: https://leetcode.com/problems/boats-to-save-people/description/
*/

// SOLUTION: GREEDY ALGORITHM  -> O(N)

/**
 * @param {number[]} people - Array of people's weights
 * @param {number} limit - Maximum weight a boat can carry
 * @return {number} - Minimum number of boats required
 */
var numRescueBoats = function(people, limit) {
    // Sort the array in ascending order to easily pair the lightest and heaviest
    people.sort((a, b) => a - b);

    let left = 0; // Pointer to the lightest person
    let right = people.length - 1; // Pointer to the heaviest person
    let count = 0; // Boat count

    // Continue until all people are placed in boats
    while (left <= right) {
        // If the lightest and heaviest person can share a boat
        if (people[left] + people[right] <= limit) {
            left++; // Lightest boards the boat
        }

        // Heaviest person boards the boat (either alone or with lightest)
        right--;

        // One boat used in either case
        count++;
    }

    return count;
};
