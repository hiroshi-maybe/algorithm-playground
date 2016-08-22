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

/////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 1.6

let matrixToRotate = [
  [0,   1,  2,  3],
  [4,   5,  6,  7],
  [8,   9, 10, 11],
  [12, 13, 14, 15]
]

// i,j=0,0..2 / 1, 1..1
// i = 0 ..< n/2
//   j = i ..< n-i-1

// mat[y][x] -> mat[3-x][y]

// mat[0][1] (1) -> mat[2][0]
// mat[1][2] (6) -> mat[1][1]

// Time complexity: O(n^2)
// Space complexity: O(n^2)

func rotateMatrix(_matrix: [[Int]]) -> [[Int]] {
  var matrix = _matrix
  let size = matrix.count
  for i in 0 ..< size/2 {
    for j in i ..< (size-i-1) {
      let val1 = matrix[i][j]
      let pos2 = nextPos(i, j, size: size)
      let val2 = matrix[pos2.i][pos2.j]
      let pos3 = nextPos(pos2.i, pos2.j, size: size)
      let val3 = matrix[pos3.i][pos3.j]
      let pos4 = nextPos(pos3.i, pos3.j, size: size)
      let val4 = matrix[pos4.i][pos4.j]
      
      matrix[i][j] = val4
      matrix[pos2.i][pos2.j] = val1
      matrix[pos3.i][pos3.j] = val2
      matrix[pos4.i][pos4.j] = val3
    }
  }
  
  return matrix
}

func nextPos(i: Int, _ j: Int, size: Int) -> (i: Int, j: Int) {
  return (i: size-j-1, j: i)
}

assert(rotateMatrix(matrixToRotate)==[
  [3,7,11,15],
  [2,6,10,14],
  [1,5, 9,13],
  [0,4, 8,12]
  ]
)

/////////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 1.8

let matrixToFillZero = [
  [6, 5, -9, 2],
  [-2, -5, 0, 7],
  [-8, 0, 1, -2]
]

func fillZeroInMatrix(_matrix: [[Int]]) -> [[Int]] {
  var matrix = _matrix
  
  var zeroPosI = Set<Int>()
  var zeroPosJ = Set<Int>()
  
  for i in 0 ..< matrix.count {
    for j in 0 ..< matrix[i].count {
      if matrix[i][j] == 0 {
        zeroPosI.insert(i)
        zeroPosJ.insert(j)
      }
    }
  }
  
  for i in 0 ..< matrix.count {
    if zeroPosI.contains(i) {
      matrix[i] = Array(count: matrix[i].count, repeatedValue: 0)
    }
    for j in 0 ..< matrix[i].count {
      if zeroPosJ.contains(j) {
        matrix[i][j] = 0
      }
    }
  }
  
  return matrix
}

assert(fillZeroInMatrix(matrixToFillZero)==[
  [6, 0, 0, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
  ]
)

/*

 https://en.wikipedia.org/wiki/Dynamic_programming
 A type of balanced 0–1 matrix
 
 OK
 
 0,1,0,1
 1,0,1,0
 0,1,0,1
 1,0,1,0
 
 1,1,0,0
 1,1,0,0
 0,0,1,1
 0,0,1,1

 1,1,0,0
 0,0,1,1
 1,1,0,0
 0,0,1,1

 1,0,1,0
 0,1,0,1
 0,1,0,1
 1,0,1,0
 
 NG
 
 1,1,0,1
 1,0,1,0
 0,1,0,1
 1,0,1,0
 
 1. Brute force
 
 i in 0..<n
  j in 0..<n
   matrix[i,j] = 0 or 1
 
 check if matrix is balanced?
 
 2. Recursive call

 cap = [(2,2),(2,2),(2,2),(2,2)]
 
 f(n, cap) {
   check memo (DP. simple backtracking if we don't apply memoization)
   if n==0 check 1 if all zero in cap
   
   c in combinations for 4 columns {
    f(n-1, cap-c)
   }
 }
 
 */

typealias ColumnCap = (Int, Int)
func balancedMatrixPattern(n: Int) -> Int {
  let colCaps = Array(count: n, repeatedValue:(n/2, n/2))
  var memo: [String: Int] = [:]
  let rowCombination = combinationsForRow(n)
  
  return balancedMatrixPattern(n, colCaps: colCaps, rowCombination: rowCombination, memo: &memo)
}

func balancedMatrixHash(key: (Int, [ColumnCap])) -> String {
  let colcapKey = key.1.map { "(\($0.0),\($0.1))" }
  return "\(key.0)|\(colcapKey)"
}

func balancedMatrixPattern(n: Int, colCaps: [ColumnCap], rowCombination: RowCombination, inout memo: [String: Int]) -> Int {
  if let memoized = memo[balancedMatrixHash((n, colCaps))] { return memoized }
  if !colCaps.filter({ $0.0<0 || $0.1<0 }).isEmpty { return 0 }

  if n==0 {
    let res = (colCaps.filter { $0.0==0 && $0.1==0 }.count) == colCaps.count ? 1 : 0
    memo[balancedMatrixHash((n, colCaps))] = res
    return res
  }
  
  var res = 0
  for row in rowCombination {
    let colCapsNext = Zip2Sequence(row, colCaps)
      .map { (isOne, col) in (col.0 - (isOne ? 0 : 1), col.1 - (isOne ? 1 : 0)) }
    res += balancedMatrixPattern(n-1, colCaps: colCapsNext, rowCombination: rowCombination, memo: &memo)
  }

  memo[balancedMatrixHash((n, colCaps))] = res
  return res
}

typealias RowCombination = [[Bool]]
func combinationsForRow(n: Int) -> RowCombination {
  assert(n % 2==0)
  let capacity = n/2 + 1
  var memo: [[RowCombination?]] = Array(count: capacity, repeatedValue: Array(count: capacity, repeatedValue: nil))
  return combinationsForRow(n/2, n/2, memo: &memo)
}

func combinationsForRow(one: Int, _ zero: Int, inout memo: [[RowCombination?]]) -> RowCombination {
  if let memoized = memo[one][zero] { return memoized }
  
  let list: RowCombination
  switch (one, zero) {
  case(0, 0):
    list = [[]]
  case(1..<Int.max, 0):
    list = combinationsForRow(one-1, zero, memo: &memo).map { [true]+$0 }
  case(0, 1..<Int.max):
    list = combinationsForRow(one, zero-1, memo: &memo).map { [false]+$0 }
  default:
    let c1: RowCombination = combinationsForRow(one, zero-1, memo: &memo).map { [false]+$0 }
    let c2: RowCombination = combinationsForRow(one-1, zero, memo: &memo).map { [true]+$0 }
    list = c1 + c2
  }
  
  memo[one][zero] = list
  
  return list
}

// https://oeis.org/A058527
assert(balancedMatrixPattern(2)==2)
assert(balancedMatrixPattern(4)==90)
assert(balancedMatrixPattern(6)==297200)
