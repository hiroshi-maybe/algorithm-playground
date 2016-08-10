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
