//
//  binary_search.swift
//  
//
//  Created by kori on 8/5/16.
//
//

import Foundation

///////////////////////////////////////

// 0, 10
// 6, 10
// 6, 9 mid:7
// 6, 8 mid:7
//let array = [15,16,19,20,25,30,*31,1,10*,14]
let array = [15,16,19,20,25,30,31,1,10,14]

func _findRotatedIdx(data: [Int], start: Int, end: Int) -> Int {
  // res should be in data[start..<end]
  if end - start == 1 { return start }
  
  let mid = (start + end) / 2
  
  if data[mid] >= data[0] {
    // data[mid+1..<end]
    return _findRotatedIdx(data, start: mid+1, end: end)
  } else {
    if data[mid] < data[mid-1] { return mid }
    // data[start..<mid]
    return _findRotatedIdx(data, start: start, end: mid)
  }
}

func findRotatedIdx(data: [Int]) -> Int {
  return _findRotatedIdx(data, start: 0, end: array.count)
}

findRotatedIdx([15,16,19,20,25,30,31,1,10,14])
findRotatedIdx([1,10,14,15,16,19,20,25,30,31])
findRotatedIdx([1,1,1,1,1,1,1,1,1,1])
findRotatedIdx([2,1,1,1,1,1,1,1,1,1])

///////////////////////////////////////

func indexOf(t: Int, in data: [Int], start: Int, end: Int) -> Int? {
  if end <= start { return nil }
  
  // t in data[start..<end]
  let mid = (start + end) / 2
  
  if data[mid] == t { return mid }
  if data[mid] > t  {
    // t in data[start..<mid]
    return indexOf(t, in: data, start: start, end: mid)
  }
  
  // t in data[mid+1..<end]
  return indexOf(t, in: data, start: mid+1, end: end)
}

func bsearch(t: Int, in data: [Int]) -> Int? {
  return indexOf(t, in: data, start: 0, end: data.count)
}

bsearch(2, in: [0,1,2,3,4,5,6,7,8,9])
bsearch(20, in: [0,1,2,3,4,5,6,7,8,9])
bsearch(-1, in: [0,1,2,3,4,5,6,7,8,9])
