//: Playground of peano number
// http://www.fewbutripe.com/swift/math/2015/01/20/natural-numbers.html

import UIKit

var str = "Hello, playground"

/*
 * enum Nat {
 *   case Zero
 *   indirect case Succ(Nat)
 * }
 */

enum Nat {
    case Zero
    indirect case Succ(Nat)
    
    func toInt()->Int {
        switch self {
            case .Zero:
                return 0
            case .Succ(let nat):
                return nat.toInt()+1
        }
    }
    
    static func fromInt(value:Int) -> Nat {
        switch value {
            case 0:
                return .Zero
            default:
                return .Succ(.fromInt(value-1))
        }
    }
}

let zero: Nat = .Zero
let one: Nat = .Succ(zero)
let two: Nat = .fromInt(2)
let three: Nat = .Succ(two)
let four: Nat = .Succ(.Succ(.Succ(.Succ(.Zero))))
let five: Nat = .Succ(.Succ(.fromInt(3)))

let fourInt = two.toInt()

// add

func add(a:Nat, b:Nat) -> Nat {
    switch b {
    case .Zero:
        return a
    case .Succ(let nat):
        return add(.Succ(a), b: nat)
    }
}

func + (a: Nat, b: Nat) -> Nat {
    return add(a, b: b)
}

add(one, b: two).toInt()
(three + four).toInt()

// equatable

extension Nat : Equatable {}
func == (a: Nat, b: Nat) -> Bool {
    switch (a, b) {
        case (.Zero, .Zero):
            return true
        case (.Zero, _), (_, .Zero):
            return false
        case let (.Succ(prevA), .Succ(prevB)):
            return prevA == prevB
        default:
            return false
    }
}

.fromInt(3) == three

