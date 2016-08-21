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
// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 8.3
//
// All subsets
// s = {"a", "b", "c"} -> [{}, {a}, {b}, {c}, {a, b}, ..., {a, b, c}]

// time complexity: n + (n-1) + .. 1 = O(S^2), S = Size of set
// space complexity: nCn + nCn-1 + ... + nC1 = 1 + n + .. n := O(S^2)?
func generateSubset(set: Set<String>) -> [Set<String>] {
  var orgSet = set
  guard let first = orgSet.first else { return [Set()] }
  orgSet.remove(first)
  let subset = generateSubset(orgSet) // Call stack: S
  return subset + subset.flatMap { Set([first]).union($0) }
}

assert(generateSubset(["a", "b", "c"]).count == 8)

/////////////////////////////////

/**
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 8.4

 s = "{a,b,c} -> "abc", "acb", "bac", "bca", "cab", "cba"
 
 [a + p({b,c})], [b + p({a,c})]

 
*/

// time complexity: O(n!)
// space complexity: O(n!)

func generatePermutation(set: Set<String>) -> [String] {
  guard set.count > 0 else { return [""] }
  return set.flatMap { (ch: String) -> [String] in
    var myset = set
    myset.remove(ch)
    return generatePermutation(myset).map { ch + $0 }
  }
}

assert(generatePermutation(Set(["a","b","c"])).count==6)

/**
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 8.5
 
 3 -> [[1,1,1], [1,2], [2,1], [3]] -> "()()()","()(())","(())()","((()))"
 
 */

func generateParenthesesComb(n: Int) -> [String] {
  return generateNumSet(n).map { nums in
    return nums
      .map { String(count: $0, repeatedValue: Character("(")) + String(count: $0, repeatedValue: Character(")")) }
      .joinWithSeparator("")
  }
}

// 3 ->
//  1 -> {1} + {gen(2)}
//  2 -> {2} + {gen(1)}
//  3 -> {3} + {gen(0)}

// 2 ->
//  1 -> {1} + {gen(1)}
//  2 -> {2} + {gen(0)}

func generateNumSet(n: Int) -> [[Int]] {
  guard n > 0 else { return [[]] }
  
  // invariant: n >= 1
  return Array(1...n).flatMap { m in
    return generateNumSet(n-m).map { [m] + $0 }
  }
}

assert(generateParenthesesComb(3).count==4)

/**
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 8.7
 
 31
 -> 25*1 + p(6)
 -> 10*3 + p(1)
 -> 10*2 + p(6)
 -> 10*1 + p(21)
 ->  5*6 + p(1)
 ->  5*5 + p(6)
 
 X(1) = 1
 X(2) = 1 / X(1)
 X(3) = 1 / X(1)
 X(4) = 1 / X(1)
 X(5) = 2 / X(4) + 1(5x1) / 1(5) [5:1]
 X(6) = 2 / X(5)
 ...
 X(10) = 4 / X(9) (1x10, 5x1+1x5) + 1(5x2) + 1(10x1) / DP(5)[5] + 1(10) / [5:1,10:1]
 X(11) = 4
 ...
 X(15) = 6 / X(14) + 1(5x3) + 1(10x1+5x1) / DP(10)[5] + DP(10)[10] [5:2]
 ...
 X(20) = X(19) + 1(5x4) + 1(10x1+5x2) + 1(10x2) / DP(15)[5] + DP(10)[10] [5:2, 10:1]
 
 1x20,1x15+5x1,1x
 
 X(25) = X(24) + 1(5x5) + 1(10x1+5x2) / 3 DP(20).all + 0 DP(15)[10] + 1(25) [5:3, 10: 0, 25: 1]

 X(30) = X(29) + 4 + 1 + 0 / DP(25).all + DP(20)[10] + DP[5][25] [5:4, 10:1, 25:0]
 
 X(N) = X(N-1)
        + (1 if new appearance) + X(N-5)[10] + X(N-5)[10] + X(N-5)[25]
        + (1 if new appearance) + X(N-10)[10] + X(N-10)[25]
        + (1 if new appearance) + X(N-25)[25]
 
 */

func payNCents(n: Int) -> Int {
  // Actually only floating window 25 is needed for computation! Space complexity: O(1)
  var coinDP: [[Int: Int]] = Array(count: n+1, repeatedValue: [5: 0, 10: 0, 25: 0])
  guard n > 0 else { return 0 }
  var res = 1
  for i in 2...n {
    let lastFive = existingPattern(i, coin: 5, coinDP: coinDP) + firstAppearance(i, coin: 5)
    let lastTen = existingPattern(i, coin: 10, coinDP: coinDP) + firstAppearance(i, coin: 10)
    let lastTwentyFive = existingPattern(i, coin: 25, coinDP: coinDP) + firstAppearance(i, coin: 25)

    res += lastFive + lastTen + lastTwentyFive

    coinDP[i] = [5: lastFive, 10: lastTen, 25: lastTwentyFive]
  }
  
  return res
}

func firstAppearance(n: Int, coin: Int) -> Int {
  return n == coin ? 1 : 0
}

func existingPattern(n: Int, coin: Int, coinDP: [[Int: Int]]) -> Int {
  guard n % coin == 0 && n > coin else { return 0 }
  
  guard n-coin < coinDP.count else { return 0 }
  let prevPat = coinDP[n-coin]
  
  return prevPat.filter { $0.0 >= coin }.reduce(0) { return $0+$1.1 }
}

assert(payNCents(10)==4)
assert(payNCents(15)==6)
assert(payNCents(20)==9)
assert(payNCents(25)==13)
assert(payNCents(26)==13)
assert(payNCents(30)==18)
