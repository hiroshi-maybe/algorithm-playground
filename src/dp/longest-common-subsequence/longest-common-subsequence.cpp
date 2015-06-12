#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

#define LB(a,n,k) lower_bound(a,a+(n),(k))

#define FOR(i,a,b) for(int i=(a);i<(b);++i)
#define REP(i,n)  FOR(i,0,n)

#define dump(x)  cerr << #x << " = " << (x) << endl;

int n=18, m=12;
string s = "nematode_knowledge";
string t = "empty_bottle";
int dp[18][12];
// ans = 7

void solve() {
  memset(dp, 0, sizeof(dp));
  REP(i,n) {
    char cur = s[i];
    REP(j,m) {
      int pre_j = j<1 ? 0 : dp[i][j-1];
      int pre_i = i<1 ? 0 : dp[i-1][j];
      if (cur != t[j]) {
	dp[i][j] = max(pre_j,pre_i);
      } else {
	dp[i][j] = max(pre_j+1,pre_i);
      }
    }
  }
  cout << dp[n-1][m-1] << endl;
}

int main(int argc, char const *argv[]) {
  solve();
}
