//
//  Set.swift
//  
//
//  Created by kori on 8/10/16.
//
//

import Foundation

// Intersection of two sorted arrays

let ar1 = [1, 12, 15, 19, 20, 21]
let ar2 = [2, 15, 17, 19, 19, 21, 25, 27]

func intersection(ar1: [Int], _ ar2: [Int]) -> Set<Int> {
  var i1 = 0
  var i2 = 0
  var intersection = Set<Int>()
  
  while(i1 < ar1.count && i2 < ar2.count) {
    if ar1[i1] < ar2[i2] { i1 += 1 }
    if ar1[i1] > ar2[i2] { i2 += 1 }
    if ar1[i1] == ar2[i2] {
      intersection.insert(ar1[i1])
      i1+=1
      i2+=1
    }
  }
  
  return intersection
}

assert(intersection(ar1, ar2)==Set([15, 19, 21]))

/////////////////////////////////

// http://www.slideshare.net/gayle2/cracking-the-facebook-coding-interview
//
// All subsets
// s = {"a", "b", "c"} -> [{}, {a}, {b}, {c}, {a, b}, ..., {a, b, c}]

// time complexity: n + (n-1) + .. 1 = O(S^2), S = Size of set
// space complexity: nCn + nCn-1 + ... + nC1 = 1 + n + .. n := O(S^2)?
func generateSubset(orgSet: Set<String>) -> [Set<String>] {
  guard orgSet.count > 0 else { return [Set()] }
  var set = orgSet
  let first = set.removeFirst()
  
  let subset = generateSubset(set) // call stack: S
  
  return subset + subset.map { (var setEl: Set<String>) in
    setEl.insert(first)
    return setEl
  }
}

assert(generateSubset(["a", "b", "c"]).count == 8)
