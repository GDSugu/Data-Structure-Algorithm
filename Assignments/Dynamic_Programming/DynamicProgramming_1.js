/************************************** House Robber - I ********************************
Leetcode: https://leetcode.com/problems/house-robber/description/

1) You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping you 
from robbing each of them is that adjacent houses have security systems connected and it 
will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, 
return the maximum amount of money you can rob tonight without alerting the police.

*/

function linearhouseRobbery(house){
    let n = house.length

    if(n === 0) return 0;
    if(n === 1) return house[0];
    if(n === 2) return Math.max(house[0],house[1]);

    let previousStolen = 0;
    let currentStolen = 0;

    for(let money of house){
        let tempMax = Math.max(currentStolen, previousStolen + money)

        previousStolen = currentStolen;
        currentStolen = tempMax;
    }
    console.log(currentStolen)
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

