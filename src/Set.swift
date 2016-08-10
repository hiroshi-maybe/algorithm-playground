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
  
  while(true) {
    guard i1 < ar1.count else { return intersection }
    guard i2 < ar2.count else { return intersection }
    
    let v1 = ar1[i1]
    let v2 = ar2[i2]
    
    if v1 <= v2 {
      guard let nextI1 = findNext(i1, ar: ar1, reaches: v2) else { return intersection }
      if ar1[nextI1] == v2 {
        intersection.insert(v2)
        i1 = nextI1 + 1
      } else {
        i1 = nextI1
      }
    } else {
      guard let nextI2 = findNext(i2, ar: ar2, reaches: v1) else { return intersection }
      if ar2[nextI2] == v1 {
        intersection.insert(v1)
        i2 = nextI2 + 1
      } else {
        i2 = nextI2
      }
    }
  }
}

func findNext(start: Int, ar: [Int], reaches: Int) -> Int? {
  if start >= ar.count { return nil }
  return ar[start..<ar.count].indexOf({ $0 >= reaches })
}

assert(intersection(ar1, ar2)==Set([15, 19, 21]))
