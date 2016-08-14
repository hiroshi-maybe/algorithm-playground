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
