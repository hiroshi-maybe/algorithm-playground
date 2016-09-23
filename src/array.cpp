#include <stdio.h>
#include <iostream>     // std::cout
#include <algorithm>    // std::unique, std::distance
#include <vector>       // std::vector
#include <sstream>
#include <string>
#include <fstream>
#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

void subArraySum(int arr[], int n, int sum)
{
  // create an empty map
  unordered_map<int, int> map;

  // Maintains sum of elements so far
  int curr_sum = 0;

  for (int i = 0; i < n; i++)
    {
      // add current element to curr_sum
      curr_sum = curr_sum + arr[i];

      // if curr_sum is equal to target sum
      // we found a subarray starting from index 0
      // and ending at index i
      if (curr_sum == sum)
	{
	  cout << "Sum found between indexes "
	       << 0 << " to " << i << endl;
	  return;
	}
      cout << i << ',' << curr_sum << endl;
      // If curr_sum - sum already exists in map
      // we have found a subarray with target sum
      if (map.find(curr_sum - sum) != map.end())
	{
	  cout << "Sum found between indexes "
	       << map[curr_sum - sum] + 1
	       << " to " << i << endl;
	  return;
	}

      map[curr_sum] = i;
    }

  // If we reach here, then no subarray exists
  cout << "No subarray with given sum exists";
}

int main () {
  int arr[] = {-3, 1, -45, -2, 2, -20, -100};
  int n = sizeof(arr)/sizeof(arr[0]);
  int sum = -165;

  subArraySum(arr, n, sum);

  return 0;
}
