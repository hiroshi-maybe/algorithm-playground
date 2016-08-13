//
//  LinkedList.swift
//  
//
//  Created by kori on 8/7/16.
//
//

import Foundation

class Node: CustomDebugStringConvertible {
  let v: Int
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

let headToDelDuplicate = Node.create([18, 7, 2, 89, 1, 2, 7, 18])

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

assert("\(deleteDuplicatedInLinkedList(headToDelDuplicate!, prev: nil))" == "18->7->2->89->1->nil")
