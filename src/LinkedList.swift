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
  
  static func create(ints: [Int]) -> Node? {
    let sorted = ints.sort().map { Node(v: $0) }
    
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

if let node1 = Node.create([1, 3, 5, 7]),
  node2 = Node.create([1, 2, 4, 10]) {
  let headMerged = Node.merge(node1, node2)
  assert("\(headMerged!)" == "1->1->2->3->4->5->7->10->nil")
}

if let node1 = Node.create([1]),
  node2 = Node.create([1, 2, 4, 10]) {
  let headMerged = Node.merge(node1, node2)
  assert("\(headMerged!)" == "1->1->2->4->10->nil")
}
