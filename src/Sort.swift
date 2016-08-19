//
//  Sort.swift
//  
//
//  Created by kori on 8/18/16.
//
//

import Foundation

/**
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 9.1

 large: [2,4,6,8]
 small: [1,3,5]
 
 1, [2,4,6,8]
 -> [1,2,4,6,8]
     *
 j = 0
 
 3, [1,2,4,6,8]
 
 j = 0 -> 1
 
 5, [1,3,4,6,8]
 
 j = 1 -> 3
 
 
 */

// Time complexity: O(L+S) where L is size of large array, S is size of small array
// Space complexity: O(L)
func inplaceMerge(large: [Int], from small: [Int]) -> [Int] {
  var arrayToMerge = large
  var i = 0
  var j = 0
  
  while i < small.count {
    let n = small[i]
    let m = j < arrayToMerge.count ? arrayToMerge[j] : Int.max
    
    if n <= m {
      arrayToMerge.insert(n, atIndex: j)
      i += 1
    } else {
      j += 1
    }
  }
  
  return arrayToMerge
}

assert(inplaceMerge([2,4,6,8], from: [1,3,5]) == [1,2,3,4,5,6,8])


/**
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 9.3
 
 [15,16,19,20,25,1,3,3,5,7,10,14] size: 12
 
 s: 0, e: 12
 mid = 3(6) / 15>3, 1<3 NOT FOUND
 
 s: 0, e: 6
 mid = 20(3) / 20>15
 
 s: 4, e: 6
 mid = 1(5) / 1<15, 25>1
 
 return 5
 
 */

func findRotatedIndex(data: [Int], start: Int, end: Int) -> Int {
  let midIdx = start + (end-start) / 2
  guard midIdx > 0 && midIdx < data.count else { return 0 }
  let mid = data[midIdx]
  
  if mid <= data[0] {
    return mid < data[midIdx-1] ? midIdx : findRotatedIndex(data, start: start, end: midIdx)
  } else {
    return findRotatedIndex(data, start: midIdx+1, end: end)
  }
}

let rotatedAr1 = [15,16,19,20,25,1,3,3,5,7,10,14]
assert(findRotatedIndex(rotatedAr1, start: 0, end: rotatedAr1.count)==5)
let rotatedAr2 = [1,2,3]
assert(findRotatedIndex(rotatedAr2, start: 0, end: rotatedAr2.count)==0)
let rotatedAr3 = [1,1,1]
assert(findRotatedIndex(rotatedAr3, start: 0, end: rotatedAr3.count)==0)
