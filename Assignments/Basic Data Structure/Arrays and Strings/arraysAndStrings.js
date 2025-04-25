/********************************** FIND THE FIRST NON NEGATIVE ELEMENT FOR EVERY WINDOW K SIZE *********************************
First Negative element in every window size k
In the town of Kanpur, where technology intertwined with everyday life, lived a young programmer named Nitin. One sunny afternoon, while strolling through the local park, she stumbled upon an antique book filled with intricate coding riddles. Determined to crack the enigma, Nitin found a puzzling task: to locate the first negative integer within every subarray of window size k in a given sequence (say arr) of size N. Help Nitin in solving this task.

Input Format:

The first line contains an integer k denoting the window size.
The second line contains an array arr of size N consisting of integers.
Output Format:

Print the first negative integer in every window of size k. If a window does not contain a negative integer, print 0.
Sample Input 1:

k = 3
arr = {12, -1, -7, 8, -15, 30, 16, 28}
Sample Output 1:

-1 -1 -7 -15 -15 0
Explanation:

The first negative integer in each window of size 3 is as follows:

Window [12, -1, -7]: First negative is -1
Window [-1, -7, 8]: First negative is -1
Window [-7, 8, -15]: First negative is -7
Window [8, -15, 30]: First negative is -15
Window [-15, 30, 16]: First negative is -15
Window [30, 16, 28]: No negative, so print 0
Constraints:

(1 <=N <=10^5)
(-10^5 <=A[i] <=10^5)
(1 <=K <=N)
Note:The function should print the result.

*/

// SOLUTION: SLIDING WINDOW -> O(N)

class Solution {
    firstNegInt(arr, k) {
        let result = [];   // This will store the final results (first negative integer for each window)
        let queue = [];    // This will hold the indices of negative integers in the current window
        let left = 0;      // This is the left boundary of the sliding window

        // Loop through the array with 'right' pointer representing the right boundary of the window
        for (let right = 0; right < arr.length; right++) {
            
            // If the current element is negative, store its index in the queue
            if (arr[right] < 0) {
                queue.push(right);
            }

            // Check if the window size has reached 'k' (right - left + 1 is the window size)
            if (right - left + 1 === k) {
                
                // If no negative integers are found in the current window
                if (queue.length === 0) {
                    result.push(0);  // Add 0 to the result (no negative integer in the window)
                } else {
                    // The first negative integer in the window is at the front of the queue
                    result.push(arr[queue[0]]);
                    
                    // If the first negative integer is going out of the window (left boundary)
                    if (queue[0] === left) {
                        queue.shift();  // Remove it from the queue as it's no longer in the window
                    }
                }
                
                // Move the left boundary of the window (slide the window right)
                left++;
            }
        }

        // Return the list of first negative integers for each window of size k
        return result;
    }
}
