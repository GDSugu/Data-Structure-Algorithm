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


/************************************** ASSIGN COOKIES  *************************************************
 * Leetcode 2: https://leetcode.com/problems/assign-cookies/description/
*/

// SOLUTION: O(n log n + m log m)

/**
 * Finds the maximum number of children who can be contented with the given cookies.
 * @param {number[]} g - Array of greed factors of children.
 * @param {number[]} s - Array of cookie sizes.
 * @return {number} - Maximum number of content children.
 */
var findContentChildren = function(g, s) {
    // Sort the greed factors in ascending order
    g.sort((a, b) => a - b);
    // Sort the cookie sizes in ascending order
    s.sort((a, b) => a - b);

    // Initialize pointers for children and cookies
    let child = 0;  // Index for children
    let cookie = 0; // Index for cookies

    // Loop through both arrays until we reach the end of one of them
    while (child < g.length && cookie < s.length) {
        // If the current cookie can satisfy the current child's greed factor
        if (s[cookie] >= g[child]) {
            // Move to the next child, as this child is content now
            child++;
        }
        // Move to the next cookie in either case
        cookie++;
    }

    // Return the number of children that have been contented
    return child;
};
