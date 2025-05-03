/************************************** House Robber - I ********************************
Leetcode: https://leetcode.com/problems/house-robber/description/

1) You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping you 
from robbing each of them is that adjacent houses have security systems connected and it 
will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

*/

function linearHouseRobbery(house) {
    let n = house.length;

    // 🏠 If there are no houses, there's nothing to rob
    if (n === 0) return 0;

    // 🏠 If there's only one house, rob it
    if (n === 1) return house[0];

    // 💰 Initialize:
    // firstStolen = max money if we rob only the first house
    // secondStolen = max money if we consider the first two houses
    let firstStolen = house[0];
    let secondStolen = Math.max(house[0], house[1]);

    // 🚶 Start from the 3rd house (index 2) to the last
    for (let i = 2; i < n; i++) {
        // 🧠 Option 1: skip current house → keep secondStolen
        // 🧠 Option 2: rob current house → firstStolen + current money
        // Take the better of the two options
        let tempMax = Math.max(secondStolen, firstStolen + house[i]);

        // 🔁 Move the window forward:
        // - secondStolen becomes firstStolen for next round
        // - tempMax becomes secondStolen (i.e., current max loot)
        firstStolen = secondStolen;
        secondStolen = tempMax;
    }

    // ✅ After checking all houses, secondStolen has the max money we can rob
    return secondStolen;
}


let linearHouse = [1,2,4,6,7,9]
//linearhouseRobbery(linearHouse)

/**************************************** House Robber - II ************************************

Leetcode: https://leetcode.com/problems/house-robber-ii/description/

You are a professional robber planning to rob houses along a street.Each house has a certain amount 
of money stashed.All houses at this place are arranged in a circle.That means the first house is 
the neighbor of the last one.Meanwhile, adjacent houses have a security system connected, and it will 
automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

*/

function CircularHouseRobbery(house) {
    let n = house.length;

    // Edge cases: 
    if (n === 0) return 0;             // No houses to rob
    if (n === 1) return house[0];      // Only one house, rob it
    if (n === 2) return Math.max(house[0], house[1]); // Two houses, rob the one with more money

    // Function to solve the linear house robbery problem (non-circular)
    function robLinear(arr) {
        let n = arr.length;

        // Edge cases:
        if (n === 0) return 0;    // No houses to rob
        if (n === 1) return arr[0];  // Only one house, rob it
        if (n === 2) return Math.max(arr[0], arr[1]); // Two houses, rob the one with more money

        // Initialize firstStolen and secondStolen
        let firstStolen = arr[0]; // Max money if we rob only the first house
        let secondStolen = Math.max(arr[0], arr[1]); // Max money if we rob the first or second house

        // Traverse the remaining houses starting from index 2
        for (let i = 2; i < n; i++) {
            // Option 1: Skip the current house, keep secondStolen
            // Option 2: Rob the current house, add its money to firstStolen
            let tempMax = Math.max(secondStolen, firstStolen + arr[i]);

            // Update the window: move secondStolen to firstStolen, and tempMax to secondStolen
            firstStolen = secondStolen;
            secondStolen = tempMax;
        }

        return secondStolen; // Return the maximum money that can be robbed
    }

    // Exclude the first house and solve the problem on the remaining houses
    let excludeFirst = robLinear(house.slice(1));

    // Exclude the last house and solve the problem on the remaining houses
    let excludeLast = robLinear(house.slice(0, n - 1));

    // The result is the maximum of robbing either excluding the first or last house
    return Math.max(excludeFirst, excludeLast);
}


let CirularHouse = [1,2,4,6,7,9,7,8,9]
CircularHouseRobbery(CirularHouse);




function distributeCookies(cookies, k) {
    let minUnfairness = Infinity;

    // Initialize the children array with zeros
    const children = new Array(k).fill(0);

    // Backtracking function
    function backtrack(index) {
        if (index === cookies.length) {
            // All bags are assigned, calculate unfairness
            const currentUnfairness = Math.max(...children);
            minUnfairness = Math.min(minUnfairness, currentUnfairness);
            return;
        }

        for (let i = 0; i < k; i++) {
            // Assign the current bag to the ith child
            children[i] += cookies[index];
            // Prune if the current unfairness is already worse than the best found
            if (children[i] < minUnfairness) {
                backtrack(index + 1);
            }
            // Backtrack
            children[i] -= cookies[index];
        }
    }

    // Start the backtracking process
    backtrack(0);
    return minUnfairness;
}