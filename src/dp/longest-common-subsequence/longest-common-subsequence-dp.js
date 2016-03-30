// dp: 216 (12 x 18) times `lcs_dp` called
var x = "nematode_knowledge",
    y = "empty_bottle";

var counter = 0;

var dp = [];

(function init_dp_table() {
  for (var i=0; i<x.length+1; i+=1) {
    dp[i] = [];
    for (var j=0; j<y.length+1; j+=1) {
      dp[i][j] = 0;
    }
  }
})();

function lcs_dp() {
  var cx, cy, i = 0, j = 0;
  for (i=0; i<x.length; i+=1) {
    cx = x.charAt(i);
    for (j=0; j<y.length; j+=1) {
      counter += 1;
      cy = y.charAt(j);
      if (cx === cy) {
	dp[i+1][j+1] = dp[i][j] + 1;
      } else {
	dp[i+1][j+1] = Math.max(dp[i][j+1], dp[i+1][j]);
      }
    }
  }
  return dp[x.length][y.length];
}

function solve() {
  console.log(lcs_dp() + "(" + counter + ")");
}

solve();
