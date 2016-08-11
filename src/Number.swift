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
