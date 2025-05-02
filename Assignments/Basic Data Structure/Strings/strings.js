/****************************  LONGEST SUBSTRING WITH K UNIQUE CHARACTER  **************************
Longest SubString With K unique charachters
Given a string S and an integer K, find the length of the longest substring of S that contains exactly K unique characters. If no such substring exists, return -1.

Your Task: You don't need to read input or print anything. Your task is to complete the function longestKSubstr() which takes the string S and an integer K as input and returns the length of the longest substring with exactly K distinct characters. If there is no substring with exactly K distinct characters then return -1.
Input Format:

A string S containing lowercase letters.
An integer K, the number of unique characters required in the substring.
Output Format:

Return the length of the longest substring with exactly K unique characters. If there is no substring with exactly K unique characters, return -1.
Sample Input 1:

S = "aabacbebebe"
K = 3
Sample Output 1:

7
Explanation:

The longest substring with exactly 3 distinct characters is "cbebebe".

Constraints:

(1 <= length of S <= 10^6)
(0 <= K <= 26)

*/

// NOTE: Dont forget to incremet the left++ in the while loop

class Solution {
  longestKSubstr(s, k) {
      // Initialize the maximum length to -1 (to indicate no valid substring found yet)
      let maxLength = -1;
      
      // Use a Map to store character frequencies in the current window
      let map = new Map();
      
      // Left pointer of the sliding window
      let left = 0;
      
      // Iterate through the string using the right pointer
      for (let right = 0; right < s.length; right++) {
          let rightChar = s[right];
          
          // Add current character to the map and update its frequency
          map.set(rightChar, (map.get(rightChar) || 0) + 1);
          
          // If the number of unique characters exceeds k, shrink the window from the left
          while (map.size > k) {
              let leftChar = s[left];
              
              // Decrease the frequency of the character at the left pointer
              map.set(leftChar, map.get(leftChar) - 1);
              
              // If the frequency becomes 0, remove the character from the map
              if (map.get(leftChar) === 0) {
                  map.delete(leftChar);
              }
              
              // Move the left pointer to shrink the window
              left++;
          }
          
          // If the current window has exactly k unique characters, update maxLength
          if (map.size === k) {
              maxLength = Math.max(maxLength, right - left + 1);
          }
      }
      
      // Return the length of the longest substring with exactly k unique characters
      return maxLength;
  }
}

  
/************************************** LENGTH OF LONGEST SUBSTRING WITH NO REPEATED CHARACTER ********

Length of longest substring with no repeated characters
Determine the maximum length of a substring in string s that does not contain any repeated characters.

Input Format:

A string s consisting of English letters, digits, symbols, and spaces.
Output Format:

Return the length of the longest substring with no repeated characters.
Sample Input 1:

Heycoachsuper30
Sample Output 1:

11
Explanation:

The longest substring without repeating characters is "oachsuper30".

Constraints:

(0 <=s.length <=5 * 10^4)
Note:The function should return the result. The driver code will handle printing the output.

*/


// APPROACH 1 UISNG HASHMAP WITH COUNT

function longestSubstringWithNoRepeatingChars(s) {
    let left = 0; // Left pointer
    let maxLength = 0; // Maximum length of substring without repeating characters
    let charCount = new Map(); // Map to store character counts
    
    // Traverse the string with the right pointer
    for (let right = 0; right < s.length; right++) {
        let rightChar = s[right];

        // Increment count of the character in the map
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // If the character count exceeds 1, shrink the window from the left
        while (charCount.get(rightChar) > 1) {
            let leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            
            // If count becomes 0, remove the character from the map
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            
            left++; // Move the left pointer to shrink the window
        }

        // Update the maxLength after adjusting the window
        maxLength = Math.max(maxLength, right - left + 1);
    }

    console.log(maxLength); // Output the longest substring length
}

longestSubstringWithNoRepeatingChars("Heycoachsuper30"); // Example input





// APPROACH 2 USING THE SET TO KEEP UNIQUE CHARACTER
/*
1. Window: | H | Set: {H} | maxLength: 1
2. Window: | H e | Set: {H, e} | maxLength: 2
3. Window: | H e y | Set: {H, e, y} | maxLength: 3
4. Window: | H e y c | Set: {H, e, y, c} | maxLength: 4
5. Window: | H e y c o | Set: {H, e, y, c, o} | maxLength: 5
6. Window: | H e y c o a | Set: {H, e, y, c, o, a} | maxLength: 6
7. Window: | e y c o a | Set: {e, y, c, o, a} | maxLength: 6
8. Continue for all characters...
9. Final Window: | oachsuper30 | Set: {o, a, c, h, s, u, p, e, r, 3, 0} | maxLength: 11
*/

// NOTE: use the while loop before adding the rightChar to thre set
function longestSubstringWithNoRepeatingChars(s) {
    let left = 0; // Left pointer for the sliding window
    let maxLength = 0; // Maximum length of the substring
    let charSet = new Set(); // Set to store unique characters in the window
    
    // Iterate through the string with the 'right' pointer
    for (let right = 0; right < s.length; right++) {
        // Expand the window by adding the character at 'right' to the set
        while (charSet.has(s[right])) {
            // If character at 'right' already exists in the set, shrink the window
            // Move the 'left' pointer to the right and remove the character at 'left' from the set
            charSet.delete(s[left]);
            left++;
        }
        
        // Add the character at 'right' to the set
        charSet.add(s[right]);
        
        // Calculate the window length and update maxLength if needed
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    // Return the maximum length of the substring without repeating characters
    console.log(maxLength);
    return maxLength;
}

longestSubstringWithNoRepeatingChars("Heycoachsuper30"); // Example input
