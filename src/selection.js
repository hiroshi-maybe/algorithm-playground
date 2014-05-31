
var ar = [2, 7, 4, 9, 1, 5, 8, 3, 6];

var select_seq = function(ar, k) {
  var i=0, len=ar.length, j, min, temp;
  for (;i<=k; i+=1) {
    for (j=i; j<len; j+=1) {
      if (ar[i] >= ar[j]) {
	temp=ar[i]; ar[i]=ar[j]; ar[j]=temp;
      }
    }
  }
  return ar[k];
};

var med_i = Math.floor(ar.length/2);
console.log(select_seq(ar, med_i));

var select_partition = function(ar, k, left, right) {
  var pivot_i;
  if (left==null)  left = 0;
  if (right==null) right = ar.length-1;

  // TODO: Check later!!
  if (left>right) return null;

  pivot_i = left;
  pivot_i = partition(ar, pivot_i, left, right);
  if (pivot_i==k) return ar[pivot_i];
  if (k < pivot_i) {
    // search left
    return select_partition(ar, k, left, pivot_i-1);
  } else {
    // search right
    return select_partition(ar, k, pivot_i+1, right);
  }
};

var partition = function(ar, pivot_i, left, right) {
  var temp, i, to_swap, pivot = ar[pivot_i];
  temp=ar[right]; ar[right]=ar[pivot_i]; ar[pivot_i]=temp;
  to_swap = left;
  for (i=left; i<right; i+=1) {
    if (ar[i]<=pivot) {
      temp=ar[to_swap]; ar[to_swap]=ar[i]; ar[i]=temp;
      to_swap+=1;
    }
  }
  temp=ar[to_swap]; ar[to_swap]=ar[right]; ar[right]=temp;
  return to_swap;
};

console.log(select_partition(ar, med_i));



