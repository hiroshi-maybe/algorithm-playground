//
//  LinkedList.swift
//  
//
//  Created by kori on 8/7/16.
//
//

import Foundation

class Node: CustomDebugStringConvertible {
  var v: Int
  var next: Node?
  
  init(v: Int) {
    self.v = v
  }
  
  var debugDescription: String {
    let nextStr = next?.debugDescription ?? "nil"
    return "\(v)->\(nextStr)"
  }
  
  func deleteNext() {
    guard let nextCurrent = next else { return }
    
    let nextNew = nextCurrent.next
    self.next = nextNew
  }
  
  static func create(vals: [Int]) -> Node? {
    let sorted = vals.map { Node(v: $0) }
    
    Zip2Sequence(
      sorted[0..<sorted.count-1],
      sorted[1..<sorted.count]
      )
      .forEach {
        $0.next = $1
    }
    
    return sorted.first
  }
  
  static func merge(node1: Node?, _ node2: Node?) -> Node? {
    switch (node1, node2) {
    case (nil, nil):
      return nil
    case (nil, .Some(let node2)):
      return node2
    case (.Some(let node1), nil):
      return node1
    case let (.Some(node1), .Some(node2)):
      return Node._merge(node1, node2)
    }
  }
  
  private static func _merge(node1: Node, _ node2: Node) -> Node {
    let nodeSmall: Node
    let nodeLarge: Node
    if node1.v < node2.v {
      nodeSmall = node1
      nodeLarge = node2
    } else {
      nodeSmall = node2
      nodeLarge = node1
    }
    
    if let nodeSmallNext = nodeSmall.next {
      let successor = _merge(nodeSmallNext, nodeLarge)
      nodeSmall.next = successor
    } else {
      nodeSmall.next = nodeLarge
    }
    
    return nodeSmall
  }
}

if let node1 = Node.create([1, 3, 5, 7].sort()),
  node2 = Node.create([1, 2, 4, 10].sort()) {
  let headMerged = Node.merge(node1, node2)
  assert("\(headMerged!)" == "1->1->2->3->4->5->7->10->nil")
}

if let node1 = Node.create([1].sort()),
  node2 = Node.create([1, 2, 4, 10].sort()) {
  let headMerged = Node.merge(node1, node2)
  assert("\(headMerged!)" == "1->1->2->4->10->nil")
}


/////////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 2.1

// 18 -> 7 -> 2 -> 89 -> 1 -> 2 -> 7 -> 18
//                            *
// found = { 18, 7, 2, 89, 1 }
//
// 18 -> 7 -> 2 -> 89 -> p:1 -> n:7 -> 18
// found = { 18, 7, 2, 89, 1 }

// 18 -> 7 -> 2 -> 89 -> p:1 -> n:18
// 18 -> 7 -> 2 -> 89 -> p:1

let headToDelDuplicate = Node.create([18, 7, 2, 89, 1, 2, 7, 18])!

func deleteDuplicatedInLinkedList(node: Node, prev: Node?, var found: Set<Int> = Set()) -> Node {
  // `found` has values in head -> .. -> prev

  let current: Node?
  
  if found.contains(node.v) {
    prev?.next = node.next
    current = prev
  } else {
    current = node
  }
  
  found.insert(node.v)
  
  if let next = node.next {
    deleteDuplicatedInLinkedList(next, prev: current, found: found)
  }
  
  return node
}

assert("\(deleteDuplicatedInLinkedList(headToDelDuplicate, prev: nil))" == "18->7->2->89->1->nil")

// 18 -> 7 -> 89 -> 1 -> 7 -> 18 -> nil
//                  *
// found = { 18, 7, 89, 1 }
//
// 18 -> 7 -> 89 -> 1 -> 18 -> nil
//                  *
// found = { 18, 7, 89, 1 }
//
// 18 -> 7 -> 89 -> 1 -> nil
//                  *
// found = { 18, 7, 89, 1 }
//

func deleteDuplicatedInLinkedListIter(head: Node) -> Node {
  var found = Set([head.v])
  var pointer: Node = head
  
  while let next = pointer.next {
    // invariant: `found` includes value of head -> pointer, next needs to be checked
    
    if found.contains(next.v) {
      pointer.next = next.next
    } else {
      pointer = next
      found.insert(pointer.v)
    }
  }
  
  return head
}

assert("\(deleteDuplicatedInLinkedListIter(headToDelDuplicate))" == "18->7->2->89->1->nil")

// 18 -> 7 -> 89 -> 18 -> 7 -> 18 -> nil
//  *1
//
// 18 -> 7 -> 89 -> 7 -> 18 -> nil
//  *1   *2 ------------>*2
// 18 -> 7 -> 89 -> 7 -> nil
//  *1   *2 ------------->*2
//
// 18 -> 7 -> 89 -> 7 -> nil
//      *1    *2 -> *2
//
// 18 -> 7 -> 89 -> 7 -> nil
//      *1    *2 -> *2

func deleteDuplicatedInLinkedListNoBuffer(head: Node) -> Node {
  var pointer: Node = head
  
  while true {
    // invariant: `next` needs to be checked for `pointer.v`
    deleteNodes(pointer, v: pointer.v)
    
    // invariant: following nodes from `next` should not have `pointer.v`
    
    if let next = pointer.next {
      pointer = next
    } else {
      break
    }
  }
  
  return head
}

// 18 -> 7 -> 89 -> 7 -> 18 -> nil
// v               *2

// delete nodes with `v` following from `node.next`
func deleteNodes(node: Node, v: Int) {
  var pointer = node
  
  while let next = pointer.next {
    if next.v == v {
      pointer.next = next.next
    } else {
      pointer = next
    }
  }
}

assert("\(deleteDuplicatedInLinkedListNoBuffer(headToDelDuplicate))" == "18->7->2->89->1->nil")

/////////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 2.2

// 1 -> 2 -> ... -> *4981 -> ... -> 5000
// ! want to find 20th to last
// Option 1:
//  1. total: 5000 (iterate 5000 elements)
//  2. follow link by (5000 - 20) 4980 times
//  -> 9980 iterations
//
// Option 2:
//   1 -> 2 -> ... -> 20 -> ... -> 4981 -> ... -> 5000
//   *p1              *p2
//   1 -> 2 -> ... -> 20 -> 21 -> ... -> 4981 -> ... -> 5000
//        *p1               *p2
// ....
//   1 -> 2 -> ... -> 20 -> 21 -> ... -> 4981 -> ... -> 5000
//                                       *p1             *p2
//  -> 20 + 4980 = 5000 iterations

let headToFindLastNth = Node.create([1, 2, 3, 4, 5])!

// 1 -> 2 -> 3 -> 4 -> 5
// *1
//      *2
// 1 -> 2 -> 3 -> 4 -> 5
//                *1
//                    *2

func findNthToLast(node: Node, n: Int) -> Node? {
  var ahead = node
  var following = node
  
  // move ahead pointer
  for _ in 0..<n-1 {
    guard let next = ahead.next else { return nil }
    
    ahead = next
  }
  
  // move both
  while let nextAhead = ahead.next,
        nextFollowing = following.next {
    ahead = nextAhead
    following = nextFollowing
  }
  
  return following
}

assert(findNthToLast(headToFindLastNth, n: 3)!.v == 3)
assert(findNthToLast(headToFindLastNth, n: 5)!.v == 1)
assert(findNthToLast(headToFindLastNth, n: 6) == nil)

/////////////////////////////////

// https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 2.4
// 3 -> 1 -> 5
// *
// 5 -> 9 -> 4
// *
// 8 -> 0

// 3 -> 1 -> 5
//      *
// 5 -> 9 -> 4
//      *
// 8 -> 0 -> 1

// 3 -> 1 -> 5 -> 1
//           *
// 5 -> 9 -> 4
//           *
// 8 -> 0 -> 0
//           *(c==1)

// 3 -> 1 -> 5 -> 1 -> nil
//                *
// 5 -> 9 -> 4 -> nil
//                *
// 8 -> 0 -> 0 -> 1
//                *

// 3 -> 1 -> 5 -> 1 -> nil
//                     *
// 5 -> 9 -> 4 -> nil
//                *
// 8 -> 0 -> 0 -> 2
//                *(c: 0)

func sumDigits(node1: Node, _ node2: Node) -> Node {
  var p1: Node? = node1
  var p2: Node? = node2
  
  let head = Node(v: 0)
  var p3 = head
  
  while p1 != nil || p2 != nil {
    // invariant: p1 or p2 exists, carry over is in p3
    
    p3.v += (p1?.v ?? 0) + (p2?.v ?? 0)
    
    let carryOver = p3.v/10
    p3.v = p3.v % 10
    
    p1 = p1?.next
    p2 = p2?.next
    
    if carryOver == 0 && p1 == nil && p2 == nil {
      continue
    }
    
    let newNode = Node(v: carryOver)
    p3.next = newNode
    p3 = newNode
  }
  
  return head
}

let headToSum1 = Node.create([3, 1, 5, 1])!
let headToSum2 = Node.create([5, 9, 4])!
assert("\(sumDigits(headToSum1, headToSum2))" == "8->0->0->2->nil")

/////////////////////////////////

/*
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 2.5

  0 -> 1 -> 2 -> 3 -> 4 -> 2
 *1
 *2

 0 -> 1 -> 2 -> 3 -> 4 -> 2
     *1
          *2

 0 -> 1 -> 2 -> 3 -> 4 -> 2
          *1
                    *2

 0 -> 1 -> 2 -> 3 -> 4 -> 2
               *1
               *2

 0 -> 1 -> 2 -> 3 -> 4 -> 3
 *1
 *2
 
 0 -> 1 -> 2 -> 3 -> 4 -> 3
     *1
          *2
 
 0 -> 1 -> 2 -> 3 -> 4 -> 3
          *1
                    *2
 
 0 -> 1 -> 2 -> 3 -> 4 -> 3
               *1
          *2
 
 x > k
 p1: k + (x-k)%(n-k)
 
 0 <- 1 2 -> 3 -> 4 -> 2 -> 3 -> ..
 0 <- 1 <- 2 3 -> 4 -> 2 -> 1 -> ..
 0 <- 1 <- 2 <- 3 4 -> 2 -> 1 -> ..
 0 <- 1 <- 2 <- 3 <- 4 2 -> 1 -> ..
 0 <- 1 <- 2 <- 3 <- 4 <- 2 1
 
*/

let node0 = Node(v: 0)
let node1 = Node(v: 1)
let node2 = Node(v: 2)
let node3 = Node(v: 3)
let node4 = Node(v: 4)

// 0 -> 1 -> 2 -> 3 -> 4 -> 2
node0.next = node1
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2

func findLoopStart(node: Node) -> Node? {
  var fastP = node
  var slowP = node
  
  while let slowPNext = slowP.next,
            fastPNext = fastP.next?.next {
    slowP = slowPNext
    fastP = fastPNext
    if slowP === fastP { break }
  }
  
  // invariant: slowP points to k steps before loop start
  
  var trackP = node
  
  while let slowPNext = slowP.next,
           trackPNext = trackP.next {
      slowP = slowPNext
      trackP = trackPNext
      if slowP === trackP { return trackP }
  }
  
  return nil
}

assert(findLoopStart(node0)!.v==2)
