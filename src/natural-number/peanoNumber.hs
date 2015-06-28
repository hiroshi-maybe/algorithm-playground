data Nat = Zero | Succ Nat deriving (Show, Read, Eq)

add :: Nat -> Nat -> Nat
add Zero b = b
add (Succ a) b = Succ (add a b)

--- ghci>add (Succ Zero) (Succ (Succ Zero))
--- Succ (Succ (Succ Zero))
