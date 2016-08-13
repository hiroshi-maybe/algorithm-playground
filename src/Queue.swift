//
//  Queue.swift
//  
//
//  Created by kori on 8/13/16.
//
//

import Foundation

/////////////////////////////////

/*
 
 https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
 Q 3.5
 
 enqueue 1, 2, 3, 4
 q: [1, 2, 3, 4]
 enS: [1, 2, 3, 4]
 deS: []
 
 dequeue
 q: [2, 3, 4]
 enS: []
 deS: [4, 3, 2, 1] -> [4, 3, 2]
 
 dequeue
 enS: []
 deS: [4, 3]
 
 enqueue 5
 enS: [3, 4, 5]
 deS: []
 
 */

class QueueByStacks {
  private var enqueStack: [Int] = []
  private var dequeStack: [Int] = []
  
  func enque(v: Int) {
    move(from: &dequeStack, to: &enqueStack)
    
    enqueStack.append(v)
  }
  
  func deque() -> Int? {
    move(from: &enqueStack, to: &dequeStack)
    
    guard let last = dequeStack.last else { return nil }
    dequeStack.removeLast()
    
    return last
  }
  
  private func move(inout from from: [Int], inout to: [Int]) {
    guard from.count > 0 else { return }
    
    while let last = from.last {
      from.removeLast()
      to.append(last)
    }
  }
}

let queueByStacks = QueueByStacks()
queueByStacks.enque(1)
queueByStacks.enque(2)
queueByStacks.enque(3)

assert(queueByStacks.deque()!==1)
