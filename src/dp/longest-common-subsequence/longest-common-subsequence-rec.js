
// brute force: 6425502 times `lcs_rec` called
// memoization:     184 times `lcs_rec` called
var x = "nematode_knowledge",
    y = "empty_bottle";

var counter = 0;

var memo = [];

function lcs_rec_memoized(i, j) {
  if (memo[i] !== undefined && memo[i][j] !== undefined) return memo[i][j];

  var res = lcs_rec(i, j);
  if (memo[i] === undefined) memo[i] = [];
  memo[i][j] = res;
  return res;
}

function lcs_rec(i, j) {
  var cx = x.charAt(i),
      cy = y.charAt(j);

  if (i >= x.length) return 0;
  if (j >= y.length) return 0;

  counter += 1;

  if (cx === cy) {
    return 1 + lcs_rec_memoized(i+1, j+1);
  }
  return Math.max(
    lcs_rec_memoized(i, j+1),
    lcs_rec_memoized(i+1, j)
  );
}

function solve() {
  console.log(lcs_rec_memoized(0, 0) + "(" + counter + ")");
}

solve();
