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
  guard end-start > 0 else { return nil }
  let mid = start + (end-start) / 2
  
  let root = TreeNode(data: data[mid])
  root.left = createTree(data, start: start, end: mid)
  root.right = createTree(data, start: mid+1, end: end)
  
  return root
}

let dataForTree = [0,1,2,3,4,5,6]
assert(createTree(dataForTree, start: 0, end: dataForTree.count)==TreeNode(
  data: 3,
  left: TreeNode(data: 1,
     left: TreeNode(data: 0),
    right: TreeNode(data: 2)),
 right: TreeNode(data: 5,
     left: TreeNode(data: 4),
    right: TreeNode(data: 6))
))

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

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.5
 
 */

class DoublyLinkedTreeNode {
  var data: Int
  var left: DoublyLinkedTreeNode? {
    didSet {
      left?.parent = self
    }
  }
  var right: DoublyLinkedTreeNode? {
    didSet {
      right?.parent = self
    }
  }
  var parent: DoublyLinkedTreeNode?
  
  init(data: Int) {
    self.data = data
  }
  
  init(data: Int, left: DoublyLinkedTreeNode?, right: DoublyLinkedTreeNode?) {
    self.data = data
    self.left = left
    left?.parent = self
    self.right = right
    right?.parent = self
  }
}

/**
 
 *
 *          5
 *         / \
 *        1   6
 *       / \
 *      0   2
 *         / \
 *        3   4
 *
 1) has right child -> right child
   1 -> 2
 
 2) it's left child -> parent
   3 -> 2
 
 3) it's right child leaf -> first parent of left child
   4 -> 2 -> 1 -> 5
 
 */

func findSuccessor(node: DoublyLinkedTreeNode) -> DoublyLinkedTreeNode? {
  if let rightChild = node.right { return rightChild }
  
  if let parent = node.parent,
      leftChild = parent.left where leftChild === node {
    return parent
  }
  
  var pointer = node
  while let parent = pointer.parent {
    guard let grandParent = parent.parent else { return nil } // last element (no successor)
    if let leftChild = grandParent.left where leftChild === parent { return grandParent }
    
    pointer = parent
  }
  
  return nil
}

let treeToFindSuccessor4 = DoublyLinkedTreeNode(data: 4)
let treeToFindSuccessor0 = DoublyLinkedTreeNode(data: 0)
let treeToFindSuccessor = DoublyLinkedTreeNode(
  data: 5,
   left: DoublyLinkedTreeNode(data: 1,
     left: treeToFindSuccessor0,
    right: DoublyLinkedTreeNode(data: 2,
       left: DoublyLinkedTreeNode(data: 3),
      right: treeToFindSuccessor4)),
  right: DoublyLinkedTreeNode(data: 6)
)

let treeToFindSuccessor1 = treeToFindSuccessor.left!

assert(findSuccessor(treeToFindSuccessor)!.data == 6)
assert(findSuccessor(treeToFindSuccessor1)!.data == 2)
assert(findSuccessor(treeToFindSuccessor0)!.data == 1)
assert(findSuccessor(treeToFindSuccessor4)!.data == 5)

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.6
 
 *
 *          5
 *         / \
 *        1   6
 *       / \
 *      0   2
 *         / \
 *        3   4
 *
 
 find path
 p: 5 -> 1 -> 0
 q: 5 -> 1 -> 2 -> 3
 
 */

// Time complexity: O(X + C) = O(N) in worst case, X is node numbers to search (X < N), C is shorter path length for P1 and P2 (C < N)
// Space complexity: O(D) = O(N) in worst case, D is the biggest depth in the tree (D < N)
func findCommonAncestor(root: TreeNode, node1: TreeNode, node2: TreeNode) -> TreeNode? {
  let path1 = findPath(root, node: node1)
  let path2 = findPath(root, node: node2)
  
  // find furthest common element
  return Zip2Sequence(path1, path2)
    .map { $0===$1 ? .Some($0) : nil }
    .flatMap { $0 }
    .last
}

// root: 5, node: 0 -> [5,1,0]
// L: root: 1, node: 0 -> [1,0]
// LL: root: 0, node: 0 -> [0]

// root: 5, node: 4 -> [5,1,2,4]
// L: root: 1, node: 4 -> [1,2,4]
// LL: root: 0, node: 4 -> []
// LR: root: 2, node: 4 -> [2,4]
// LRL: root: 3, node: 4 -> []
// LRR: root: 4, node: 4 -> [4]

func findPath(root: TreeNode?, node: TreeNode) -> [TreeNode] {
  guard let root = root else { return [] }
  if root === node { return [node] }
  
  let leftPath = findPath(root.left, node: node)
  if !leftPath.isEmpty { return [root] + leftPath }
  
  let rightPath = findPath(root.right, node: node)
  if !rightPath.isEmpty { return [root] + rightPath }
  
  return []
}

let treeToFindCommonAncestor0 = TreeNode(data: 0)
let treeToFindCommonAncestor4 = TreeNode(data: 4)

let treeToFindCommonAncestor = TreeNode(
  data: 5,
   left: TreeNode(data: 1,
     left: treeToFindCommonAncestor0,
    right: TreeNode(data: 2,
       left: TreeNode(data: 3),
      right: treeToFindCommonAncestor4)),
  right: TreeNode(data: 6)
)

assert(findPath(treeToFindCommonAncestor, node: treeToFindCommonAncestor0).count == 3)
assert(findPath(treeToFindCommonAncestor, node: treeToFindCommonAncestor4).count == 4)
assert(findCommonAncestor(treeToFindCommonAncestor, node1: treeToFindCommonAncestor0, node2: treeToFindCommonAncestor4)!.data == 1)

/**
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 4.7
 
 *
 *          5
 *         / \
 *        1   6
 *       / \
 *      0   2
 *         / \
 *        3   4
 *
 
 T1: tree with root 5
 T2: tree with root 2
 
 5 != 2
 L: 1!=2
 LL: 0!=2
 LR: 2==2 test if they are equal trees
 R: 6!=2
 
 */

// Time complexity: O(M + k * N) -> O(M * N) in worst case (check equality for every node in t1 against t2)
//   where M = size of t1, N = size of t2, k is the number of times to check equality of t1 subtree and t2

func isSubtree(t1: TreeNode?, _ t2: TreeNode?) -> Bool {
  switch (t1, t2) {
  case (_, nil):
    return true
  case let (.Some(t1), .Some(t2)) where t1 == t2:
    return true
  case let (.Some(t1), .Some(t2)):
    return isSubtree(t1.left, t2) || isSubtree(t1.right, t2)
  default:
    return false
  }
}

let treeToFindSubtree2 = TreeNode(data: 2,
                                   left: TreeNode(data: 3),
                                  right: treeToFindCommonAncestor4)

let treeToFindSubtree = TreeNode(
  data: 5,
  left: TreeNode(data: 1,
    left: treeToFindCommonAncestor0,
    right: treeToFindSubtree2),
  right: TreeNode(data: 6)
)

assert(isSubtree(treeToFindSubtree, treeToFindSubtree2))
