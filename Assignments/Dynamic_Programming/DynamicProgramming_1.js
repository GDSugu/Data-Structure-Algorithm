/************************************** House Robber - I ********************************
Leetcode: https://leetcode.com/problems/house-robber/description/

1) You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping you 
from robbing each of them is that adjacent houses have security systems connected and it 
will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

*/

function linearhouseRobbery(house) {
    let n = house.length;

    // 🏠 Edge case: no house to rob
    if (n === 0) return 0;

    // 🏠 Only one house — rob it
    if (n === 1) return house[0];

    // 🏠 Two houses — rob the one with more money
    if (n === 2) return Math.max(house[0], house[1]);

    // 💰 previousStolen stores the max money till house[i - 2]
    // 💰 currentStolen stores the max money till house[i - 1]
    let previousStolen = 0;
    let currentStolen = 0;

    // 🚶 Traverse each house
    for (let money of house) {
        // 🧠 Decide: rob this house (previousStolen + money) or skip (currentStolen)
        let tempMax = Math.max(currentStolen, previousStolen + money);

        // 🧳 Shift forward for next iteration
        previousStolen = currentStolen;   // i - 2 becomes i - 1
        currentStolen = tempMax;          // i - 1 becomes i
    }

    // ✅ Final value is the max money we can rob without alerting police
    return currentStolen;
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

function CircularHouseRobbery(house){
    let n = house.length

    if(n === 0) return 0;
    if(n === 1) return house[0];
    if(n === 2) return Math.max(house[0],house[1]);
    
    function robLinear(arr){
        let previousStolen = 0;
        let currentStolen = 0;

    for(let money of house){
        let tempMax = Math.max(currentStolen, previousStolen + money)
        previousStolen = currentStolen;
        currentStolen = tempMax
    }

    //console.log(currentStolen);
    return currentStolen
    }
    
    let excludeFirst = robLinear(house.slice(1))
    let excludeLast = robLinear(0,n-1)

    return Math.max(excludeFirst,excludeLast)
    
}

let CirularHouse = [1,2,4,6,7,9,7,8,9]
CircularHouseRobbery(CirularHouse);

