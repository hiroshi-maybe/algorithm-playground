
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

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 5.2

function to_binary(n) {
  var integer, dec, result = "", dec_result = "";
  integer = Math.floor(n);
  dec     = n - integer;
  while (integer > 0) {
    result = (integer % 2) + result;
    integer >>= 1;
  }
  while (dec > 0) {
    if (dec_result.length>32) return false;
    dec *= 2;
    if (dec>=1) {
      dec_result += 1;
      dec -= 1;
    } else {
      dec_result += 0;
    }
  }
  return result+"."+dec_result;
};

console.log(to_binary(100.35));

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 5.5

function convertion_bit_count(a, b) {
  var diff = a ^ b, count = 0;
  while (diff > 0) {
    count += diff & 1;
    diff >>= 1;
  }
  return count;
}

console.log(convertion_bit_count(31,14));
