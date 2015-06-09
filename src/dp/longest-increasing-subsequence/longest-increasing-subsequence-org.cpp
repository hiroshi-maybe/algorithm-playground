#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;

#define FOR(i,a,b) for(int i=(a);i<(b);++i)
#define REP(i,n)  FOR(i,0,n)

#define dump(x)  cerr << #x << " = " << (x) << endl;

int n=16;
int a[16] = {0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15};

int dp[100];

int search(int a[], int cur, int edge) {
  if (cur > n) return edge;
  int cv = a[cur];
  if (dp[cv] != 0) {
    dp[cv]+=1;
    int i=cv+1;
    while(dp[i]!=0 && dp[i]<dp[cv]) {
      dp[i]=dp[cv];
      i+=1;
    }
    return search(a, cur+1, edge);
  }
  int v = dp[edge];
  FOR(i,edge+1,cv) {
    dp[i]=v;
  }
  dp[cv] = v+1;
  return search(a, cur+1, cv);
}

void solve() {
  memset(dp, 0, sizeof(dp));
  cout << dp[search(a, 0, 0)] << endl;
}

int main(int argc, char const *argv[]) {
  solve();
}
