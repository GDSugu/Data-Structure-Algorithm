/************************************** LEMONADE CHANGE  *************************************************
 * Leetcode 1: https://leetcode.com/problems/lemonade-change/description/
*/

// SOLUTION: GREEDY ALGORITHM -> O(N)

/**
 * @param {number[]} bills - Array of customer bills ($5, $10, or $20)
 * @return {boolean} - Returns true if we can give correct change to all customers
 */
var lemonadeChange = function(bills) {
    // If the first customer doesn't pay with a $5, we can't give any change
    if (bills[0] > 5) return false;

    // Keep count of the number of $5 and $10 bills we have
    let five = 0;
    let ten = 0;

    // Loop through each bill in the queue
    for (let bill of bills) {

        if (bill === 5) {
            // If the customer pays $5, we don't need to give change
            five++;
        } else if (bill === 10) {
            // If the customer pays $10, we must give one $5 as change
            if (five > 0) {
                five--;
                ten++; // We now have an extra $10 bill
            } else {
                // No $5 bill to give change
                return false;
            }
        } else if (bill === 20) {
            // If the customer pays $20, we prefer to give one $10 and one $5 as change
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                // If no $10 bill, give three $5 bills
                five -= 3;
            } else {
                // Not enough change to give
                return false;
            }
        }
    }

    // Successfully gave change to all customers
    return true;
};
