//
//  Tree.swift
//  
//
//  Created by kori on 8/13/16.
//
//

import Foundation

class TreeNode {
  var data: Int
  var left: TreeNode?
  var right: TreeNode?
  
  init(data: Int) {
    self.data = data
  }
  
  init(data: Int, left: TreeNode?, right: TreeNode?) {
    self.data = data
    self.left = left
    self.right = right
  }
}

extension TreeNode: Equatable {}
func == (lhs: TreeNode, rhs: TreeNode) -> Bool {
  guard lhs.data == rhs.data else { return false }
  return lhs.left == rhs.left && lhs.right == rhs.right
}

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.1
 
 *
 *          0
 *         / \
 *        1   2
 *       / \
 *      3   4
 *         / \
 *        5   6
 *
 
 (0) -> (min:2,max:4)
 
 (1) -> (min:2,max:3)
 
 (3) -> (min:1,max:1)

 (4) -> (min:2,max:2)
 
 (5) -> (min:1,max:1)
 (6) -> (min:1,max:1)
 
 (2) -> (min:1,max:1)
 */

func balanced(root: TreeNode) -> Bool {
  let rootDepth = depth(root)
  
  return rootDepth.max - rootDepth.min < 2
}

func depth(node: TreeNode?) -> (min: Int, max: Int) {
  guard let node = node else { return (min: 0, max: 0) }
  
  let leftDepth = depth(node.left)
  let rightDepth = depth(node.right)
  
  return (min: min(leftDepth.min, rightDepth.min) + 1,
          max: max(leftDepth.max, rightDepth.max) + 1)
}

let unbalancedTree = TreeNode(
  data: 0,
  left: TreeNode(data: 1,
    left: TreeNode(data: 3),
    right: TreeNode(data: 4,
      left: TreeNode(data: 5),
      right: TreeNode(data: 6))),
  right: TreeNode(data: 2)
)

assert(!balanced(unbalancedTree))

let balancedTree = TreeNode(
  data: 0,
  left: TreeNode(data: 1,
    left: TreeNode(data: 3),
    right: TreeNode(data: 4,
      left: TreeNode(data: 5),
      right: TreeNode(data: 6))),
  right: TreeNode(data: 2,
     left: TreeNode(data: 7),
    right: TreeNode(data: 8))
)

assert(balanced(balancedTree))

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.3
 
 [0,1,2,3,4,5,6], start: 0, end: 7
 
 mid = 3
 
    3
   / \
  1   5
 / \  / \
0   2 4  6
 
 [0,1,2,3,4,5,6], start: 0, end: 3
 
 midl = 1
 
 [0,1,2,3,4,5,6], start: 0, end: 1
 
 midll = 0
 
 [0,1,2,3,4,5,6], start: 0, end: 0
 
 nil
 
 [0,1,2,3,4,5,6], start: 2, end: 3
 
 midlr = 2
 
 [0,1,2,3,4,5,6], start: 3, end: 3
 
 nil
 
 [0,1,2,3,4,5,6], start: 4, end: 7
 
 midr = 5
 
 [0,1,2,3,4,5,6], start: 4, end: 5
 
 midrl = 4
 
 [0,1,2,3,4,5,6], start: 4, end: 4
 
 nil
 
 [0,1,2,3,4,5,6], start: 6, end: 7
 
 midrr = 6
 
 [0,1,2,3,4,5,6], start: 7, end: 7
 
 nil
 
 */


// time complexity: O(L), L is length of data
// space complexity: O(L + log L) = O(L)
func createTree(data: [Int], start: Int, end: Int) -> TreeNode? {
  guard end-start > 1 else { return nil }
  let mid = start + (end-start) / 2
  
  let root = TreeNode(data: data[mid])
  root.left = createTree(data, start: start, end: mid)
  root.right = createTree(data, start: mid+1, end: end)
  
  return root
}

let dataForTree = [0,1,2,3,4,5,6]
print(createTree(dataForTree, start: 0, end: dataForTree.count))

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.4
 
 */

class ListNode: CustomDebugStringConvertible {
  var v: Int
  var next: ListNode?
  
  static func create(ints: [Int]) -> ListNode? {
    let sorted = ints.map { ListNode(v: $0) }
    
    Zip2Sequence(
      sorted[0..<sorted.count-1],
      sorted[1..<sorted.count]
      )
      .forEach {
        $0.next = $1
    }
    
    return sorted.first
  }
  
  init(v: Int) {
    self.v = v
  }
  
  var debugDescription: String {
    let nextStr = next?.debugDescription ?? "nil"
    return "\(v)->\(nextStr)"
  }
}

/**
 [0,1,2,3,4,5,6], start: 0, end: 7
 
 mid = 3
 
      3
    /   \
   1     5
  / \   / \
 0   2 4   6
 
 BFS
 
 visiting = [3]
 children = [1,5]
 
 3 -> nil
 
 visiting = [1,5]
 children = [0,2,4,6]
 
 1 -> 5 -> nil
 
 visiting = [0,2,4,6]
 children = []
 
 0 -> 2 -> 4 -> 6 -> nil
 
 */

// time complexity: O(T), T is number of elements in input tree
// space complexity: O(T), Result has T elements of list node
func depthElements(node: TreeNode) -> [ListNode] {
  var lists: [ListNode?] = []
  var visiting: [TreeNode] = [node]
  var children: [TreeNode] = []
  
  while !visiting.isEmpty {
    // node exists in current depth
    children = visiting.flatMap { [$0.left, $0.right].flatMap { $0 } }
    
    // get all children of nodes in current depth
    
    lists.append(ListNode.create(visiting.map { $0.data }))
    
    visiting = children
  }
  
  return lists.flatMap { $0 }
}

let linkedListSourceTree = TreeNode(
  data: 0,
   left: TreeNode(data: 1,
     left: TreeNode(data: 3),
    right: TreeNode(data: 4,
       left: TreeNode(data: 5),
      right: TreeNode(data: 6))),
  right: TreeNode(data: 2)
)

let lists = depthElements(linkedListSourceTree)
assert("\(lists[0])"=="0->nil")
assert("\(lists[1])"=="1->2->nil")
assert("\(lists[2])"=="3->4->nil")
assert("\(lists[3])"=="5->6->nil")
