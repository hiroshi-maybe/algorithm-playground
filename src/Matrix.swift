//
//  Matrix.swift
//  
//
//  Created by kori on 8/11/16.
//
//

import Foundation


/////////////////////////////////

let matrix = [
  [6, 5, -9, 2], // 4
  [-2, -5, -2, 7], // -2
  [3, -2, 10, 13], // 24
  [-8, -3, 1, -2] // -12
]

// sub matrix with max sum at origin
// time complexity: O(n^2)
// space complexity: O(n^2)
func subRectangleAtOrigin(matrix: [[Int]], n: Int) -> Int {
  var dp: [[Int]] = Array(count: n+1, repeatedValue: Array(count: n+1, repeatedValue: 0))
  
  var res = Int.min
  
  for i in 0..<n {
    for j in 0..<i {
      dp = calcRect(matrix, dp: dp, x: i, y: j)
      res = max(dp[j+1][i+1], res)
      
      dp = calcRect(matrix, dp: dp, x: j, y: i)
      res = max(dp[i+1][j+1], res)
    }
    
    dp = calcRect(matrix, dp: dp, x: i, y: i)
    res = max(dp[i+1][i+1], res)
  }
  
  /*
   let dp = [
   [0, 0, 0, 0, 0],
   [0, 6, 11, 2, 4],
   [0, 4, 4, -7, 2],
   [0, 7, 5, 4, 26],
   [0, -1, -6, -6, 14]
   ]
   */
  
  return res
}

func calcRect(matrix: [[Int]], dp: [[Int]], x: Int, y: Int) -> [[Int]] {
  var _dp = dp
  _dp[y+1][x+1] = dp[y+1][x] + dp[y][x+1] - dp[y][x] + matrix[y][x]
  
  return _dp
}

assert(subRectangleAtOrigin(matrix, n: 4) == 26) // (x, y) = (3, 2)

/////////////////////////////////

// [3, -2, 10, 13]
// 3, 1, 11, 24
//    -2
//       10
//           13
//var maxSofar = 0 // 3,3,11,
//var maxHere = 0  // 3,1,11,

// Time complexity: O(L), L is length of data
// Space complexity: O(L)
func maxSumInSubarray(data: [Int]) -> Int {
  var maxSofar = 0
  var maxHere = 0
  
  guard data.count > 0 else { return 0 }
  
  for i in data {
    maxHere = max(i, maxHere + i)
    maxSofar = max(maxSofar, maxHere)
  }
  
  return maxSofar
}

assert(maxSumInSubarray([3, -2, 10, 13])==24)

// Time complexity: O(n^3)
// Space complexity: O(n^2)
func subRectangle(matrix: [[Int]], n: Int) -> Int {
  var maxSofar = Int.min
  
  for i in 0 ... n-1 {
    var rows = Array(count: n, repeatedValue: 0)
    for j in i ... n-1 {
      // invariant: i <= j, rows has sum of rows[i..<j]
      
      // get updated sums
      for k in 0 ... n-1 {
        rows[k] += matrix[j][k]
      }
      
      maxSofar = max(maxSofar, maxSumInSubarray(rows))
      // print("\(i), \(j) / \(maxSofar)")
    }
  }
  
  return maxSofar
}

assert(subRectangle(matrix, n: 4) == 28)
