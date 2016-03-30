
var x = "XMJYAUZ",
    y = "MZJAWXU";

function lcs_rec(i, j) {
  var cx = x.charAt(i),
      cy = y.charAt(j);

  if (i >= x.length) return 0;
  if (j >= y.length) return 0;

  if (cx === cy) {
    return 1 + lcs_rec(i+1, j+1);
  }
  return Math.max(
    lcs_rec(i, j+1),
    lcs_rec(i+1, j)
  );
}

function solve() {
  console.log(lcs_rec(0, 0));
}

solve();
