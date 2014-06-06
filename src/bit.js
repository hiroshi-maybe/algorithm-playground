
ALL_1 = 2147483647;

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 5.1

function compound(n, m, i, j) {
  var mask,
      left  = ALL_1 - ((1 << (j+1)) -1),
      right = (1 << i) -1;

  n = parseInt(n, 2);
  m = parseInt(m, 2);
  mask = left | right;
  return ((n & mask) | (m <<i)).toString(2);
}

console.log(compound('10000000000', '10101', 2, 6));

