//
//  Number.swift
//  
//
//  Created by kori on 8/10/16.
//
//

import Foundation

func sumOfPoweredBy3(a: Int, _ b: Int) -> Int {
  return Int(pow(Double(a), 3.0)+pow(Double(b), 3.0))
}

// M: higher boundary, P: Average number of pairs in one candidate, M >> P
// C: number of sum pattern, C == M^2
// time complexity: O(M^2 + C*P^2) -> O(P^2*M^2)
// space complexity: O(C + P^2) -> O(M^2 + P^2)

func sumOfPoweredBy3Pair(max: Int) -> [(a: Int, b: Int, c: Int, d: Int)] {
  var dict: [Int: [(Int, Int)]] = [:]
  
  for a in 1...max {
    for b in a...max {
      let sum = sumOfPoweredBy3(a, b)
      var candidates = dict[sum] ?? []
      candidates.append((a, b))
      dict[sum] = candidates
    }
  }
  
  return dict
    .flatMap { (key, candidates) in pairs(candidates) }
    .map { (p1, p2) in (a: p1.0, b: p1.1, c: p2.0, d: p2.1) }
}

// time complexity: X+(X-1)+....+1 -> O(X^2)
func pairs<T>(list: [T]) -> [(T, T)] {
  guard let head = list.first else { return [] }
  
  let rest = list[1..<list.count]
  return rest.flatMap { (head, $0) } + pairs(Array(rest))
}

let pairs = sumOfPoweredBy3Pair(100)
pairs.forEach {(a, b, c, d) in
  assert(sumOfPoweredBy3(a, b)==sumOfPoweredBy3(c, d))
}

/////////////////////////////////

// http://www.slideshare.net/gayle2/cracking-the-facebook-coding-interview
//
// Find permutations of `s` within `b`
// s = "abbc" -> { "a"x1, "b"x2, "c"x1 }
// b = "babcabbacaabcbabcacbb"
//    a 011121
//    b 112212
//    c 000111
//         * *

// dp_x[i] = dp_x[i-1] - (b[i-L(s)]==x) + (b[i]==x)
// if dp_x == s_set then `perm`

// Time complexity: O(S + K*B) -> O(K*B), K is length of character set (K <= S)
// Space complexity: O(K*B)
func permutationIndex(s: String, b: String) -> [Int] {
  var permIndices: [Int] = []
  let freqs = createFreqTable(s) // time: O(S), space: O(K)
  var dp: [[Character: Int]] = createDpArray(s, b: b, charSet: Set(freqs.keys)) // time: O(B), space: O(K*B)
  
  for (index, char) in b.characters.enumerate() { // time: O(B)
    let dpIndex = getDpIndex(index, s: s)
    
    for key in freqs.keys { // O(K)
      dp[dpIndex][key] = dp[dpIndex-1][key]!
        - (escaped(index, key: key, b: b, s: s) ? 1 : 0)
        + (char == key ? 1 : 0)
    }
    
    if dp[dpIndex] == freqs { permIndices.append(index) }
  }
  
  return permIndices
}

func escaped(index: Int, key: Character, b: String, s: String) -> Bool {
  if index < s.characters.count { return false }
  
  let prev = b[b.startIndex.advancedBy(index-s.characters.count)]
  return prev == key
}

func createDpArray(s: String, b: String, charSet: Set<Character>) -> [[Character: Int]] {
  return Array(count: b.characters.count+s.characters.count, repeatedValue: createEmptyTable(charSet))
}

func getDpIndex(index: Int, s: String) -> Int {
  return index + s.characters.count
}

func createFreqTable(s: String) -> [Character: Int] {
  var freqs: [Character: Int] = [:]
  
  for c in s.characters {
    let freq = freqs[c] ?? 0
    freqs[c] = freq + 1
  }
  
  return freqs
}

func createEmptyTable(set: Set<Character>) -> [Character: Int] {
  return set.reduce([:], combine: { (var dic, char) in
    dic[char] = 0
    return dic
  })
}

assert(permutationIndex("abbc", b: "babcabbacaabcbabcacbb")==[3, 5, 6, 8, 13, 14, 15, 16, 20])

/**

  https://www.careercup.com/question?id=5738847481626624
 
 * Given an unsorted integer array, place all zeros to the end of the array without changing the sequence of non-zero
 * elements. (i.e. [1,3,0,8,12,0,4,0,7] --> [1,3,8,12,4,7,0,0,0])

 1,3,0,8,12,0,4,0,7
 I->
 M->
 
 data[0..M] != 0, data[M+1..I] == 0
 
 1,3,0,8,12,0,4,0,7
     *->
   *

 1,3,0,8,12,0,4,0,7
       *
   *
 
 // move M and swap
 
 1,3,8,0,12,0,4,0,7
       *
     *

 1,3,8,0,12,0,4,0,7
         *
     *

 swap when non zero is found

 1,3,8,0,12,0,4,0,7
         *
       *

 1,3,8,12,0,0,4,0,7
              *
        *

 1,3,8,12,4,0,0,0,7
              *
            *

 1,3,8,12,4,0,0,0,7
                  *
            *

 1,3,8,12,4,7,0,0,0
                  *
            *
 
 */

func moveZeroBackward(var data: [Int]) -> [Int] {
  var m = -1

  for i in 0 ..< data.count {
    // invariant: data[0..M] != 0, data[M+1..I] == 0
    if data[i] != 0 {
      m += 1
      let tmp = data[i]
      data[i] = data[m]
      data[m] = tmp
    }
  }
  
  return data
}

assert(moveZeroBackward([1,3,0,8,12,0,4,0,7])==[1,3,8,12,4,7,0,0,0])

/**
 
 https://www.careercup.com/question?id=5763751446839296
 
 * [1,6,3,4,5,2,7] -> [1,6,5,4,3,2,7] -> [1,2,3,4,5,6,7]
 
 */

func canSortByReverse(data: [Int]) -> Bool {
  guard data.count % 2 == 1 else { return false }
  let sorted = data.sort { $0 < $1 }
  
  for i in 0 ..< data.count {
    if data[i] == sorted[i] || data[i] == sorted[data.count-i-1] {
      continue
    }
    
    return false
  }
  
  return true
}

assert(canSortByReverse([1,6,3,4,5,2,7]))

/////////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 8.1

func nthFibonacci(n: Int) -> Int {
  var pp = 0
  var p = 1
  
  switch (n) {
  case Int.min..<2: return pp
  case 2: return p
  default: break
  }

  // invariant: n > 2
  
  var counter = n - 2
  
  // invariant: counter > 0
  
  while counter > 0 {
    let t = p
    p = pp + t
    pp = t
    counter -= 1
  }
  
  return p
}

assert(nthFibonacci(0)==0)
assert(nthFibonacci(1)==0)
assert(nthFibonacci(2)==1)
assert(nthFibonacci(3)==1)
assert(nthFibonacci(4)==2)
assert(nthFibonacci(5)==3)
assert(nthFibonacci(21)==6765)
