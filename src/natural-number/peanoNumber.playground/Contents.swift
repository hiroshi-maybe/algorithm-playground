//: Playground of peano number
// http://www.fewbutripe.com/swift/math/2015/01/20/natural-numbers.html

import UIKit

var str = "Hello, playground"

/*
 * recursive type will be supported in Swift 2.0 in the future
 *
 * enum Nat {
 *   case Zero
 *   indirect case Succ(Nat)
 * }
 */

enum Nat {
    case Zero
    case Succ(()->Nat)
    
    func toInt()->Int {
        switch self {
            case .Zero:
                return 0
            case .Succ(let nat):
                return nat().toInt()+1
        }
    }
}

let zero: Nat = .Zero
let one: Nat = .Succ({zero})
let two: Nat = .Succ({one})
let three: Nat = .Succ({two})
let four: Nat = .Succ({.Succ({.Succ({.Succ({.Zero})})})})

let fourInt = four.toInt()

func add(a:Nat, b:Nat) -> Nat {
    switch b {
    case .Zero:
        return a
    case .Succ(let nat):
        return add(.Succ({a}), nat())
    }
}

func + (a: Nat, b: Nat) -> Nat {
    return add(a, b)
}

add(one, three).toInt()
(three + four).toInt()

