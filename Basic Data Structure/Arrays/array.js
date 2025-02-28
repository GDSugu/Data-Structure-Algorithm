/********************************** REVERSE ARRAY *********************************
Reverse Array
Given an integer array ( a ) of length ( n ), you want to create an array ( res ) of length ( 2n ) 
where ( res[i] = a[i] ) and ( res[i + n] = a[n - i - 1] ) for ( 0 <=i < n ) (0-indexed).

Hint: The ( res ) array is the concatenation of ( a ) and the reverse of ( a ).

Input Format:

The first line contains a single integer ( n ), representing the number of elements in the array.
The second line contains ( n ) space-separated integers representing the elements of the array.
Output Format:

Print the elements of the array ( res ).
Sample Input 1:

5
1 2 3 4 5
Sample Output 1:

1 2 3 4 5 5 4 3 2 1
Explanation:

The ( res ) array is formed by concatenating the array ( a ) with its reverse. Thus, ( res = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1] ).

Constraints:

( 1 <= n <=1000 )
( -1000 <= a[i] <= 1000 )
Note:The function should return the result. The driver code will handle printing the output.

*/


function reverseArray(arr,n){
    for(let i=n-1; i>=0; i++){
        arr.push(arr[i])
    }
    console.log(arr)
}
